import React from 'react';
import ReactDOM from 'react-dom';
import UserForm from './UserForm';
import md5 from 'md5';
import {instanceOf} from 'prop-types';
import {CookiesProvider, withCookies, Cookies} from 'react-cookie';
import ModalError from './modalerror'

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
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.loginPostFetch = this.loginPostFetch.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount (){
    const { cookies } = this.props;//I don't get it.
    const auth = cookies.get('authdata');
    if(auth && Date.parse(auth.auth.valid_until) > Date.now()){
      //we assume any authdata cookie is our authdata and check the validity.
      ReactDOM.render(
          <CookiesProvider>
            <UserForm/>
          </CookiesProvider>,
          document.getElementById('register-more')
      );
      ReactDOM.render(
          <div className="text-center">
          <h4> You are already logged in.  </h4>
          <button type="button" className="btn btn-primary custom-btn p-3  " id="launch-modal" data-toggle="modal" data-target="#exampleModalCenter"><h4 className="my-0">Finish your profile</h4></button>,
          </div>,
          document.getElementById('register-root')
          );
      return;
    }else{
      let urlParams = new URLSearchParams(window.location.search);
      if(urlParams.has('authdata')){
        const auth = JSON.parse(urlParams.get('authdata'));
        const { cookies } = this.props;//I don't get it.
        cookies.set('authdata', auth);

        window.location.href = '/#launch-modal';

      }
    }
  }

  loginPostFetch(data){
    if(data.statusCode != 200){
      const/*antina, our saviour*/ errorMsgs = {
        "invalid email,hash combo": "Incorrect email or password.",
        "Wrong Password": "Incorrect password."
      };

      this.setState({errorMessage: errorMsgs[data.body]});
      ReactDOM.render(<ModalError />, document.getElementById('register-more'));
      return;
    }

    this.setState({isLoggedIn: true});
    const bod = JSON.parse(data.body);
    this.props.cookies.set('authdata', bod);
    ReactDOM.render(
        <CookiesProvider>
          <UserForm/>
        </CookiesProvider>,
        document.getElementById('register-more')
    );
    ReactDOM.render(
      <div className="text-center">
      <h4> You are already logged in.  </h4>
      <button type="button" className="btn btn-primary custom-btn p-3  " id="launch-modal" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="static"><h4 className="my-0">Finish your profile</h4></button>,
      </div>,
      document.getElementById('register-root')
    );
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
              this.setState({isLoggedIn:true});
              const auth = JSON.parse(data.body)
              this.props.cookies.set('authdata', auth);
              ReactDOM.render(
                <CookiesProvider>
                  <UserForm/>
                </CookiesProvider>,
                document.getElementById('register-more')
              );
              ReactDOM.render(
                  <div className="text-center">
                  <h4> You are already logged in.  </h4>
                  <button type="button" className="btn btn-primary custom-btn p-3  " id="launch-modal" data-toggle="modal" data-target="#exampleModalCenter" data-backdrop="static"><h4 className="my-0">Finish your profile</h4></button>,
                  </div>,
                  document.getElementById('register-root')
              );
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
    let href = "https://my.mlh.io/oauth/authorize?client_id=bab4ace712bb186d8866ff4776baf96b2c4e9c64d729fb7f88e87357e4badcba&redirect_uri=https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/mlhcallback&response_type=code&scope=email+education+birthday";
    window.open(href, "_self");
  }

  onEmailChange(e){
    this.setState({email: e.target.value})
  }

  onPasswordChange(e){
    this.setState({password: e.target.value})
  }

  render() {

    return (
      <div className="react-form">
			<form className="form-group">

				<div className="form-group row my-3">
					<label htmlFor="email-input" className="col-lg-3 col-form-label"><h4 className="font-weight-bold">EMAIL</h4></label>
					<div className="col-lg-9">
						<input type="email" onChange={this.onEmailChange} className="form-control form-control-lg" id="email-input"></input>
					</div>
				</div>

				<div className="form-group row my-3">
					<label htmlFor="pw-input" className="col-lg-3 col-form-label"><h4 className="font-weight-bold">PASSWORD</h4></label>
					<div className="col-lg-9">
						<input type="password" onChange={this.onPasswordChange} className="form-control form-control-lg" id="pw-input"></input>
					</div>
				</div>

				<div className="form-group row my-1 ">
          <span className="col-lg-3"></span>
          <h4 className="col-lg-9">{this.state.errorMessage}</h4>
        </div>

				<div className="form-group row my-1">
					<div className="col-12 text-center">
						<br/>
						<button onClick={this.signUp} type="button" className="custom-btn btn btn-primary p-3 "><h4 className="my-0">Sign Up</h4></button>
            <button onClick={this.login} type="button" className="btn btn-primary custom-btn p-3  mx-3 my-3" data-toggle="modal" data-target="#exampleModalCenter"><h4 className="my-0">Login</h4></button>
            <button onClick={this.mlh} type="button" className="custom-btn btn btn-primary p-3"><h4 className="my-0">Log in/Sign Up with MLH</h4></button>
					</div>
				</div>

			</form>
      </div>
    );

  }

}

export default withCookies(App);
