import React, { useState } from "react";
import axios from "axios";

interface ScheduledMessage {
  id: number;
  teamId: string;
  channelId: string;
  text: string;
  postAt: number;
  status: string;
}

export default function ScheduledMessages() {
  const [teamId, setTeamId] = useState("");
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);

  const fetchMessages = async () => {
    if (!teamId) return;
    try {
      const response = await axios.get<ScheduledMessage[]>(
        `https://localhost:4000/message/scheduled/${teamId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch scheduled messages", error);
    }
  };

  const cancelMessage = async (id: number) => {
    try {
      await axios.delete(`https://localhost:4000/message/scheduled/${id}`);
      alert("Message canceled successfully!");
      fetchMessages();
    } catch (error) {
      console.error("Failed to cancel message", error);
    }
  };

  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleString();

  const statusBadgeStyle = (status: string) => {
    let color = "#999";
    if (status === "scheduled") color = "#FF9800";
    if (status === "sent") color = "#4CAF50";
    if (status === "canceled") color = "#F44336";
    return {
      padding: "4px 10px",
      borderRadius: "6px",
      color: "white",
      backgroundColor: color,
      fontSize: "0.8rem",
      fontWeight: 600,
    } as React.CSSProperties;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "50px 20px",
        background: "#f4f4f4",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px 40px",
          borderRadius: "12px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "900px",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}>
          📋 Scheduled Slack Messages
        </h2>

        {/* Search Team */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter Team ID"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <button
            onClick={fetchMessages}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#4A90E2",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Load Messages
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead style={{ background: "#f0f0f0" }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Channel</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Post At</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tdStyle}>{msg.id}</td>
                    <td style={tdStyle}>{msg.channelId}</td>
                    <td style={tdStyle}>{msg.text}</td>
                    <td style={tdStyle}>{formatDate(msg.postAt)}</td>
                    <td style={tdStyle}>
                      <span style={statusBadgeStyle(msg.status)}>
                        {msg.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {msg.status === "scheduled" && (
                        <button
                          onClick={() => cancelMessage(msg.id)}
                          style={{
                            padding: "6px 12px",
                            border: "none",
                            borderRadius: "6px",
                            background: "#F44336",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                    No scheduled messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Animation */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            button:hover { opacity: 0.9; }
            input:focus { border-color: #4A90E2; outline: none; }
          `}
        </style>
      </div>
    </div>
  );
}

// Styles
const thStyle: React.CSSProperties = {
  padding: "12px",
  fontWeight: 600,
  fontSize: "0.95rem",
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "0.9rem",
};


