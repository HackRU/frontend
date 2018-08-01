//UserActions.js
import { getCookie } from 'redux-cookie';

import { USER_DATA, VIEW_CONTROL } from 'action_creators/ActionTypes';
import * as ViewActions from 'action_creators/ViewActions';

import resURLS from 'resources/resURLS';
import { uploadResume, downloadResume } from 'resources/resume.js';

export const checkCookies = () => (
  (dispatch) => {
    
    let authdata = dispatch(getCookie('authdata'));
    //console.log(authdata);
    
    if(typeof(authdata) === 'string') {

      authdata = JSON.parse(authdata);
      if(Date.parse(authdata.auth.valid_until < Date.now())) {
        
        //invalid token
        dispatch(ViewActions.logoutUser());

        //should also be seen in sidebar
      } else {

        //token is still valid
        const email = authdata.auth.email;
        const token = authdata.auth.token;

        dispatch({
          type: USER_DATA.SET_EMAIL,
          email: email
        });
        dispatch({
          type: USER_DATA.SET_TOKEN,
          token: token
        });
        dispatch(ViewActions.loginUser({body: JSON.stringify(authdata)})); 
        
        //read in the user data from lcs
        dispatch(readUser(email, token));
      }
    } else {

      //no authorization
      dispatch(ViewActions.logoutUser());
    }
  }
);

export const updateUser = (userState, key, value) => (
  (dispatch) => {

    let user = userState.userInfo;
    user[key] = value;
    dispatch({
      type: USER_DATA.SET_USER_INFO,
      userInfo: user
    });
  }
);

export const updateTravel = (userState, key, value) => (
  (dispatch) => {

    let travellingFrom = userState.userInfo.travelling_from;
    if(!travellingFrom || (typeof(travellingFrom) === 'string')) {

      //no travel info yet
      travellingFrom = {};
    }
    travellingFrom[key] = value;
    dispatch(updateUser(userState, 'travelling_from', travellingFrom));
  }
);

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

export const toggleCOC = (checked) => (
  (dispatch) => {
    
    dispatch({
      type: USER_DATA.SET_COC, 
      codeOfConduct: checked
    });
  }
);

export const toggleShare = (checked) => (
  (dispatch) => {

    dispatch({
      type: USER_DATA.SET_SHARE,
      dataSharing: checked
    });
  }
);

export const save = (userState) => (
  (dispatch) => {

    let user = userState.userInfo;
    if(userState.codeOfConduct && userState.dataSharing) {
      
      //the user has checked both boxes and can be set as registered in lcs
    
      user.registration_status = 'registered';
    }

    console.log(user);

    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': user},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => {

        if(resp.statusCode === 200) {

          //save successful
          dispatch(updateUser(userState, 'registration_status', user.registration_status));
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: 'Changes saved successfully'
          });
        } else {
            
          //save unsucessful
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: 'Unable to save.\n' + resp.body
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

export const upResume = (userState) => (
  async (dispatch) => {
    //upload resume to S3
    const response = await uploadResume(userState.userInfoEmail);
    dispatch(confirmResume(response === 'Successfullly uploaded resume.'));
    dispatch({
      type: USER_DATA.SET_FLASH,
      flash: response
    });
  }
);

export const confirmAttendance = (userState) => (
  (dispatch) => {

    let update = {'registration_status': 'coming'};
    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': update},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        auth: userState.token 
      })
    }).then(data => data.json())
      .then(resp => {
        
        if(resp.statusCode === 200) {

          //successful update
          dispatch(updateUser(userState, 'registration_status', 'coming'));
          dispatch({
            type: USER_DATA.SET_UPPER_FLASH,
            upperFlash: 'Attendance confirmed.'
          });
        } else {

          //unsuccessful update
          dispatch({
            type: USER_DATA.SET_UPPER_FLASH,
            upperFlash: 'There was an issue with your confirmation:\n' + resp.body  
          });
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err));
      });
  }
);

export const cancelAttendance = (userState) => (
  (dispatch) => {
    
    let update = {'registration_status': 'not-coming'};
    if(userState.userInfo.travelling_from && userState.userInfo.travelling_from.is_real === true) {

      //this person had previously requested for travel reimbursement
      update['travelling_from.is_real'] = false;
    }

    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': update},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        token: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
        
        if(resp.statusCode === 200) {
          
          //successful update
          dispatch(updateUser(userState, 'registration_status', 'not_coming'));
          
          if(userState.userInfo.travelling_from) {
            dispatch(updateTravel(userState, 'is_real', false));
          }
          dispatch({
            type: USER_DATA.SET_UPPER_FLASH,
            upperFlash: 'Attendance canceled.'
          });
        } else {
        
          //unsuccessful update
          dispatch({
            type: USER_DATA.SET_UPPER_FLASH, 
            upperFlash: 'There was an issue with your cancellation:\n' + resp.body
          });
        }
      })
      .catch(err => {
        
        //unexpected error
        dispatch(showCaughtError(err));
      });
  }
); 

