import json
import os
from pathlib import Path

import faiss
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
ARTIFACTS_DIR = BASE_DIR / "artifacts"
JOBS_FILE = DATA_DIR / "jobs_clean.csv"
DEFAULT_MODEL_PATH = BASE_DIR / "models" / "job-sbert"
INDEX_FILE = ARTIFACTS_DIR / "jobs.faiss"
META_FILE = ARTIFACTS_DIR / "jobs_metadata.json"


def main():
    model_path = os.getenv("MODEL_PATH", str(DEFAULT_MODEL_PATH))
    if not JOBS_FILE.exists():
        raise FileNotFoundError(f"{JOBS_FILE} not found. Run prepare_data.py first.")

    df = pd.read_csv(JOBS_FILE)
    if df.empty:
        raise ValueError("jobs_clean.csv is empty.")

    model = SentenceTransformer(model_path)
    texts = df["job_text"].astype(str).tolist()
    embeddings = model.encode(
        texts,
        normalize_embeddings=True,
        convert_to_numpy=True,
        show_progress_bar=True,
    )

    embeddings = np.asarray(embeddings, dtype=np.float32)
    index = faiss.IndexFlatIP(embeddings.shape[1])
    index.add(embeddings)

    ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)
    faiss.write_index(index, str(INDEX_FILE))

    metadata = df.to_dict(orient="records")
    with open(META_FILE, "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=True)

    print(f"Saved FAISS index: {INDEX_FILE}")
    print(f"Saved metadata: {META_FILE}")
    print(f"Indexed jobs: {len(metadata)}")


if __name__ == "__main__":
    main()
