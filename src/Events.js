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
              mode: 'no-cors',
              credentials: 'omit',
              headers: {
                'Access-Control-Allow-Origin': 'application/json',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });
        const blocks = await res.json();
        const dataBody = blocks;
        this.setState({
           summary: blocks.body
        })
    } catch (e) {
        console.log(e);
    }
  }

  render () {
   return (
     <div className="">
         {this.state.text && this.state.text.map(key =>
           <span>
           <h5 class="content-title">{JSON.stringify(key.summary)}</h5>

           </span>
       )}

      </div>
   );
 }
}
export default Events;
