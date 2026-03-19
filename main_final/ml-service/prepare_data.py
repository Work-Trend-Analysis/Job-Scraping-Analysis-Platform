import os
from pathlib import Path

import pandas as pd


DEFAULT_DATASET_PATH = "/Users/divyaansh/Downloads/linkedin_jobs_with_random_salary_inr.xlsx"
OUTPUT_DIR = Path(__file__).resolve().parent / "data"
OUTPUT_FILE = OUTPUT_DIR / "jobs_clean.csv"


def clean_value(value):
    if pd.isna(value):
        return ""
    text = str(value).strip()
    if text.lower() == "unknown":
        return ""
    return text


def build_job_text(row):
    parts = [
        f"Job title: {row['job_title']}",
        f"Company: {row['company_name']}",
        f"Location: {row['location']}",
        f"Seniority: {row['seniority_level']}",
        f"Function: {row['job_function']}",
        f"Employment type: {row['employment_type']}",
        f"Industry: {row['industry']}",
    ]
    return ". ".join([part for part in parts if not part.endswith(": ")])


def main():
    dataset_path = os.getenv("DATASET_PATH", DEFAULT_DATASET_PATH)
    df = pd.read_excel(dataset_path)

    expected_columns = [
        "job_title",
        "company_name",
        "location",
        "hiring_status",
        "date",
        "seniority_level",
        "job_function",
        "employment_type",
        "industry",
        "salary",
    ]
    for col in expected_columns:
        if col not in df.columns:
            raise ValueError(f"Missing column in dataset: {col}")

    clean_df = df[expected_columns].copy()
    for col in expected_columns:
        if col == "salary":
            clean_df[col] = pd.to_numeric(clean_df[col], errors="coerce").fillna(0).astype(int)
        else:
            clean_df[col] = clean_df[col].map(clean_value)

    clean_df = clean_df[(clean_df["job_title"] != "") & (clean_df["job_function"] != "")]
    clean_df = clean_df.reset_index(drop=True)
    clean_df["job_id"] = clean_df.index.astype(int)
    clean_df["job_text"] = clean_df.apply(build_job_text, axis=1)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    clean_df.to_csv(OUTPUT_FILE, index=False)
    print(f"Wrote cleaned jobs to: {OUTPUT_FILE}")
    print(f"Rows: {len(clean_df)}")


if __name__ == "__main__":
    main()
