import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class UserForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    if(props.email && props.token){
      this.state.email = props.email;
      this.state.token = props.token;
      this.state.user = {};
    }else{
      this.state.flash = "NOT LOGGED IN!";
    }
    
    this.componentDidMount = this.componentDidMount.bind(this);
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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.email,
        'token': this.state.token,
        'query': {'email': this.state.email}
      })
    }).then(resp => resp.json())
          .then(data => {
      this.setState({user: data});
    })
  }

  logout() {
    ReactDOM.render(<App /> , document.getElementById('register-root'));
  }

  onChange(e){
    this.setState({input: e.target.value});
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
        user:this.state.user,
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

      <h1> {this.state.flash} </h1>
	       <p>Please update your data.</p>

      <div>
        { this.state.user && 
            this.state.user.keys.map(key =>
                    <div>
                        <label>{key}</label>
                        <input type="input" id="input-{key}" value={this.state[key]} onChange={this.onChange}/><br/>
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
