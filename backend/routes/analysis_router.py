from fastapi import APIRouter
from backend.core.datasets import load_dataset_by_name, COLUMN_ALIASES
from backend.core.analysis import calculate_trend

router = APIRouter(prefix="/analyze")

@router.get("/trend/{dataset_name}")
def trend(dataset_name: str, column: str = "temperature"):
    df = load_dataset_by_name(dataset_name)

    # use alias mapping if exists
    if dataset_name in COLUMN_ALIASES and column in COLUMN_ALIASES[dataset_name]:
        column = COLUMN_ALIASES[dataset_name][column]

    result = calculate_trend(df, column)
    return result

import numpy as np
from backend.core.analysis import detect_anomalies

@router.get("/anomaly/{dataset_name}")
def anomaly(dataset_name: str, column: str = "temperature"):
    df = load_dataset_by_name(dataset_name)

    if dataset_name in COLUMN_ALIASES and column in COLUMN_ALIASES[dataset_name]:
        column = COLUMN_ALIASES[dataset_name][column]

    result = detect_anomalies(df, column)

    # Replace NaN in anomaly points
    if "points" in result:
        for row in result["points"]:
            for key, value in row.items():
                if value != value:   # NaN check
                    row[key] = None

    return result