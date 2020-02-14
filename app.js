var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var morgan = require('morgan');
var apiRouter = require('./routes/api-routes');
var logger = require('winston');
const jwtAuth = require('./jwtauth/auth.js');


// defining the Express app
const app = express();
// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

// Use Api routes in the App
app.use("/", apiRouter);
//app.use("/user", userRoutes);
//app.use("/auth", authRoutes);
// Handle middleware errors
app.use((err, req, res, next) => {
  let {
    statusCode = 500,
  } = err;
  const {
    message,
  } = err;

  // Validation Errors
  if (err.message.startsWith('ValidationError')) {
    statusCode = 422;
  }
  console.log('Middleware functions');
  logger.error(`Error: ${message}`);
  res.status(statusCode);
  res.json({
    error: true,
    statusCode,
    message,
  });
}); 
// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});