import json
import os
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

import faiss
import matplotlib
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

matplotlib.use("Agg")
import matplotlib.pyplot as plt


BASE_DIR = Path(__file__).resolve().parent
ARTIFACTS_DIR = BASE_DIR / "artifacts"
DEFAULT_MODEL_PATH = BASE_DIR / "models" / "job-sbert"
DEFAULT_INDEX_PATH = ARTIFACTS_DIR / "jobs.faiss"
DEFAULT_META_PATH = ARTIFACTS_DIR / "jobs_metadata.json"
DEFAULT_OUTPUT_PATH = ARTIFACTS_DIR / "retrieval_metrics.jsonl"
DEFAULT_TREND_PLOT_PATH = ARTIFACTS_DIR / "metrics_trend.png"
DEFAULT_LATEST_PLOT_PATH = ARTIFACTS_DIR / "metrics_latest_bar.png"
DEFAULT_REGRESSION_PLOT_PATH = ARTIFACTS_DIR / "metrics_regression.png"


def load_artifacts(model_path, index_path, meta_path):
    model = SentenceTransformer(str(model_path))
    index = faiss.read_index(str(index_path))
    with open(meta_path, "r", encoding="utf-8") as f:
        metadata = json.load(f)
    return model, index, metadata


def build_groups(metadata):
    groups = defaultdict(list)
    for idx, row in enumerate(metadata):
        job_function = str(row.get("job_function", "") or "").strip()
        industry = str(row.get("industry", "") or "").strip()
        key = f"{job_function}||{industry}"
        groups[key].append(idx)
    return groups


def precision_at_k(retrieved, relevant, k):
    top_k = retrieved[:k]
    if not top_k:
        return 0.0
    hits = sum(1 for r in top_k if r in relevant)
    return hits / float(k)


def recall_at_k(retrieved, relevant, k):
    if not relevant:
        return 0.0
    top_k = retrieved[:k]
    hits = sum(1 for r in top_k if r in relevant)
    return hits / float(len(relevant))


def mrr_at_k(retrieved, relevant, k):
    for rank, doc_id in enumerate(retrieved[:k], start=1):
        if doc_id in relevant:
            return 1.0 / float(rank)
    return 0.0


def dcg_at_k(retrieved, relevant, k):
    score = 0.0
    for rank, doc_id in enumerate(retrieved[:k], start=1):
        rel = 1.0 if doc_id in relevant else 0.0
        if rel > 0:
            score += rel / np.log2(rank + 1.0)
    return score


def ndcg_at_k(retrieved, relevant, k):
    dcg = dcg_at_k(retrieved, relevant, k)
    ideal_hits = min(k, len(relevant))
    if ideal_hits == 0:
        return 0.0
    idcg = sum(1.0 / np.log2(rank + 1.0) for rank in range(1, ideal_hits + 1))
    if idcg == 0:
        return 0.0
    return dcg / idcg


