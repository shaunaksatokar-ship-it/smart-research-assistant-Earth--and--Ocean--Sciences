from fastapi import APIRouter

from backend.core.datasets import (
    load_dataset_by_name,
    COLUMN_ALIASES,
    DEFAULT_COLUMNS,
)

from backend.core.analysis import calculate_trend, detect_anomalies
from backend.core.insights import build_insight


router = APIRouter(prefix="/dashboard")


# ------------------------------------------------
# CLEAN JSON (fix NaN / Infinity values)
# ------------------------------------------------
def clean_json(obj):
    import math

    if isinstance(obj, list):
        return [clean_json(x) for x in obj]

    if isinstance(obj, dict):
        return {k: clean_json(v) for k, v in obj.items()}

    if isinstance(obj, float):
        if math.isnan(obj) or math.isinf(obj):
            return None

    return obj


# ------------------------------------------------
# MAIN DASHBOARD (ALL DATASETS)
# ------------------------------------------------
@router.get("/{dataset_name}")
def dashboard(
    dataset_name: str,
    column: str | None = None,
    year: str | None = None,     # 2015-2020
    region: str | None = None,   # Pacific / Indian / etc
    metric: str | None = None,   # SST (°C)
):

    df = load_dataset_by_name(dataset_name)

    # default column
    if column is None:
        column = DEFAULT_COLUMNS.get(dataset_name, None)

    # alias conversion
    if dataset_name in COLUMN_ALIASES and column in COLUMN_ALIASES[dataset_name]:
        column = COLUMN_ALIASES[dataset_name][column]

    # --------------------------------------------
    # YEAR EXTRACTION (if Date exists)
    # --------------------------------------------
    if "Date" in df.columns:
        df["year"] = (
            df["Date"]
            .astype(str)
            .str.extract(r"(\d{4})")[0]
            .astype(float)
        )

    fallback_message = None

    # --------------------------------------------
    # YEAR FILTER
    # --------------------------------------------
    if year and "year" in df.columns and "-" in year:
        start, end = year.split("-")
        start, end = float(start), float(end)

        filtered = df[(df["year"] >= start) & (df["year"] <= end)]

        if filtered.empty:
            fallback_message = (
                f"No data for {year}. Showing closest available years."
            )
        else:
            df = filtered

    # --------------------------------------------
    # REGION FILTER
    # --------------------------------------------
    if region:
        for col in ["Location", "Region", "Area", "place"]:
            if col in df.columns:
                df = df[df[col].astype(str).str.contains(region, case=False, na=False)]

    # --------------------------------------------
    # METRIC SELECTION
    # --------------------------------------------
    if metric and metric in df.columns:
        column = metric

    # --------------------------------------------
    # ANALYTICS
    # --------------------------------------------
    if column not in df.columns:
        return {
            "dataset": dataset_name,
            "error": f"Column '{column}' not found in dataset.",
        }

    preview = df.head(200).to_dict(orient="records")

    trend = calculate_trend(df, column)
    anomalies = detect_anomalies(df, column)
    insight = build_insight(trend, anomalies)

    result = {
        "dataset": dataset_name,
        "column_used": column,
        "rows": len(df),
        "preview": preview,
        "trend": trend,
        "anomalies": anomalies,
        "insight": insight,
        "message": fallback_message,
    }

    return clean_json(result)


# ------------------------------------------------
# EARTHQUAKE SUMMARY API
# ------------------------------------------------
@router.get("/earthquakes/summary")
def earthquake_summary(year: str | None = None, min_mag: float = 0, region: str | None = None):

    df = load_dataset_by_name("earthquakes")

    # --- EXTRACT YEAR ---
    if "time" in df.columns:
        df["year"] = df["time"].astype(str).str.extract(r"(\d{4})")
    elif "Date" in df.columns:
        df["year"] = df["Date"].astype(str).str.extract(r"(\d{4})")

    # YEAR FILTER
    if year and "-" in year:
        start, end = year.split("-")
        df = df[
            (df["year"].astype(float) >= float(start)) &
            (df["year"].astype(float) <= float(end))
        ]

    # MAGNITUDE FILTER
    df = df[df["magnitude"] >= float(min_mag)]

    # REGION FILTER
    if region:
        if "place" in df.columns:
            df = df[df["place"].str.contains(region, case=False, na=False)]

    # HISTOGRAM
    hist = (
        df["magnitude"]
        .round()
        .value_counts()
        .sort_index()
        .to_dict()
    )

    trend = (
        df.groupby("year")["magnitude"]
        .count()
        .reset_index()
        .rename(columns={"magnitude": "count"})
        .to_dict(orient="records")
    )

    insight = ""

    if len(df) == 0:
        insight = "No earthquake data available for this range."

    elif df["magnitude"].max() >= 7:
        insight += "⚠ Strong earthquakes detected — possible stress zones. "

    if df["magnitude"].mean() > 5:
        insight += "Average magnitude is high — active seismic region. "

    if insight == "":
        insight = "Earthquake pattern appears normal."

    return clean_json({
        "count": len(df),
        "histogram": hist,
        "trend": trend,
        "insight": insight
    })