//ViewActions.js
import { setCookie, removeCookie } from 'redux-cookie';

import { VIEW_CONTROL } from 'actions/ActionTypes';


export const loginUser = (data) => (
  (dispatch) => {

    const body = JSON.parse(data.body);

    //set the authdata cookie
    dispatch(setCookie(body, 'authdata'));

    dispatch({
      type: VIEW_CONTROL.SET_LOGIN_STATUS,
      loggedIn: true
    });
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


