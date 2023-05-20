const  {messages}  = require("../configDB");
const { CHANNEL_SLACK, SLACK_TOCKEN} = process.env;
const { WebClient } = require('@slack/web-api');


// Crear instancia de WebClient de Slack
const slackToken = SLACK_TOCKEN
const web = new WebClient(slackToken);  // recibiendo el token de slack api


const msgControl = async (req, res) => {
    try {
      // Obtener mensajes del canal de Slack
      const result = await web.conversations.history({ channel: CHANNEL_SLACK });
  
      // Guardar mensajes en la base de datos
      for (const message of result.messages) {
        const { user, text, ts } = message;
  
        // Verificar si el mensaje ya existe en la base de datos
        const existingMessage = await messages.findOne({ where: { timestamp: ts } });
  
        // Si el mensaje no existe, guardarlo en la base de datos
        if (!existingMessage) {
          // Obtener información del usuario
          const userInfo = await web.users.info({ user: user });
  
          // Acceder al nombre del usuario
          const userName = userInfo.user.real_name;
  
          // Guardar mensajes en la base de datos
          await messages.create({
            user: userName,
            text: text,
            timestamp: ts
          });
        }
      }
  
      res.send("Ok");
    } catch (error) {
      console.error(error);
      res.status(500).send("Ocurrió un error al obtener los mensajes de Slack.");
    }
  };

module.exports = msgControl; 