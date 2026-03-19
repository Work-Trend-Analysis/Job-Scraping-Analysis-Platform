import json
import math
import os
from pathlib import Path

from torch.utils.data import DataLoader

from sentence_transformers import InputExample, SentenceTransformer, evaluation, losses, models


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
TRAIN_FILE = DATA_DIR / "train_mnr.jsonl"
EVAL_FILE = DATA_DIR / "eval_cosine.jsonl"
MODEL_OUTPUT_DIR = BASE_DIR / "models" / "job-sbert"


def load_jsonl(path):
    rows = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                rows.append(json.loads(line))
    return rows


def build_model(base_model_name, max_seq_length=256):
    word_embedding_model = models.Transformer(base_model_name, max_seq_length=max_seq_length)
    pooling_model = models.Pooling(
        word_embedding_model.get_word_embedding_dimension(),
        pooling_mode_mean_tokens=True,
        pooling_mode_cls_token=False,
        pooling_mode_max_tokens=False,
    )
    return SentenceTransformer(modules=[word_embedding_model, pooling_model])


def main():
    base_model_name = os.getenv("BASE_ENCODER", "bert-base-uncased")
    batch_size = int(os.getenv("BATCH_SIZE", "32"))
    epochs = int(os.getenv("EPOCHS", "1"))

    if not TRAIN_FILE.exists():
        raise FileNotFoundError(f"{TRAIN_FILE} not found. Run make_pairs.py first.")

    train_rows = load_jsonl(TRAIN_FILE)
    eval_rows = load_jsonl(EVAL_FILE) if EVAL_FILE.exists() else []

    if len(train_rows) < batch_size:
        raise ValueError("Not enough train pairs for one batch. Generate more pairs.")

    train_examples = [
        InputExample(texts=[row["anchor"], row["positive"]]) for row in train_rows
    ]
    train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=batch_size)

    model = build_model(base_model_name=base_model_name)
    train_loss = losses.MultipleNegativesRankingLoss(model)

    evaluator = None
    if eval_rows:
        s1 = [row["sentence1"] for row in eval_rows]
        s2 = [row["sentence2"] for row in eval_rows]
        scores = [float(row["score"]) for row in eval_rows]
        evaluator = evaluation.EmbeddingSimilarityEvaluator(
            sentences1=s1,
            sentences2=s2,
            scores=scores,
            name="weak-supervision-eval",
        )

    warmup_steps = math.ceil(len(train_dataloader) * epochs * 0.1)
    MODEL_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    model.fit(
        train_objectives=[(train_dataloader, train_loss)],
        epochs=epochs,
        warmup_steps=warmup_steps,
        evaluator=evaluator,
        output_path=str(MODEL_OUTPUT_DIR),
        show_progress_bar=True,
    )

    print(f"Trained model saved to: {MODEL_OUTPUT_DIR}")


if __name__ == "__main__":
    main()
