//VolunteerForm.js
import React from 'react';


import ClickList from 'components/ClickList';

import VolunteerArea from 'resources/VolunteerArea';
import VolunteerTime from 'resources/VolunteerTime';




class VolunteerForm extends React.Component {

  render() {

    

    return (
      <div id="volunteer-form"
        style={{display:'none'}}
      >
        <ClickList data={VolunteerArea}/>
        <ClickList data={VolunteerTime}/>
        <div className="clearfix" />
        <button className="btn btn-primary"
          onClick={this.applyVolunteer}
        >{'Submit Application'}</button>
      </div>
    );
    
    
  }
}

