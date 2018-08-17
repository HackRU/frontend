//TravelForm.js
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

//InfoPrompt.js

import { bindActionCreators } from 'redux';

// import formConfig from 'resources/formConfig';


import { AdminManager } from 'reducers/AdminManager';

import { AdminActions } from 'action_creators/AdminActions';

// import Select, { Creatable, AsyncCreatable, Async } from 'react-select';
import 'styles/react-select.css';

import resURLS from 'resources/resURLS';


class AdminDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.doQuery = this.doQuery.bind(this);
  }

  doQuery() {
    let grps = {};

    document.querySelectorAll('.agg-filter')
      .forEach(inp => {
        if(!inp.checked) return;
        let key = inp.getAttribute('id').replace('aggregate-', '');
        grps[key] = '$' + key;
      });


    let queryOut = [{'$group': {'_id': grps, 'count': {'$sum': 1}}}];
    
    let user = this.props.userManager;
    this.props.AdminActions.updateData(user.userInfoEmail, user.token, queryOut);
  }

  render() {
    
    let adminDashboard = this.props.viewController.isAdmin;
    let userInfo = this.props.userManager.userInfo;
    console.log(adminDashboard);

    if (!adminDashboard) {
      return (
        <div className="content-section" id="announcements-div">
          <h2 className="content-section-title">
            <span className="u-highlight">{'Admin Dashboard:'}</span>
          </h2>
          <div className="content-section-desc register-root">
            <form className="form-group">
              <div className="text-center">
                <div className="col-lg-12 text-center">
                  {Object.keys(userInfo).map(k =>
                    (<div className="form-check form-check-inline">
                      <input className="agg-filter form-check-input"
                        id={'aggregate-' + k}
                        type="checkbox"
                      />
                      <label className="form-check-label form-text" htmlFor={'aggregate-' + k} >{k}</label>
                    </div>)
                  )}
                </div>
                <br />
                <div className="col-lg-12 text-center">
                  <button className="btn btn-primary custom-btn p-3  mx-1 my-3 text-center"
                    onClick={this.doQuery}
                    type="button"
                  ><h4 className="my-0">{'Query the DB'}</h4></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return null;
    }
    
  }
}

AdminDashboard.propTypes = {
  userManager: PropTypes.shape({
    userInfoEmail: PropTypes.string,
    token: PropTypes.string,
    userInfo: PropTypes.object,
  }).isRequired,
  viewController: PropTypes.shape({
    isAdmin: PropTypes.bool
  }).isRequired
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager,
    viewController: state.viewController
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateData: AdminActions.queryDB,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminDashboard);