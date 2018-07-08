//LoginManagement.js
import LOGIN_MNGMNT from 'actions/ActionTypes';

const initialState = {
  email: '',
  password: '',
  link: '',
  isLoggedIn: false, 
  errorMessage: ''
};

const LoginManagement = (state = initialState, action) => {
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
    case LOGIN_MNGMNT.GOTO_USER_FORM:
      return {
      };
    case LOGIN_MNGMNT.SET_ERROR:
      return {
        ...state, 
        errorMessage: action.errorMessage,
        link: action.link
      }
    default: 
      return state;
  }
};

export default LoginManagement;
