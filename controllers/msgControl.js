const { messages, comments } = require("../configDB");
const { CHANNEL_SLACK, SLACK_TOKEN } = process.env;
const { WebClient } = require('@slack/web-api');

// Crea una instancia de WebClient de Slack
const slackToken = SLACK_TOKEN;
const web = new WebClient(slackToken);

// Función de control de mensajes
const msgControl = async (req, res) => {
  console.log("Entre")
  try {
    // Obtén los mensajes del canal de Slack
    const result = await web.conversations.history({ channel: CHANNEL_SLACK });

    // Guarda los mensajes y sus comentarios en la base de datos
    for (const message of result.messages) {
      const { user, text, ts } = message;

      // Verifica si el mensaje ya existe en la base de datos
      const existingMessage = await messages.findOne({ where: { timestamp: ts } });

      // Si el mensaje no existe, guárdalo en la base de datos
      if (!existingMessage) {
        // Obtiene información del usuario
        const userInfo = await web.users.info({ user: user });

        // Accede al nombre real del usuario
        const userName = userInfo.user.real_name;

        // Guarda el mensaje en la base de datos
        const createdMessage = await messages.create({
          user: userName,
          text: text,
          timestamp: ts 
        });

        console.log("termine acá", createdMessage)

        // Obtén los comentarios del mensaje
        const commentsResult = await web.conversations.replies({
          channel: CHANNEL_SLACK,
          ts: ts
        });

        // Guarda los comentarios en la base de datos
        for (const comment of commentsResult.messages) {
          const { user: commentUser, text: commentText, ts: commentTs } = comment;

          // Obtén información del usuario del comentario
          const commentUserInfo = await web.users.info({ user: commentUser });

          // Accede al nombre real del usuario del comentario
          const commentUserName = commentUserInfo.user.real_name;

          // Guarda el comentario en la base de datos, relacionándolo con el mensaje
          await comments.create({
            user: commentUserName,
            text: commentText,
            timestamp: commentTs,
            messageId: createdMessage.id
          });
        }
      }
    }
    // const resulta = await comments.findAll({
    //   attributes: ['user', 'text', 'timestamp', "messageId"]
    // });
  
    // // Convert the result into a suitable data format
    // const data = resulta.map(message => ({
    //   user: message.user,
    //   text: message.text,
    //   time: message.timestamp,
    //   comment : message.messageId
    // }));
    // const dataString = JSON.stringify(data)

    // res.status(200).send(dataString);

  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while getting Slack messages and comments.");
  }
};

module.exports = msgControl;
