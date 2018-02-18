import React from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';

class Col extends React.Component {

constructor (props){
    super(props);
    this.state = {
      messageText:'samele message',
    };
}

render() {
  return (
     <div className="col box-shadow mycard mx-2"> {1+1} = {this.messageText} </div>
);

}

}
export default Col;
