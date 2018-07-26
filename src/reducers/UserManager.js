//UserManager.js
import { USER_DATA } from 'action_creators/ActionTypes';

//what we want to manage
const initialState = {
  userInfoEmail: '',
  token: '',
  hasResume: false,
  userInfo: {},
  mentorInfo: {}, //NOT IN USE
  mentorTimes: {}, //NOT IN USE
  volunteerArea: '', //NOT IN USE
  volunteerTimes: {}, //NOT IN USE
  codeOfConduct: false,
  dataSharing: false,
  travelReady: true, //TravelForm is either completely filled or empty
  qr: '',
  flash: '',
  extraFlash: '',
  upperFlash: ''
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
    case USER_DATA.SET_MENTOR_TIMES:
      return {
        ...state,
        mentorTimes: action.mentorTimes
      };
    case USER_DATA.SET_VOLUNTEER_AREA:
      return {
        ...state,
        volunteerArea: action.volunteerArea
      };
    case USER_DATA.SET_VOLUNTEER_TIMES:
      return {
        ...state,
        volunteerTimes: action.volunteerTimes
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
    case USER_DATA.SET_TRAVEL_READY:
      return {
        ...state,
        travelReady: action.travelReady
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
    case USER_DATA.SET_EXTRA_FLASH:
      return {
        ...state, 
        extraFlash: action.extraFlash
      };
    case USER_DATA.SET_UPPER_FLASH:
      return {
        ...state,
        upperFlash: action.upperFlash
      };
    default:
      return state;
  }
};

export default UserManager;
