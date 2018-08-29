/**
 *  @file PageActions responsible for page specifics like URL and cookies
 *  @author TresTres
 */

import { getCookie, setCookie, removeCookie } from 'redux-cookie';

import { LOGIN_MNGMNT } from 'action_creators/ActionTypes';

/**
 * checks the URL query string
 * @param {Object} URLSearchParams object
 * @returns {String} indicating if parameters are valid
 */
export const checkURL = (urlParams) => {
  
  if(typeof(urlParams) !== 'object') {

    //not readable
    return 'unreadable';
  } else if(urlParams.has('error')) {

    //has error
    const errMes = urlParams.get('error');
    return String(errMes);
  } else {

    //is valid
    return 'valid';
  }
};

/**
 * checks a valid URL query string for a magic link and updates the store accordingly
 * @param {Object} URLSearchParams object
 * @param {String} indicating if there was a valid magic link
*/
export const confirmLink = (urlParams) => (
  (dispatch) => {

    //obtain the magic link
    const magicLink = urlParams.get('magiclink');
    if(!magicLink) {

      //not a valid magic link

      //clear link in store
      dispatch({
        type: LOGIN_MNGMNT.SET_MAGIC_LINK,
        magicLink: ''
      });

      //notify store
      dispatch({
        type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD,
        forgottenPassword: false
      });

      //notify a failure
      return 'no magic link found';
    } else {

      //user forgot password and is attempting to reset

      //put the link in the store
      dispatch({
        type: LOGIN_MNGMNT.SET_MAGIC_LINK,
        magicLink: magicLink
      });

      //notify store
      dispatch({
        type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD,
        forgottenPassword: true
      });

      //notify a success
      return 'magic link success';
    }
  }
);

/**
 * checks for cookies of a specified name
 * @param {String} name of the cookie
 * @returns {Object} cookie data || null
 */
export const retrieveCookie = (name) => (
  (dispatch) => {

    //get the cookie
    const cookie = dispatch(getCookie(name));

    if(cookie && typeof(cookie) === 'string') {

      //useable cookie
      return JSON.parse(cookie);
    } else {

      //fails
      return null;
    }
  }
);

/**
 * checks the valid date of a cookie
 * @param {Object} specified cookie
 * @returns {Boolean} if the cookie is expired or not
 */
export const checkCookieValid = (cookie) => {

  if(!cookie || !cookie.auth) {
    
    //bad cookie
    return false;
  }

  //check the validation date
  if(cookie.auth.valid_until && Date.parse(cookie.auth.valid_until) > Date.now()) {

    //still valid
    return true;
  } else {

    //invalid
    return false;
  }
};

/**
 * saves specified data to a specified cookie 
 * @param {String} data to save 
 * @param {String} name of the cookie
 * @returns {Boolean} if save successful
 */
export const saveCookie = (data, name) => (
  (dispatch) => {

    //check if valid
    if(typeof(data) !== 'string' || typeof(name) !== 'string') {

      //invalid
      return false;
    } else {

      //turn the data into an object
      const cookie = JSON.parse(data);

      //set the authdata cookie
      dispatch(setCookie(name, cookie));

      return true;
    }
  }
);

/**
 * removes a specified cookie
 * @param {String} name of the cookie
 * returns {Boolean} if removal successful
 */
export const deleteCookie = (name) => (
  (dispatch) => {
  
    //check if string
    if(typeof(name) !== 'string') {
      
      //invalid
      return false;
    }


    //check that cookie exists
    const cookie = dispatch(retrieveCookie(name));

    if(!cookie) {

      //non-existent
      return false;
    } else {

      //able to remove
      dispatch(removeCookie(name));
      return true;
    }
  }
);
