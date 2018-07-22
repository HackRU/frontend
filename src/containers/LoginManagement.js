//LoginManagement.js
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import LoginForm from 'components/LoginForm';
import UserForm from 'components/UserForm';

class LoginManagement extends React.Component {

  render() {

    const isLoggedIn = this.props.viewController.isLoggedIn;

    let activeForm = null;

    if(isLoggedIn === true) {

      //user form
      activeForm = <UserForm />;
    } else {

      //login form
      activeForm = <LoginForm />;
    }

    return (
      <div>
        {activeForm}
      </div>
    );
  }

}

LoginManagement.propTypes = {
  viewController: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired
  })
};

function mapStateToProps(state) {
  return {
    viewController: state.viewController
  };
}

export default connect(mapStateToProps, null) (LoginManagement);
