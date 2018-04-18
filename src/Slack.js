import React from 'react';
import ReactDOM from 'react-dom';

class Slack extends React.Component {

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
      text: [],
    },
  }

  async loadData() {
     try {
        const res = await fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/dayof-slack',
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
   return (
     <div className="">
         {this.state.text && this.state.text.map(key =>
           <span>
           <h5 class="content-title">{JSON.stringify(key.text)}</h5>
           <p class="content-desc mb-3">Time posted: {JSON.stringify(key.ts)}</p>
           </span>
       )}

      </div>
   );
 }
}
export default Slack;
