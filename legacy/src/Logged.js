import React from 'react';
import ReactDOM from 'react-dom';

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

        <button className="btn btn-primary custom-btn p-3 my-3"
          data-backdrop="static"
          data-target="#exampleModalCenter"
          data-toggle="modal"
          id="launch-modal"
          type="button"
        ><h4 className="my-0">View/Finish your Application</h4></button>,
      </div>
    );

  }

}
export default Logged;
