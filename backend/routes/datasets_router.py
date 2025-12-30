import numpy as np
from fastapi import APIRouter
from backend.core.datasets import load_dataset_by_name

router = APIRouter(prefix="/datasets")

@router.get("/{name}")
def get_dataset(name: str):
    df = load_dataset_by_name(name)

    # replace NaN with None so JSON can handle it
    df = df.replace({np.nan: None})

    return df.head(50).to_dict(orient="records")