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
        const redact_keys = ['auth', 'password', 'short_answer', 'mlh', 'registration_status', 'role'];
        const og_usr = data.body[0];
        let newser = {};
        Object.keys(og_usr).map(key => {
          if(!redact_keys.includes(key)){
            newser[key] = og_usr[key];
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
    })

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

  render() {
    return (
    <div id = "userform" className="faq-box App">

      <p> {this.state.flash} </p>
	       <p>Please update your data.</p>

      <div>
        { this.state.user && 
            Object.keys(this.state.user)
              .map(key =>
                 <div>
                        <label>{key.replace(/_/g, ' ')}</label>
                        <input type="input" id={"input-" + key} value={this.state.user[key]} onChange={this.onChange}/><br/>
                 </div>
            )
        }
    </div>
    <this.LogoutButtons />
    </div>
    );

  }


}

export default UserForm;
