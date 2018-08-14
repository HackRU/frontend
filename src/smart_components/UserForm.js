//UserForm.js
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import AttendancePrompt from 'smart_components/AttendancePrompt';
import InfoPrompt from 'smart_components/InfoPrompt';
import AdminDashboard from 'smart_components/AdminDashboard';


class UserForm extends React.Component{

  

  render() {

    let status = this.props.viewController.userStatus;
    if(!status) {
      //loading
      status = 'Loading...';
    }
    return (   
      <div>
        <div className="content-section"
          id="announcements-div"
        >
          <h2 className="content-section-title">
            <span className="u-highlight">
              {'Status:'}
            </span>
          </h2>
          <div className="content-section-desc register-root">
            <form className="form-group">
              <div className="text-center">
                <h2 className="SC SC-white"> 
                  {'Status: ' + status} 
                </h2>
                <AttendancePrompt userStatus={status}/>
              </div>
            </form>
          </div>
        </div>
        <InfoPrompt userStatus={status}/>
        <AdminDashboard userInfo={status} />
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
  viewController: PropTypes.shape({
    userStatus: PropTypes.string
  }).isRequired
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager,
    viewController: state.viewController
  };
}

export default connect(mapStateToProps, null) (UserForm);
