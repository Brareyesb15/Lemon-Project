const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_API_KEY } = process.env;
const  {messages}  = require("./configDB");


const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  }); 

  const completePetition = async() => {
    const result = await messages.findAll({
        attributes: ['user', 'text', 'timestamp']
      })
      const data = result.map(message => ({
        user: message.user,
        text: message.text,
        hora: message.timestamp
      }));
    
      const prompt = `You receive an array of objects. Each object represents a comment made in a slack channel. User means the name of the user, Text means the message of the comment and timestamps is the time it was written. You are going to take each of the objects and with them you will give me a condensed summary of what is being talked about, what is the discussion, what topics are covered. You contextualize everything according to the user who writes the message. encapsulates the main events and discussions that happened within that Slack channel based on the messages I deliver to you. The array are: ${JSON.stringify(data)}`


  const openai = new OpenAIApi(configuration);

    
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        max_tokens: 650
      });

      return completion.data.choices[0].message
    
    }

  module.exports = completePetition; 

