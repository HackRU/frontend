var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var schema = new mongoose.Schema({
    ts    : String,
    text  : String,
    user  : String
});

//Static method to return tweet data from db
schema.statics.getSlackMsgs = function(page,skip,callback){
    
    var msgs = [];
    var start = (page*10)+(skip*1);

    SlackMsg.find({},'ts text user',{skip:start, limit:6}).sort({ts:'desc'}).exec(function(err,docs){
        if(!err){
            msgs = docs;
        }else{
            console.log("YOU DONE GOOFD");
        }
        callback(msgs);
    }); 
};

module.exports = SlackMsg = mongoose.model('SlackMsg',schema);
