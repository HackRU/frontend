import React from 'react';

class SlackContainer extends React.Component {

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
      const msgs = await res.json().body;
      console.log(msgs);
      this.setState({
        text: msgs
      });
    } catch (e) {
      console.log(e);
    }
  }

  render () {
    const formatMessage = (key) => ({
      // Strip brackets and colon artifacts from slack
      // Do not match patterns with interior whitespace
      text: key.message.replace(/(:[^:\s]*:)|(<[^>\s]*>)/g, ''),
      date: new Date(key.ts * 1000).toLocaleDateString(),
      time: new Date(key.ts * 1000).toLocaleTimeString()
    });

    const text = this.state.text;
    const messages = text.map(formatMessage);

    return <SlackView messages={messages} />;
  }
}

class SlackView extends React.Component {
  render() {
    return (
      <div className="">
        {this.props.messages.map(message =>
          <span>
            <h5 class="content-title">{message.text}</h5>
            <p class="content-desc mb-3">Posted on  {message.date} at {message.time}</p>
          </span>
        )}
      </div>
    );
  }
}

export default SlackContainer;
