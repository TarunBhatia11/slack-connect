# 💬 Slack Message Scheduler & OAuth Integration

This project enables users to **connect their Slack workspace**, **send instant messages**, and **schedule future messages** using Slack APIs. Built with **React**, **TypeScript**, **Express.js**, and **SQLite**, it features OAuth 2.0 integration, message scheduling via cron jobs, and persistent storage with TypeORM.

---

## 📌 Project Overview

- 🔗 **Slack OAuth Integration**: Authenticate and connect Slack workspaces securely using OAuth 2.0.
- 💬 **Send Messages Instantly**: Post custom messages to selected Slack channels.
- ⏰ **Schedule Messages**: Set future date & time to send messages with cron-based scheduler.
- 🧠 **Persistent Storage**: Tokens and messages are stored using SQLite & TypeORM.

---

## 📁 Folder Structure

slack-connect-app/
├── backend/
│ ├── auth.ts # Handles Slack OAuth
│ ├── db.ts # TypeORM setup and DB entities
│ ├── messages.ts # Message send/schedule APIs
│ ├── scheduler.ts # Cron job for checking scheduled messages
│ ├── index.ts # Main Express server entry
│ └── .env # Environment variables
├── frontend/
│ ├── src/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ ├── pages/
│ │ │ ├── ConnectSlack.tsx
│ │ │ ├── Dashboard.tsx
│ │ │ └── ScheduledMessages.tsx
│ └── vite.config.ts
├── db.sqlite # SQLite database file
├── README.md


<img width="1877" height="872" alt="image" src="https://github.com/user-attachments/assets/18d2d189-71b7-43b0-9e44-eedc06af5321" />
<img width="1893" height="850" alt="image" src="https://github.com/user-attachments/assets/392c3787-eac8-4add-9a90-c10915421527" />
<img width="1907" height="876" alt="image" src="https://github.com/user-attachments/assets/5a7c15b1-a121-4241-a775-2830e31a2d26" />
<img width="1915" height="873" alt="image" src="https://github.com/user-attachments/assets/c9593bb8-d203-4c2c-ba97-734581928345" />







---

## 🖼️ SQLite DB Proof (via DB Browser)

You can open `db.sqlite` in [SQLite Browser](https://sqlitebrowser.org) to view:

### ✅ `token` Table:
| id | teamId       | accessToken       | refreshToken | expiresAt |
|----|--------------|-------------------|---------------|-----------|
| 1  | T0XXXXXX     | xoxb-...          | ...           | ...       |

### ✅ `scheduled_message` Table:
| id | teamId | channelId | text                 | postAt      | status     |
|----|--------|-----------|----------------------|-------------|------------|
| 1  | T0XXX  | C0XXX     | Hello from Scheduler | 1754649000  | scheduled  |

---

## 🎨 How It Works — Design (High Level)

```plaintext
User
 │
 ▼
[React Frontend (ConnectSlack)]
 │
 ▼
[Backend /auth] ─────────────▶ Slack OAuth 2.0
 │                               (auth code exchange)
 ▼
Token Stored in SQLite
 │
 ▼
[Dashboard] —> Instant Message
 │
 ▼
[POST /message/send]
 │
 ▼
Slack API (chat.postMessage)

[SCHEDULED MESSAGE]
 ▼
POST /message/schedule
 ▼
Saved in DB with timestamp
 ▼
[Scheduler.ts Cron Job every 1 min]
 └─▶ Slack API — chat.postMessage when time = now
```

## ⚙️ Technologies Used

Frontend

✅ React (with TypeScript or JavaScript)

✅ React Router

✅ Axios

✅ Vite

Backend

✅ Express.js

✅ TypeORM

✅ SQLite

✅ dotenv

✅ node-cron

✅ Slack Web API (official SDK)

🧪 Features
Feature	Status
Slack OAuth Integration	✅
Send Message Instantly	✅
Schedule Message	✅
View Scheduled Messages	✅
SQLite DB + ORM	✅
Cron-based Delivery	✅

🧠 Challenges Faced
⚠️ Invalid client_id/code issues due to:

Changing ngrok URLs without updating redirect URIs

Expired or reused authorization codes

⚠️ Missing Token Issues:

When DB wasn’t initialized or refresh token was null

⚠️ Slack Message Delivery Failures:

Due to incorrect channel ID or missing permissions

🛠️ UI Auto-Redirection after connection required syncing teamId properly

🐞 Silent Cron Failures due to DB not ready — fixed with initDB().then(...)

🚀 How to Run It
1. Start Backend

```
Copy
Edit
cd backend
npm install
npx tsx index.ts
# Or with ts-node if you're using tsconfig
```

2. Start Frontend

```
Copy
Edit
cd frontend
npm install
npm run dev
```


3. Start SQLite Browser (Optional)
Open db.sqlite using DB Browser for SQLite

✅ Final Notes
Make sure .env contains:

```
ini
Copy
Edit
SLACK_CLIENT_ID=your_id
SLACK_CLIENT_SECRET=your_secret
SLACK_REDIRECT_URI=https://xxxx.ngrok-free.app/auth/callback


OAuth scopes:
chat:write, channels:read, groups:read, im:read, mpim:read, incoming-webhook


```

Replace the ngrok URL wherever needed when restarting

📸 Screenshot Demo
You can include screenshots of:

Slack connection success

SQLite DB entries

Scheduled Message visible in Slack

UI for dashboard & scheduler

🙌 Author
Tarun Bhatia

Portfolio: [https://tarunbhatiaportfolio.netlify.app]