export const sendTravelInfo = (userState) => (
  (dispatch) => {

    if(userState.travelReady !== true) {

      //do nothing, no notifications if the TravelForm is not ready
      return;
    }

    //let travelMode = document.querySelector('input[name="preferred-transport"]:checked').value; 

    let travellingFrom = userState.userInfo.travelling_from;
    //travellingFrom.mode = travelMode; 

    fetch(resURLS.lcsUpdateURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updates: {'$set': {'travelling_from': travellingFrom}},
        user_email: userState.userInfoEmail,
        auth_email: userState.userInfoEmail,
        token: userState.token
      })
    }).then(data => data.json())
      .then(resp => {
        
        if(resp.statuscode === 200) {
          
          //successful update
          dispatch(updateUser(userState, 'travelling_from', travellingFrom));
          dispatch({
            type: USER_DATA.SET_UPPER_FLASH,
            upperFlash: 'Travel update successful.  Updates on reimbursement to follow.'
          });
        } else {

          //unsuccessful update
          dispatch({
            type: USER_DATA.SET_UPPER_FLASH,
            upperFlash: 'There was an issue updating travel your travel information:\n' + resp.body
          });
        }
      })
      .catch(err => {
        
        //unexpected error
        dispatch(showCaughtError(err));
      });
  }
);

export const toggleTravel = (userState) => (
  (dispatch) => {

    let user = userState.userInfo;
    
    let isReal = !(user.travelling_from && user.travelling_from.is_real); //toggle request status
    
    updateTravel(userState, 'is_real', isReal);

    if(!isReal) {

      //update when toggled off..?
      fetch(resURLS.lcsUpdateURL, {
        method: 'POST',
        mode: 'cors', 
        credentials: 'omit',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          updates: {'$set': {'travelling_from.is_real': false}},
          user_email: userState.userInfoEmail,
          auth_email: userState.userInfoEmail,
          auth: userState.token
        })
      }).then(data => data.json())
        .then(resp => {
          
          if(resp.statusCode === 200) {

            //successful update
            //state already updated
          } else {

            //unsuccessful update
            dispatch({
              type: USER_DATA.SET_UPPER_FLASH,
              upperFlash: 'There was an issue updating your travel information:\n' + resp.body
            });
          }
        })
        .catch(err => {
          
          //unexpected error
          dispatch(showCaughtError(err));
        });
    }
  }
);

export const readyTravel = (ready) => (
  (dispatch) => {
    dispatch({
      type: USER_DATA.SET_TRAVEL_READY,
      travelReady: ready
    });
  }
);

export const finalizeTravel = (userState, place) => (
  (dispatch) => {
    
    let travellingFrom = userState.userInfo.travelling_from;
    if(!travellingFrom) {
      
      //no existing travel info yet, start with empty
      travellingFrom = {};
    }

    if(!travellingFrom.location) {

      //no existing location yet, start with empty
      travellingFrom.location = {};
    }

    travellingFrom.location.lat = place.geometry.location.lat();
    travellingFrom.location.lng = place.geometry.location.lng();
    travellingFrom.formatted_address = place.formatted_address;

    dispatch(updateUser(userState, 'travelling_from', travellingFrom));
    dispatch(readyTravel(true));
  }
);


export const readUser = (uEmail, uToken) => (
  (dispatch) => {

    //read the specified user, the query email must match the user's email
    fetch(resURLS.lcsReadURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: uEmail,
        token: uToken,
        query: { 
          email: uEmail
        }
      })
    }).then(resp => resp.json())
      .then(data => {

        //on successful read, set state's user to data
        const user = data.body[0];
        dispatch({
          type: USER_DATA.SET_USER_INFO,
          userInfo: user
        });
        dispatch({
          type: USER_DATA.SET_EMAIL,
          email: user.email
        });

        //console.log('user set');
        //check for admin status
        dispatch(checkAdmin(user));
        //set the status
        dispatch(getStatus(user));
        //set the qr code
        dispatch(getQR(user.email));
        //get resume

        
        //download the user's resume from S3
        downloadResume(true, uEmail, (resp, err) => {
          dispatch(confirmResume(resp));        
          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: resp ? 'Resume found' : err
          });
        });

      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError(err.toString()));
      });
  }
);

const getStatus = (user) => (
  (dispatch) => {

    let status = user && user.registration_status;
    if(status && (status === 'registered' || status === 'unregistered' || status === 'rejected')) {

      //we don't show a rejection status
      status = 'pending';
    } else if(status && status === 'confirmation') {

      //accepted and awaiting user confirmation
      status = 'pending confirmation';
    } else if(status) {

      //use whatever's there
      status = status.replace('-', ' ');
    } else {

      //none of the above, not set yet
      status = 'Loading';//kind of hacky
    }

    dispatch({
      type: VIEW_CONTROL.SET_STATUS,
      userStatus: status
    });
  }
);

const checkAdmin = (user) => (
  (dispatch) => {

    if(!user.role.director) {

      //user does not have admin privileges
      return;
    } else {

      //set as admin
      dispatch(ViewActions.setAsAdmin());
    }
  }
);


const confirmResume = (hasResume) => (
  (dispatch) => {
    
    dispatch({
      type: USER_DATA.HAS_RESUME, 
      hasResume: hasResume
    });
  }
);

const getQR = (email) => (
  (dispatch) => {

    fetch(resURLS.lcsQRURL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        background: resURLS.background,
        color: resURLS.foreground
      })
    }).then(resp => resp.json())
      .then(resp => {
        if(resp.statusCode === 200) {
        
          //QR retrieval successful
          dispatch({
            type: USER_DATA.SET_QR,
            qr: resp.body
          });
        } else {
          dispatch(showCaughtError('Could not display QR.\n' + resp.body));
        }
      })
      .catch(err => {

        //unexpected error
        dispatch(showCaughtError('Could not display QR.\n' + err.toString()));
      });
  }
);

const showCaughtError = (mes) => (
  (dispatch) => {
    console.log('error logged: ' + mes);
    dispatch({
      type: USER_DATA.SET_FLASH,
      flash: 'An error occurred:\n' + mes
    });
  }
);