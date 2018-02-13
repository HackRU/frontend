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
      <div>
        <button onClick={this.showVolunteer} value="Apply to volunteer">Volunteer!</button>
        <button onClick={this.showMentor} value="Apply to mentor">Mentor!</button>
        <div id="volunteer-form" style={{display:'none'}}>
          Foo
        </div>
        <div id="mentor-form" style={{display:'none'}}>
          Bar
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
