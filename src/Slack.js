import React from 'react';
import ReactDOM from 'react-dom';

class Slack extends React.Component {

  constructor (props){
      super(props);
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
        const res = await fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/dayof-slack');
        const blocks = await res.json();
        const dataBody = blocks.body.text;

        this.setState({
           dataIsBody: dataBody,
        })
    } catch (e) {
        console.log(e);
    }
  }
  render () {
   return (
     <div className="admin">
       <h3>Input Data! IS HERE WTF</h3>
         <div> {JSON.stringify(this.state.dataIsBody)} </div>
      </div>
   );
 }
}
export default Slack;
