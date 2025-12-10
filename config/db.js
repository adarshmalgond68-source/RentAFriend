// config/db.js
const sequelize = new Sequelize('bengaluru_buddy', 'root', 'admin', {
  // Is the database name exactly 'bengaluru_buddy'?
  // Is 'YOUR_ROOT_PASSWORD' the exact root password you set for MySQL?
  host: 'localhost',
  dialect: 'mysql', 
  // ... rest of code
});