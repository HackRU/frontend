var fs = require('fs');
var Tweet = require('../models/Tweet.js');
var twitter = require('twitter');
var config = require('../config/config.js');
var mongoose = require('mongoose');
/**
 *
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
module.exports.loadTweets= function loadEvents() {
  var twit = new twitter(config.twitter);
  
  twit.get('statuses/user_timeline',{user_id:'244296954',include_rts:true},(err,tweets,res)=>{
      if(err) throw err;



      for(var i = 0; i < tweets.length; i++){
        var data = tweets[i];
        var tweet = {
          twid: data.id_str,
          active: false,
          author: data.user.name,
          avatar: data.user.profile_image_url,
          body: data.text,
          date: data.created_at,
          screenname: data.user.screen_name
        };

        Tweet.findOneAndUpdate({twid:tweet.twid},tweet,{upser:true,new:true},(err,res)=>{
          if(err) console.log(err);
        });
      }


    

      console.log("DONE LOADING TWEETS");
    });

}
