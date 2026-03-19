# SBERT ML Service

This service trains a Sentence-BERT style model from your Excel job dataset, builds a FAISS index, and serves job matching APIs.

## 1) Setup

```bash
cd /Users/divyaansh/Downloads/Job-Scraping-Analysis-Platform/main_final/ml-service
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 2) Prepare dataset

```bash
DATASET_PATH="/Users/divyaansh/Downloads/linkedin_jobs_with_random_salary_inr.xlsx" python prepare_data.py
python make_pairs.py
```

## 3) Train model

```bash
EPOCHS=1 BATCH_SIZE=32 BASE_ENCODER=bert-base-uncased python train_sbert.py
```

## 4) Build vector index

```bash
python build_index.py
```

## 5) Run API

```bash
uvicorn app:app --host 0.0.0.0 --port 9000
```

Optional reranker config:

```bash
ENABLE_RERANKER=1
RERANK_MODEL_NAME=cross-encoder/ms-marco-MiniLM-L-6-v2
```

`/match-jobs` request body now also accepts:
- `rerank`: `true` or `false`
- `rerank_top_n`: how many FAISS candidates to rerank before returning top `k`

Example:

```bash
curl -X POST "http://localhost:9000/match-jobs" \
  -H "Content-Type: application/json" \
  -d '{"user_text":"python backend developer with sql and aws","top_k":10,"rerank":true,"rerank_top_n":50}'
```

## 6) Evaluate retrieval quality

```bash
python evaluate_retrieval.py
```

Optional:

```bash
K_VALUES=5,10,20 MAX_QUERIES=2000 EVAL_SEED=42 python evaluate_retrieval.py
```

This prints and appends metrics to:

```bash
artifacts/retrieval_metrics.jsonl
```

Generated plots:
- `artifacts/metrics_trend.png`
- `artifacts/metrics_latest_bar.png`
- `artifacts/metrics_regression.png`

Choose regression metric (default `recall@10`):

```bash
REGRESSION_METRIC=ndcg@10 python evaluate_retrieval.py
```

Tracked metrics:
- `precision@K`
- `recall@K`
- `mrr@K`
- `ndcg@K`

## 7) Evaluate pair classification with a confusion matrix

```bash
python confusion_matrix_eval.py
```

Optional threshold override:

```bash
PAIR_THRESHOLD=0.6 python confusion_matrix_eval.py
```

Generated outputs:
- `artifacts/confusion_matrix.png`
- `artifacts/confusion_metrics.jsonl`

## 8) Backend integration

Set this in backend `.env`:

```bash
ML_SERVICE_URL=http://localhost:9000
```

The backend route `/api/jobs/match?email=<user_email>` calls `POST /match-jobs` from this service.
