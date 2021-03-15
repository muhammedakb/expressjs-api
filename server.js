const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const routers = require("./routers/index");

// Environment Variables
dotenv.config({
  path: "./config/env/config.env",
});

// MongoDB connection
connectDatabase();

const app = express();
// Express - Body Middleware
app.use(express.json());

const PORT = process.env.PORT;

// Routers Middleware
app.use("/api", routers);

// Error Handling
app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});
