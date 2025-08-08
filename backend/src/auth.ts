import express from "express";
import axios from "axios";
import { saveTokens } from "./db";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const client_id = process.env.SLACK_CLIENT_ID!;
const client_secret = process.env.SLACK_CLIENT_SECRET!;
const redirect_uri = process.env.SLACK_REDIRECT_URI!;
const FRONTEND_URi = process.env.FRONTEND_URL!;

// OAuth callback route
router.get("/callback", async (req, res) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send("Missing code from Slack");
  }

  console.log("Code received:", code);
  console.log("Redirect URI:", redirect_uri);

  try {
    const response = await axios.post("https://slack.com/api/oauth.v2.access", null, {
      params: {
        client_id,
        client_secret,
        code,
        redirect_uri,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = response.data;

    if (!data.ok) {
      console.error("Slack auth failed:", data.error);
      return res.status(400).send(data.error);
    }

    await saveTokens(
      data.team.id,
      data.access_token,
      data.refresh_token || "",
      data.expires_in ? new Date(Date.now() + data.expires_in * 1000).toISOString() : ""
    );

    res.redirect(`${FRONTEND_URi}/dashboard?teamId=${data.team.id}`);

  } catch (error) {
    console.error("OAuth error:", error);
    res.status(500).send("Server error during Slack OAuth");
  }
});

export default router;

