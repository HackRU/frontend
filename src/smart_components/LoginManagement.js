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
    //console.log('cookies check');
    this.props.checkCookies();
  }
  
  

  render() {
    
    const Fragment = React.Fragment;

    const loggedIn = this.props.viewController.loggedIn;

    let activeForm = null;

    if(loggedIn === true) {

      //user form
      activeForm = <UserForm />;
    } else {

      //login form
      activeForm = <LoginForm />;
    }

    return (
      <Fragment>
        {activeForm}
      </Fragment>
    );
  }

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
