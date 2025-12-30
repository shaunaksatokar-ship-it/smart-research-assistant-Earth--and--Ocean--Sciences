# 📁 Data — Smart Research Assistant

This folder stores all datasets used by the Smart Research Assistant project.

The goal of these datasets is to support research, visual analytics, dashboards, and AI-assisted insights for Earth & Ocean science.

------------------------------------------------------------

## 📂 Files Included

### 🌊 1. Ocean Dataset
Contains environmental observations such as:

• Date  
• Sea Surface Temperature (SST °C)  
• pH Levels  
• Region / Location  
• Species Observed (if available)

Used in:
→ Ocean Dashboard (charts, filters, insights)  
→ AI Assistant answers about ocean trends

------------------------------------------------------------

### 🌎 2. Earthquake Dataset
Historical earthquake records including:

• Year  
• Magnitude  
• Location / Place  
• Depth (if available)  
• Region

Used in:
→ Earthquake Dashboard (histogram + trend charts)  
→ AI Assistant risk & trend explanations  

------------------------------------------------------------

## 🧭 Data Structure Convention

Each dataset should follow:

• CSV or Excel format  
• First row = column names  
• Dates should be consistent (YYYY-MM-DD preferred)  
• Numeric values should NOT contain text

If a column name is different, backend aliases convert it automatically.

Example:

`SST`, `sst`, `Sea Surface Temperature` → all mapped to:  
`SST (°C)`

------------------------------------------------------------

## 🔎 How The Backend Uses This Data

The backend loads datasets dynamically:

• `/backend/core/datasets.py`

It supports:

✔ Loading multiple datasets  
✔ Cleaning missing values  
✔ Trend calculations  
✔ Anomaly detection  
✔ AI summary responses  

------------------------------------------------------------

## ⚠️ Important Notes

 
❗ Keep filenames simple (lowercase, no spaces).  
❗ Always BACKUP before replacing any dataset.

Recommended file names:

ocean.csv  
earthquakes.csv  

------------------------------------------------------------

## ➕ Adding New Datasets (Optional)

1️⃣ Add file to this `/data` folder  
2️⃣ Register dataset in `datasets.py`  
3️⃣ Update dashboards if needed  

Supports formats:
• .csv
• .xlsx

------------------------------------------------------------

## 🎯 Purpose

These datasets are for:

• research  
• visualization  
• science learning  
• hackathon project demonstration  

Not meant for official scientific decisions.

------------------------------------------------------------

## 📜 License

Data included here is for **educational and research purposes only**.

------------------------------------------------------------

If you add or modify data, describe it here so teammates understand it!
