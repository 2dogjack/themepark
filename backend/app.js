// Load environment variables in local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Import your route handlers
const auth = require('./routes/auth');
const employee = require('./routes/employee');
const parkstatus = require('./routes/parkstatus');
const events = require('./routes/events');
const rides = require('./routes/rides');
const shops = require('./routes/shops');
const employeeAuth = require('./routes/employeeAuth');

// Use your route handlers
app.use('/admin', auth);
app.use('/employee', employee);
app.use('/parkstatus', parkstatus);
app.use('/events', events);
app.use('/rides', rides);
app.use('/shops', shops);
app.use('/employees', employeeAuth);

// Define the PORT variable
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
