const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: "postgres",
  password: "mohit1610",
  host: "localhost",
  database: "world",
  port: 5432
});

module.exports = { pool };