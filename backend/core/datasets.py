import pandas as pd
from pathlib import Path

BASE_DATA_PATH = Path("data/processed")

DATASETS = {
    "sample": Path("backend/data/sample.csv"),
    "ocean": BASE_DATA_PATH / "realistic_ocean_climate_dataset.csv",
    "earthquakes": "data/processed/earthquakes.csv"

}

def load_dataset_by_name(name: str):
   from pathlib import Path
import pandas as pd

def load_dataset_by_name(name: str):
    if name not in DATASETS:
        raise Exception(f"Dataset '{name}' not found")

    path = Path(DATASETS[name])

    if not path.exists():
        raise Exception(f"Dataset file not found: {path}")

    df = pd.read_csv(path)
    return df

COLUMN_ALIASES = {
    "ocean": {

        "temperature": "SST (°C)",
        "ph": "pH Level"
    },
    "earthquakes": {
        "date": "date",
        "time": "time",
        "magnitude": "magnitude",
        "depth": "depth",
        "lat": "latitude",
        "lon": "longitude",
        "place": "place",
        "country": "country"
    }

}

DEFAULT_COLUMNS = {
    "ocean": "temperature",
    "earthquakes": "magnitude"
}

