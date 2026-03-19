import json
import os
from datetime import datetime, timezone
from pathlib import Path

import matplotlib
import numpy as np
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sentence_transformers import SentenceTransformer, util

matplotlib.use("Agg")
import matplotlib.pyplot as plt


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
ARTIFACTS_DIR = BASE_DIR / "artifacts"
DEFAULT_MODEL_PATH = BASE_DIR / "models" / "job-sbert"
DEFAULT_EVAL_PATH = DATA_DIR / "eval_cosine.jsonl"
DEFAULT_MATRIX_PATH = ARTIFACTS_DIR / "confusion_matrix.png"
DEFAULT_METRICS_PATH = ARTIFACTS_DIR / "confusion_metrics.jsonl"


def load_eval_rows(eval_path):
    rows = []
    with open(eval_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                rows.append(json.loads(line))
    return rows


def main():
    model_path = Path(os.getenv("MODEL_PATH", str(DEFAULT_MODEL_PATH)))
    eval_path = Path(os.getenv("PAIR_EVAL_PATH", str(DEFAULT_EVAL_PATH)))
    matrix_path = Path(os.getenv("CONFUSION_MATRIX_PATH", str(DEFAULT_MATRIX_PATH)))
    metrics_path = Path(os.getenv("CONFUSION_METRICS_PATH", str(DEFAULT_METRICS_PATH)))
    threshold = float(os.getenv("PAIR_THRESHOLD", "0.5"))
    max_pairs = int(os.getenv("MAX_PAIRS", "0"))

    if not model_path.exists():
        raise FileNotFoundError(f"Model not found: {model_path}")
    if not eval_path.exists():
        raise FileNotFoundError(f"Evaluation file not found: {eval_path}")

    rows = load_eval_rows(eval_path)
    if not rows:
        raise ValueError("No evaluation rows found.")

    if max_pairs > 0:
        rows = rows[:max_pairs]

    model = SentenceTransformer(str(model_path))
    sentence1 = [row["sentence1"] for row in rows]
    sentence2 = [row["sentence2"] for row in rows]
    y_true = [int(float(row["score"])) for row in rows]

    emb1 = model.encode(
        sentence1,
        normalize_embeddings=True,
        convert_to_tensor=True,
        show_progress_bar=True,
    )
    emb2 = model.encode(
        sentence2,
        normalize_embeddings=True,
        convert_to_tensor=True,
        show_progress_bar=True,
    )

    sim_scores = util.cos_sim(emb1, emb2).diagonal().cpu().numpy()
    sim_scores = np.nan_to_num(sim_scores, nan=0.0, posinf=0.0, neginf=0.0)
    y_pred = (sim_scores >= threshold).astype(int)

    cm = confusion_matrix(y_true, y_pred, labels=[0, 1])
    report = classification_report(y_true, y_pred, digits=4, output_dict=True, zero_division=0)

    metrics = {
      "timestamp_utc": datetime.now(timezone.utc).isoformat(),
      "model_path": str(model_path),
      "eval_path": str(eval_path),
      "threshold": threshold,
      "num_pairs": len(rows),
      "accuracy": float(accuracy_score(y_true, y_pred)),
      "precision": float(precision_score(y_true, y_pred, zero_division=0)),
      "recall": float(recall_score(y_true, y_pred, zero_division=0)),
      "f1": float(f1_score(y_true, y_pred, zero_division=0)),
      "tn": int(cm[0][0]),
      "fp": int(cm[0][1]),
      "fn": int(cm[1][0]),
      "tp": int(cm[1][1]),
      "report": report,
    }

    metrics_path.parent.mkdir(parents=True, exist_ok=True)
    with open(metrics_path, "a", encoding="utf-8") as f:
        f.write(json.dumps(metrics, ensure_ascii=True) + "\n")

    matrix_path.parent.mkdir(parents=True, exist_ok=True)
    plt.figure(figsize=(6, 5))
    plt.imshow(cm, interpolation="nearest", cmap="Blues")
    plt.title(f"Confusion Matrix (threshold={threshold})")
    plt.colorbar()
    tick_marks = np.arange(2)
    plt.xticks(tick_marks, ["Pred 0", "Pred 1"])
    plt.yticks(tick_marks, ["True 0", "True 1"])

    for i in range(cm.shape[0]):
        for j in range(cm.shape[1]):
            plt.text(j, i, format(cm[i, j], "d"), ha="center", va="center", color="black")

    plt.ylabel("Actual")
    plt.xlabel("Predicted")
    plt.tight_layout()
    plt.savefig(matrix_path, dpi=200)
    plt.close()

    print(json.dumps(metrics, indent=2))
    print(f"Saved confusion matrix image to {matrix_path}")
    print(f"Saved confusion metrics to {metrics_path}")


if __name__ == "__main__":
    main()
