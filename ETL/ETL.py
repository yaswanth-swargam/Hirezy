# # -------------------------------
# # IMPORTS
# # -------------------------------
# import pandas as pd
# from sqlalchemy import create_engine
# from jobspy import scrape_jobs
# import time

# # -------------------------------
# # EXTRACT
# # -------------------------------
# def extract_data():
#     print("🚀 Extracting job data...")

#     # search_terms = [
#     #     "python developer",
#     #     "software developer",
#     #     "backend developer",
#     #     "frontend developer",
#     #     "full stack developer",
#     #     "full stack intern",
#     #     "frontend intern",
#     #     "backend intern",
#     #     "software developer intern",
#     #     "python developer intern",
#     #     "data analyst",
#     #     "data analyst intern"
#     #     "data scientist",
#     #     "machine learning engineer",
#     #     "RPA developer",
#     #     "automation engineer",
#     #     "devops engineer",
#     #     "cloud engineer",
#     #     "intern software developer",
#     #     "fresher jobs"
#     # ]

#     search_terms = [
#         "python developer",
#         "software developer",
#         "backend developer",
#         "frontend developer"
        
#     ]

#     sites = ["linkedin", "indeed"]  # scalable list

#     all_jobs = []

#     for site in sites:
#         for term in search_terms:
#             print(f"🔍 {site} → {term}")

#             try:
#                 jobs = scrape_jobs(
#                     site_name=[site],
#                     search_term=term,
#                     location="India",
#                     results_wanted=25,
#                     country_indeed="India"
#                 )

#                 # Convert DataFrame → list of dict
#                 if isinstance(jobs, pd.DataFrame):
#                     jobs = jobs.to_dict(orient="records")

#                 all_jobs.extend(jobs)

#                 time.sleep(2)  # 🔥 avoid blocking

#             except Exception as e:
#                 print(f"❌ Error for {site}-{term}: {e}")

#     print(f"✅ Total jobs extracted: {len(all_jobs)}")
#     return all_jobs


# # -------------------------------
# # TRANSFORM
# # -------------------------------
# def transform_data(jobs):
#     print("🔄 Transforming data...")

#     df = pd.DataFrame(jobs)

#     if df.empty:
#         print("❌ No data to transform")
#         return df

#     print("Columns:", df.columns)

#     required_columns = [
#         "title",
#         "company",
#         "location",
#         "date_posted",
#         "job_url"
#     ]

#     available_cols = [col for col in required_columns if col in df.columns]
#     df = df[available_cols]

#     # 🔥 Handle date column properly
#     if "date_posted" in df.columns:
#         df["date_posted"] = pd.to_datetime(df["date_posted"], errors="coerce")

#     # 🔥 Fill missing values (EXCEPT date)
#     for col in df.columns:
#         if col != "date_posted":
#             df[col] = df[col].fillna("Not Available")

#     # Remove duplicates
#     if "job_url" in df.columns:
#         df.drop_duplicates(subset=["job_url"], inplace=True)

#     print("✅ Transformation complete")
#     return df
# # -------------------------------
# # LOAD
# # -------------------------------
# def load_data(df):
#     print("💾 Loading into MySQL...")

#     if df.empty:
#         print("❌ Empty DataFrame, skipping load")
#         return

#     username = "root"
#     password = "996644"
#     host = "localhost"
#     database = "job_portal"

#     engine = create_engine(
#         f"mysql+pymysql://{username}:{password}@{host}/{database}"
#     )

#     # Append data
#     df.to_sql("jobs", con=engine, if_exists="append", index=False)

#     print("✅ Data successfully appended to 'jobs' table")


# # -------------------------------
# # MAIN
# # -------------------------------
# def run_etl():
#     jobs = extract_data()

#     if jobs:
#         df = transform_data(jobs)
#         load_data(df)
#     else:
#         print("❌ No jobs extracted")


# # -------------------------------
# # RUN
# # -------------------------------
# if __name__ == "__main__":
#     run_etl()







# -------------------------------
# IMPORTS
# -------------------------------
import pandas as pd
from sqlalchemy import create_engine
from jobspy import scrape_jobs
import time
import os
from dotenv import load_dotenv

load_dotenv()

# -------------------------------
# EXTRACT
# -------------------------------
def extract_data():
    print("🚀 Extracting job data...")

    search_terms = [
        "python developer",
        "software developer",
        "backend developer",
        "frontend developer",
        "full stack developer",
        "full stack intern",
        "frontend intern",
        "backend intern",
        "software developer intern",
        "python developer intern",
        "data analyst",
        "data analyst intern",
        "data scientist",
        "machine learning engineer",
        "RPA developer",
        "automation engineer",
        "devops engineer",
        "cloud engineer",
        "intern software developer",
        "fresher jobs"
    ]

    sites = ["linkedin", "indeed"]

    all_jobs = []

    for site in sites:
        for term in search_terms:
            print(f"🔍 {site} → {term}")

            try:
                jobs = scrape_jobs(
                    site_name=[site],
                    search_term=term,
                    location="India",
                    results_wanted=25,
                    country_indeed="India"
                )

                if isinstance(jobs, pd.DataFrame):
                    jobs = jobs.to_dict(orient="records")

                all_jobs.extend(jobs)

                time.sleep(2)

            except Exception as e:
                print(f"❌ Error for {site}-{term}: {e}")

    print(f"✅ Total jobs extracted: {len(all_jobs)}")
    return all_jobs


# -------------------------------
# TRANSFORM
# -------------------------------
def transform_data(jobs):
    print("🔄 Transforming data...")

    df = pd.DataFrame(jobs)

    if df.empty:
        print("❌ No data to transform")
        return df

    print("Columns:", df.columns.tolist())

    required_columns = [
        "title",
        "company",
        "location",
        "date_posted",
        "job_url",
        "job_type"
    ]

    available_cols = [col for col in required_columns if col in df.columns]
    df = df[available_cols]

    # Handle date column
    if "date_posted" in df.columns:
        df["date_posted"] = pd.to_datetime(df["date_posted"], errors="coerce")

    # Fill missing values except date
    for col in df.columns:
        if col != "date_posted":
            df[col] = df[col].fillna("Not Available")

    # Remove duplicates within scraped data
    if "job_url" in df.columns:
        df.drop_duplicates(subset=["job_url"], inplace=True)

    print(f"✅ Transformation complete — {len(df)} records")
    return df


# -------------------------------
# LOAD
# -------------------------------
def load_data(df):
    print("💾 Loading into MySQL...")

    if df.empty:
        print("❌ Empty DataFrame, skipping load")
        return

    engine = create_engine(
        f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
    )

    # Deduplicate against existing DB records
    try:
        existing = pd.read_sql("SELECT job_url FROM jobs", con=engine)
        before = len(df)
        df = df[~df["job_url"].isin(existing["job_url"])]
        print(f"⚡ Removed {before - len(df)} duplicates found in DB")
    except Exception as e:
        print(f"⚠️ Could not check existing records: {e}")

    if df.empty:
        print("⚠️ No new jobs to insert")
        return

    df.to_sql("jobs", con=engine, if_exists="append", index=False)
    print(f"✅ {len(df)} new jobs loaded into MySQL")


# -------------------------------
# MAIN
# -------------------------------
def run_etl():
    jobs = extract_data()

    if jobs:
        df = transform_data(jobs)
        load_data(df)
    else:
        print("❌ No jobs extracted")


# -------------------------------
# RUN
# -------------------------------
if __name__ == "__main__":
    run_etl()