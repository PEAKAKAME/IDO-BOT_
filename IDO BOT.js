require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// /hello
app.command("/hello", async ({ command, ack, respond }) => {
  await ack();
  await respond(`👋 Hello <@${command.user_id}>!`);
});

// /time
app.command("/time", async ({ ack, respond }) => {
  await ack();
  const now = new Date();
  await respond(`🕒 Current time: ${now.toLocaleString()}`);
});

// /joke
app.command("/joke", async ({ ack, respond }) => {
  await ack();

  const jokes = [
    "😂 Why do programmers prefer dark mode? Because light attracts bugs!",
    "🤣 Debugging: Being the detective in a crime movie where you're also the murderer.",
    "😅 There are 10 types of people: those who understand binary and those who don't."
  ];

  const random = jokes[Math.floor(Math.random() * jokes.length)];
  await respond(random);
});

// /ping
app.command("/ping", async ({ ack, respond }) => {
  await ack();
  await respond("🏓 Pong!");
});

// /about
app.command("/about", async ({ ack, respond }) => {
  await ack();

  await respond(`
🤖 *Slack Bot*

Features:
• /hello
• /time
• /joke
• /ping
• /about

Made with ❤️ using Bolt for JavaScript.
`);
});

// Start server
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡ Slack Bot is running!");
})();