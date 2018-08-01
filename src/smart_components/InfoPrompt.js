//InfoPrompt.js
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import formConfig from 'resources/formConfig';

import * as userActions from 'action_creators/UserActions';
import { logoutUser } from 'action_creators/ViewActions';

import Select, { Creatable, AsyncCreatable, Async } from 'react-select';

class InfoPrompt extends React.Component {

  constructor(props) {
    super(props);
    this.changeKeyByEvent = this.changeKeyByEvent.bind(this);
    this.changeKeyByArg = this.changeKeyByArg.bind(this);
    this.upResume = this.upResume.bind(this);
    this.logout = this.logout.bind(this);
    this.save = this.save.bind(this);
  }

  changeKeyByEvent = (e) => {
    e.preventDefault();
    const key = e.target.id.split('-')[1]; 
    const value = e.target.value;
    let user = this.props.userManager;
    this.props.updateUser(user, key, value);
  }

  changeKeyByArg = (key) => (
    (selected) => {
      if(selected !== null) {

        //not a clear
        const value = selected.value;
        let user = this.props.userManager;
        this.props.updateUser(user, key, value);
      } else {

        let user = this.props.userManager;
        this.props.updateUser(user, key, '');
      }
    }
  )

  upResume = (e) => {
    e.preventDefault();
    this.props.upResume(this.props.userManager);
  }

