from fastapi import FastAPI
from backend.routes.datasets_router import router as datasets_router
from backend.routes.analysis_router import router as analysis_router
from backend.routes.dashboard_router import router as dashboard_router
from backend.routes.ai_router import router as ai_router

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def alive():
    return {"status": "Backend running"}

app.include_router(datasets_router)
app.include_router(analysis_router)
app.include_router(ai_router)
app.include_router(datasets_router)
app.include_router(analysis_router)
app.include_router(dashboard_router)