const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
  },
  {
    timestamps: false,
  }
);

module.exports = User;
