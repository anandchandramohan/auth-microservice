var express = require('express');
var json = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var morgan = require('morgan');
var apiRouter = require('./routes/api-routes');


// defining the Express app
const app = express();
// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));
// defining an endpoint to return all ads

//let userRoutes = require("./controllers/usercontroller");
//let authRoutes = require("./controllers/authcontroller");
// Use Api routes in the App
app.use("/", apiRouter);
//app.use("/user", userRoutes);
//app.use("/auth", authRoutes);
// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});