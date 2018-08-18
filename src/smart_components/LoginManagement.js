//LoginManagement.js
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { checkCookies } from 'action_creators/UserActions';

import LoginForm from 'smart_components/LoginForm';
import UserForm from 'smart_components/UserForm';

class LoginManagement extends React.Component {
  componentDidMount() {
    this.props.checkCookies();
  }

  render = () => (
    this.props.viewController.loggedIn ? <UserForm /> : <LoginForm />
  )
}

LoginManagement.propTypes = {
  viewController: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired
  }),
  checkCookies: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    viewController: state.viewController
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkCookies: checkCookies
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginManagement);
