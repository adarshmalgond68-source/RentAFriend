// models/User.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');// Points to your MySQL connection file

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactNumber: { 
    type: DataTypes.STRING,
    allowNull: true
  },
  role: { 
    type: DataTypes.STRING,
    defaultValue: 'user',
    allowNull: false
  }
});

// Hook: Hash the password before saving a new user
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Method: Compare incoming password with the stored (hashed) password
User.prototype.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;