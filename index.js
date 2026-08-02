require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command("/hello", async ({ command, ack, respond }) => {
  await ack();
  await respond(`👋 Hello, <@${command.user_id}>!`);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡ Slack Bot is running!");
})();