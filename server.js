const express = require('express');
const app = express();

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});
