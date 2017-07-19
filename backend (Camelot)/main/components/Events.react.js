
var React = require('react');
var Event = require('./Event.react.js');

module.exports = Events = React.createClass({

  // Render our tweets
  render: function(){

    // Build list items of single tweet components using map
    var content = this.props.events.map(function(event){
      return (
        <Event key={event._id} event={event} />
      )
    });

    // Return ul filled with our mapped tweets
    return (
      <div className="events">{content}</div>
    )

  }

}); 
