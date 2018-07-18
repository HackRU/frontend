//LoginActions.js
import { LOGIN_MNGMNT } from 'actions/ActionTypes';
import resURLS from 'resources/resURLS';


export const checkURL = () => (
  (dispatch) => {

    let url_params = new URLSearchParams(window.location.search);
    if(url_params.has('error')) {
      
      dispatch({
        type: LOGIN_MNGMNT.SET_ERROR, 
        errorMessage: url_params.get('error')
      });
    } else {
      
      if(url_params.has('magiclink')) {
      
        const magic_link = url_params.get('magiclink');
        if(magic_link.startsWith('forgot-')) {

          //user forgot password and is attempting to reset it
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR,
            errorMessage: 'You have a magic link! Please enter your email and then your new password.'
          });
          dispatch({
            type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
            magicLink: magic_link
          });
          dispatch({
            type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD,
            forgottenPassword: true
          });
        } else {

          //user is logging in after going through mlh system
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR, 
            errorMessage: 'You have a magic link! Please log in to apply it.'
          });
          dispatch({
            type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
            magicLnk: magic_link
          });
        }
      } 

      //cookie setup ???? how do
      if(url_params.has('authdata')) {
        
        const authdata = JSON.parse(url_params.get('authdata'));
        //set the auth data in the cookie
      }

      //grab the auth data from the cookie
      const auth = '';
      if(auth && Date.parse(auth.auth.valid_until) > Date.now()) {

        loadUserForm({body: JSON.stringify(auth)});
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
            //notify user and remove link
            dispatch({
              type: LOGIN_MNGMNT.SET_ERROR,
              errorMessage: resp.body || resp.errorMessage
            });
            dispatch({
              type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
              magicLink: ''
            });
            dispatch({
              type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD, 
              forgottenPassword: false
            });
          })
          .catch(err => {

            //unexpected error
            //console.log(err.message);
            showCaughtError(err.message);
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
          
          let resp_mes = resp.body || resp.errorMessage;
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR,
            errorMessage: resp_mes
          });
        })
        .catch(err => {

          //unexpected error
          //console.log(err.message);
          showCaughtError(err.message);
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

            //succesfful creation
            loadUserForm({data});
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
          showCaughtError(err.message);
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

      //complete form, send to LCS to authorize
      fetch(resURLS.lcsAuthURL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email: user.email,
          password: user.password
        }
      }).then(resp => resp.json())
        .then(data => {
          
          //post-process
          loginPostFetch(data);
        })
        .catch(err => {

          //unexpected error
          console.log(err);
          showCaughtError(err.message);
        });
    }
  }
);

export const mlhLogin = (user) => {
  let redir = (user.magicLink && !(user.magicLink.startsWith('forgot-')))? resURLS.magicLinkRedirect + user.magicLink : '';
  let href = resURLS.mlhRedirectURL + redir + resURLS.mlhResponseType;
  window.open(href, '_self');
};

export const logout = (user) => (
  (dispatch) => {
    
    //remove the authdata from the cookie?
    dispatch({
      type: LOGIN_MNGMNT.SET_LOGIN_STATUS,
      isLoggedIn: false
    });
  }
);


const loginPostFetch = (data) => (
  (dispatch) => {
    if(data.statusCode !== 200) {
      
      //unsuccessful authorization, check the problem
      const errorMsgs = {
        'invalid email,hash combo': 'Incorrect email or passsword.',
        'Wrong Password': 'Incorrect password.'
      }; 
      showCaughtError(errorMsgs[data.body]);
    } else {

      //successful authorization
      loadUserForm(data);
    }
  }
);


const loadUserForm = (data) => (
  (dispatch) => {


    const body = JSON.parse(data.body);
    //set cookies authdata to the body..how do??

    //called upon successful login, will trigger LoginManagement to render UserForm
    dispatch({
      type: LOGIN_MNGMNT.SET_LOGIN_STATUS,
      isLoggedIn: true
    });
  }
);

const showCaughtError = (mes) => (
  (dispatch) => {
    dispatch({
      type: LOGIN_MNGMNT.SET_ERROR,
      errorMessage: 'An error occurred. ' + mes
    });
  }
);
