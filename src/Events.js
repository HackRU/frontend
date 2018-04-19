import React from 'react';
import ReactDOM from 'react-dom';

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
    dataIsBody: {
      summary: [],
    },
  }

  async loadData() {
     try {
        const res = await fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/dayof-events',
            {
              mode: 'cors',
              credentials: 'omit'
            });
        const blocks = await res.json();
        const dataBody = blocks;
        this.setState({
           text: blocks.body
        })
    } catch (e) {
        console.log(e);
    }
  }

  render () {

   const day = (dt) => (dt.split('T')[0].split('-')[2] === '21')? 'Saturday': 'Sunday';
   const time = (dt) => dt.split('T')[1].split('-')[0];

   return (
     <div className="">
         {this.state.text && this.state.text.map(key =>
           <span>
           <h5 className="content-title">{(key.summary)}</h5>
           <p className="content-desc mb-3">
           From {day(key.start.dateTime)} at {time(key.start.dateTime)} to {day(key.end.dateTime)} at {time(key.end.dateTime)}.
           {key.location && " In the " + key.location + '.'}
           </p>

           </span>
       )}

      </div>
   );
 }
}
export default Events;
