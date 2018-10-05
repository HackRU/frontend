//UserForm.js
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import AttendancePrompt from 'smart_components/AttendancePrompt';
import InfoPrompt from 'smart_components/InfoPrompt';
import ContentSection from 'dumb_components/ContentSection';

class UserForm extends React.Component {
  render() {
    const status = this.props.viewController.userStatus;
    return (
      <div>
        <ContentSection bodyClasses="register-root mb-5" title="Status:">
          <form className="form-group">
            <div className="text-center">
              <h2 className="SC blue">
                {'Status: ' + status}
              </h2>
              <AttendancePrompt userStatus={status}/>
            </div>
          </form>
        </ContentSection>
        <InfoPrompt/>
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
