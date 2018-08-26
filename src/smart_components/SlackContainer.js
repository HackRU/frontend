import React, { Component } from 'react';
import SlackMessage from 'dumb_components/SlackMessage';

class SlackContainer extends Component {

  constructor (props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.state = { text: [] };
  }
  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 1000 * 60 * 5); // 5 minutes
  }

  async loadData() {
    try {
      const res = await fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/dayof-slack', {
        mode: 'cors',
        credentials: 'omit'
      });
      const msgs = await res.json();
      console.log(msgs.body);
      this.setState({
        text: msgs.body
      });
    } catch (e) {
      console.log(e);
    }
  }

  getMessages = () => (
    this.state.text.map(message => ({
      // Strip brackets and colon artifacts from slack
      // Do not match patterns with interior whitespace
      text: message.text && message.text.replace(/(:[^:\s]*:)|(<[^>\s]*>)/g, '').trim(),
      date: new Date(message.ts * 1000).toLocaleDateString(),
      time: new Date(message.ts * 1000).toLocaleTimeString()
    }))
  )

  render = () => (
    <div>
      {
        this.getMessages().map((message, index) => <SlackMessage key={index} message={message} />)
      }
    </div>
  )
}

export default SlackContainer;
