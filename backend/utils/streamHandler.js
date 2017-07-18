var Tweet = require('../models/Tweet.js');

module.exports = function(stream, io){
    
    //When we get dem tweets
    stream.on('data', function(data){
        if(data['user'] !== undefined){
        
            //new tweet object from data
            var tweet = {
                twid: data['id_str'],
                active:false,
                author: data['user']['name'],
                avatar: data['user']['profile_image_url'],
                body: data['text'],
                date: data['created_at'],
                screenname: data['user']['screen_name']
            };
    
            io.emit('tweet',tweet);

            //new model instance
            //var tweetEntry = new Tweet(tweet);

            //save tweet to db and emit to client
            /*tweetEntry.save(function(err){
                if(!err){
                    
                    io.emit('tweet',tweet);
                }else{
                    console.log("YOU DONE GOOFD SAVING!");
                }
            });*/
        }
    });

}
