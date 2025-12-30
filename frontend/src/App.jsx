import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EarthquakePage from "./pages/EarthquakePage";
import OceanDashboard from "./pages/OceanDashboard";
import EarthquakeDashboard from "./pages/EarthquakeDashboard";
import AIInsights from "./pages/AIInsights";

// ⭐ Reusable Styled Nav Button
function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="
        px-4 py-2
        rounded-lg text-sm font-medium
        bg-slate-800/40 border border-slate-700
        hover:bg-sky-600/20 hover:border-sky-500 hover:text-sky-300
        transition duration-200
      "
    >
      {label}
    </Link>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white">

        {/* NAVBAR */}
        <header className="navbar">
          <div className="nav-left">
            <span className="logo-icon">🌎</span>
            <span className="brand">Smart Research Assistant</span>
          </div>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/ocean">Ocean Dashboard</Link>
            <Link to="/earthquake-dashboard">Earthquake Dashboard</Link>
            <NavLink to="/ai" label="AI Insights" />
          </nav>
        </header>

        {/* CONTENT */}
        <main className="max-w-7xl mx-auto px-6 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/earthquakes" element={<EarthquakePage />} />
            <Route path="/ocean" element={<OceanDashboard />} />
            <Route path="/earthquake-dashboard" element={<EarthquakeDashboard />} />
            <Route path="/ai" element={<AIInsights />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;