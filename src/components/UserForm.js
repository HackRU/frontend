//UserForm.js
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import formConfig from 'resources/formConfig';
import * as userActions from 'actions/userActions'; 


class UserForm extends React.Component{

  constructor(props) {
    super(props);
    
  }


  changeKeyByEvent = (e) => {
    e.preventDefault();
    const key = e.target.id.split('-')[1]; 
    const value = e.target.value;
    let user = this.props.userManager.userInfo;
    this.props.updateUser(user, key, value);
  }

  changeKeyByArg = (key) => {
    (selected) => {
      const value = selected.value;
      let user = this.props.userManager.userInfo;
      this.props.updateUser(user, key, value);
    };
  }

  parseConfig = (key) => {
    
    //return components based on configuration of each field
    const user = this.props.userManager.userInfo;

    if(!user[key]) {

      //non-existing user key
      console.log('Key ' + key + ' not found in user!');
      return;
    }
    const field = formConfig[key];
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

  userStatus = (userState) => {
  
    const status = userState && userState.registration_status;
    
    if(status && status === 'registered' || status === 'unregistered' || status === 'rejected') {
      status = 'pending';
    } else if(status && status === 'confirmation') {
      status = 'pending confirmation';
    } else if(status) {
      status = status.replace('-', ' ');
    }

    return status;
  }



  render() {

    const userState = this.props.userManager.userInfo;
    const status = this.userStatus(userState);


    return (   
      <div>
        <div className="content-section"
          id="announcements-div"
        >
          <h2 className="content-section-title">
            <i className="fas fa-sign-in-alt fa-fw" /> 
            <span className="u-highlight">
              {'Status:'}
            </span>
          </h2>
          <div className="content-section-desc register-root">
            <form className="form-group">
              <div className="text-center">
                <h2 className="blue SC"> 
                  {'Status: '+ status} 
                </h2>
                <AttendancePrompt />
              </div>
            </form>
          </div>
        </div>
        <InfoPrompts />
      </div>
    
    );
  
  }

}

export default UserForm;
