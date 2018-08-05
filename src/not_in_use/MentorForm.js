//MentorForm.js
import React from 'react';

import ClickList from 'components/ClickList';
import InputList from 'components/InputList';

import MentorResume from 'resources/MentorResume';
import MentorTime from 'resources/MentorTime';

class MentorFrom extends React.Component {

  render() {
  
    return (
      
      <div id="mentor-form"
        style={{display:'none'}}
      >
        <InputList data={MentorResume}
          onChange={}
          mentorInfo={}
        />
        <div className="clearfix" />
        <button className="btn btn-primary"
          onClick={this.applyMentor}
        >Submit Application</button>
      </div> 
    );
  }

}


