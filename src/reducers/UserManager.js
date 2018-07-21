//UserManager.js
import { USER_DATA } from 'actions/ActionTypes';

//what we want to manage
const initialState = {
  userInfoEmail: '',
  token: '',
  hasResume: false,
  userInfo: null,
  mentorInfo: null,
  codeOfConduct: false,
  dataSharing: false,
  qr: '',
  flash: ''
};

const UserManager = (state = initialState, action) => {
  switch(action.type) {
    case USER_DATA.SET_EMAIL:
      return {
        ...state,
        userInfoEmail: action.email
      };
    case USER_DATA.SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case USER_DATA.HAS_RESUME:
      return {
        ...state,
        hasResume: action.hasResume
      };
    case USER_DATA.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo
      };
    case USER_DATA.SET_MENTOR_INFO:
      return {
        ...state,
        mentorInfo: action.mentorInfo
      };
    case USER_DATA.SET_COC:
      return {
        ...state,
        codeOfConduct: action.codeOfConduct
      };
    case USER_DATA.SET_SHARE:
      return {
        ...state,
        dataSharing: action.dataSharing
      };
    case USER_DATA.SET_QR:
      return {
        ...state,
        qr: action.qr
      };
    case USER_DATA.SET_FLASH:
      return {
        ...state,
        flash: action.flash
      };
    default:
      return state;
  }
};

export default UserManager;
