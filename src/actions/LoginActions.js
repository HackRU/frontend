//LoginActions.js
import resURLS from 'resources/resURLS';



const fetchPasswordWithLink = () = {
  
  return function(dispatch) {
    dispatch({
      type: 'FETCH_PASSWORD_REQUEST'
    });
    return fetch(resURLS.mlhTestConsumeURL, 
  }
}
