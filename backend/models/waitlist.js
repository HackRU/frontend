// Dependencies
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var waitlistSchema = new Schema({
  id: Number,
  mlhid: Number,
  datetime: { type: Date, default: Date.now }
});

// Mongoose pluralizes Collection Name if one isn't set
waitlistSchema.set('collection', 'waitlist')

module.exports = mongoose.model('Waitlist', waitlistSchema);
