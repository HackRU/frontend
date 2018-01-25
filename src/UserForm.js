import React from 'react';
//import ReactDOM from 'react-dom';
import App from '.UserForm';

class UserForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    if(props.email && props.token){
      this.state.email = props.email;
      this.state.token = props.token;
    }else{
      this.state.flash = "NOT LOGGED IN!";
    }
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/read', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(data => {})
  }

  logout() {
    App.setState({isLoggedIn: false});  
  }

  onChange{
    this.setState({input: e.target.value});
  }

  save() {
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/test/update', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:this.state.user,
      })
    })

  }

  function LogoutButtons(){
    return (
	    <button onClick={this.logout} id="loginButton">
          Logout
	    </button>

      <button onClick={this.save} id="signupButton" >
          Save
	    </button>
    )

  }

  render() {
    return (
    <div id = "userform">

      <div>
      <h1> {this.state.flash} </h1>
	       <p>Please update your data.</p>

      <div>
        {
            this.state.user.keys.map(key =>
                    <div>
                        <label>{key}</label>
                        <input type="input" id="input-{key}" value={this.state[key]} onChange={this.onChange}/><br/>
                    </div>
            )
        }
    </div>
    );

  }


}

export default UserForm;
