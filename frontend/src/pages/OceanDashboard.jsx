import { useState } from "react";
import OceanChart from "../components/charts/OceanChart";

export default function OceanDashboard() {
  const [filters, setFilters] = useState({
    yearRange: "2015-2020",
    region: "",
    metric: "SST (°C)"
  });

  function update(field, value) {
    setFilters(prev => ({ ...prev, [field]: value }));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 28,
        background: "#0b1220",
        color: "white"
      }}
    >
      {/* HEADER */}
      <h2 style={{ fontSize: 24, marginBottom: 4 }}>
        🌊 Ocean Analytics Dashboard
      </h2>

      <p style={{ opacity: 0.7 }}>
        Explore sea-surface temperature, pH changes, and ocean indicators.
      </p>

      <div style={{ display: "flex", gap: 26, marginTop: 22 }}>

        {/* FILTER PANEL */}
        <div
          style={{
            width: 270,
            padding: 18,
            borderRadius: 14,
            background: "rgba(255,255,255,.07)",
            boxShadow: "0 0 20px rgba(0,0,0,.35)"
          }}
        >
          <h3 style={{ marginBottom: 10 }}>⚙ Filters</h3>

          {/* YEAR RANGE */}
          <label>Year Range</label>
          <select
            value={filters.yearRange}
            onChange={e => update("yearRange", e.target.value)}
            style={{
              width: "100%",
              padding: 7,
              borderRadius: 8,
              marginBottom: 12
            }}
          >
            <option value="2010-2015">2010–2015</option>
            <option value="2015-2020">2015–2020</option>
            <option value="2020-2025">2020–2025</option>
          </select>

          {/* REGION */}
          <label>Region</label>
          <input
            placeholder="Ex: Pacific, Indian Ocean…"
            value={filters.region}
            onChange={e => update("region", e.target.value)}
            style={{
              width: "100%",
              padding: 7,
              borderRadius: 8,
              marginBottom: 12
            }}
          />

          {/* METRIC */}
          <label>Metric</label>
          <select
            value={filters.metric}
            onChange={e => update("metric", e.target.value)}
            style={{
              width: "100%",
              padding: 7,
              borderRadius: 8,
              marginBottom: 10
            }}
          >
            <option value="SST (°C)">Sea Surface Temp (°C)</option>
            <option value="pH Level">Ocean pH Level</option>
            <option value="Species Observed">Species Observed</option>
          </select>

          <small style={{ opacity: 0.6 }}>
            Chart updates automatically.
          </small>
        </div>

        {/* CHART AREA */}
        <div style={{ flex: 1 }}>
          <OceanChart filters={filters} />
        </div>
      </div>
    </div>
  );
}