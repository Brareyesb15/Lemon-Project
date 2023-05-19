const  messages  = require("../configDB");
const { CHANNEL_SLACK } = process.env;
const { WebClient } = require('@slack/web-api');


// Crear instancia de WebClient de Slack
const slackToken = process.env.SLACK_TOKEN;
const web = new WebClient(slackToken);  // recibiendo el token de slack api


const msgControl = async (req,res) => {
try {
    // Obtener mensajes del canal de Slack
    const result = await web.conversations.history({ CHANNEL_SLACK });
    console.log("HOLAAAAAAA",result)

    // Guardar mensajes en la base de datos
    for (const message of result.messages) {
      await messages.create({
        text: message.text,
        timestamp: message.ts
      });
    }

    res.send('Mensajes guardados en la base de datos.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al obtener los mensajes de Slack.');
  }
};

module.exports = msgControl; 