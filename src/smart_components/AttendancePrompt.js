//AttendancePrompt.js
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from 'action_creators/UserActions';
import TravelForm from 'smart_components/TravelForm';

class AttendancePrompt extends React.Component {
  
  constructor(props) {
    super(props);
    this.confirmAttendance = this.confirmAttendance.bind(this);
    this.cancelAttendance = this.cancelAttendance.bind(this);
    this.reflectPrompt = this.reflectPrompt.bind(this);
  }

  confirmAttendance = (e) => {
    e.preventDefault();
    this.props.confirmAttendance(this.props.userManager);
  }

  cancelAttendance = (e) => {
    e.preventDefault();
    this.props.cancelAttendance(this.props.userManager);
  }

  renderCheckedIn = () => (
    <div>
      <h1 className="blue my-3">{'Welcome to HackRU!'}</h1>
      <h6 className="blue">{'In case of an emergency, call RUPD: 732-932-7211'}</h6>
    </div>
  )

  renderAttendance = () => (
    <Fragment> 
      <div className="blue">
        <h3>{this.props.userManager.upperFlash}</h3>
      </div>
      <button className="btn btn-primary UC custom-btn p-3 my-1 mx-md-1"
        onClick={this.confirmAttendance}
        type="button"
      >
        <h6 className="my-0">{'Attending'}</h6>
      </button>
      <button className="btn btn-primary UC custom-btn p-3 my-1"
        onClick={this.cancelAttendance}
        type="button"
      >
        <h6 className="my-0">{'Not Attending'}</h6>
      </button>
    </Fragment>
  )

    
  reflectPrompt = (userStatus) => {
    if(userStatus === 'checkedIn') {
      return this.renderCheckedIn();
    } else if (userStatus !== 'unregistered' && userStatus !== 'pending' && userStatus !== 'waitlist' && userStatus !== 'checked in') {
      return userStatus === 'Loading...' ? '' : this.renderAttendance();
    }
  }

  render = () => (
    <div>
      { this.reflectPrompt(this.props.userStatus) }
      <TravelForm />
    </div>
  )
}

AttendancePrompt.propTypes = {
  userStatus: PropTypes.string,
  userManager: PropTypes.shape({
    upperFlash: PropTypes.string
  }).isRequired,
  confirmAttendance: PropTypes.func.isRequired,
  cancelAttendance: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmAttendance: userActions.confirmAttendance,
    cancelAttendance: userActions.cancelAttendance
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (AttendancePrompt);
