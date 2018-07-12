//LoginActions.js
import LOGIN_MNGMNT from 'actions/ActionTypes';
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

        dispatch(loadUserForm({body: JSON.stringify(auth)}));
      }
    }
  }
);

/*
const loadUserForm = (data) => (
  (dispatch) => {
    dispatch({
      type: LOGIN_MNGMNT.SET_LOGIN_STATUS,
      isLoggedIn: true
    });

    const body = JSON.parse(data.body);
    //set the cookies auth data as the body????

    
  }
);*/

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
        return;
      } else {

        //complete form, send to MLH to consume
        fetch(resURLS.mlhTestConsumeURL, {
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
            console.log(err.message);
            dispatch({
              type: LOGIN_MNGMNT.SET_ERROR,
              errorMessage: 'An error occurred.'
            });
          });
        return;
      }
    } else {

      //user is requesting a magic link because the password was forgotten
      dispatch({
        type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD,
        forgottenPassword: true
      });
        
      fetch(resURLS.mlhTestMagicURL,{
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
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR,
            errorMessage: resp.body || resp.errorMessage
          });
        })
        .catch(err => {
          console.log(err.message);
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR,
            errorMessage: 'An error occurred.'
          });
        });
      return;
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

      //complete form, sent to MLH to create user
      fetch(resURLS.mlhTestCreateURL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },

      })
    }
  }
);
