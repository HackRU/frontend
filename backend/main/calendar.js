var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var GCEvent = require('../models/GCEvent.js');
var request = require('request');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_DIR = './.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs.json';
const CALENDAR_ID = 'hl4bsn6030jr76nql68cen2jto@group.calendar.google.com';
const CALLBACK_ADDRESS = 'https://hackru.org/callback/calendar';
var   TOKEN;
var   CHANNEL_ID;

var AUTH;
var WATCH_LIST;
// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), storeAuth);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      var parsed = JSON.parse(token);
      TOKEN = parsed.access_token;
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function storeAuth(auth){
  AUTH = auth;
}

/**
 *
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
module.exports.loadEvents = function loadEvents() {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: AUTH,
    calendarId: CALENDAR_ID,
    timeMin: (new Date(2017,3,21)).toISOString(),
    timeMax: (new Date(2017,3,25)).toISOString(),
    showDeleted:true,
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
  } else {
      for (var i = 0; i < events.length; i++) {
        var data = events[i];

        var gcevent = {
          eventid: data.id,
          active: false,
          title: data.summary,
          description: data.description,
          loc: data.location,
          startData: data.start.date,
          startDateTime: data.start.dateTime,
          endDate: data.end.date,
          endDateTime: data.end.dateTime
        };


        if(data.status == 'cancelled'){
          GCEvent.remove({eventid:data.id},(err,res)=>{
            if(err) console.log(err);
          });
        }else{GCEvent.findOneAndUpdate({eventid:gcevent.eventid} ,gcevent,{upsert:true, new:true},(err,res)=>{
          if(err) console.log(err);
        });
        }

      }
      console.log("DONE LOADING EVENTS");
    }
  });
}

module.exports.setUpPushNotifications = function pushNotifications(){
  fs.readFile('./config/watchlist.json',(err,data) =>{
    if(err){
      setupNewWatchList();
    }
    else{
      WATCH_LIST = JSON.parse(data);
      if(WATCH_LIST.expiration < Date.now()){
        setupNewWatchList();
      }
    }
  });
}

function setupNewWatchList(){


  var xurl = 'https://www.googleapis.com/calendar/v3/calendars/' + CALENDAR_ID + '/events/watch';
  CHANNEL_ID = guid();
  var xtoken = 'dashboard-calendar-notifications';
  var xaddress = CALLBACK_ADDRESS;

  var bodyParams ={
    id: CHANNEL_ID,
    type: 'web_hook',
    address: xaddress,
  }
  var pathParams = {calendarId: CALENDAR_ID,resource:bodyParams};

  google.options({auth:AUTH});
  var calendar = google.calendar('v3');
  calendar.events.watch(pathParams,function(err, response) {
    console.log("ERROR: ",err);
    console.log("RESPONSE: ", response);
    WATCH_LIST = response;
    fs.writeFile('./config/watchlist.json',JSON.stringify(WATCH_LIST));
  });
}

function guid(){
  function s4(){
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();

}
module.exports.setUpNewWatchList = setupNewWatchList;
