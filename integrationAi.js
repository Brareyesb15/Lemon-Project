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

      const datamejorada = JSON.stringify(data)
      console.log(datamejorada)
    
      const prompt = `I give you an array of comments written in a slack channel. user means the name of the user, text is the comment written, and time means the moment the comment was written in unix format. I need a condensed summary, encapsulating the main events and discussions that occurred within that Slack channel. Take into account the moment it was written according to its timestamp, therefore take into account converting the unix format and know at what moment each of the comments were written, starting from the first that was written to the last. the array is this: ${datamejorada}`


  const openai = new OpenAIApi(configuration);

    
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        max_tokens: 650
      });

      return completion.data.choices[0].message
    
    }

  module.exports = completePetition; 

