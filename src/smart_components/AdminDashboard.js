//TravelForm.js
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

//InfoPrompt.js

// import { bindActionCreators } from 'redux';

// import formConfig from 'resources/formConfig';

// import { logoutUser } from 'action_creators/ViewActions';

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
    let userManager = this.props.userManager;

    document.querySelectorAll('.agg-filter')
      .forEach(inp => {
        if(!inp.checked) return;
        let key = inp.getAttribute('id').replace('aggregate-', '');
        grps[key] = '$' + key;
      });

    fetch(resURLS.lcsReadURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
      //'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': userManager.userInfoEmail,
        'token': userManager.token,
        'query': [{'$group': {'_id': grps, 'count': {'$sum': 1}}}],
        'aggregate': true
      })
    }).then(resp => resp.json())
      .then(data => {
        if(data.statusCode === 200) {
          console.log('sucessful query');
          this.setState({results: data.body});
        } else {
          console.log('failed query');
          this.setState({results: [{'_id': 'error', 'count': data.body}]});
        }
      });

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
    hasResume: PropTypes.bool,
    userInfo: PropTypes.object,
    hasUnsavedChanges: PropTypes.bool,
    flash: PropTypes.string,
    codeOfConduct: PropTypes.bool,
    dataSharing: PropTypes.bool
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

export default connect(mapStateToProps, null) (AdminDashboard);