// Load environment variables in local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const cors = require("cors");
const mysql = require("mysql"); // Add the MySQL package

const app = express();

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
const connection = mysql.createConnection({
  host: process.env.DB_HOST,            // Your database host
  user: process.env.DB_USER,            // Your database username
  password: process.env.DB_PASSWORD,    // Your database password
  database: process.env.DB_NAME,        // Your database name
  port: process.env.DB_PORT || 3306,    // Default MySQL port is 3306
  ssl: sslConfig,                       // SSL configuration
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

app.use(cors());
app.use(express.json());

// Middleware to make the database connection available to routes
app.use((req, res, next) => {
  req.db = connection;
  next();
});

// Import your route handlers
const auth = require("./routes/auth");
const employee = require("./routes/employee");
const parkstatus = require("./routes/parkstatus");
const events = require("./routes/events");
const rides = require("./routes/rides");
const shops = require("./routes/shops");
const employeeAuth = require("./routes/employeeAuth");

// Use your route handlers
app.use("/admin", auth);
app.use("/employee", employee);
app.use("/parkstatus", parkstatus);
app.use("/events", events);
app.use("/rides", rides);
app.use("/shops", shops);
app.use("/employees", employeeAuth);

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
