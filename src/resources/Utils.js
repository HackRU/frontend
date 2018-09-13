/**
 * @file Utils responsible for utility functions across whole app
 * @author TresTres
 */


/**
 * checks if an object has all the properties specified
 * @param {Object} object to interrogate
 * @param {Object} array of {String} fields to check
 */
export const hasFields = (obj, fields) => {

  //check each field for its existence and initialization
  //for-of seems to be most appropriate
  for (var f of fields) {
    
    if(!obj.hasOwnProperty(f) || obj[f] === undefined) {
    
      return false;
    }
  }
  return true;
};

/**
 * checks if data is a valid fetch response
 * TODO: make this robust
 * @param {Object} data to validate
 * @returns {Boolean} if validation was successful
 */
export const validateResponse = (data) => {
  
  if(typeof(data) !== 'object') {

    //reject non-object
    return false;
  } else {

    const responseFields = [
      'body',
      'headers',
      'statusCode'
    ];

    if(hasFields(data, responseFields) === false) {

      //not a response
      //console.log(data);
      return false;
    } else {

      return true;
    }
  }
};

/**
 * checks if an email is valid according to regex check
 * TODO: make this robust (naughty string, etc)
 * @param {String} email
 * @returns {Boolean} if validation was successful
 */
export const validateEmail = (email) => {

  if(typeof(email) !== 'string') {

    //reject if not a string
    return false;
  }

  //string@string.string
  const simpleCheck = /\S+@\S+\.\S+/;

  return simpleCheck.test(email);
};

/**
 * checks if a password is valid (there is no character limit currently)
 * TODO: make this robust (naughty strings, etc)
 * @param {String} password
 * @returns {Boolean} if validation was successful
 */
export const validatePassword = (pwd) => {
  
  if(typeof(pwd) !== 'string') {
    
    //reject if not a string
    return false;
  } else {

    return true;
  }
};

/**
 * checks if an attempt object is valid
 * @param {Object} presumed attempt
 * @returns {Boolean} if the validation was successful
 */
export const validateAttempt = (attempt) => {

  if(typeof(attempt) !== 'object') {

    //reject non-object
    return false;
  } else {
        
    const attemptFields = ['email', 'password', 'forgottenPassword', 'magicLink'];
    if(!hasFields(attempt, attemptFields)) {

      //not a attempt object
      return false;
    } else {

      return true;
    }
  }
};

/**
 * creates options from a specified body for a fetch POST request
 * @param {Object} body
 * @returns {Object} options to use
 */
export const makePostBody = (body) => {

  if(typeof(body) !== 'object') {

    //invalid type to use
    return null;
  } else {

    const respBody = JSON.stringify(body);

    return {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: respBody
    };
  }
};


