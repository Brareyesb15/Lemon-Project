const { DataTypes } = require('sequelize'); 

module.exports = sequelize => {
    sequelize.define('comments', {
    text: {
      type: DataTypes.TEXT
    },
    user: {
      type:DataTypes.STRING
    },
    timestamp: {
      type: DataTypes.STRING
    }
  });}