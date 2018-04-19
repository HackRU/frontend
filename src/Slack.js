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
    const clearBraColon = (msg) => {
      let acc = '';
      let braColon = false;
      let lstIdx = 0;

      for(let i = 0; i < msg.length; i++){
        if((msg[i] === '<' || msg[i] === ':') && !braColon){
          acc += msg.substring(lstIdx, i);
          braColon = true;
        }else if(braColon && (msg[i] === '>' || msg[i] === ':')){
          lstIdx = i + 1;
          braColon = false;
        }
      }

      acc += msg.substring(lstIdx);

      console.log(msg);
      console.log(acc);

      return acc;
    };

   return (
     <div className="">
         {this.state.text && this.state.text.map(key =>
           <span>
           <h5 class="content-title">{clearBraColon(key.text)}</h5>
           <p class="content-desc mb-3">Posted on  {new Date(key.ts*1000).toLocaleDateString()} at {new Date(key.ts*1000).toLocaleTimeString()}</p>
           </span>
       )}

      </div>
   );
 }
}
export default Slack;
