require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const modelmessages = require('./models/message');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY, DB_DB, PORT } = process.env;

// Configurar Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  port: PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DB
});

modelmessages(sequelize)

const {messages} = sequelize.models;

module.exports = {
    ...sequelize.models,
    sequelize,
    Op,
   
 }; 


// app.get('/', async (req, res) => {
//   try {
//     // Obtener mensajes del canal de Slack
//     const channel = '<your_slack_channel_id>';
//     const result = await web.conversations.history({ channel });

//     // Guardar mensajes en la base de datos
//     await sequelize.sync();
//     for (const message of result.messages) {
//       await SlackMessage.create({
//         text: message.text,
//         timestamp: message.ts
//       });
//     }

//     res.send('Mensajes guardados en la base de datos.');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Ocurrió un error al obtener los mensajes de Slack.');
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor Express iniciado en el puerto ${port}`);
// });
