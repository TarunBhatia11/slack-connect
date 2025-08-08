import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import pages
import ConnectSlack from "./pages/ConnectSlack";
import Dashboard from "./pages/Dashboard";
import ScheduledMessages from "./pages/ScheduledMessage";

export default function App() {
  return (
    <Router>
      <div
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          background: "linear-gradient(135deg, #1f1c2c, #928dab)",
          minHeight: "100vh",
          color: "white",
        }}
      >
        {/* Navigation */}
        <nav
          style={{
            background: "rgba(30,30,30,0.85)",
            backdropFilter: "blur(10px)",
            padding: "15px 40px",
            display: "flex",
            gap: "40px",
            borderRadius: "0 0 20px 20px",
            position: "sticky",
            top: 0,
            zIndex: 100,
            justifyContent: "center",
          }}
        >
          {[
            { path: "/", label: "Connect Slack" },
            { path: "/dashboard", label: "Dashboard" },
            { path: "/scheduled", label: "Scheduled Messages" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.2)";
              }}
              onMouseOut={(e) => {
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Page Routes */}
        <div
          style={{
            padding: "50px 30px",
            animation: "fadeIn 0.8s ease-in-out",
          }}
        >
          <Routes>
            <Route path="/" element={<ConnectSlack />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scheduled" element={<ScheduledMessages />} />
          </Routes>
        </div>

        {/* Fade-in animation */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </Router>
  );
}

