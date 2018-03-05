import React from 'react';
import ReactDOM from 'react-dom';
import UserForm from './UserForm';
import md5 from 'md5';

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      email:'',
      password: '',
      errorMessage: '',
      isLoggedIn: false
    };

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.mlh = this.mlh.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.LoginButtons = this.LoginButtons.bind(this);
    this.currentForm = this.currentForm.bind(this);
    this.loginPostFetch = this.loginPostFetch.bind(this);
  }

  loginPostFetch(data){
    if(data.statusCode != 200){
      const/*antina, our saviour*/ errorMsgs = {
        "invalid email,hash combo": "Incorrect email or password.",
        "Wrong Password": "Incorrect password."
      };

      this.setState({errorMessage: errorMsgs[data.body]});
      return;
    }
    this.setState({isLoggedIn: true});
    const bod = JSON.parse(data.body);
    const token = bod.auth.token;
    ReactDOM.render(<UserForm token={token} email={this.state.email}/> , document.getElementById('register-root'));
  }

  login() {

    	if (this.state.email == "" || this.state.password == ""){
    		this.setState({errorMessage: "Please fill in all the fields"});
    	} else {
    		fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/authorize', {
    		  method: 'POST',
    		  mode: 'cors',
          credentials: 'omit',
    		  headers: {
    		    'Content-Type': "application/json"
    		  },
    		  body: JSON.stringify({
    		    email: this.state.email,
    		    password: md5(this.state.password) + '',
    		  })
    		}).then(resp => resp.json())
          .then(this.loginPostFetch).catch(data => {
    		  const error = data.message;
    		  this.setState({errorMessage: error});
    		})

    	}

  }

  signUp() {

  	if (this.state.email == "" || this.state.password == ""){
    		this.setState({errorMessage: "Please fill in all the fields"});
    } else {
    		fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/create', {
    		  method: 'POST',
    		  mode: 'cors',
              credentials: 'omit',
    		  headers: {
    		    'Content-Type': "application/json"
    		  },
    		  body: JSON.stringify({
    		    email: this.state.email,
    		    password: md5(this.state.password) + '',
    		  })
    		}).then(resp => resp.json())
          .then(data => {
                  if (data.statusCode == 200){
			  this.setState({isLoggedIn:true});
			  const token = JSON.parse(data.body).auth.token;
			  ReactDOM.render(<UserForm token={token} email={this.state.email}/> , document.getElementById('register-root'));
                  }else if(data.body === "Duplicate user!"){
                          this.setState({errorMessage: "You are already in our system! Please try logging in."})
                  }else{
                          this.setState({errorMessage: data.body})
                  }
    		}).catch(data => {
    		  const error = data.message;
    		  console.log(data);
    		  this.setState({errorMessage: error});
    		})

    }
  }

  mlh() {
    let href = "https://my.mlh.io/oauth/authorize?client_id=bab4ace712bb186d8866ff4776baf96b2c4e9c64d729fb7f88e87357e4badcba&redirect_uri=https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/mlhcallback&response_type=code&scope=email+education+birthday";
    window.open(href, "_blank");
  }

  onEmailChange(e){
    this.setState({email: e.target.value})
  }

  onPasswordChange(e){
    this.setState({password: e.target.value})
  }

  LoginButtons() {
    return (
      <div className="customcentertext">
      <button  onClick={this.login} id="loginButton" className="btn btn-primary btn-lg">
          Login
      </button>

      <button className="btn btn-warning btn-lg m-2" onClick={this.mlh} id="mlhButton" >
          Login with MLH
      </button>

      <button className="btn btn-success btn-lg" onClick={this.signUp} id="signupButton" >
          Sign Up
      </button>

      </div>
    )
  }

  currentForm(props){
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
	    let userForm = document.getElementById('userform');
	    return userForm;

    }
    return (
      <div>
	  <p>Hi! We're glad you're joining us at HackRU. Please enter your email, create a password, and click "Sign up."<br/><br/>
If you are already registered for HackRU and would like to access or modify your information, please enter your account information and click "Login."</p><br/>
       <p>If you are interested in applying to become a volunteer or mentor, please fill out the original registration form. Then, select your preference and proceed to the additional application form.</p>

		<div className="not-logged-in form-bit form-group row mb-4">
    <label className="col-sm-2 col-form-label">Email:</label>
    <div class="col-sm-10">
    <input placeholder="email@example.com" className="form-control" value={this.state.email} onChange={this.onEmailChange} type="email" name="email"/>
    </div>
    </div>
		<div className="not-logged-in form-bit form-group row mb-4">
    <label className="col-sm-2 col-form-label">Password:</label>
    <div class="col-sm-10">
    <input placeholder="Your Password" className="form-control" value={this.state.password} onChange={this.onPasswordChange} type="password" name="pass"/>
    </div>
    </div>
       <this.LoginButtons />
        <p> {this.state.errorMessage} </p>
      </div>)

  }

  render() {

    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div className="react-form">
        <this.currentForm isLoggedIn={isLoggedIn} />
      </div>
    );

  }

}

export default App;
