const express = require('express');
const cors = require('cors'); // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS
app.use(cors());

// API endpoint
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (!dateParam) {
    // No date provided; use the current date
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If the date is a number (timestamp)
    date = new Date(parseInt(dateParam));
  } else {
    // If the date is a string
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Handle other routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
