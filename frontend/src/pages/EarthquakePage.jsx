import EarthquakeChart from "../components/charts/EarthquakeCharts";

export default function EarthquakePage() {
  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ color: "white" }}>🌍 Earthquake Analytics</h2>

      <EarthquakeChart />
    </div>
  );
}