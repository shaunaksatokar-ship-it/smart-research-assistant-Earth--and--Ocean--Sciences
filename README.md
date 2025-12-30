
#  Smart Research Assistant — Earth & Ocean Analytics Dashboard

An interactive research platform that helps students, researchers, and scientists explore Earthquake & Ocean datasets — with visual dashboards and an AI assistant for insights.

Built to make research:
✔ Faster  
✔ Visual  
✔ Interactive  
✔ Beginner-friendly  

---

## ✨ Features

### 🌊 Ocean Dashboard
- Sea Surface Temperature (SST)
- Year-wise filtering
- Region filtering
- Selectable metrics
- Trend visualization

### 🌍 Earthquake Dashboard
- Magnitude distribution (histogram)
- Earthquakes per year (trend)
- Min magnitude filter
- Region-wise results
- Smart fallback when data missing

### 🤖 AI Research Assistant
Ask questions like:
• “How many earthquakes are recorded?”
• “What is the strongest earthquake?”
• “Average ocean temperature?”

Backend reads + responds using dataset intelligence.

---

## 🏗️ Tech Stack

### Frontend
React (Vite)  
Chart.js  
Custom CSS UI  

### Backend
FastAPI  
Python  
Pandas  

### Data
Earthquake dataset  
Ocean climate dataset  

---

## 📂 Project Structure

smart-research-assistant/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   │   ├── dashboard_router.py
│   │   └── ai_router.py
│   ├── core/
│   │   ├── datasets.py
│   │   ├── analysis.py
│   │   └── insights.py
│   └── data/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── charts/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md

---

## ⚙️ Installation

### 1️⃣ Clone

git clone <your-repository-link>
cd smart-research-assistant

---

## 🚀 Backend Setup (FastAPI)

cd backend  
python -m venv venv  

### Activate
Windows:
venv\Scripts\activate

Mac/Linux:
source venv/bin/activate

### Install
pip install -r requirements.txt

### Run
uvicorn backend.app:app --reload

Backend runs at:
http://127.0.0.1:8000

---

## 💻 Frontend Setup (React)

cd frontend  
npm install  
npm run dev

Frontend runs at:
http://localhost:5173

---

## 🔌 APIs

GET /dashboard/ocean  
GET /dashboard/earthquakes  
GET /dashboard/earthquakes/summary  
POST /ai/ask  

Supports filters:

?year=2015-2020  
?min_mag=5  
?region=pacific  

---

## 🧠 How It Works

1. Frontend sends filters  
2. Backend loads dataset  
3. Cleans + analyzes  
4. Sends results to charts  
5. AI explains insights  

---

## 🚀 Future Enhancements

- Live real-time feeds
- ML predictions
- Map visualizations
- Reports export
- User authentication
- Advanced AI assistant

---

## 🙌 Credits

Built with ❤️ by  
**Shaunak & Team**

---

## ⭐ Support

If you like this project:

⭐ Star the repo  
📢 Share it  
🚀 Use it in research
