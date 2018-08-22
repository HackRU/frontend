//UserActions.js
import { getCookie } from 'redux-cookie';

import { USER_DATA, VIEW_CONTROL, LOGIN_MNGMNT } from 'action_creators/ActionTypes';
import * as ViewActions from 'action_creators/ViewActions';

import resURLS from 'resources/resURLS';
import { resumeExists, uploadResume } from 'resources/resume.js';

import formConfig from 'resources/formConfig';

export const checkCookies = () => (
  (dispatch) => {
    
    let authdata = dispatch(getCookie('authdata'));
    //console.log('a ' + authdata);
    
    if(typeof(authdata) === 'string') {

      authdata = JSON.parse(authdata);
      if(Date.parse(authdata.auth.valid_until < Date.now())) {
        
        //invalid token
        dispatch(ViewActions.logoutUser());

        //should also be seen in sidebar
      } else {

        //token is still valid
        dispatch(ViewActions.loginUser({body: JSON.stringify(authdata)})); 
        
        //read in the user data from lcs
        //dispatch(readUser(email, token));
      }
    } else {

      //no authorization
      dispatch({
        type: VIEW_CONTROL.SET_LOGIN_STATUS,
        loggedIn: false
      });
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

    //there are changes obviously
    dispatch({
      type: USER_DATA.HAS_UNSAVED_CHANGES,
      hasUnsavedChanges: true
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

export const toggleCOC = (userState) => (
  (dispatch) => {

    const isChecked = !userState.codeOfConduct; 

    dispatch({
      type: USER_DATA.SET_COC, 
      codeOfConduct: isChecked
    });
  }
);

export const toggleShare = (userState) => (
  (dispatch) => {

    const isChecked = !userState.dataSharing;

    dispatch({
      type: USER_DATA.SET_SHARE,
      dataSharing: isChecked
    });
  }
);

export const preSave = (userState) => (
  (dispatch) => {
    
    const done = dispatch(checkUserReq(userState));
    
    if(done === false) {
      
      //unregistered

      alert('Your info will be saved but you will not be registered until you agree to the MLH Code of Conduct and Data Sharing Policy.');
      userState.userInfo.registration_status = 'unregistered';
    } else {
      
      //unfinished or true
      userState.userInfo.registration_status = 'registered';
    
    }

    dispatch(save(userState));
  }
);

export const save = (userState) => (
  (dispatch) => {

    let user = userState.userInfo;


    //console.log('user being saved: ' + JSON.stringify(user));

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

          let success = 'All changes saved successfully';
          if(user.registration_status === 'registered') {

            success = success + ', thanks for registering!';
          }



          dispatch({
            type: USER_DATA.SET_FLASH,
            flash: success
          });
          dispatch(getStatus(userState.userInfo));
          //new reference for future changes
          dispatch({
            type: USER_DATA.HAS_UNSAVED_CHANGES,
            hasUnsavedChanges: false
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
    dispatch(confirmResume(response === 'Successfully uploaded resume.'));
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
          dispatch(getStatus(userState.userInfo));
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
        auth: userState.token
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
          dispatch(getStatus(userState.userInfo));
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
        auth: userState.token
      })
    }).then(data => data.json())
      .then(resp => { 
        if(resp.statusCode === 200) {
          
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
    
    dispatch(updateTravel(userState, 'is_real', isReal));

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
        //console.log('user being read: ' + JSON.stringify(user));
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

        
        //clear LoginManager
        dispatch({
          type: LOGIN_MNGMNT.SET_ERROR,
          errorMessage: ''
        });
        dispatch({
          type: LOGIN_MNGMNT.CHANGE_EMAIL,
          email: ''
        });
        dispatch({
          type: LOGIN_MNGMNT.CHANGE_PASSWORD,
          password: ''
        });

        return resumeExists(uEmail);
      })
      .then(found => {
        dispatch(confirmResume(found));
        /*
        dispatch({
          type: USER_DATA.SET_FLASH,
          flash: found ? 'Resume found' : 'Resume not found'
        });*/
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
    if(status && (status === 'registered' || status === 'rejected')) {

      //we don't show a rejection status
      status = 'pending';

      //implicity, this means user agreed to codeOfConduct and dataSharing
      dispatch({
        type: USER_DATA.SET_COC, 
        codeOfConduct: true
      });
      dispatch({
        type: USER_DATA.SET_SHARE,
        dataSharing: true
      });
    } else if(status && status === 'confirmation') {

      //accepted and awaiting user confirmation
      status = 'pending confirmation';
    } else if(status) {

      //use whatever's there
      status = status.replace('_', ' ').replace('-', ' '); //Yes I'm lazy.
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

export const checkUserReq = (userState) => (
  (dispatch) => {

    if(userState.codeOfConduct === false || userState.dataSharing === false) {
      
      //mlh not filled out
      return false;
    } else {
      
      let user = userState.userInfo;
      let reqFields = Object.keys(formConfig).filter(f => formConfig[f].required === true)
        .map(k => {
          if(k === 'phone_number') {
            //console.log(user[k]);
            
            return /^\d{16}$/.test(user[k]);
          } else {
            return user[k] !== '';
          }
        });

      //console.log(reqFields);

      if(!reqFields.every(x => x === true)) {

        //required fields not filled out

        return 'unfinished';
      } else {

        //run age check

        //console.log(Date.parse(user.date_of_birth));
        //console.log(user.school);


        //console.log(Date.parse(user.data_of_birth));
        //console.log(Date.now());
        if(Date.parse(user.date_of_birth) > Date.now()) {

          //time traveller
          alert('Your info indicates that your birthday is in the future.  If this is correct, be advised that we cannot admit time travellers to HackRU since their mere presence violates the 2nd Law of Thermodynamics.  Otherwise, please correct the relevant fields.');
          return 'unfinished';
        }


        if(user.school.includes('Rutgers') && Date.parse(user.date_of_birth) > Date.parse(resURLS.cutoffBDate)) {

          alert('Your info indicates that you will be under 18 years old on the day of HackRU.  Please be informed that a parent/guardian must sign your waiver for attendance if you are admitted to this event.  Contact info@hackru.org if you have questions.');
        } else if(!user.school.includes('Rutgers') && Date.parse(user.date_of_birth) > Date.parse(resURLS.cutoffBDate)) {

          //too young
          alert('Your info indicates that you will be under 18 years old on the day of HackRU.  We cannot admit non-Rutgers students who are under 18 years old to this event.  Please contact info@hackru.org if you have questions.');
          return 'unfinished';
        }

        const gradAge = user.grad_year - new Date(user.date_of_birth).getFullYear();

        if(gradAge < 0) {
          alert('Your info indicates that you graduated on a year before your date of birth.  We do not believe this is physically possible.  Please correct the relevant fields before saving.');
          
          return 'unfinished';
        }
        return true;
      }
      
    }
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