  logout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  }

  save = (e) => {
    e.preventDefault();
    this.props.save(this.props.userManager);
  }

  


  parseConfig = (key) => {  
    //return components based on configuration of each field
    const user = this.props.userManager.userInfo;
    
    if(typeof(user[key]) === 'undefined') {

      //non-existing user key
      console.log('Key ' + key + ' not found in user!');
      return;
    }
    const field = formConfig[key];
    //console.log(field);
    if(!field) {
      //text input not in formConfig
      return (
        <input className="form-control mx-3"
          id={'input-'+ key}
          onChange={this.changeKeyByEvent}
          type="text"
          required={field.required}
          value={user[key]}
        />
      );
    } else if(!field.select) {
      //non-select input in formConfig
      return (
        <input className="form-control mx-3"
          id={'input-'+ key}
          onChange={this.changeKeyByEvent}
          type={field.type}
          required={field.required}
          value={user[key]}
        />
      );
    } else if(!field.searchFn && !field.create) {
      //no ability to search or create new entries
      return (
        <Select className="form-control mx-3"
          id={'input-' + key}
          onChange={this.changeKeyByArg(key)}
          options={field.options}
          required={field.required}
          value={user[key]}
        />
      );
    } else if(!field.searchFn && field.create) {
      //can create new entries but not search
      return (
        <Creatable className="form-control mx-3"
          id={'input-' + key}
          onChange={this.changeKeyByArg(key)}
          options={field.options}
          required={field.required}
          value={user[key]}
        />
      );
    } else if(field.searchFn && !field.create) {
      //can search but not create new entries
      return (
        <Async className="form-control mx-3"
          id={'input-' + key}
          ignoreAccents
          ignoreCase
          loadOptions={field.searchFn}
          matchPos="any"
          onChange={this.changeKeyByArg(key)}
          required={field.required}
          value={user[key]}
        />
      );
    } else {
      //can search and create new entries
      return (
        <AsyncCreatable className="form-control mx-3"
          id={'input-' + key}
          loadOptions={field.searchFn}
          onChange={this.changeKeyByArg(key)}
          required={field.required}
          value={user[key]}
        />
      );
    }
  }


  render() {

    const Fragment = React.Fragment;
    let prompts = '';
    let user = this.props.userManager.userInfo;
    
    if(user && this.props.userStatus !== 'checked in') {
      
      //user has not checked in yet, render the prompts
      prompts = (
        <div className="content-section"
          id="announcements-div"
        >
          <h2 className="content-section-title">
            <span className="u-highlight">
              {'Your Info:'}
            </span>
          </h2>
          <div className="content-section-desc your-info">
            <form>  
              <span>
                {user && 
                    Object.keys(formConfig).map(key => (
                      <div className="form-group row mb-4"
                        key={key}
                      >
                        <label className="col-lg-8"
                          htmlFor={'input-' + key}
                        >
                          <h4 className="font-weight-bold blue">
                            {key.replace(/_/g, ' ').toUpperCase()}
                          </h4>
                        </label>
                        {this.parseConfig(key)}
                      </div>
                    ))
                }
              </span>
              <div className="form-group row mb-4">
                <label className="col-lg-8 blue"
                  htmlFor="resumeupload"
                >
                  <h4 className="font-weight-bold blue">
                    {'SHORT ANSWER:'}
                  </h4> 
                  {'What are you looking for from your experience at HackRU?'}
                </label>
                <textarea className="form-control mx-3"
                  id="input-short_answer"
                  onChange={this.changeKeyByEvent}
                  value={(user)? user.short_answer : ''}
                />
              </div>
              <div className="form-group row mb-4">
                <label className="col-lg-8 blue"
                  htmlFor="resumeupload"
                >
                  <h4 className="font-weight-bold blue">
                    {'RESUME'}
                  </h4>
                  {(this.props.userManager.hasResume)? 'You have uploaded a resume already.': 'Please upload a copy!'}
                </label>
                <input className="form-control mx-3"
                  id="resumeupload"
                  onChange={this.upResume}
                  type="file"
                />
              </div>
              {user && user.registration_status === 'unregistered' &&
              <div className="form-group row mb-4 mx-1">
                <h4 className="font-weight-bold blue">
                  {'MLH NOTICES'}
                </h4>
                <div className="col-12 form-check mb-4 blue">
                  <input className="form-check-input mr-4"
                    id="code-of-conduct-box"
                    type="checkbox"
                  />
                  <label className="form-check-label"
                    htmlFor="code-of-conduct-box"
                  >
                    {'I agree to abide by the '} 
                    <a
                      href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                    >
                      {'MLH code of conduct.'}
                    </a>
                  </label>
                </div>
                <div className="col-12 form-check mb-4 blue">
                  <input className="form-check-input mr-4"
                    id="data-sharing-box"
                    type="checkbox"
                  />
                  <label className="form-check-label blue"
                    htmlFor="data-sharing-box"
                  >
                    {'I agree to the terms of both the '} 
                    <a
                      href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
                    >
                      {'MLH Contest Terms and Conditions'}
                    </a>
                    {' and '} 
                    <a
                      href="https://mlh.io/privacy"
                    >
                      {'the MLH Privacy Policy'}
                    </a>
                    {'. Please note that you may receive pre and post-event informational e-mails and occasional messages about hackathons from MLH as per the MLH Privacy Policy.'}
                  </label>
                </div>
              </div>
              }
              <div className="form-group row my-2 mx-1">
                <h4 className="blue">
                  {this.props.userManager.flash}
                </h4>
              </div>
              <div className="col-12 text-center">
                <button className="btn btn-primary UC custom-btn mx-2 p-3"
                  onClick={this.logout}
                  type="submit"
                  value="logout"
                >
                  <h6 className="UC">
                    {'Logout'}
                  </h6>
                </button>
                <button className="btn btn-primary UC custom-btn p-3"
                  onClick={this.save}
                  type="submit"
                  value="save"
                >
                  <h6 className="UC">
                    {'Save Changes'}
                  </h6>
                </button>
              </div>
            </form>
          </div>
        </div>
      );  
    }

    return (
      <Fragment>
        {prompts}
      </Fragment>
    );
  }
}

InfoPrompt.propTypes = {
  userManager: PropTypes.shape({
    userInfoEmail: PropTypes.string,
    token: PropTypes.string,
    hasResume: PropTypes.bool,
    userInfo: PropTypes.object,
    flash: PropTypes.string
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  upResume: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  userStatus: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser: userActions.updateUser,
    upResume: userActions.upResume,
    logoutUser: logoutUser,
    save: userActions.save
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps) (InfoPrompt);