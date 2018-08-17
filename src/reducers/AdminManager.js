//UserManager.js
import { ADMIN_DATA } from 'action_creators/ActionTypes';

//what we want to manage
const initialState = {
  queryData: '',
};

const AdminManager = (state = initialState, action) => {
  switch(action.type) {
    case ADMIN_DATA.UPDATE_DATA:
      return {
        ...state, 
        data: action.data
      };
    default: 
      return state;
  }
};

export default AdminManager;
