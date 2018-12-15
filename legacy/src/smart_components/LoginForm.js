//LoginForm.js
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as loginActions from 'action_creators/LoginActions';
import ContentSection from 'dumb_components/ContentSection';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.attemptReset = this.attemptReset.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    //this.onMlhLogin = this.onMlhLogin.bind(this);
  }


  componentDidMount() {
    this.props.checkURL();
  }

  changeEmail = (e) => {
    e.preventDefault();
    this.props.changeEmail(e.target.value);
  }

  changePassword = (e) => {
    e.preventDefault();
    this.props.changePassword(e.target.value);
  }

  attemptReset = (e) => {
    e.preventDefault();
    let user = this.props.loginManager;
    this.props.resetPassword(user);
  }

  signUp = (e) => {
    e.preventDefault();
    let user = this.props.loginManager;
    this.props.signUp(user);
  }

  login = (e) => {
    e.preventDefault();
    let user = this.props.loginManager;
    this.props.login(user);

  }
  
  /*NOT NEEDED
  onMlhLogin = (e) => {
    e.preventDefault();
    let user = this.props.loginManager;
    this.props.mlhLogin(user);
  }*/

  render = () => (
    <Fragment>
      <ContentSection bodyClasses="register-root" title="Login">
        <div className="react-form">
          <form className="form-group">
            <div className="form-group row my-3"> {/*EMAIL FIELD*/}
              <label className="col-lg-3 col-form-label" htmlFor="email-input">
                <h4 className="font-weight-bold blue">{'EMAIL'}</h4>
              </label>
              <div className="col-lg-9">
                <input className="form-control form-control"
                  id="email-input"
                  onChange={this.changeEmail}
                  type="email"
                  autoFocus="true"
                />
              </div>
            </div>
            <div className="form-group row my-1"> {/*PASSWORD FIELD*/}
              <label className="col-lg-3 col-form-label" htmlFor="pw-input">
                <h4 className="font-weight-bold blue">{'PASSWORD'}</h4>
              </label>
              <div className="col-lg-9">
                <input className="form-control form-control"
                  id="pw-input"
                  onChange={this.changePassword}
                  type="password"
                />
              </div>
            </div>
            <div className="row text-center"> {/*ERROR MESSAGE*/}
              <label className="col-12 col-form-label mb-2 mt-2"><h4 className="text-lg p-xs-2 p-md-3 badge badge-purple">{this.props.loginManager.errorMessage}</h4></label>
              {this.props.loginManager.errorMessage && 
                  (!this.props.loginManager.magicLink || this.props.loginManager.forgottenPassword) &&
                  <div className="col-12">
                    <button className="btn btn-primary p-xs-2 p-md-3"
                      onClick={this.attemptReset}
                      type="button"
                    >
                      <h6 className="UC ">{(this.props.loginManager.magicLink) ? 'Apply magic link': 'Forgot Password'}</h6>
                    </button>
                  </div>
              }
            </div>
            <div className="form-group row mt-2">
              <div className="col-12 text-center">
                <button className="btn btn-primary custom-btn p-xs-2 p-md-3 mr-2"
                  onClick={this.login}
                  type="button"
                >
                  <h6 className="UC">{'Login'}</h6>
                </button>
                <button className="btn btn-primary custom-btn my-1 p-xs-2 p-md-3"
                  onClick={this.signUp}
                  type="button"
                >
                  <h6 className="UC">{'Sign Up'}</h6>
                </button>
                {/*<button className="btn btn-primary p-xs-2 p-md-3 my-2"
                  onClick={this.onMlhLogin}
                  type="button"
                >
                  <h6 className=" UC">{'Log in/Sign Up with MLH'}</h6>
                </button>*/}
              </div>
            </div>
          </form>
        </div>
      </ContentSection>
      {/*<ContentSection bodyClasses="regiser-root" headerClasses="mt-4" title="Registration is Closed!">
        <p className="content-desc">{'HackRU is not currently accepting new registrants at this time. You may login and alter the details of an existing application.'}</p>
      </ContentSection>*/}
    </Fragment>
  );
}

LoginForm.propTypes = {
  loginManager: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    forgottenPassword: PropTypes.bool,
    magicLink: PropTypes.string,
    errorMessage: PropTypes.string
  }).isRequired,
  checkURL: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
  //mlhLogin: PropTypes.func.isRequired not in use

};

function mapStateToProps(state) {
  return {
    loginManager: state.loginManager
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkURL: loginActions.checkURL,
    changeEmail: loginActions.changeEmail,
    changePassword: loginActions.changePassword,
    resetPassword: loginActions.resetPassword,
    signUp: loginActions.signUp,
    login: loginActions.login
    //mlhLogin: loginActions.mlhLogin not in use
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginForm);
