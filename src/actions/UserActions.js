//UserActions.js
import { getCookie } from 'redux-cookie';

import { USER_DATA } from 'actions/ActionTypes';
import * as LoginManagement from 'actions/LoginManagement';

import resURLS from 'resources/resURLS';
import { uploadResume, downloadResume } from 'resources/resume.js';

export const checkCookies = () => (
  (dispatch) => {
    
    let authdata = dispatch(getCookie('authdata'));
    
    if(!authdata || Date.parse(authdata.auth.valid_until) < Date.now()) {
      
      //not authorized or expired, logout
      dispatch(LoginManagement.logout);

      //should also be seen in sidebar

    } else {

      //token is still valid
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

      //download the user's resume, uses callback
      downloadResume(true, email, (_, resume) => dispatch(setResume(resume)));


      //read in the user data from lcs
      dispatch(readUser(email, token));
    }
  }
);

export const updateUser = (user, key, value) => (
  (dispatch) => {

    user[key] = value;
    dispatch({
      type: USER_DATA.SET_USER_INFO,
      userInfo: user
    });
  }
);

export const updateMentor = (mentor, key, value) => (
  (dispatch) => {

    mentor[key] = value;
    dispatch({
      type: USER_DATA.SET_MENTOR_INFO,
      mentorInfo: mentor
    });
  }
);

export const toggleCOC = (checked) => (
  (dispatch) => {
    
    dispatch({
      type: USER_DATA.SET_COC, 
      codeOfConduct: checked
    });
  }
);

export const toggleShare = (checked) => (
  (dispatch) => {

    dispatch({
      type: USER_DATA.SET_SHARE,
      dataSharing: checked
    });
  }
);

export const save = (userState) => (
  (dispatch) => {

    let user = userState.user;
    if(userState.codeOfConduct && userState.dataSharing) {
      
      //the user has checked both boxes and can be set as registered in lcs
    
      user.registration_status = 'registered';
    }

    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': user},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {

        if(resp.statusCode === 200) {

          //save successful
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: 'Changes saved successfully'
          });
        } else {
            
          //save unsucessful
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: 'Unable to save.\n' + resp.body
          });
        }
      })
      .catch(err => {
        
        //unexpected error
        dispatch(showCaughtError(err.toString()));
      });
  }
); 


const readUser = (uEmail, uToken) => (
  (dispatch) => {

    //read the specified user, the query email must match the user's email
    fetch(resURLS.lcsReadURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: uEmail,
        token: uToken,
        query: { 
          email: uEmail
        }
      })
    }).then(resp => resp.json())
      .then(data => {

        //on successful read, set state's user to data
        const user = data.body[0];
        dispatch({
          action: USER_DATA.SET_USER_INFO,
          userInfo: user
        });
        //check for admin status
        dispatch(checkAdmin(uEmail));
        //set the qr code
        dispatch(getQR(user));
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      });
  }
);

const setResume = (resume) => (
  (dispatch) => {
    
    dispatch({
      type: USER_DATA.SET_RESUME, 
      resume: resume
    });
  }
);

const getQR = (email) => (
  (dispatch) => {

    fetch(resURLS.lcsQRURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        background: resURLS.background,
        color: resURLS.foreground
      })
    }).then(resp => resp.json())
      .then(resp => {
        if(resp.statusCode === 200) {
        
          //QR retrieval successful
          dispatch({
            type: USER_DATA.SET_QR,
            qr: resp.body
          });
        } else {
          dispatch(showCaughtError('Could not display QR.\n' + resp.body));
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError('Could not display QR.\n' + err.toString()));
      });
  }
);

const showCaughtError = (mes) => (
  (dispatch) => {
    console.log('error logged: ' + mes);
    dispatch({
      type: USER_DATA.SET_FLASH,
      flash: 'An error occurred:\n' + mes
    });
  }
);
