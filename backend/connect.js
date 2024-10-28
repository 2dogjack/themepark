const mysql = require('mysql');

// Load environment variables in local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// SSL configuration for secure database connection
let sslConfig;
if (process.env.DB_SSL_CERT) {
  sslConfig = {
    rejectUnauthorized: true,
    ca: process.env.DB_SSL_CERT,
  };
} else {
  sslConfig = {
    rejectUnauthorized: true,
  };
}

// Create the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,           // Your database host
  user: process.env.DB_USER,           // Your database username
  password: process.env.DB_PASSWORD,   // Your database password
  database: process.env.DB_NAME,       // Your database name
  port: process.env.DB_PORT || 3306,   // Default MySQL port is 3306
  ssl: sslConfig,                      // SSL configuration
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = db;
