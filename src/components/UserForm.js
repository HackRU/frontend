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
      //regular input
      return(
        <input className="form-control mx-3"
          id={'input-'+key}
          onChange={this.onChange}
          type="text"
          required
          value={user[key]}
        />);
    }
  
  }

  render() {

  
  
  }

}

export default UserForm;
