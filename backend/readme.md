# 🔧 Backend — Smart Research Assistant

The backend powers all data processing, APIs, analytics, and AI responses for the Smart Research Assistant project.

Built using:
- FastAPI
- Pandas
- Simple AI rule-engine
- CSV / Excel datasets

It exposes REST APIs used by the dashboards and AI assistant.

---

## 🚀 Features

✔ Load & manage datasets  
✔ Trend + anomaly analytics  
✔ Year / region / metric filters  
✔ Safe JSON cleaning  
✔ AI assistant API

---

## 📂 Structure

backend/
 ├── app.py
 ├── routes/
 │   ├── dashboard_router.py
 │   └── ai_router.py
 ├── core/
 │   ├── datasets.py
 │   ├── analysis.py
 │   └── insights.py
 └── __init__.py

---

## 🏁 Run the Backend

1️⃣ Create virtual environment
python -m venv venv

Windows:
venv\Scripts\activate

Mac / Linux:
source venv/bin/activate

2️⃣ Install dependencies
pip install -r requirements.txt

3️⃣ Start server
uvicorn backend.app:app --reload

Server:
http://127.0.0.1:8000  
Docs:
http://127.0.0.1:8000/docs

---

## 🌍 APIs

### Dashboard
GET /dashboard/{dataset}?year=2015-2020&region=pacific&metric=SST (°C)

### Earthquake Summary
GET /dashboard/earthquakes/summary?year=1700-1800&min_mag=3&region=Asia

### AI Assistant
POST /ai/ask
Body:
{ "question": "Tell me about earthquakes" }

---

## ➕ Add New Dataset

1. Put CSV/XLSX in /data
2. Register in datasets.py
3. Use in routes

---

## 🏆 Vision

Designed to be modular, scalable and hackathon-ready.

Future:
• Smarter AI
• Predictions
• Auth
• Deployment

---

## 📜 License

For research and learning use.
