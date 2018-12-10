//ViewActions.js
import { setCookie, getCookie, removeCookie } from 'redux-cookie';

import { LOGIN_MNGMNT, VIEW_CONTROL, USER_DATA } from 'action_creators/ActionTypes';

import { readUser, save, checkUserReq } from 'action_creators/UserActions';

export const loginUser = (data) => (
  (dispatch) => {

    //console.log(data.body);
    const body = JSON.parse(data.body); //turn string to Object
      
    //set the authdata cookie
    dispatch(setCookie('authdata', body));

    
    dispatch({
      type: USER_DATA.SET_FLASH,
      flash: ''
    });
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
    
    const done = dispatch(checkUserReq(userState));
    if(done === false) {

      //interrupt: unregistered
      if(window.confirm('You must agree to the MLH Code of Conduct and Data Sharing Policy to register.  Do you wish to save your changes and finish registering later?')) {

        userState.userInfo.registration_status = 'unregistered';

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
        dispatch({
          type: USER_DATA.SET_FLASH,
          flash: ''
        });
        return;

      } else {
        
        //do not logout if canceled
        dispatch(save(userState));
        return;
      }
    } else if (done === 'unfinished') {
      
      //interrupt: register partiallly
      userState.userInfo.registration_status = 'registered';

      if(window.confirm('We\'re still missing some personal information from you.  Do you wish to save your changes and finish up later?')) {
                  
        //save all unsaved changes
        dispatch(save(userState));
        dispatch({
          type: LOGIN_MNGMNT.SET_ERROR,
          errorMessage: 'Changes have been saved.  Please remember to come back and fill out the required fields.' 
        });
        //remove the authdata cookie
        dispatch(removeCookie('authdata'));
        
        dispatch({
          type: VIEW_CONTROL.SET_LOGIN_STATUS,
          loggedIn: false
        });
        dispatch({
          type: USER_DATA.SET_FLASH,
          flash: ''
        });
        return;

      } else {
        
        //do not logout if canceled
        dispatch(save(userState));
        return;
      }
    } else {

      //registered
      userState.userInfo.registration_status = 'registered';
      //save all unsaved changes
      dispatch(save(userState));
      dispatch({
        type: LOGIN_MNGMNT.SET_ERROR,
        errorMessage: 'Changes have been saved. Please check your email and social media for event updates!'
      });

      //remove the authdata cookie
      dispatch(removeCookie('authdata'));
      
      dispatch({
        type: VIEW_CONTROL.SET_LOGIN_STATUS,
        loggedIn: false
      });
      dispatch({
        type: USER_DATA.SET_FLASH,
        flash: ''
      });
    }

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


