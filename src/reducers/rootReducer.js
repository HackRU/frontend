//rootReducer.js
import { combineReducers } from 'redux';
import LoginManager from 'reducers/LoginManager';
import UserManager from 'reducers/UserManager';

const rootReducer = combineReducers({
  loginManager: LoginManager,
  userManager: UserManager
});

export default rootReducer;
