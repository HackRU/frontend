//LoginActions.js
import { getCookie } from 'redux-cookie';

import { LOGIN_MNGMNT } from 'action_creators/ActionTypes';

import { loginUser } from 'action_creators/ViewActions';

import resURLS from 'resources/resURLS';


export const checkURL = () => (
  (dispatch) => {

    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('error')) {
      
      dispatch({
        type: LOGIN_MNGMNT.SET_ERROR, 
        errorMessage: urlParams.get('error')
      });
    } else {
      
      if(urlParams.has('magiclink')) {
      
        const magicLink = urlParams.get('magiclink');
        if(magicLink.startsWith('forgot-')) {

          //user forgot password and is attempting to reset it
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR,
            errorMessage: 'You have a magic link! Please enter your email and then your new password.'
          });
          dispatch({
            type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
            magicLink: magicLink
          });
          dispatch({
            type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD,
            forgottenPassword: true
          });

        } else {
          /* NOT NEEDED
          //user is logging in after going through mlh system
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR, 
            errorMessage: 'You have a magic link! Please log in to apply it.'
          });
          dispatch({
            type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
            magicLnk: magicLink
          });
          */

          dispatch(showCaughtError('MLH-assigned magic links are not currently supported!'));
        }
      } 
    
      //grab the auth data from the cookie
      let authdata = dispatch(getCookie('authdata'));
      
      if(typeof(authdata) === 'string') {

        authdata = JSON.parse(authdata);
        if(authdata && Date.parse(authdata.auth.valid_until) > Date.now()) {

          //still valid
          dispatch(loginUser({body: JSON.stringify(authdata)}));
        }
      }
    }
  }
);

export const changeEmail = (email) => (
  (dispatch) => {
    dispatch({
      type: LOGIN_MNGMNT.CHANGE_EMAIL,
      email: email
    });
  }
);

export const changePassword = (password) => (
  (dispatch) => {
    dispatch({
      type: LOGIN_MNGMNT.CHANGE_PASSWORD,
      password: password
    });
  }
);

export const resetPassword = (user) => (
  (dispatch) => { 
      
    if(user.magicLink) {

      //user has already received the magic link and is applying it
      
      if(user.email === '' || user.password === '') {

        //incomplete form
        dispatch({
          type: LOGIN_MNGMNT.SET_ERROR,
          errorMessage: 'Please enter your email and your new password to continue.'
        });
      } else {

        //complete form, send to LCS to consume
        fetch(resURLS.lcsConsumeURL, {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            forgot: user.forgottenPassword,
            password: user.password,
            link: user.magicLink
          })
        }).then(resp => resp.json())
          .then(resp => {

            if(resp.statusCode === 200) {
                
              //notify user and remove link
              dispatch({
                type: LOGIN_MNGMNT.SET_ERROR,
                errorMessage: resp.body + '. \nYou may now login.'
              });
              dispatch({
                type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
                magicLink: ''
              });
              dispatch({
                type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD, 
                forgottenPassword: false
              });
            } else {
  
                          
              //notify user and remove link
              dispatch({
                type: LOGIN_MNGMNT.SET_ERROR,
                errorMessage: resp.body + '. \nPlease try again.'
              });
              dispatch({
                type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
                magicLink: ''
              });
              dispatch({
                type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD, 
                forgottenPassword: false
              });
            }
          })
          .catch(err => {

            //unexpected error
            //console.log(err);
            dispatch(showCaughtError(err.toString()));
          });
      }
    } else {

      //user is requesting a magic link because the password was forgotten
      dispatch({
        type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD,
        forgottenPassword: true
      });
        
      fetch(resURLS.lcsMagicURL,{
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          forgot: user.forgottenPassword
        })
      }).then(resp => resp.json())
        .then(resp => {
          //notify user
          
          let respMes = resp.body || resp.errorMessage;
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR,
            errorMessage: respMes
          });
        })
        .catch(err => {

          //unexpected error
          //console.log(err.toString());
          dispatch(showCaughtError(err.toString()));
        });
    }
  }
);

export const signUp = (user) => (
  (dispatch) => {
    
    if(user.email === '' || user.password === '') {
      
      //incomplete form
      dispatch({
        type: LOGIN_MNGMNT.SET_ERROR,
        errorMessage: 'Please fill out email and password to continue.'
      });
    } else {

      //complete form, send to LCS to create user
      fetch(resURLS.lcsCreateURL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      }).then(resp => resp.json())
        .then(data => {
          if(data.statusCode === 200) {

            //successful creation
            dispatch(loginUser({body: data.body}));
          } else if(data.body === 'Duplicate user!') {

            //duplicate user
            dispatch({
              type: LOGIN_MNGMNT.SET_ERROR,
              errorMessage: 'You are already in the system!  Please try logging in.'
            });
          } else {

            //show error
            dispatch({
              type: LOGIN_MNGMNT.SET_ERROR,
              errorMessage: data.body
            });
          }
        })
        .catch(err => {

          //unexpected error
          dispatch(showCaughtError(err.toString()));
        });
    }
  }
);


export const login = (user) => (
  (dispatch) => {

    if(user.email === '' || user.password === '') {
      
      //incomplete form
      dispatch({
        type: LOGIN_MNGMNT.SET_ERROR,
        errorMessage: 'Please fill out email and password to continue.'
      });
    } else {

      dispatch({
        type: LOGIN_MNGMNT.SET_ERROR,
        errorMessage: 'Credentials submitted.  Awaiting response...'
      });

      //complete form, send to LCS to authorize
      fetch(resURLS.lcsAuthURL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      }).then(resp => resp.json())
        .then(data => {
          //post-process
          dispatch(loginPostFetch(data));
        })
        .catch(err => {

          //unexpected error
          //console.log(err);
          dispatch(showCaughtError(err.toString()));
        });
    }
  }
);

/*  NOT NEEDED
export const mlhLogin = (user) => {
  let redir = (user.magicLink && !(user.magicLink.startsWith('forgot-')))? resURLS.magicLinkRedirect + user.magicLink : '';
  let href = resURLS.mlhRedirectURL + redir + resURLS.mlhResponseType;
  window.open(href, '_self');
};
*/


const loginPostFetch = (data) => (
  (dispatch) => {
    if(data.statusCode !== 200) {
      //unsuccessful authorization, check the problem
      const errorMsgs = {
        'invalid email,hash combo': 'Incorrect email or passsword.',
        'Wrong Password': 'Incorrect password.'
      }; 
      //console.log(errorMsgs[data.body]);
      dispatch(showCaughtError(errorMsgs[data.body]));
    } else {
    
      //successful authorization
      dispatch(loginUser({body: data.body})); 
    }
  }
);


const showCaughtError = (mes) => (
  (dispatch) => {
    console.log('error logged: ' + mes);
    dispatch({
      type: LOGIN_MNGMNT.SET_ERROR,
      errorMessage: 'An error occurred:\n' + mes
    });
  }
);
