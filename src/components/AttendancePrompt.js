//AttendancePrompt.js
import React from 'react';




class AttendancePrompt extends React.Component {

  constructor(props) {
    super(props)
  }

  reflectPrompt = (userStatus) => {

    if(userStatus === 'checked in') {
      //checked in
      return (
        <div>
          <i className="fas fa-check fa-fw"/>
          <h1 className="blue my-3">{'Welcome to HackRU!'}</h1>
          <h6 className="blue">{'In case of an emergency, call RUPD: 732-932-7211'}</h6>
        </div>
      );
    } else if (userStatus !== 'pending' && userStatus !== 'waitlist' && userStatus !== 'checked in') {
      return (
        <div> 
          <div className="blue">
            <h3>{this.props.upperFlash}</h3>
          </div>
          <button className="btn btn-primary UC custom-btn p-3 my-1 mx-md-1"
            onClick={this.props.attending}
            type="button"
          >
            <h6 className="my-0">{'Attending'}</h6>
          </button>
          <button className="btn btn-primary UC custom-btn p-3 my-1"
            onClick={this.props.notAttending}
            type="button"
          >
            <h6 className="my-0">{'Not Attending'}</h6>
          </button>
          <TravelForm user={this.props.user}/>
        </div>
      );
    }
  
  
  }

  render() {

    return (
    
    );
  }
}

export default AttendancePrompt;
