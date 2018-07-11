//LoginActions.js
import LOGIN_MNGMNT from 'actions/ActionTypes';
import resURLS from 'resources/resURLS';


export const checkURL = () => (
  (dispatch) => {
    let url_params = new URLSearchParams(window.location.search);
    
    if(url_params.has('error')) {
      
      dispatch({
        type: LOGIN_MNGMNT.SET_ERROR, 
        errorMessage: url_params.get('error')
      });
    } else {
      
      if(url_params.has('magiclink')) {
      
        const magic_link = url_params.get('magiclink');
        if(magic_link.startsWith('forgot-')) {
        
          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR,
            errorMessage: 'You have a magic link! Please enter your email and then your new password.'
          });
          dispatch({
            type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
            magicLink: magic_link
          });
        } else {

          dispatch({
            type: LOGIN_MNGMNT.SET_ERROR, 
            errorMessage: 'You have a magic link! Please log in to apply it.'
          });
          dispatch({
            type: LOGIN_MNGMNT.SET_MAGIC_LINK, 
            magicLnk: magic_link
          });
        }
      } 

      //cookie setup ???? how do
      if(url_params.has('authdata')) {
        
        const authdata = JSON.parse(url_params.get('authdata'));
        //set the auth data in the cookie
      }

      //grab the auth data from the cookie
      const auth = '';
      if(auth && Date.parse(auth.auth.valid_until) > Date.now()) {

        dispatch(loadUserForm({body: JSON.stringify(auth)}));
      }
    }
  }
);

const loadUserForm = (data) => (
  (dispatch) => {
    dispatch({
      type: LOGIN_MNGMNT.SET_LOGIN_STATUS,
      isLoggedIn: true
    });

    const body = JSON.parse(data.body);
    //set the cookies auth data as the body????

    
  }
);
