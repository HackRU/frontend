//rootReducer.js
import { combineReducers } from 'redux';
import LoginManagement from 'reducers/LoginManagement';

const rootReducer = combineReducers({
  login_mngmt: LoginManagement
});

export default rootReducer;
