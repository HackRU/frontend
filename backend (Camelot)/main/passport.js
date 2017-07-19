// Dependencies
const mongoose      = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const MyMLHStrategy = require('passport-mymlh').Strategy;
const bcrypt        = require('bcrypt-nodejs');
const User          = require('../models/user.js');
const config        = require('../config/config.js');

// Initialization function
const init = function PassportSetup(passport) {
  passport.serializeUser((user, callback)=>{
    callback(null, user._id);
  });

  passport.deserializeUser((_id, callback)=>{
    User.findOne({ '_id': _id }, (err, user)=>{
      callback(err, user);
    });
  });

  // Handle Authentication Through MyMLH
  passport.use(new MyMLHStrategy({
    clientID: config.MYMLH_CLIENT_ID,
    clientSecret: config.MYMLH_SECRET,
    callbackURL: config.MYMLH_CALLBACK,
    scope: [
      'email',
      'phone_number',
      'demographics',
      'birthday',
      'education',
      'event'
    ]
  }, (accessToken, refreshToken, profile, callback)=>{
    process.nextTick(()=>{
      // Check if the user exists in the database
      User.findOne({'mlh_data.mlhid': profile.id}, (err, user)=>{
        if (err) {
          return callback(err);
        }
        // If a user was found, then return the user.
        if (user) {
          console.log("Found User");
          return callback(null, user);
        } else {
          console.log("Creating new User");
          // Create a New User
          var newUser = new User();

          // MyMLH Data
          newUser.mlh_data.mlhid = profile.id;
          newUser.mlh_data.email = profile.email;
          newUser.mlh_data.first_name = profile.first_name;
          newUser.mlh_data.last_name = profile.last_name;
          newUser.mlh_data.level_of_study = profile.level_of_study;
          newUser.mlh_data.major = profile.major;
          newUser.mlh_data.shirt_size = profile.shirt_size;
          newUser.mlh_data.dietary_restrictions = profile.dietary_restrictions;
          newUser.mlh_data.special_needs = profile.special_needs;
          newUser.mlh_data.date_of_birth = profile.date_of_birth;
          newUser.mlh_data.gender = profile.gender;
          newUser.mlh_data.phone_number = profile.phone_number;
          newUser.mlh_data.school = profile.school;

          // Our Data
          newUser.local.email = profile.email;
          newUser.local.password = 'defacto';
          newUser.role.director = false;
          newUser.role.admin = false;
          newUser.role.organizer = false;
          newUser.role.volunteer = false;
          newUser.role.mentor = false;
          newUser.role.attendee = true;
          newUser.registration_status = 0;
          newUser.github = '';
          newUser.resume = '';
          newUser.data_sharing = 'false';

          // User ID is determined by how many have registered.
          var nextAvailableID = User.count({}, (err, count)=>{
            newUser.id = count;

            newUser.save((err)=>{
              if (err) {
                throw err;
              }
              return callback(null, newUser);
            });
          });
        }
      });
    });
  }));
};

module.exports = init;
