const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

const Message = sequelize.define('messages', {
  messageID: {
    type: DataTypes.STRING,
    validate: {
      max: 150
    }
  },
  text: {
    type: DataTypes.STRING,
  },
  sender:  {
    type: DataTypes.STRING,
  }
})

module.exports = Message;