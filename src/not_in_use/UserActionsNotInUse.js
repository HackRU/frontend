//UserActionsNotInUse.js


//NOT IN USE
export const updateMentor = (mentor, key, value) => (
  (dispatch) => {

    mentor[key] = value;
    dispatch({
      type: USER_DATA.SET_MENTOR_INFO,
      mentorInfo: mentor
    });
  }
);

//NOT IN USE
export const updateVolunteer = (area) => (
  (dispatch) => {
    dispatch({
      type: USER_DATA.SET_VOLUNTEER_AREA,
      volunteerArea: area
    });
  }
);

//NOT IN USE
export const setShifts = (shifts, role) => (
  (dispatch) => {
    
    if(role === 'volunteer') {
      
      //update volunteer shifts
      dispatch({
        type: USER_DATA.SET_VOLUNTEER_TIMES,
        volunteerTimes: shifts
      });
    } else if(role === 'mentor') {
      
      //update mentor shifts
      dispatch({
        type: USER_DATA.SET_MENTOR_TIMES,
        mentorTimes: shifts
      });
    } else {
      
      //do nothing
      return;
    }
  }
);

//NOT IN USE
export const applyMentor = (userState) => (
  (dispatch) => {

    let mentorUpdate = {
      'role.mentor': {
        skills: userState.mentorInfo,
        times: userState.mentorTimes
      }
    };


    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': mentorUpdate},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
        
        if(resp.statusCode === 200) {

          //successful application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Thank you for your interest in becoming a mentor.  We will be in contact with you shortly.'
          });
        } else {

          //unsuccessful application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Mentor application failed.\n' + resp.body
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      }); 
  }
);

//NOT IN USE
export const unapplyMentor = (userState) => (
  (dispatch) => {
    
    let mentorUpdate = {
      'role.mentor': null
    };
    
    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: mentorUpdate,
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
      
        if(resp.statusCode === 200) {

          //successful un-application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Application rescinded.'
          });
        } else {

          //unsuccessful un-application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Role update failed.\n' + resp.body
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      }); 
  }
);


//NOT IN USE
export const applyVolunteer = (userState) => (
  (dispatch) => {

    let volunteerUpdate = {
      'role.volunteer': {
        area: userState.volunteerArea,
        times: userState.volunteerTimes
      }
    };


    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': volunteerUpdate},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
        
        if(resp.statusCode === 200) {

          //successful application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Thank you for your interest in becoming a volunteer.  We will be in contact with you shortly.'
          });
        } else {

          //unsuccessful application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Volunteer application failed.\n' + resp.body
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      }); 
  }
);

//NOT IN USE
export const unapplyVolunteer = (userState) => (
  (dispatch) => {
    
    let volunteerUpdate = {
      'role.volunteer': null
    };
    
    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: volunteerUpdate,
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
      
        if(resp.statusCode === 200) {

          //successful un-application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Application rescinded.'
          });
        } else {

          //unsuccessful un-application
          dispatch({
            type: USER_DATA.SET_EXTRA_FLASH,
            extraFlash: 'Role update failed.\n' + resp.body
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      }); 
  }
);
