const { DataTypes } = require('sequelize'); 

module.exports = sequelize => {
    sequelize.define('messages', {
    text: {
      type: DataTypes.TEXT
    },
    timestamp: {
      type: DataTypes.STRING
    }
  });}