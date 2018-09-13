//ViewController.js
import { VIEW_CONTROL } from 'action_creators/ActionTypes';

//what we want to manage
const initialState = {
  loggedIn: false,
  isAdmin: false,
  applyForm: '', 
  userStatus: 'Loading your info...'
};

const ViewController = (state = initialState, action) => {
  switch(action.type) {
    case VIEW_CONTROL.SET_LOGIN_STATUS:
      return {
        ...state,
        loggedIn: action.loggedIn
      };
    case VIEW_CONTROL.IS_ADMIN:
      return {
        ...state,
        isAdmin: action.isAdmin
      };
    case VIEW_CONTROL.APPLY_FORM:
      return {
        ...state, 
        applyForm: action.applyForm
      };
    case VIEW_CONTROL.SET_STATUS:
      return {
        ...state,
        userStatus: action.userStatus
      };
    default: 
      return state;
  }
};

export default ViewController;
