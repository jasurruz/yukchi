const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Supabase ulanishi uchun bu juda muhim!
  }
});

module.exports = pool;