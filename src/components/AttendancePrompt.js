//AttendancePrompt.js
import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';

import formConfig from 'resources/formConfig';


class AttendancePrompt extends React.Component {

  
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


  reflectPrompt = (userStatus) => {
    if(userStatus === 'checked in') {

      //checked in
      return (
        <div>
          <i className="fas fa-check fa-fw"/>
          <h1 className="blue my-3">{'Welcome to HackRU!'}</h1>
          <h6 className="blue">{'In case of an emergency, call RUPD: 732-932-7211'}</h6>
        </div>
      );
    } else if (userStatus !== 'pending' && userStatus !== 'waitlist' && userStatus !== 'checked in') {
      return (
        <div> 
          <div className="blue">
            <h3>{this.props.upperFlash}</h3>
          </div>
          <button className="btn btn-primary UC custom-btn p-3 my-1 mx-md-1"
            onClick={this.props.attending}
            type="button"
          >
            <h6 className="my-0">{'Attending'}</h6>
          </button>
          <button className="btn btn-primary UC custom-btn p-3 my-1"
            onClick={this.props.notAttending}
            type="button"
          >
            <h6 className="my-0">{'Not Attending'}</h6>
          </button>
          <TravelForm user={this.props.user}/>
        </div>
      );
    }
  
  
  }

  render() {

    return (
    
    );
  }
}

export default AttendancePrompt;
