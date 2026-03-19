import json
import random
from collections import defaultdict
from pathlib import Path

import pandas as pd


SEED = 42
random.seed(SEED)

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
INPUT_FILE = DATA_DIR / "jobs_clean.csv"
TRAIN_FILE = DATA_DIR / "train_mnr.jsonl"
EVAL_FILE = DATA_DIR / "eval_cosine.jsonl"


def build_group_key(row):
    return f"{row['job_function']}||{row['industry']}"


def main():
    if not INPUT_FILE.exists():
        raise FileNotFoundError(
            f"{INPUT_FILE} not found. Run prepare_data.py first."
        )

    df = pd.read_csv(INPUT_FILE)
    grouped = defaultdict(list)

    for _, row in df.iterrows():
        key = build_group_key(row)
        grouped[key].append(row.to_dict())

    group_keys = list(grouped.keys())
    train_rows = []
    eval_rows = []

    for key in group_keys:
        group_jobs = grouped[key]
        if len(group_jobs) < 2:
            continue

        for anchor in group_jobs:
            positives = [item for item in group_jobs if item["job_id"] != anchor["job_id"]]
            if not positives:
                continue
            positive = random.choice(positives)
            train_rows.append(
                {
                    "anchor": anchor["job_text"],
                    "positive": positive["job_text"],
                }
            )
            eval_rows.append(
                {
                    "sentence1": anchor["job_text"],
                    "sentence2": positive["job_text"],
                    "score": 1.0,
                }
            )

            negative_group_candidates = [g for g in group_keys if g != key]
            if negative_group_candidates:
                neg_group = random.choice(negative_group_candidates)
                negative = random.choice(grouped[neg_group])
                eval_rows.append(
                    {
                        "sentence1": anchor["job_text"],
                        "sentence2": negative["job_text"],
                        "score": 0.0,
                    }
                )

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(TRAIN_FILE, "w", encoding="utf-8") as f:
        for row in train_rows:
            f.write(json.dumps(row, ensure_ascii=True) + "\n")

    with open(EVAL_FILE, "w", encoding="utf-8") as f:
        for row in eval_rows:
            f.write(json.dumps(row, ensure_ascii=True) + "\n")

    print(f"Wrote train pairs: {len(train_rows)} -> {TRAIN_FILE}")
    print(f"Wrote eval pairs: {len(eval_rows)} -> {EVAL_FILE}")


if __name__ == "__main__":
    main()
