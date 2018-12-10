import React from 'react';
import ReactDOM from 'react-dom';
import resURLS from 'resources/resURLS';

class Events extends React.Component {

  constructor (props){
    super(props);
    this.loadData = this.loadData.bind(this);
  }
  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 30000);
  }

  state = {
    body: []
  }


  async loadData() {
    try {
      const res = await fetch(resURLS.lcsEventsURL,
        {
          mode: 'cors',
          credentials: 'omit'
        });
      const blocks = await res.json();
      this.setState({
        body: blocks.body
      });
    } catch (e) {
      console.log(e);
    }
  }

  render () {

    const day = (dt) => (dt.split('T')[0].split('-')[2] === '06')? 'Saturday': 'Sunday';
    const time = (dt) => dt.split('T')[1].split('-')[0];

    return (
      <div className="">
        {this.state.body && this.state.body.map(key =>
          (<span>
            <h5 className="content-title">
              {(key.summary)}
            </h5>
            <p className="content-desc mb-3">
              <span className="font-weight-bold">
                { `${day(key.start.dateTime)} ${tConvert(time(key.start.dateTime))} - ${tConvert(time(key.end.dateTime))}` }
              </span>
              <br/>
              {key.location && ' Location: ' + key.location}
            </p>
          </span>)
        )}
      </div>
    );
  }
}

function tConvert (time) {
// Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  var newTime = time.join (''); // return adjusted time or original string
  var returnTime = newTime.substring(0, newTime.length - 5) + ' ' + newTime.substring(newTime.length-2, newTime.length);
  return returnTime;
}

export default Events;
