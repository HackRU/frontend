//LoginManagement.js
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import LoginForm from 'components/LoginForm';
import UserForm from 'components/UserForm';

class LoginManagement extends React.Component {

  render() {

    const isLoggedIn = this.props.loginManager.isLoggedIn;

    let activeForm = null;

    if(isLoggedIn === true) {

      //user form
      activeForm = <UserForm />;
    } else {

      //login form
      activeForm = <LoginForm />;
    }

    return ({activeForm});
  }

}

LoginManagement.propTypes = {
  loginManager: PropTypes.arrayOf(
    PropTypes.shape({
      isLoggedIn: PropTypes.bool.isRequired
    })
  )
};

function mapStateToProps(state) {
  return {
    loginManager: state.loginManger
  };
}

export default connect(mapStateToProps) (LoginManagement);
