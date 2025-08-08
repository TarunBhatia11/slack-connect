import express from "express";
import { WebClient } from "@slack/web-api";
import { tokenRepo, scheduleRepo } from "./db";
import cron from "node-cron";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { teamId, channel, text } = req.body;

  console.log("📨 Incoming send request:", { teamId, channel, text });

  // Validate request
  if (!teamId || !channel || !text) {
    console.error("❌ Missing required fields");
    return res.status(400).send("Missing teamId, channel, or text");
  }

  // Find access token
  const token = await tokenRepo().findOneBy({ teamId });
  if (!token) {
    console.error("❌ No token found for team:", teamId);
    return res.status(404).send("Token not found");
  }

  const client = new WebClient(token.accessToken);

  try {
    const result = await client.chat.postMessage({ channel, text });

    console.log("✅ Slack API Response:", result);

    res.send({ message: "Sent!", result });
  } catch (err) {
    console.error("❌ Error sending to Slack:", err);
    res.status(500).send("Slack API error");
  }
});

router.post("/schedule", async (req, res) => {
  const { teamId, channel, text, postAt } = req.body;

  if (!teamId || !channel || !text || !postAt) {
    console.error("❌ Missing fields in schedule request");
    return res.status(400).send("Missing required fields");
  }

  console.log("📩 Scheduling Message:", { teamId, channel, text, postAt });

  const token = await tokenRepo().findOneBy({ teamId });
  if (!token) {
    console.error("❌ Token not found for team:", teamId);
    return res.status(404).send("Token not found");
  }

  const repo = scheduleRepo();
  const message = repo.create({ teamId, channelId: channel, text, postAt, status: "scheduled" });
  await repo.save(message);

  console.log("✅ Scheduled message saved:", message);

  res.send({ message: "Scheduled successfully!" });
});


// Cancel scheduled
router.delete("/scheduled/:id", async (req, res) => {
  const repo = scheduleRepo();
  const message = await repo.findOneBy({ id: parseInt(req.params.id) });
  if (!message) return res.status(404).send("Not found");

  message.status = "cancelled";
  await repo.save(message);
  res.send({ message: "Cancelled" });
});

// Cron job checks every minute
cron.schedule("* * * * *", async () => {
  const now = Math.floor(Date.now() / 1000);
  const pending = await scheduleRepo().findBy({ status: "scheduled" });

  for (const msg of pending) {
    if (msg.postAt <= now) {
      const token = await tokenRepo().findOneBy({ teamId: msg.teamId });
      if (!token) continue;

      const client = new WebClient(token.accessToken);
      await client.chat.postMessage({ channel: msg.channelId, text: msg.text });

      msg.status = "sent";
      await scheduleRepo().save(msg);
    }
  }
});

export default router;



