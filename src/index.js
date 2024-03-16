require("dotenv").config("/.env");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();


app.use([morgan("dev"), cors(), express.json()]);

// health route

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

// global error handler
app.use((req, res, next) => {
  const error = new Error("resource not found !!");
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({
      message : error.message,
    })
  }
  res.status(500).json({
    message : 'something went wrong in server '
  })
})
// enabling port for your server 
const PORT = process.env.PORT || 8080;

// listen to the server 

app.listen(PORT, () => {
  console.log(`server is listening on PORT : ${PORT}`);
});
