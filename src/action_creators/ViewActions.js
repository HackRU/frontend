//ViewActions.js
import { setCookie, getCookie, removeCookie } from 'redux-cookie';

import { LOGIN_MNGMNT, VIEW_CONTROL, USER_DATA } from 'action_creators/ActionTypes';

import { readUser, save } from 'action_creators/UserActions';

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


    //if they used a magic link to get here, remove it from the address bar -- triggers a reload, but only this once
    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('magiclink')) {
      window.location.href = '/dashboard.html';
    }

    var authdata = JSON.parse(dispatch(getCookie('authdata')));
    //console.log(authdata);
    const email = authdata.auth.email;
    const token = authdata.auth.token;

    dispatch({
      type: USER_DATA.SET_EMAIL,
      email: email
    });
    dispatch({
      type: USER_DATA.SET_TOKEN,
      token: token
    });
    //console.log(typeof(authdata));

    dispatch(readUser(email, token));

  }
);

export const logoutUser = (userState) => (
  (dispatch) => {
    
    const unregistered = userState.userInfo.registration_status === 'unregistered';
    if(unregistered) {

      //interrupt
      if(window.confirm('You must fill out all the required fields in order to register.  Do you wish to save your changes and finish registering later?')) {
                  
        //save all unsaved changes
        dispatch(save(userState));
        dispatch({
          type: LOGIN_MNGMNT.SET_ERROR,
          errorMessage: 'Changes have been automatically saved.  Please remember to come back and finish registering.' 
        });
        //remove the authdata cookie
        dispatch(removeCookie('authdata'));
        
        dispatch({
          type: VIEW_CONTROL.SET_LOGIN_STATUS,
          loggedIn: false
        });
        return;

      } else {
        
        //do not logout if canceled
        dispatch(save(userState));
        return;
      }
    }

    //save all unsaved changes
    dispatch(save(userState));
    dispatch({
      type: LOGIN_MNGMNT.SET_ERROR,
      errorMessage: 'Changes have been automatically saved.'
    });

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


