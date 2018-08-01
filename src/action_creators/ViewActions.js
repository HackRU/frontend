//ViewActions.js
import { setCookie, getCookie, removeCookie } from 'redux-cookie';

import { VIEW_CONTROL } from 'action_creators/ActionTypes';

import { readUser } from 'action_creators/UserActions';

export const loginUser = (data) => (
  (dispatch) => {

    //console.log(data.body);
    const body = JSON.parse(data.body); //turn string to Object
      
    //set the authdata cookie
    dispatch(setCookie('authdata', body));

    dispatch({
      type: VIEW_CONTROL.SET_LOGIN_STATUS,
      loggedIn: true
    });

    //console.log(typeof(authdata));

    var authdata = JSON.parse(dispatch(getCookie('authdata')));
    dispatch(readUser(authdata.auth.email, authdata.auth.token));
  }
);

export const logoutUser = () => (
  (dispatch) => {
  
    //remove the authdata cookie
    dispatch(removeCookie('authdata'));
    
    dispatch({
      type: VIEW_CONTROL.SET_LOGIN_STATUS,
      loggedIn: false
    });
  }
);

export const applyVolunteer = () => (
  (dispatch) => {
    dispatch({
      type: VIEW_CONTROL.APPLY_FORM,
      applyForm: 'volunteer' 
    });
  }
);

export const applyMentor = () => (
  (dispatch) => {
    dispatch({
      type: VIEW_CONTROL.APPLY_FORM,
      applyForm: 'mentor'
    });
  }
);

export const setAsAdmin = () => (
  (dispatch) => {
    dispatch({
      type: VIEW_CONTROL.IS_ADMIN,
      isAdmin: true
    });
  }
);

export const unsetAsAdmin = () => (
  (dispatch) => {
    dispatch({
      type: VIEW_CONTROL.IS_ADMIN,
      isAdmin: false
    });
  }
);

