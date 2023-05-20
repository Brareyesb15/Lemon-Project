const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_API_KEY } = process.env;


const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  }); 

  const openai = new OpenAIApi(configuration);

  const pedidoAI = async(nombre) => {
    console.log("Entreeeeeeeeeeeee")
    
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `Saludame diciendome hola papurro ${nombre} y un chiste`}],
        max_tokens: 650
      });

      return completion.data.choices[0].message
    
  }

  module.exports = pedidoAI; 

