//DashboardProfile.js
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import resURLS from 'resources/resURLS';
import { logoutUser } from 'action_creators/ViewActions';
import { save } from 'action_creators/UserActions';

class DashboardProfile extends React.Component {

  constructor(props) {
    super(props);
    this.listInfo = this.listInfo.bind(this);
    this.logout = this.logout.bind(this);
    this.save = this.save.bind(this);
  }

  logout = (e) => {
    e.preventDefault();

    this.props.logoutUser(this.props.userManager);
  }

  save = (e) => {
    e.preventDefault();
    this.props.save(this.props.userManager);
  }

  listInfo = (user) => {

    const github = (user.github_username)? user.github_username: '';
    const firstName = (user.first_name)? user.first_name: '';
    const lastName = (user.last_name)? user.last_name: '';
    const email = (user.email)? user.email: '';
    const school = (user.school)? user.school: '';
    const levelOfStudy = (user.level_of_study)? user.level_of_study: '';
    const major = (user.major)? user.major: '';
    const giveSaveOption = (this.props.userManager.hasUnsavedChanges === true)? 
      (
        <h6>
          <a href="." onClick={this.save}>
            {'Save Changes'}
          </a>
        </h6>
      ):'';

    return (
      <div className="left-header">
        <h2 className="font-weight-bold"> 
          {firstName + ' ' + lastName}
        </h2>
        {giveSaveOption}
        <h6 className="profile-text">
          <a href="#" onClick={this.logout}>
            {'Logout'}
          </a>
        </h6>
        <br />
        <span>
          <h6 className="profile-text">
            <i className="fas fa-envelope fa-fw" />
            {email}
          </h6>
          <br />
        </span>
        <span>
          <h6 className="profile-text">
            <i className="fas fa-graduation-cap fa-fw" />
            {school}
          </h6> 
          <br />
        </span>
        <span>
          <h6 className="profile-text">
            <i className="fas fa-user fa-fw" />
            {levelOfStudy}
          </h6> 
          <br />
        </span>
        <span>
          <h6 className="profile-text">
            <i className="fas fa-lightbulb fa-fw" />
            {major}
          </h6> 
          <br />
        </span>
        <h6 className="profile-text">
          <i className="fab fa-github fa-fw" /> 
          <a href={'http://github.com/' + github}
            target="_blank"
            rel="noopener noreferrer"  
          >
            {github}
          </a>
        </h6> 
      </div>
    );
  }



  render() {

    let header;
    let style;
    let img;

    if(!this.props.viewController.loggedIn) {
      
      //not logged in 
      header = (
        <span>
          <h3 className="left-header text-center">
            {'Please login'}
          </h3>
        </span>
      );

      style = {display: 'none'};
      img = resURLS.wheelURL;
    } else if(this.props.viewController.loggedIn && this.props.userManager.userInfo) {
      
      header = this.listInfo(this.props.userManager.userInfo);
      
      let status = this.props.viewController.userStatus;
      let qr = this.props.userManager.qr;
      if(qr && (status === 'coming' || status === 'waitlist' || status === 'checked in')) {

        //can use qr code
        style = {display: 'block'};
        img = qr;
      } else {

        //not useful for them to have qr code
        style = {display: 'none'};
        img = resURLS.wheelURL;
      }
    }


    return (
      <div className="col-xs-12 col-md-2" id="dashboard-profile">
        <div className="row">
          <div className="col-12 text-center my-3">
            <a href="http://hackru.org/"><img id="profile-logo" alt="" src={resURLS.logoURL}/></a>
          </div>
          <div className="col-10 offset-1 text-center mt-4 mb-5" id="qr-border" style={style}>
            <img className="image-divider" id="profile-qr"  alt="" src={img}/>
          </div>
          <div className="col-10 offset-1 text-left mb-5" id="register-sidebar">
            {header}
          </div>
        </div>
      </div>
    );
  }
}

DashboardProfile.propTypes = {
  viewController: PropTypes.shape({
    isAdmin: PropTypes.bool,
    loggedIn: PropTypes.bool,
    userStatus: PropTypes.string
  }).isRequired,
  userManager: PropTypes.shape({
    userInfo: PropTypes.shape({
      github: PropTypes.string,
      school: PropTypes.string,
      level_of_study: PropTypes.string,
      major: PropTypes.string
    }).isRequired,
    qr: PropTypes.string.isRequired,
    hasUnsavedChanges: PropTypes.bool.isRequired
  }).isRequired,
  logoutUser: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager,
    viewController: state.viewController
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logoutUser: logoutUser,
    save: save
  }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (DashboardProfile);
