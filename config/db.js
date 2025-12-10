// config/db.js
const { Sequelize } = require('sequelize');

// Make sure 'bengaluru_buddy' is the name of the schema you created in MySQL Workbench
// and 'YOUR_ROOT_PASSWORD' is the password you set during MySQL installation.
const sequelize = new Sequelize('bengaluru_buddy', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});
