import React from 'react';
import ReactDOM from 'react-dom';
import md5 from 'md5';

class Logged extends React.Component {

constructor (props){
    super(props);
    this.state = {
      messageText:'samele message',
    };
}

render() {
  return (
    <div className="text-center">
    <h4> You are already logged in</h4>
    <h2> Application Status: Pending </h2>

    <button type="button" className="btn btn-primary custom-btn p-3 my-3" id="launch-modal" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="static"><h4 className="my-0">View/Finish your Application</h4></button>,
    </div>
);

}

}
export default Logged;
