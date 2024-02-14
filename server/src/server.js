// Main starting file
const express = require("express");
const app = express();
const infoChecker = require("./commons/middlewares/infoChecker");
const config = require("./config");
const router = require("./routes");
const errorHandler = require("./handlers/error/error.handler");

// Middlewares
app.use(express.static(__dirname)); // built-in middleware
// third party middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application level middlewares
app.use(infoChecker); // for logging and cleansing

app.all("/*", router);

// Error handling middleware (keep below routes)
app.use(errorHandler);

app.listen(config.apiPort, () => {
  console.log(`Server started on ${config.apiPort}`);
});
