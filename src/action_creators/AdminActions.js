//AdminActions.js


import { ADMIN_DATA } from 'action_creators/ActionTypes';
import resURLS from 'resources/resURLS';

export const queryDB = (userEmail, token, query) => (
  (dispatch) => {
    
    fetch(resURLS.lcsReadURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
      //'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': userEmail,
        'token': token,
        'query': query,
        'aggregate': true
      })
    }).then(resp => resp.json())
      .then(data => {
        if(data.statusCode === 200)
          dispatch({
            type: ADMIN_DATA.UPDATE_DATA,
            data: 'Fatal Error'
          });
        else
          dispatch({
            type: ADMIN_DATA.UPDATE_DATA,
            data: {results: [{'_id': 'error', 'count': data.body}]}
          });
      });







    
  }
);

