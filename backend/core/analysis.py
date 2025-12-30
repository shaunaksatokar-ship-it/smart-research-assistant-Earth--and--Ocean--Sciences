import numpy as np
import pandas as pd

def calculate_trend(df: pd.DataFrame, column: str):
    x = np.arange(len(df))
    y = df[column].values

    slope, intercept = np.polyfit(x, y, 1)

    result = {
        "trend": "increasing" if slope > 0 else "decreasing",
        "slope_value": round(float(slope), 3)
    }

    return result

def detect_anomalies(df, column):
    mean = df[column].mean()
    std = df[column].std()

    threshold = mean + 2 * std

    anomalies = df[df[column] > threshold]

    return {
        "mean": float(mean),
        "threshold": float(threshold),
        "count": len(anomalies),
        "points": anomalies.head(10).to_dict(orient="records")
    }