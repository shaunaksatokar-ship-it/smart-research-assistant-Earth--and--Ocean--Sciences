import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

export default function OceanChart({ filters = {} }) {
  const [data, setData] = useState(null);
  const [fallbackMsg, setFallbackMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const year = filters.yearRange || "";
  const region = filters.region || "";
  const metric = filters.metric || "SST (°C)";

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const query = new URLSearchParams({
        year,
        region,
        metric
      });

      const res = await fetch(
        `http://127.0.0.1:8000/dashboard/ocean?${query}`
      );

      if (!res.ok) throw new Error("Failed to fetch ocean data");

      const json = await res.json();

      setFallbackMsg(json.message || null);

      let rows = json.preview || [];

      const labels = rows.map(r => r.Date);
      const values = rows.map(r => r[metric] ?? 0);

      setData({
        labels,
        datasets: [
          {
            label: metric,
            data: values,
            borderColor: "#4ac0ff",
            backgroundColor: "rgba(74,192,255,.25)",
            borderWidth: 2,
            fill: true,
            tension: 0.35,
            pointRadius: 2,
            pointHoverRadius: 5
          }
        ]
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [year, region, metric]);

  // LOADING
  if (loading)
    return <p style={{ color: "white" }}>Loading ocean data…</p>;

  // ERROR
  if (error)
    return <p style={{ color: "red" }}>⚠ {error}</p>;

  if (!data)
    return <p style={{ color: "white" }}>No ocean data found.</p>;

  return (
    <div className="space-y-4 animate-fade-in"
      style={{
        width: "100%",
        background: "rgba(255,255,255,.05)",
        padding: 18,
        borderRadius: 14
      }}
    >
      <h3 style={{ color: "white" }}>🌊 Ocean Trends</h3>

      {fallbackMsg && (
        <div
          style={{
            background: "rgba(255,165,0,.15)",
            color: "#ffd38b",
            padding: 10,
            borderRadius: 10
          }}
        >
          {fallbackMsg}
        </div>
      )}

      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { labels: { color: "white" } },
            tooltip: { mode: "index", intersect: false }
          },
          scales: {
            x: {
              ticks: { color: "#d0e0ff" },
              grid: { color: "rgba(255,255,255,.1)" }
            },
            y: {
              ticks: { color: "#d0e0ff" },
              grid: { color: "rgba(255,255,255,.1)" }
            }
          }
        }}
      />
    </div>
  );
}