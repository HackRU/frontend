import React from 'react';
import ReactDOM from 'react-dom';
import UserForm from './UserForm';
import {instanceOf} from 'prop-types';
import {CookiesProvider, withCookies, Cookies} from 'react-cookie';
import ModalError from './modalerror'
import Logged from './Logged'

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props){
    super(props);
    this.state = {
      email:'',
      password: '',
      errorMessage: '',
    };


    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.mlh = this.mlh.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.loginPostFetch = this.loginPostFetch.bind(this);
    this.goToUserForm = this.goToUserForm.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount (){
    const { cookies } = this.props; //I don't get it.
    const auth = cookies.get('authdata');
    if(auth && Date.parse(auth.auth.valid_until) > Date.now()){
      //we assume any authdata cookie is our authdata and check the validity.
      ReactDOM.render(
          <CookiesProvider>
            <UserForm/>
          </CookiesProvider>,
          document.getElementById('register-root')
      );
      return;
    }else{
      let urlParams = new URLSearchParams(window.location.search);
      if(urlParams.has('error')){
        this.setState({errorMessage: urlParams.get('error')});
      }

      if(urlParams.has('magiclink')){
        const mag_link = urlParams.get('magiclink');

        if(mag_link.startsWith('forgot-'))
          this.setState({errorMessage: "You have a magic link! Please enter your email and then your new password.", hasLink: mag_link});
        else
          this.setState({errorMessage: "You have a magic link! Please log in to apply it.", hasLink: mag_link});
      }else if(urlParams.has('authdata')){
        const auth = JSON.parse(urlParams.get('authdata'));
        const { cookies } = this.props;//I don't get it.
        cookies.set('authdata', auth);

        if(!urlParams.has('magiclink')){
          window.location.href = '/dashboard.html';
        }else{
          const mag_link = urlParams.get('magiclink');

        }
      }
    }
  }

  goToUserForm(data){
    this.setState({isLoggedIn: true});
    const bod = JSON.parse(data.body);
    this.props.cookies.set('authdata', bod);

    if(!this.state.hasLink || this.state.hasLink.startsWith('forgot-')){
      ReactDOM.render(
          <CookiesProvider>
            <UserForm/>
          </CookiesProvider>,
          document.getElementById('register-root')
      );
    }else{
      fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/consume', {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          link: this.state.hasLink,
        })
      }).then(resp => resp.json())
        .then(resp => {
        ReactDOM.render(
            <div>
              <div>We have applied your magic link!</div>
              <CookiesProvider>
                <UserForm/>
              </CookiesProvider>
            </div>,
            document.getElementById('register-root')
        );
      })
    }
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

    this.goToUserForm(data);

  }

  login() {
    	if (this.state.email == "" || this.state.password == ""){
    		this.setState({errorMessage: "Please fill in all the fields"});
    	} else {
    		fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/authorize', {
    		  method: 'POST',
    		  mode: 'cors',
          credentials: 'omit',
    		  headers: {
    		    'Content-Type': "application/json"
    		  },
    		  body: JSON.stringify({
    		    email: this.state.email,
    		    password: (this.state.password) + '',
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
    		fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/create', {
    		  method: 'POST',
    		  mode: 'cors',
              credentials: 'omit',
    		  headers: {
    		    'Content-Type': "application/json"
    		  },
    		  body: JSON.stringify({
    		    email: this.state.email,
    		    password: (this.state.password) + '',
    		  })
    		}).then(resp => resp.json())
          .then(data => {
            if (data.statusCode == 200){
              this.goToUserForm(data);
            }else if(data.body === "Duplicate user!"){
              this.setState({errorMessage: "You are already in our system! Please try logging in."})
            }else{
              this.setState({errorMessage: data.body})
            }
    		}).catch(data => {
    		  const error = data.message;
    		  this.setState({errorMessage: error});
    		})

    }
  }

  mlh() {
    let href = "https://my.mlh.io/oauth/authorize?client_id=bab4ace712bb186d8866ff4776baf96b2c4e9c64d729fb7f88e87357e4badcba&redirect_uri=https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/mlhcallback&response_type=code&scope=email+education+birthday";
    window.open(href, "_self");
  }

  onEmailChange(e){
    this.setState({email: e.target.value})
  }

  onPasswordChange(e){
    this.setState({password: e.target.value})
  }

  forgotPassword(e){
    if(this.state.hasLink){
      if(this.state.email === "" || this.state.password === ""){
        this.setState({errorMessage: "Enter your email and new password to continue!"});
        return;
      }

      fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/consume', {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          forgot: true,
          password: this.state.password,
          link: this.state.hasLink
        })
      }).then(resp => resp.json())
      .then(resp => {
        this.setState({errorMessage: resp.body || resp.errorMessage, hasLink: false});
      });
    }else{
      fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/createmagiclink', {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          forgot: true
        })
      }).then(resp => resp.json())
      .then(resp => {
        this.setState({errorMessage: resp.body || resp.errorMessage});
      });
    }
  }

  render() {

    return (
      <div className="react-form">
			<form className="form-group">

				<div className="form-group row my-3">
					<label htmlFor="email-input" className="col-lg-3 col-form-label"><h4 className="font-weight-bold blue">EMAIL</h4></label>
					<div className="col-lg-9">
						<input type="email" onChange={this.onEmailChange} className="form-control form-control" id="email-input"></input>
					</div>
				</div>

				<div className="form-group row my-3">
					<label htmlFor="pw-input" className="col-lg-3 col-form-label"><h4 className="font-weight-bold blue">PASSWORD</h4></label>
					<div className="col-lg-9">
						<input type="password" onChange={this.onPasswordChange} className="form-control form-control" id="pw-input"></input>
					</div>
				</div>

				<div className="form-group row">
          <span className="col-lg-3"></span>
          <h4 className="col-lg-9 blue" >{this.state.errorMessage}</h4>
          {this.state.errorMessage && (!this.state.hasLink || this.state.hasLink.startsWith('forgot-')) &&
						<button onClick={this.forgotPassword} type="button" className="btn btn-primary p-3"><h6 className="UC ">{(this.state.hasLink)? "Apply magic link": "Forgot Password"}</h6></button>
          }
        </div>

				<div className="form-group row mt-0">
					<div className="col-12 text-center">
						<br/>
						<button onClick={this.signUp} type="button" className="btn btn-primary mx-1 p-xs-2 p-md-3"><h6 className="UC ">Sign Up</h6></button>
            <button onClick={this.login} type="button" className="btn btn-primary custom-btn p-xs-2 p-md-3 mx-1" ><h6 className=" UC ">Login</h6></button>
            <button onClick={this.mlh} type="button" className="btn btn-primary p-xs-2 p-md-3 my-2"><h6 className=" UC">Log in/Sign Up with MLH</h6></button>
					</div>
				</div>

			</form>
      </div>
    );

  }

}

export default withCookies(App);