def main():
    model_path = Path(os.getenv("MODEL_PATH", str(DEFAULT_MODEL_PATH)))
    index_path = Path(os.getenv("INDEX_PATH", str(DEFAULT_INDEX_PATH)))
    meta_path = Path(os.getenv("META_PATH", str(DEFAULT_META_PATH)))
    output_path = Path(os.getenv("METRICS_OUTPUT", str(DEFAULT_OUTPUT_PATH)))
    trend_plot_path = Path(os.getenv("TREND_PLOT_PATH", str(DEFAULT_TREND_PLOT_PATH)))
    latest_plot_path = Path(os.getenv("LATEST_PLOT_PATH", str(DEFAULT_LATEST_PLOT_PATH)))
    regression_plot_path = Path(
        os.getenv("REGRESSION_PLOT_PATH", str(DEFAULT_REGRESSION_PLOT_PATH))
    )
    regression_metric = os.getenv("REGRESSION_METRIC", "recall@10")
    generate_plots = os.getenv("GENERATE_PLOTS", "1") == "1"

    k_values = [int(v.strip()) for v in os.getenv("K_VALUES", "5,10,20").split(",") if v.strip()]
    max_queries = int(os.getenv("MAX_QUERIES", "2000"))
    seed = int(os.getenv("EVAL_SEED", "42"))
    rng = np.random.default_rng(seed)

    if not model_path.exists():
        raise FileNotFoundError(f"Model not found: {model_path}")
    if not index_path.exists():
        raise FileNotFoundError(f"Index not found: {index_path}")
    if not meta_path.exists():
        raise FileNotFoundError(f"Metadata not found: {meta_path}")

    model, index, metadata = load_artifacts(model_path, index_path, meta_path)
    groups = build_groups(metadata)

    query_candidates = []
    for g_idxs in groups.values():
        if len(g_idxs) > 1:
            query_candidates.extend(g_idxs)

    if not query_candidates:
        raise ValueError("No valid query candidates with at least one relevant doc.")

    if len(query_candidates) > max_queries:
        query_indices = rng.choice(query_candidates, size=max_queries, replace=False).tolist()
    else:
        query_indices = query_candidates

    query_texts = [str(metadata[i].get("job_text", "")) for i in query_indices]
    query_embeddings = model.encode(
        query_texts,
        normalize_embeddings=True,
        convert_to_numpy=True,
        show_progress_bar=True,
    ).astype(np.float32)
    query_embeddings = np.nan_to_num(query_embeddings, nan=0.0, posinf=0.0, neginf=0.0)

    search_k = max(k_values) + 1
    _, all_indices = index.search(query_embeddings, search_k)

    aggregate = {
        f"precision@{k}": [] for k in k_values
    }
    for k in k_values:
        aggregate[f"recall@{k}"] = []
        aggregate[f"mrr@{k}"] = []
        aggregate[f"ndcg@{k}"] = []

    for q_row, anchor_idx in enumerate(query_indices):
        anchor = metadata[anchor_idx]
        key = f"{str(anchor.get('job_function', '')).strip()}||{str(anchor.get('industry', '')).strip()}"
        relevant = set(groups[key]) - {anchor_idx}
        if not relevant:
            continue

        retrieved = [int(doc_id) for doc_id in all_indices[q_row].tolist() if int(doc_id) != anchor_idx]

        for k in k_values:
            aggregate[f"precision@{k}"].append(precision_at_k(retrieved, relevant, k))
            aggregate[f"recall@{k}"].append(recall_at_k(retrieved, relevant, k))
            aggregate[f"mrr@{k}"].append(mrr_at_k(retrieved, relevant, k))
            aggregate[f"ndcg@{k}"].append(ndcg_at_k(retrieved, relevant, k))

    metrics = {
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "model_path": str(model_path),
        "index_path": str(index_path),
        "meta_path": str(meta_path),
        "num_jobs": len(metadata),
        "num_queries": len(query_indices),
        "k_values": k_values,
    }

    for name, values in aggregate.items():
        metrics[name] = float(np.mean(values)) if values else 0.0

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "a", encoding="utf-8") as f:
        f.write(json.dumps(metrics, ensure_ascii=True) + "\n")

    if generate_plots:
        create_plots(
            output_path,
            trend_plot_path,
            latest_plot_path,
            regression_plot_path,
            regression_metric,
        )

    print(json.dumps(metrics, indent=2))
    print(f"Saved metrics to {output_path}")
    if generate_plots:
        print(f"Saved trend plot to {trend_plot_path}")
        print(f"Saved latest-run plot to {latest_plot_path}")
        print(f"Saved regression plot to {regression_plot_path}")


def create_plots(
    metrics_path,
    trend_plot_path,
    latest_plot_path,
    regression_plot_path,
    regression_metric,
):
    if not metrics_path.exists():
        return

    df = pd.read_json(metrics_path, lines=True)
    if df.empty:
        return

    metric_columns = [
        col
        for col in [
            "precision@5",
            "recall@5",
            "mrr@5",
            "ndcg@5",
            "precision@10",
            "recall@10",
            "mrr@10",
            "ndcg@10",
            "precision@20",
            "recall@20",
            "mrr@20",
            "ndcg@20",
        ]
        if col in df.columns
    ]

    if not metric_columns:
        return

    df = df.sort_values("timestamp_utc").reset_index(drop=True)
    df["run"] = np.arange(1, len(df) + 1)

    trend_plot_path.parent.mkdir(parents=True, exist_ok=True)
    plt.figure(figsize=(14, 8))
    for metric in metric_columns:
        plt.plot(df["run"], df[metric], marker="o", label=metric)
    plt.title("Retrieval Metrics Trend Across Runs")
    plt.xlabel("Run")
    plt.ylabel("Score")
    plt.ylim(0, 1)
    plt.grid(True, alpha=0.3)
    plt.legend(ncol=3, fontsize=8)
    plt.tight_layout()
    plt.savefig(trend_plot_path, dpi=200)
    plt.close()

    latest = df.iloc[-1]
    plt.figure(figsize=(14, 6))
    plt.bar(metric_columns, [latest[m] for m in metric_columns])
    plt.title("Latest Run Retrieval Metrics")
    plt.xlabel("Metric")
    plt.ylabel("Score")
    plt.ylim(0, 1)
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.savefig(latest_plot_path, dpi=200)
    plt.close()

    metric = regression_metric if regression_metric in metric_columns else metric_columns[0]
    x = df["run"].astype(float).to_numpy()
    y = df[metric].astype(float).to_numpy()

    plt.figure(figsize=(10, 6))
    plt.scatter(x, y, label=f"{metric} (runs)", alpha=0.8)

    if len(x) >= 2:
        slope, intercept = np.polyfit(x, y, 1)
        y_fit = slope * x + intercept
        plt.plot(x, y_fit, color="red", linewidth=2, label=f"Linear fit (slope={slope:.4f})")

    plt.title(f"Regression Trend for {metric}")
    plt.xlabel("Run")
    plt.ylabel(metric)
    plt.ylim(0, 1)
    plt.grid(True, alpha=0.3)
    plt.legend()
    plt.tight_layout()
    plt.savefig(regression_plot_path, dpi=200)
    plt.close()


if __name__ == "__main__":
    main()
