const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_API_KEY } = process.env;
const {comments} = require("./configDB");

// Create a configuration instance with the OpenAI API key
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

// Function to complete the petition using OpenAI API
const completePetition = async () => {
  // Retrieve messages from the database
  const result = await comments.findAll({
    attributes: ['user', 'text', 'timestamp', "messageId"]
  });

  // Convert the result into a suitable data format
  const data = result.map(message => ({
    user: message.user,
    text: message.text,
    time: message.timestamp,
    comment : message.messageId
  }));

  // Convert the data to a JSON string
  const dataString = JSON.stringify(data);
  console.log(dataString);

  // Create the prompt to be used for the API call
  const prompt = `Receives an array with objects. Each object is a different comment in the same slack channel. User is the user who writes it, text is the message of the comment, time is the time it is written in Unix format and comment means the thread to which it belongs within the channel.
  I need a condensed summary that encapsulates the main threads that are written, the discussions that happened within that Slack channel. Keep in mind the time for the summary to tell me from the oldest thread to the newest thread. The array is as follows: ${dataString}`;

  // Create an instance of the OpenAI API
  const openai = new OpenAIApi(configuration);

  // Perform a chat completion API call
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 650
  });

  // Return the generated completion response
  return completion.data.choices[0].message;
}

module.exports = completePetition;
