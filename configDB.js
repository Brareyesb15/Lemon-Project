require('dotenv').config();
const express = require('express');
const { WebClient } = require('@slack/web-api');
const { Sequelize, DataTypes } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY, DB_DB, PORT } = process.env;

// Crear instancia de WebClient de Slack
const slackToken = process.env.SLACK_TOKEN;
const web = new WebClient(slackToken);  // recibiendo el token de slack api

// Configurar Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  port: PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DEPLOY
});

// Definir modelo de mensajes de Slack


// Iniciar servidor Express
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    // Obtener mensajes del canal de Slack
    const channel = '<your_slack_channel_id>';
    const result = await web.conversations.history({ channel });

    // Guardar mensajes en la base de datos
    await sequelize.sync();
    for (const message of result.messages) {
      await SlackMessage.create({
        text: message.text,
        timestamp: message.ts
      });
    }

    res.send('Mensajes guardados en la base de datos.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocurrió un error al obtener los mensajes de Slack.');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
