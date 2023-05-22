const { messages } = require("../configDB");
const { CHANNEL_SLACK, SLACK_TOCKEN } = process.env;
const { WebClient } = require('@slack/web-api');

// Create an instance of Slack's WebClient
const slackToken = SLACK_TOCKEN;
const web = new WebClient(slackToken); // receiving the Slack API token

// Message control function
const msgControl = async (req, res) => {
  try {
    // Get messages from the Slack channel
    const result = await web.conversations.history({ channel: CHANNEL_SLACK });

    // Save messages to the database
    for (const message of result.messages) {
      const { user, text, ts } = message;

      // Check if the message already exists in the database
      const existingMessage = await messages.findOne({ where: { timestamp: ts } });

      // If the message doesn't exist, save it to the database
      if (!existingMessage) {
        // Get user information
        const userInfo = await web.users.info({ user: user });

        // Access the user's name
        const userName = userInfo.user.real_name;

        // Save messages to the database
        await messages.create({
          user: userName,
          text: text,
          timestamp: ts 
        });
      }
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while getting Slack messages.");
  }
};

module.exports = msgControl;
