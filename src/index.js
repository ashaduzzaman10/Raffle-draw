require('dotenv').config(); // Fixed path for dotenv config
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use([morgan('dev'), cors(), express.json()]);
app.use('/api/v1/tickets', require('./routes'));

// health route
app.get('/health', (_req, res) => {
  res.status(200).json({
    message: 'success',
  });
});

// global error handler
app.use((_req, _res, next) => {
  const error = new Error('Resource not found !!'); // Corrected error message
  error.status = 404;
  next(error);
});

// error handler
app.use((error, _req, res, _next) => {
  console.log(error);
  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
      status: error.status, // Include the status property
    });
  }
  res.status(500).json({
    message: 'Something went wrong in the server',
    status: 500, // Include the status property
  });
});

// enabling port for your server
const PORT = process.env.PORT || 8080;

// listen to the server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT : ${PORT}`);
});
