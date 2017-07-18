// Dependencies
const express         = require('express'); // Handling Routes
const helmet          = require('helmet'); // Protects from various attacks. Put helmet on before everything to protect us
const path            = require('path'); // Helps with defining file paths in file system
const morgan          = require('morgan'); // Request Logging
const bodyParser      = require('body-parser'); // Helps parse Body presponses from HTTP Requests.
const ejs             = require('ejs'); // Templating Engine
const flash           = require('connect-flash'); // Flash messages at users. Messages go in the <%= message %> tags in the .ejs files in /views
const mongoose        = require('mongoose'); // MongoDB helper. Helps with interaction between Node.js Application and MongoDB
const session         = require('express-session'); // Sets up cookies so our application can remember users
const RedisStore      = require('connect-redis')(session); // Saves cookies with Redis
const passport        = require('passport'); // Helps with Authentication
const multer          = require('multer'); // Helps with File Uploading for resumes and stuff
const routes          = require('./main/routes.js'); // Contains Routes
const errors          = require('./main/errors.js'); // Contains Response for invalid HTTP Requests
const passConfig      = require('./main/passport.js'); // Contains Passport Setup, Deserialization and Serialization of Users.
const multerConfig    = require('./main/multer.js'); // Contains the set up of file storage for uploads
const config          = require('./config/config.js'); // Contains secrets
//Dashboard specific stuff
const eventfeed       = require('./main/calendar.js');
const slackfeed       = require('./main/loadmsgs.js');

// Set up Application
// ***********************************************************
// Everything here is done in sequential order.
// Please don't move anything unless you are adding something.
// ***********************************************************
const app = express(); // Initialize Express
var port = process.env.PORT || 8080; // Determine Port to listen on

mongoose.connect(config.db.url); // Connect to MongoDB
passConfig(passport); // Setup passport with configurations

var upload = multerConfig(multer, config); // Set up multer into varibale upload to pass to routes.js

app.use(helmet()); // For Protection
app.use(morgan('dev')); // Logging
app.use(bodyParser.urlencoded({ extended: true })); // Enable x-www-form-urlencoded parsing
app.use(bodyParser.json()); // Enable JSON parsing
app.use(express.static(__dirname + "/views")); // Look for templates in /views
app.set('view engine', 'ejs'); // Use EJS as templating engine
app.use(flash()); // Enable Flash messages

// Set up Sessions for Redis
app.use(session({
  store: new RedisStore(config.session.options),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  }
}));
app.use(passport.initialize()); // Start up passport
app.use(passport.session()); // Authenticates users from their cookies

// Initialize Routes Handler
routes(app, config, passport, upload);
// Load Error Handling last
errors(app);

// #dashboard things
setTimeout(eventfeed.loadEvents,5000);
//setTimeout(eventfeed.setUpPushNotifications,5000);
slackfeed.loadMsgs();


// Launch
app.listen(port);
console.log('Listening on port: %d', port);
