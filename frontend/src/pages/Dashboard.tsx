// import { useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [teamId, setTeamId] = useState("");
//   const [channel, setChannel] = useState("");
//   const [text, setText] = useState("");
//   const [scheduleTime, setScheduleTime] = useState("");

//   const sendMessage = async () => {
//     await axios.post("https://ee4ae68b71b0.ngrok-free.app/message/send", { teamId, channel, text });
//     alert("✅ Message sent!");
//   };

//   const scheduleMessage = async () => {
//     const timestamp = Math.floor(new Date(scheduleTime).getTime() / 1000);
//     await axios.post("https://ee4ae68b71b0.ngrok-free.app/message/schedule", { teamId, channel, text, postAt: timestamp });
//     alert("📅 Message scheduled!");
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         padding: "50px 20px",
//         background: "#f4f4f4",
//         minHeight: "80vh",
//       }}
//     >
//       <div
//         style={{
//           background: "white",
//           padding: "30px 40px",
//           borderRadius: "12px",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//           width: "100%",
//           maxWidth: "500px",
//           textAlign: "center",
//           animation: "fadeIn 0.6s ease-in-out",
//         }}
//       >
//         <h2 style={{ marginBottom: "20px", color: "#333" }}>
//           ✉ Send or Schedule a Slack Message
//         </h2>

//         {/* Inputs */}
//         <input
//           placeholder="Team ID"
//           onChange={(e) => setTeamId(e.target.value)}
//           style={inputStyle}
//         />
//         <input
//           placeholder="Channel ID"
//           onChange={(e) => setChannel(e.target.value)}
//           style={inputStyle}
//         />
//         <textarea
//           placeholder="Message"
//           onChange={(e) => setText(e.target.value)}
//           style={{ ...inputStyle, height: "80px", resize: "none" }}
//         />
//         <input
//           type="datetime-local"
//           onChange={(e) => setScheduleTime(e.target.value)}
//           style={inputStyle}
//         />

//         {/* Buttons */}
//         <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
//           <button style={buttonStyle} onClick={sendMessage}>
//             🚀 Send Now
//           </button>
//           <button style={{ ...buttonStyle, background: "#FF9800" }} onClick={scheduleMessage}>
//             ⏰ Schedule
//           </button>
//         </div>

//         {/* Animation */}
//         <style>
//           {`
//             @keyframes fadeIn {
//               from { opacity: 0; transform: translateY(20px); }
//               to { opacity: 1; transform: translateY(0); }
//             }
//             button:hover {
//               opacity: 0.9;
//             }
//             input:focus, textarea:focus {
//               border-color: #4A90E2;
//               outline: none;
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// };

// // Shared Styles
// const inputStyle: React.CSSProperties = {
//   width: "100%",
//   padding: "12px",
//   marginBottom: "15px",
//   borderRadius: "8px",
//   border: "1px solid #ccc",
//   fontSize: "1rem",
// };

// const buttonStyle: React.CSSProperties = {
//   flex: 1,
//   padding: "12px 18px",
//   border: "none",
//   borderRadius: "8px",
//   fontSize: "1rem",
//   fontWeight: 600,
//   background: "#4A90E2",
//   color: "white",
//   cursor: "pointer",
//   transition: "0.3s",
// };

// export default Dashboard;



import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [teamId, setTeamId] = useState("");
  const [channel, setChannel] = useState("");
  const [text, setText] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  // Load teamId from query param or localStorage
  useEffect(() => {
    const team = searchParams.get("teamId") || localStorage.getItem("teamId");
    if (team) {
      setTeamId(team);
      localStorage.setItem("teamId", team);
    }
  }, []);

  const sendMessage = async () => {
    if (!teamId || !channel || !text) return alert("Missing fields!");
    try {
      await axios.post("https://74f7a398d369.ngrok-free.app/message/send", {
        teamId,
        channel,
        text,
      });
      alert("✅ Message sent!");
    } catch (err) {
      console.error("Send failed", err);
      alert("❌ Failed to send message");
    }
  };

  const scheduleMessage = async () => {
    if (!teamId || !channel || !text || !scheduleTime) return alert("Missing fields!");
    const timestamp = Math.floor(new Date(scheduleTime).getTime() / 1000);
    try {
      await axios.post("https://e6e47c0d3d2c.ngrok-free.app/message/schedule", {
        teamId,
        channel,
        text,
        postAt: timestamp,
      });
      alert("📅 Message scheduled!");
    } catch (err) {
      console.error("Schedule failed", err);
      alert("❌ Failed to schedule message");
    }
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
          maxWidth: "500px",
          textAlign: "center",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <h2 style={{ marginBottom: "10px", color: "#333" }}>
          ✉ Send or Schedule a Slack Message
        </h2>
        <p style={{ marginBottom: "20px", color: "#666" }}>
          Connected Team: <strong>{teamId || "Not connected"}</strong>
        </p>

        <input
          placeholder="Channel ID (e.g., C01XXX)"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ ...inputStyle, height: "80px", resize: "none" }}
        />
        <input
          type="datetime-local"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button style={buttonStyle} onClick={sendMessage}>
            🚀 Send Now
          </button>
          <button
            style={{ ...buttonStyle, background: "#FF9800" }}
            onClick={scheduleMessage}
          >
            ⏰ Schedule
          </button>
        </div>

        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            button:hover { opacity: 0.9; }
            input:focus, textarea:focus {
              border-color: #4A90E2;
              outline: none;
            }
          `}
        </style>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  flex: 1,
  padding: "12px 18px",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: 600,
  background: "#4A90E2",
  color: "white",
  cursor: "pointer",
  transition: "0.3s",
};

export default Dashboard;
