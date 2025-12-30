from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.datasets import load_dataset_by_name

router = APIRouter(prefix="/ai", tags=["AI Assistant"])


# ---------- BASIC QA (YOUR ORIGINAL FEATURE) ----------
class Question(BaseModel):
    question: str


@router.post("/ask")
def ask_ai(data: Question):
    q = data.question.lower()

    if "earthquake" in q:
        df = load_dataset_by_name("earthquakes")
        
        strongest = float(df["magnitude"].max())
        count = int(len(df))

        return {
            "answer": (
                f"There are {count} recorded earthquakes. "
                f"The strongest earthquake has magnitude {strongest}."
            )
        }

    if "ocean" in q or "temperature" in q:
        df = load_dataset_by_name("ocean")
        avg = float(df["SST (°C)"].mean())

        return {
            "answer": (
                f"The average sea surface temperature in this dataset is "
                f"about {avg:.2f} °C."
            )
        }

    return {
        "answer": "I’m still learning — try asking about earthquakes or ocean temperature."
    }


# ---------- DASHBOARD-AWARE EXPLAINER (NEW FEATURE) ----------
class ExplainPayload(BaseModel):
    type: str | None = None
    summary: dict | None = None


@router.post("/explain")
def explain_ai(data: ExplainPayload):
    dtype = data.type
    summary = data.summary or {}

    # ---- EARTHQUAKE INSIGHTS ----
    if dtype == "earthquake":
        count = summary.get("count", 0)
        max_mag = summary.get("max_mag")
        insight = summary.get("insight", "")

        text = f"""
Here’s what I observe from the earthquake data:

• Total earthquakes found: {count}
• Strongest magnitude: {max_mag}

Insight:
{insight}

Patterns like spikes or clusters usually suggest tectonic stress buildup and
aftershock chains. Monitoring these zones helps with disaster readiness.
        """

        return {"answer": text.strip()}

    # ---- OCEAN INSIGHTS ----
    if dtype == "ocean":
        insight = summary.get("insight", "")

        text = f"""
Here’s my interpretation of the ocean dataset:

{insight}

Rising ocean temperature and chemistry variations can influence coral reefs,
fish populations, and climate feedback systems.
        """

        return {"answer": text.strip()}

    return {"answer": "I need more context about the dataset."}