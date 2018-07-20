//VolunteerForm.js
import React from 'react';

class VolunteerForm extends React.Component {

  render() {
    return (
      <div id="volunteer-form"
        style={{display:'none'}}
      >
        <div className="extra-left">
          {'Choose your preferred area'}:<br/>
          <input id="set-up-vol-inp"
            name="vol-cat"
            type="radio"
            value="set-up"
          />
          <label htmlFor="set-up-vol-inp">{'Set-up'}</label><br/>
          <input id="registration-vol-inp"
            name="vol-cat"
            type="radio"
            value="registration"
          />
          <label htmlFor="registration-vol-inp">Registration</label><br/>
          <input id="event-vol-inp"
            name="vol-cat"
            type="radio"
            value="event"
          />
          <label htmlFor="event-vol-inp">Events</label><br/>
          <input id="workshop-vol-inp"
            name="vol-cat"
            type="radio"
            value="workshop"
          />
          <label htmlFor="workshop-vol-inp">Workshops</label><br/>
          <input id="food-vol-inp"
            name="vol-cat"
            type="radio"
            value="food"
          />
          <label htmlFor="food-vol-inp">Food</label><br/>
        </div>
        <div className="extra-right">
          Choose your preferred times:<br/>
          <input id="sat-morn-vol-inp"
            name="vol-time"
            type="checkbox"
            value="sat-morn"
          />
          <label htmlFor="sat-morn-vol-inp">Saturday (24th) Morning</label><br/>
          <input id="sat-noon-vol-inp"
            name="vol-time"
            type="checkbox"
            value="sat-noon"
          />
          <label htmlFor="sat-noon-vol-inp">Saturday (24th) Afternoon</label><br/>
          <input id="sat-night-vol-inp"
            name="vol-time"
            type="checkbox"
            value="sat-night"
          />
          <label htmlFor="sat-night-vol-inp">Saturday (24th) Evening</label><br/>
          <input id="sun-vol-inp"
            name="vol-time"
            type="checkbox"
            value="sun"
          />
          <label htmlFor="sun-vol-inp">Sunday (25th) Morning</label><br/>
        </div>
        <div className="clearfix" />
        <button className="btn btn-primary"
          onClick={this.applyVolunteer}
        >Submit Application</button>
      </div>
    );
    
    
  }
}

