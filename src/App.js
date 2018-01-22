import React from 'react';
//import ReactDOM from 'react-dom';
import 'whatwg-fetch'

class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      email:'',
      password: ''
    };
	
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.mlh = this.mlh.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  login() {
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/authorize', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    }).then(function(data){
      alert(data);
    })
  }

  signUp() {
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })

  }

  mlh() {
    window.location.href = "https://my.mlh.io/oauth/authorize?client_id=bab4ace712bb186d8866ff4776baf96b2c4e9c64d729fb7f88e87357e4badcba&redirect_uri=https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/mlhcallback&response_type=code&scope=email+education+birthday";
  }

  onEmailChange(e){
    this.setState({email: e.target.value})
  }

  onPasswordChange(e){
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <div className="App">
	<p>Enter your name and email in the fields, then click "Login" or "Sign Up". Click "MLH" to login from MLH website.</p>

		Email: <input value={this.state.email} onChange={this.onEmailChange} type="email" name="email"/><br/>
		Password: <input value={this.state.password} onChange={this.onPasswordChange} type="password" name="pass"/><br/>
	
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
    );

  }


}

export default App;
