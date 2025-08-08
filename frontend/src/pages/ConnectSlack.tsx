import React from "react";


const ConnectSlack = () => {
  const handleConnect = () => {
  const clientId = import.meta.env.VITE_SLACK_CLIENT_ID;
  const redirectUri = "https://38bf3ed472d4.ngrok-free.app/auth/callback"; // Ensure this matches your backend redirect URI


  const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=channels:read,chat:write,groups:read,mpim:read,incoming-webhook,im:read&redirect_uri=${redirectUri}`;
  window.location.href = slackUrl;

};


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        color: "white",
        position: "relative",
        background: "linear-gradient(135deg, #1E1E2F, #2D2D44)",
      }}
    >
      {/* --- Top Right Info Card --- */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255,255,255,0.1)",
          padding: "12px 18px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          color: "white",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          textAlign: "right",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        }}
      >
        <strong>Tarun Bhatia</strong> <br />
        Roll No: 2201641540113 <br />
        College: PSIT, Kanpur <br />
        <a
          href="https://github.com/TarunBhatia11"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#4A90E2", textDecoration: "none", fontWeight: 600 }}
        >
          GitHub
        </a>
      </div>

      {/* Heading */}
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        🚀 Connect Your Slack Workspace
      </h1>
      <p style={{ fontSize: "1.2rem", opacity: 0.8, marginBottom: "40px" }}>
        Authorize this app to send and schedule messages to your Slack channels.
      </p>

      {/* Connect Button */}
      <button
        onClick={handleConnect}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#4A154B",
          color: "white",
          fontSize: "1.1rem",
          fontWeight: 600,
          padding: "14px 28px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          transition: "0.3s",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        }}
        onMouseOver={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#6a1b9a";
        }}
        onMouseOut={(e) => {
          (e.target as HTMLElement).style.backgroundColor = "#4A154B";
        }}
      >
        <img
          src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png"
          alt="Slack Logo"
          style={{ width: "24px", height: "24px" }}
        />
        Connect Slack
      </button>

      {/* Fade Animation */}
      <style>
        {`
          h1, p, button {
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ConnectSlack;


