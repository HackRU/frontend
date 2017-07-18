// Dependencies
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
// Model of what each user looks like in MongoDB
var userSchema = new Schema({
  // MLH Data
  mlh_data: {
    mlhid: Number,
    email: String,
    first_name: String,
    last_name: String,
    level_of_study: String,
    major: String,
    shirt_size: String,
    dietary_restrictions: String,
    special_needs: String,
    date_of_birth: String,
    gender: String,
    school: {
      id: Number,
      name: String
    }
  },

  // Our Data
  local: {
    email: String,
    password: String,
  },
  role: {
    director: Boolean,
    admin: Boolean,
    organizer: Boolean,
    volunteer: Boolean,
    mentor: Boolean,
    attendee: Boolean
  },
  id: Number,
  registration_status: Number,
  github: String,
  resume: String,
  data_sharing: Boolean
  // registration_status:
  // 0 = Fresh User, Only has MyMLH Data
  // 1 = Registered, filled in all Account details
  // 2 = Not Attending
  // 3 = Confirmed Attendance
  // 4 = Waitlisted
});

// Methods for Dealing with Local Logins and Non-MyMLH Users in the future
userSchema.methods.hash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.check = function validatePassword(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
