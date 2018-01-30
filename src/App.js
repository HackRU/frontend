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
      this.setState({errorMessage: data.body});
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
    		    password: md5(this.state.password),
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
    		    password: md5(this.state.password),
    		  })
    		}).then(resp => resp.json())
          .then(data => {
          this.setState({isLoggedIn:true});
    		  const token = JSON.parse(data.body).auth.token;
    		  ReactDOM.render(<UserForm token={token} email={this.state.email}/> , document.getElementById('register-root'));
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
      <div>
      <button onClick={this.login} id="loginButton">
          Login
      </button>

      <button onClick={this.mlh} id="mlhButton">
          MLH
      </button>

      <button onClick={this.signUp} id="signupButton" >
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
        <p> {this.state.errorMessage} </p>
	  <p>Enter your name and email in the fields, then click "Login" or "Sign Up". Click "MLH" to login from MLH website.</p>

		Email: <input value={this.state.email} onChange={this.onEmailChange} type="email" name="email"/><br/>
		Password: <input value={this.state.password} onChange={this.onPasswordChange} type="password" name="pass"/><br/>
       <this.LoginButtons />
      </div>)

  }

  render() {
  
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div className="faq-box App">
        <this.currentForm isLoggedIn={isLoggedIn} />
      </div>
    );

  }

}

export default App;
