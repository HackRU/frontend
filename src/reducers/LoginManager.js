//LoginManager.js
import LOGIN_MNGMNT from 'actions/ActionTypes';


//what we want to manage
const initialState = {
  email: '',
  password: '',
  isLoggedIn: false, 
  forgottenPassword: false, 
  magicLink: '',
  errorMessage: ''

};

const LoginManager = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_MNGMNT.CHANGE_EMAIL:
      return {
        ...state, 
        email: action.email
      };
    case LOGIN_MNGMNT.CHANGE_PASSWORD:
      return {
        ...state, 
        password: action.password
      };
    case LOGIN_MNGMNT.SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    case LOGIN_MNGMNT.SET_MAGIC_LINK:
      return {
        ...state,
        magicLink: action.magicLink
      };
    case LOGIN_MNGMNT.SET_ERROR:
      return {
        ...state, 
        errorMessage: action.errorMessage
      };
    default: 
      return state;
  }
};

export default LoginManager;
