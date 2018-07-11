//rootReducer.js
import { combineReducers } from 'redux';
import LoginManager from 'reducers/LoginManager';

const rootReducer = combineReducers({
  loginManager: LoginManager
});

export default rootReducer;
