//UserForm.js
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AttendancePrompt from 'smart_components/AttendancePrompt';
import InfoPrompt from 'smart_components/InfoPrompt';

import { checkCookies } from 'action_creators/UserActions';

class UserForm extends React.Component{

  constructor(props) {
    super(props);
    this.getUserStatus = this.getUserStatus.bind(this);
  }

  
  getUserStatus = (user) => {
  
    let status = user && user.registration_status;
    if(status && (status === 'registered' || status === 'unregistered' || status === 'rejected')) {

      //we don't show a rejection status
      status = 'pending';
    } else if(status && status === 'confirmation') {

      //accepted and awaiting user confirmation
      status = 'pending confirmation';
    } else if(status) {

      //use whatever's there
      status = status.replace('-', ' ');
    } else {
      
      status = 'Loading';j //kind of hacky
    }
    return status;
  }



  render() {

    const user = this.props.userManager.userInfo;
    const status = this.getUserStatus(user);

    return (   
      <div>
        <div className="content-section"
          id="announcements-div"
        >
          <h2 className="content-section-title">
            <i className="fas fa-sign-in-alt fa-fw" /> 
            <span className="u-highlight">
              {'Status:'}
            </span>
          </h2>
          <div className="content-section-desc register-root">
            <form className="form-group">
              <div className="text-center">
                <h2 className="blue SC"> 
                  {'Status: ' + status} 
                </h2>
                <AttendancePrompt userStatus={status}/>
              </div>
            </form>
          </div>
        </div>
        <InfoPrompt userStatus={status}/>
      </div>
    
    );
  
  }

}

UserForm.propTypes = {
  userManager: PropTypes.shape({
    userInfo: PropTypes.shape({
      registration_status: PropTypes.string
    }).isRequired
  }).isRequired,
  checkCookies: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkCookies: checkCookies
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (UserForm);
