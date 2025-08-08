import cron from "node-cron";
import { WebClient } from "@slack/web-api";
import { AppDataSource } from "./db";
import { ScheduledMessage } from "./db";  // Your TypeORM entity
import { Token } from "./db";            // Your Token entity
import { Express } from "express";  


// Function to send pending scheduled messages
export const startScheduler = () => {
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    const now = Math.floor(Date.now() / 1000);

    // Fetch all scheduled messages that are due
    const scheduledRepo = AppDataSource.getRepository(ScheduledMessage);
    const tokenRepo = AppDataSource.getRepository(Token);

    const pendingMessages = await scheduledRepo.find({
      where: { status: "scheduled" }
    });

    for (const msg of pendingMessages) {
      if (msg.postAt <= now) {
        // Get the token for the team
        const tokenRecord = await tokenRepo.findOne({ where: { teamId: msg.teamId } });
        if (!tokenRecord) continue;

        const slackClient = new WebClient(tokenRecord.accessToken);

        try {
          // Send message to Slack
          await slackClient.chat.postMessage({
            channel: msg.channelId,
            text: msg.text
          });

          // Mark message as sent
          msg.status = "sent";
          await scheduledRepo.save(msg);
          console.log(`Message ${msg.id} sent to ${msg.channelId}`);
        } catch (error) {
          console.error(`Failed to send message ${msg.id}`, error);
        }
      }
    }
  });

  console.log("⏳ Scheduler started: checking for messages every minute.");
};

