var React = require('react');

function normalize(time){
  var hours =  parseInt(time.slice(0,2));
  var meridiem = "am";
  if(hours >= 12){
    hours = hours % 12;
    meridiem = "pm";
  }
  if(hours == 0) hours = 12;
  return hours + time.slice(2,8)+meridiem;
}

module.exports = Event = React.createClass({
  render: function(){
    var event = this.props.event;
    return (
      <div className={'event' + ' active'}>
          <h3>{event.title}</h3>
          <p>Location: {event.loc}</p>
          <p>Description: {event.description}</p>
          <p>Start: {normalize(event.startDateTime.slice(11,19))}</p>
          <p>End: {normalize(event.endDateTime.slice(11,19))}</p>
      </div>
    )
  }
});
