require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const modelmessages = require('./models/message');
const modelcomments = require ("./models/comments")

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
modelcomments(sequelize)

const {messages,comments} = sequelize.models;

comments.belongsTo(messages, {
  foreignKey: "messageId"
});

module.exports = {
    ...sequelize.models,
    sequelize,
    Op,
   
};