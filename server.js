// DEPENDENCIES MODULE and STARTUP CONFIG
const express  = require('express');
var app        = express();
var port       = process.env.PORT || 3000;
var host       = process.env.host || 'localhost';

var mongoose = require('mongoose'); //MongoDB ORM
var bodyParser = require('body-parser'); //Body Parser

// MIDDLEWARES
// ==============================================

//route middleware that will happen on every request
var router = express.Router();
router.use( function(req, res, next) {
    console.log(req.method, ' - ', req.url);
    next();
});
app.use(router);

//Body parsers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //JSON

// ROUTES
// ==============================================
const routes = require('./routes');
app.use(routes);


// START THE SERVER
// ==============================================
var server = app.listen( port, host, function() {
    const addr = server.address();
    console.log( new Date().toISOString() + ": API Server started at: http://%s:%s", addr.address, addr.port);
});

// CONNECT TO MONGODB
// ==============================================
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/surveySystem",
    { useNewUrlParser: true }
);
  
// mongoose connection
var mongooseConnection = mongoose.connection;
  
// Get the default connection
mongooseConnection.on(
    "error",
    console.error.bind(console, "MongoDB - connection error:")
);
  
mongooseConnection.once("open", function() {
    console.log("MongoDB - Successfully Connected to Database.");
});