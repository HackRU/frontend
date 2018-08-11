//TravelForm.js
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from 'action_creators/UserActions';


class AdminDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.selectDestination = this.selectDestination.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.toggleTravel = this.toggleTravel.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
    this.showTravelForm = this.showTravelForm.bind(this);
    this.getTravelInfo = this.getTravelInfo.bind(this);
    this.getEstimate = this.getEstimate.bind(this);
  }


  showDashboard = (userInfo) => {
    
    if(userInfo === 'director' || userInfo === 'organizer') {
    
      return (
        <span>
          <br/>
          <button>{'I have pressed this button'}</button>
        </span>
      );
    } 
    else {
      return null;
    }
  }

  render() {
    
    let adminDashbaord = this.getAdminDashbaord(this.props.userStatus);

    return (
      <div>
        {adminDashbaord}
      </div>
    );
  }
}

AdminDashboard.propTypes = {
//   userManager: PropTypes.shape({
//     userInfoEmail: PropTypes.string,
//     token: PropTypes.token,
//     hasResume: PropTypes.bool,
//     userInfo: PropTypes.object,
//     travelReady: PropTypes.bool,
//     flash: PropTypes.string,
//     upperFlash: PropTypes.string
//   }).isRequired,
//   finalizeTravel: PropTypes.func.isRequired,
//   userRole: PropTypes.func.isRequired,
//   toggleTravel: PropTypes.func.isRequired,
//   updateTravel: PropTypes.func.isRequired,
//   userStatus: PropTypes.string
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager
  };
}

export default connect(mapStateToProps) (AdminDashboard);