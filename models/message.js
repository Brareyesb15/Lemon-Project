const { DataTypes } = require('sequelize'); 

module.exports = sequelize => {
    sequelize.define('message', {
    text: {
      type: DataTypes.TEXT
    },
    timestamp: {
      type: DataTypes.STRING
    }
  });}