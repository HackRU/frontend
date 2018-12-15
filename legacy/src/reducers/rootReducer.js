//rootReducer.js
import { combineReducers } from 'redux';
import LoginManager from 'reducers/LoginManager';
import UserManager from 'reducers/UserManager';
import ViewController from 'reducers/ViewController';
import AdminManager from 'reducers/AdminManager';


const rootReducer = combineReducers({
  loginManager: LoginManager,
  userManager: UserManager,
  viewController: ViewController,
  adminManager: AdminManager
});

export default rootReducer;
