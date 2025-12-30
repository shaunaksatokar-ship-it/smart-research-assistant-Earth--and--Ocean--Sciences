import { useState } from "react";
import EarthquakeCharts from "../components/charts/EarthquakeCharts";

export default function EarthquakeDashboard() {

  // Current UI filter values
  const [yearRange, setYearRange] = useState("1700-1800");
  const [minMag, setMinMag] = useState(3);
  const [region, setRegion] = useState("");

  // Applied filters sent to charts
  const [appliedFilters, setAppliedFilters] = useState({
    yearRange: "1700-1800",
    minMag: 3,
    region: ""
  });

  function applyFilters() {
    setAppliedFilters({
      yearRange,
      minMag,
      region
    });
  }

  function resetFilters() {
    setYearRange("1700-1800");
    setMinMag(3);
    setRegion("");

    setAppliedFilters({
      yearRange: "1700-1800",
      minMag: 3,
      region: ""
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0b1220", padding: 28 }}>
      
      <h2 style={{ color: "white", marginBottom: 6 }}>
        🌎 Earthquake Analytics Dashboard
      </h2>

      <p style={{ color: "rgba(255,255,255,.7)" }}>
        Visualize historical earthquake frequency, intensity and patterns.
      </p>

      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>

        {/* FILTER PANEL */}
        <div
          style={{
            width: 280,
            background: "rgba(255,255,255,.07)",
            padding: 18,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,.15)",
            boxShadow: "0 14px 30px rgba(0,0,0,.35)"
          }}
        >
          <h3 style={{ marginBottom: 12 }}>⚙ Filters</h3>

          {/* YEAR RANGE */}
          <label style={{ fontSize: 13 }}>Year Range</label>
          <select
            value={yearRange}
            onChange={e => setYearRange(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              marginTop: 4
            }}
          >
            <option>1500-1600</option>
            <option>1600-1700</option>
            <option>1700-1800</option>
            <option>1800-1900</option>
          </select>

          {/* MAGNITUDE */}
          <label style={{ marginTop: 14, fontSize: 13 }}>
            Minimum Magnitude
          </label>
          <input
            type="number"
            step="0.1"
            value={minMag}
            onChange={e => setMinMag(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              marginTop: 4
            }}
          />

          {/* REGION */}
          <label style={{ marginTop: 14, fontSize: 13 }}>
            Region (optional)
          </label>
          <input
            placeholder="Asia, Europe, Pacific..."
            value={region}
            onChange={e => setRegion(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              marginTop: 4
            }}
          />

          {/* BUTTONS */}
          <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
            <button
              onClick={applyFilters}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: 8,
                background: "#1f9bfd",
                border: "none",
                color: "white",
                cursor: "pointer"
              }}
            >
              Apply
            </button>

            <button
              onClick={resetFilters}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: 8,
                background: "transparent",
                border: "1px solid #aaa",
                color: "white",
                cursor: "pointer"
              }}
            >
              Reset
            </button>
          </div>

          <small style={{ opacity: 0.6, display: "block", marginTop: 8 }}>
            Changes apply only when you press <b>Apply</b>.
          </small>
        </div>

        {/* CHARTS */}
        <div style={{ flex: 1 }}>
          <EarthquakeCharts filters={appliedFilters} />
        </div>
      </div>
    </div>
  );
}