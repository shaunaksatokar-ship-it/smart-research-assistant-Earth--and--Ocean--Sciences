# 🌎 Smart Research Assistant — Frontend

An interactive research dashboard to analyze Earthquake and Ocean datasets — with clean UI, filters, charts, and an AI assistant.

Built using:
React + Vite
Chart.js (react-chartjs-2)
FastAPI backend

------------------------------------------------------------

## 🚀 Features

🌊 Ocean Dashboard
• Temperature analytics
• Year range filter
• Region filtering
• Multiple metrics (Temp / pH / Species)
• Smooth charts

🌎 Earthquake Dashboard
• Magnitude histogram
• Trends over time
• Filter by year, magnitude, region
• Hover insights
• AI interpretation panel

🤖 AI Assistant
Ask questions about datasets and get instant insights.

------------------------------------------------------------

## 📁 Project Structure

frontend/
  src/
    pages/
    components/
      charts/
      ui/
    App.jsx
    main.jsx
  public/
  package.json

------------------------------------------------------------

## ⚙️ Installation & Setup

1) Open terminal and go to frontend folder:
    cd frontend

2) Install dependencies:
    npm install

3) Run development server:
    npm run dev

App runs at:
    http://localhost:5173

Make sure backend is running at:
    http://127.0.0.1:8000

------------------------------------------------------------

## 🔌 API Endpoints Used

Dashboard Data:
    /dashboard/ocean
    /dashboard/earthquakes/summary

AI Assistant:
    /ai/ask

------------------------------------------------------------

## 🏗 Build for Production

Build command:
    npm run build

Output generated in:
    dist/

You can deploy to Netlify, Vercel, GitHub Pages, etc.

------------------------------------------------------------

## 🤝 Contributors

Team roles included:
• UI / UX Design
• Frontend Development
• Backend & APIs
• Data Analytics
• AI Assistant
• Debugging & Integration

------------------------------------------------------------

## ⭐ Future Enhancements

• Real-time live maps
• More datasets
• Downloadable reports
• Custom dashboards
• Smarter AI responses
• Authentication

------------------------------------------------------------

## 🎯 Purpose

This project helps students and researchers analyze environmental data visually and interactively.

------------------------------------------------------------

## 📜 License

Free for educational and research use.
