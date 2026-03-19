import json
import math
import os
from pathlib import Path

import faiss
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from sentence_transformers import CrossEncoder, SentenceTransformer


BASE_DIR = Path(__file__).resolve().parent
DEFAULT_MODEL_PATH = BASE_DIR / "models" / "job-sbert"
DEFAULT_INDEX_PATH = BASE_DIR / "artifacts" / "jobs.faiss"
DEFAULT_META_PATH = BASE_DIR / "artifacts" / "jobs_metadata.json"
DEFAULT_RERANK_MODEL = "cross-encoder/ms-marco-MiniLM-L-6-v2"

app = FastAPI(title="SBERT Job Matching Service", version="1.0.0")

model = None
index = None
metadata = None
reranker = None


class MatchRequest(BaseModel):
    user_text: str = Field(..., min_length=5)
    top_k: int = Field(default=20, ge=1, le=100)
    rerank: bool = Field(default=False)
    rerank_top_n: int = Field(default=50, ge=1, le=200)


def sanitize_value(value):
    if isinstance(value, float):
        if math.isnan(value) or math.isinf(value):
            return None
        return value
    if isinstance(value, np.floating):
        v = float(value)
        if math.isnan(v) or math.isinf(v):
            return None
        return v
    if isinstance(value, np.integer):
        return int(value)
    if isinstance(value, dict):
        return {k: sanitize_value(v) for k, v in value.items()}
    if isinstance(value, list):
        return [sanitize_value(v) for v in value]
    return value


def build_job_text(job):
    parts = [
        f"Job title: {job.get('job_title', '')}",
        f"Company: {job.get('company_name', '')}",
        f"Location: {job.get('location', '')}",
        f"Seniority: {job.get('seniority_level', '')}",
        f"Function: {job.get('job_function', '')}",
        f"Employment type: {job.get('employment_type', '')}",
        f"Industry: {job.get('industry', '')}",
    ]
    return ". ".join([part for part in parts if not part.endswith(": ")])


def load_artifacts():
    global model, index, metadata, reranker

    model_path = Path(os.getenv("MODEL_PATH", str(DEFAULT_MODEL_PATH)))
    index_path = Path(os.getenv("INDEX_PATH", str(DEFAULT_INDEX_PATH)))
    meta_path = Path(os.getenv("META_PATH", str(DEFAULT_META_PATH)))
    rerank_model_name = os.getenv("RERANK_MODEL_NAME", DEFAULT_RERANK_MODEL).strip()
    enable_reranker = os.getenv("ENABLE_RERANKER", "1") == "1"

    if not model_path.exists():
        raise FileNotFoundError(f"Model not found at {model_path}")
    if not index_path.exists():
        raise FileNotFoundError(f"FAISS index not found at {index_path}")
    if not meta_path.exists():
        raise FileNotFoundError(f"Metadata file not found at {meta_path}")

    model = SentenceTransformer(str(model_path))
    index = faiss.read_index(str(index_path))
    with open(meta_path, "r", encoding="utf-8") as f:
        metadata = json.load(f)

    reranker = None
    if enable_reranker and rerank_model_name:
        reranker = CrossEncoder(rerank_model_name)


@app.on_event("startup")
def startup_event():
    load_artifacts()


@app.get("/health")
def health():
    return {
        "ok": True,
        "indexed_jobs": len(metadata) if metadata else 0,
        "reranker_loaded": reranker is not None,
    }


@app.post("/match-jobs")
def match_jobs(payload: MatchRequest):
    if model is None or index is None or metadata is None:
        raise HTTPException(status_code=500, detail="Artifacts not loaded.")

    search_k = payload.top_k
    if payload.rerank:
        search_k = max(payload.top_k, payload.rerank_top_n)

    query_embedding = model.encode(
        [payload.user_text],
        normalize_embeddings=True,
        convert_to_numpy=True,
    ).astype(np.float32)
    query_embedding = np.nan_to_num(query_embedding, nan=0.0, posinf=0.0, neginf=0.0)

    scores, idxs = index.search(query_embedding, search_k)
    scored = []
    for score, idx in zip(scores[0], idxs[0]):
        if idx < 0 or idx >= len(metadata):
            continue
        clean_score = float(score)
        if math.isnan(clean_score) or math.isinf(clean_score):
            clean_score = 0.0
        scored.append(
            {
                "score": clean_score,
                "job": sanitize_value(metadata[idx]),
            }
        )

    if payload.rerank and reranker is not None and scored:
        rerank_candidates = scored[: payload.rerank_top_n]
        pairs = [
            [payload.user_text, build_job_text(candidate["job"])]
            for candidate in rerank_candidates
        ]
        rerank_scores = reranker.predict(pairs)

        for candidate, rerank_score in zip(rerank_candidates, rerank_scores):
            clean_rerank_score = float(rerank_score)
            if math.isnan(clean_rerank_score) or math.isinf(clean_rerank_score):
                clean_rerank_score = 0.0
            candidate["rerank_score"] = clean_rerank_score
            candidate["score"] = clean_rerank_score

        rerank_candidates.sort(key=lambda item: item["score"], reverse=True)
        remaining = scored[payload.rerank_top_n :]
        scored = rerank_candidates + remaining

    scored = scored[: payload.top_k]
    return sanitize_value({"results": scored})
