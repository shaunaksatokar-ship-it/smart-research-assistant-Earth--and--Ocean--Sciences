import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Skeleton from "../ui/Skeleton";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function EarthquakeCharts({ filters }) {
  const [summary, setSummary] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const query = new URLSearchParams({
        year: filters.yearRange || "",
        min_mag: filters.minMag || 0,
        region: filters.region || ""
      });

      const res = await fetch(
        `http://127.0.0.1:8000/dashboard/earthquakes/summary?${query}`
      );

      if (!res.ok) throw new Error("Failed to load earthquake data");

      const json = await res.json();
      setSummary(json) ;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [filters]);

  // ---------- LOADING ----------
  if (loading)
    return (
      <div className="space-y-6">
        <Skeleton height={80} />
        <Skeleton height={280} />
        <Skeleton height={280} />
      </div>
    );

  // ---------- ERROR ----------
  if (error)
    return <p style={{ color: "red" }}>⚠ {error}</p>;

  if (!summary)
    return <p style={{ color: "white" }}>No data available</p>;

  // HISTOGRAM
  const histLabels = Object.keys(summary.histogram || {});
  const histValues = Object.values(summary.histogram || {});

  // TREND
  const trendLabels = (summary.trend || []).map(r => r.year);
  const trendValues = (summary.trend || []).map(r => r.count);

  return (
    <div className="space-y-6 animate-fade-in" style={{ color: "white" }}>

      {/* HOVER INSIGHT */}
      {hoverInfo && (
        <div
          style={{
            background: "rgba(0,0,0,.55)",
            padding: 12,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.15)"
          }}
        >
          <strong>📌 Insight:</strong> {hoverInfo}
        </div>
      )}

      {/* AI INSIGHT BOX */}
      <div
        style={{
          background: "rgba(255,255,255,.08)",
          padding: 16,
          borderRadius: 14
        }}
      >
        <h4>🤖 AI Observation</h4>
        <p style={{ opacity: .9 }}>{summary.insight}</p>
      </div>

      {/* HISTOGRAM */}
      <h3>📊 Magnitude Distribution</h3>

      <Bar
        data={{
          labels: histLabels,
          datasets: [
            {
              label: "Earthquakes",
              data: histValues,
              backgroundColor: "rgba(255,99,132,.6)"
            }
          ]
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { labels: { color: "white" } },
            tooltip: { mode: "index" }
          },
          onHover: (e, items) => {
            if (items?.length) {
              const i = items[0].index;
              setHoverInfo(
                `Magnitude ${histLabels[i]} → ${histValues[i]} earthquakes`
              );
            }
          },
          scales: {
            x: { ticks: { color: "#d0e0ff" } },
            y: { ticks: { color: "#d0e0ff" } }
          }
        }}
      />

      {/* TREND */}
      <h3>📈 Number of Earthquakes Per Year</h3>

      <Line
        data={{
          labels: trendLabels,
          datasets: [
            {
              label: "Earthquakes",
              data: trendValues,
              borderColor: "#4ac0ff",
              backgroundColor: "rgba(74,192,255,.3)",
              fill: true,
              tension: 0.35,
              pointRadius: 2,
              pointHoverRadius: 5
            }
          ]
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { labels: { color: "white" } }
          },
          scales: {
            x: { ticks: { color: "#d0e0ff" } },
            y: { ticks: { color: "#d0e0ff" } }
          }
        }}
      />
    </div>
  );
}