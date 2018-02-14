import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class UserForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    if(this.props.email && this.props.token){
      this.state.email = this.props.email;
      this.state.token = this.props.token;
      this.state.user = {};
    }else{
      this.state.flash = "NOT LOGGED IN!";
    }
    
    //this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
    this.LogoutButtons = this.LogoutButtons.bind(this);
    this.showVolunteer = this.showVolunteer.bind(this);
    this.showMentor = this.showMentor.bind(this);
    this.volunteerAndMentorForms = this.volunteerAndMentorForms.bind(this);
  }

  componentDidMount(){
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/read', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.email,
        'token': this.state.token,
        'query': {'email': this.state.email}
      })
    }).then(resp => resp.json())
      .then(data => {
        const redact_keys = ['level_of_study', 'auth', 'password', 'short_answer', 'mlh', 'registration_status', 'role'];
        const og_usr = data.body[0];
        let newser = {};
        Object.keys(og_usr).map(key => {
          if(!redact_keys.includes(key)){
            if(key !== 'school')
              newser[key] = og_usr[key];
            else
              newser[key] = 'Rutgers University';
          }
        });
        this.setState({user: newser});
    }).catch(data => this.setState({flash: data.toString()}));
  }

  logout() {
    ReactDOM.render(<App /> , document.getElementById('register-root'));
  }

  onChange(e){
    const upd_key = e.target.id.split('-')[1];
    let updated = this.state.user;
    updated[upd_key] = e.target.value;
    this.setState({user: updated});
  }

  save() {
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates :this.state.user,
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
           this.setState({flash: "Updated profile! Thank you for registering."});
        }else{
           this.setState({flash: json.body});
        }
      });

  }

  LogoutButtons(){
    return (
      <div>
	    <button onClick={this.logout} id="loginButton">
          Logout
	    </button>

      <button onClick={this.save} id="signupButton" >
          Save
	    </button>
      </div>
    )

  }

  showVolunteer(e){
    document.getElementById('mentor-form').style.display = "none";
    document.getElementById('volunteer-form').style.display = "block";
  }

  showMentor(e){
    document.getElementById('mentor-form').style.display = "block";
    document.getElementById('volunteer-form').style.display = "none";
  }

  volunteerAndMentorForms() {
    return (
      <div id="extra-form-container">
        <button onClick={this.showVolunteer} value="Apply to volunteer">Volunteer!</button>
        <button onClick={this.showMentor} value="Apply to mentor">Mentor!</button>
        <div id="volunteer-form" style={{display:'none'}}>
          <div className="extra-left">
            Choose your preferred area:<br/>
            <input name="vol-cat"  type="radio" value="set-up" id="set-up-vol-inp"></input>
            <label htmlFor="set-up-vol-inp">Set-up</label><br/>
            <input name="vol-cat"  type="radio" value="registration" id="registration-vol-inp"></input>
            <label htmlFor="registration-vol-inp">Registration</label><br/>
            <input name="vol-cat"  type="radio" value="event" id="event-vol-inp"></input>
            <label htmlFor="event-vol-inp">Events</label><br/>
            <input name="vol-cat"  type="radio" value="workshop" id="workshop-vol-inp"></input>
            <label htmlFor="workshop-vol-inp">Workshops</label><br/>
            <input name="vol-cat"  type="radio" value="food" id="food-vol-inp"></input>
            <label htmlFor="food-vol-inp">Food</label><br/>
          </div>
          <div className="extra-right">
            Choose your preferred times:<br/>
            <input name="vol-time"  type="checkbox" value="sat-morn" id="sat-morn-vol-inp"></input>
            <label htmlFor="sat-morn-vol-inp">Saturday Morning</label><br/>
            <input name="vol-time"  type="checkbox" value="sat-noon" id="sat-noon-vol-inp"></input>
            <label htmlFor="sat-noon-vol-inp">Saturday Afternoon</label><br/>
            <input name="vol-time"  type="checkbox" value="sat-night" id="sat-night-vol-inp"></input>
            <label htmlFor="sat-night-vol-inp">Saturday Night</label><br/>
            <input name="vol-time"  type="checkbox" value="sun" id="sun-vol-inp"></input>
            <label htmlFor="sun-vol-inp">Sunday Morning</label><br/>
          </div>
        </div>
        <div id="mentor-form" style={{display:'none'}}>
          <div className="extra-left">
            Tell us your skills!<br/>
            <input name="ment-skill"  type="radio" value="set-up" id="set-up-ment-inp"></input>
            <label htmlFor="set-up-ment-inp">Set-up</label><br/>
            <input name="ment-skill"  type="radio" value="registration" id="registration-ment-inp"></input>
            <label htmlFor="registration-ment-inp">Registration</label><br/>
            <input name="ment-skill"  type="radio" value="event" id="event-ment-inp"></input>
            <label htmlFor="event-ment-inp">Events</label><br/>
            <input name="ment-skill"  type="radio" value="workshop" id="workshop-ment-inp"></input>
            <label htmlFor="workshop-ment-inp">Workshops</label><br/>
            <input name="ment-skill"  type="radio" value="food" id="food-ment-inp"></input>
            <label htmlFor="food-ment-inp">Food</label><br/>
          </div>
          <div className="extra-right">
            Choose your preferred times:<br/>
            <input name="ment-time"  type="checkbox" value="sat-morn" id="sat-morn-ment-inp"></input>
            <label htmlFor="sat-morn-ment-inp">Saturday Morning</label><br/>
            <input name="ment-time"  type="checkbox" value="sat-noon" id="sat-noon-ment-inp"></input>
            <label htmlFor="sat-noon-ment-inp">Saturday Afternoon</label><br/>
            <input name="ment-time"  type="checkbox" value="sat-night" id="sat-night-ment-inp"></input>
            <label htmlFor="sat-night-ment-inp">Saturday Night</label><br/>
            <input name="ment-time"  type="checkbox" value="sun" id="sun-ment-inp"></input>
            <label htmlFor="sun-ment-inp">Sunday Morning</label><br/>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
    <div id = "userform" className="react-form">

	       <p>Please update your data.</p>

      <span>
        { this.state.user && 
            Object.keys(this.state.user)
              .map(key =>
                 <div className="form-bit signed-in-form">
                        <label>{key.replace(/_/g, ' ')}</label><br/>
                        <input type="input" id={"input-" + key} value={this.state.user[key]} onChange={this.onChange}/><br/>
                 </div>
            )
        }
    </span>
    <this.LogoutButtons />
      <p> {this.state.flash} </p>
    <this.volunteerAndMentorForms />
    </div>
    );

  }


}

export default UserForm;
