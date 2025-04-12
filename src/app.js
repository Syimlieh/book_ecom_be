const express = require("express");
const cors = require("cors");
const { v1 } = require("uuid");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
const httpLogger = require("./log/http.logger");
const logger = require("./log/logger");
const { errorHandler } = require("./middlewares/error.middleware");
const { rateLimiter } = require("./middlewares/rate.limiter.middleware");
//dotenv
require("dotenv").config();
const app = express();

// CORS
app.use(cors());

app.use(rateLimiter);

// JSON Parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(httpLogger);
app.use(helmet());


// Headers Middleware
app.use((req, res, next) => {
  res.setHeader("Surrogate-Control", "no-store");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Expires", "0");

  req.timestamp = Date.now();
  req.correlationId = v1();
  logger.info(`API: ${req.path} | STATUS: REQUEST`);
  next();
});

// Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
require("./routes")(app);

app.use(errorHandler);

// Catch-all
// app.use("*", (req, res) => {
//   const message = "You reached a route that is not defined on this server";
//   return formatResponse(res, { message }, 404);
// });

module.exports = app;
