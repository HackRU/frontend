import React from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';

class Slack extends React.Component {

constructor (props){
    super(props);
}

getData(){
  return fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/dayof-slack')
  .then((response) => response.json())
  .then((responseJson) => {
    this.setState({data: responseJson.feed.entry});
  })
  .catch((error) => {
    console.error(error);
  });

}

componentDidMount() {
  this.getData();
}

render() {
  let articles = this.props.data.map(function (articleData, index) {
  return (
    <div> {articleData.title.$t}<br>{articles}</div>;
  );
}

}
export default Slack;
