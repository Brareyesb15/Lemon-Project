const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_API_KEY } = process.env;
const { messages } = require("./configDB");

// Create a configuration instance with the OpenAI API key
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

// Function to complete the petition using OpenAI API
const completePetition = async () => {
  // Retrieve messages from the database
  const result = await messages.findAll({
    attributes: ['user', 'text', 'timestamp']
  });

  // Convert the result into a suitable data format
  const data = result.map(message => ({
    user: message.user,
    text: message.text,
    time: message.timestamp
  }));

  // Convert the data to a JSON string
  const dataString = JSON.stringify(data);
  console.log(dataString);

  // Create the prompt to be used for the API call
  const prompt = `I give you an array of comments written in a Slack channel. "user" means the name of the user, "text" is the comment written, and "time" indicates the moment the comment was written in Unix format. I need a condensed summary encapsulating the main events and discussions that occurred within that Slack channel. Take into account the timestamp to understand the order of comments. The array is as follows: ${dataString}`;

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
