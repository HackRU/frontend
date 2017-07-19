var mongoose = require('mongoose');
mongoose.Promise=require('bluebird');

var schema = new mongoose.Schema({
    twid        : String,
    active      : Boolean,
    author      : String,
    avatar      : String,
    body        : String,
    date        : Date,
    screenname  : String
});

//Static method to return tweet data from db
schema.statics.getTweets = function(page,skip,callback){
    
    var tweets = [];
    var start = (page*10)+(skip*1);

    Tweet.find({},'twid active author avatar body date screenname',{skip:start, limit: 10}).sort({date:'desc'}).exec(function(err,docs){
        if(!err){
            tweets = docs;
            tweets.forEach(function(tweet){
                tweet.active = true; 
            });
        }else{
            console.log("YOU DONE GOOFD");
        }
        callback(tweets);
    }); 
};

module.exports = Tweet = mongoose.model('Tweet',schema);
