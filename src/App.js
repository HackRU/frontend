import React from 'react';
//import ReactDOM from 'react-dom';
import 'whatwg-fetch'

class App extends React.Component {
  login() {
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/authorize', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'email here',
        password: 'password',
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
        email: 'email here',
        password: 'password',
      })
    })

  }

  mlh() {
    window.location.href = "https://my.mlh.io/oauth/authorize?client_id=bab4ace712bb186d8866ff4776baf96b2c4e9c64d729fb7f88e87357e4badcba&redirect_uri=https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/mlhcallback&response_type=code&scope=email+education+birthday";
  }



  render() {
    return (
      <div>
	<p>Enter your name and email in the fields, then click "Login" or "Sign Up". Click "MLH" to login from MLH website.</p>

	
	
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
