var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    eventid            : String,
    active        : Boolean,
    title         : String,
    description   : String,
    loc           : String,
    startDate     : String,
    startDateTime : String,
    endDate       : String,
    endDateTime   : String
});

schema.statics.getEvents = function(page,skip,callback){
    

    var events = [];
    var start = (page*10)+(skip*1);

    GCEvent.find({},'eventid active title description loc startDate startDateTime endDate endDateTime',{skip:start}).sort({startDateTime:'asc'}).exec(function(err,docs){
        if(!err){
        
            events = docs;
            events.forEach(function(e){
                e.active = true; 
            });
        }else{
            console.log("YOU DONE GOOFD");
        }
        callback(events);
    }); 
};

module.exports = GCEvent = mongoose.model('GCEvent',schema);
