import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {uploadResume} from './resume.js';
import Select from 'react-select';
import {Creatable, AsyncCreatable, Async } from 'react-select';
import {instanceOf} from 'prop-types';
import {CookiesProvider, withCookies, Cookies} from 'react-cookie';
import 'react-select/dist/react-select.css';
import ModalError from './modalerror'
import Admin from './Admin'

class UserForm extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props);
    this.state = {};
    this.state.mentorBit = {};

    //this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
    this.mentorBitOnChange = this.mentorBitOnChange.bind(this);
    this.LogoutButtons = this.LogoutButtons.bind(this);

    this.showVolunteer = this.showVolunteer.bind(this);
    this.showMentor = this.showMentor.bind(this);
    this.volunteerAndMentorForms = this.volunteerAndMentorForms.bind(this);
    this.applyMentor = this.applyMentor.bind(this);
    this.unapplyMentor = this.unapplyMentor.bind(this);
    this.applyVolunteer = this.applyVolunteer.bind(this);
    this.unapplyVolunteer = this.unapplyVolunteer.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.doResume = this.doResume.bind(this);
    this.attending = this.attending.bind(this);
    this.notAttending = this.notAttending.bind(this);
  }

  componentWillMount (){
    const { cookies } = this.props;//I don't get it.
    const auth = cookies.get('authdata');
    if(!auth || Date.parse(auth.auth.valid_until) < Date.now()){
      //we assume any authdata cookie is our authdata and check the validity.
      ReactDOM.render(
          <CookiesProvider>
            <App/>
          </CookiesProvider>,
          document.getElementById('register-root')
      );
      ReactDOM.render(
          <div>
            <h3>Please login</h3>
          </div>,
          document.getElementById('register-sidebar')
      );

      return;
    }else{
      this.setState({
        email: auth.auth.email,
        token: auth.auth.token
      });

    }
  }

  isAdmin() {

    if(!this.state.user || (!this.state.user.role.organizer && !this.state.user.role.director)){
      return ;
    }

      ReactDOM.render(<CookiesProvider><Admin user={this.state.user} token={this.state.token}/></CookiesProvider>, document.getElementById('register-admin'));

  }


  componentDidMount(){
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/read', {
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
        const og_usr = data.body[0];
        this.setState({user: og_usr});
        this.isAdmin();
    }).catch(data => this.setState({flash: data.toString()}));
  }

  logout() {
    const {cookies} = this.props;
    cookies.remove('authdata');
    ReactDOM.render(<CookiesProvider><App /></CookiesProvider> , document.getElementById('register-root'));
    ReactDOM.render(<div><h3>Please login</h3></div> , document.getElementById('register-sidebar'));

  }

  onChange(e){
    const upd_key = e.target.id.split('-')[1];
    let updated = this.state.user;
    updated[upd_key] = e.target.value;
    this.setState({user: updated});
  }

  mentorBitOnChange(e){
    const upd_key = e.target.id.substring(0, e.target.id.length - 4).replace('-', '_');
    let newMent = this.state.mentorBit;
    newMent[upd_key] = e.target.value;
    this.setState({mentorBit: newMent});
  }

  save() {
    let upd = this.state.user;
    if (upd.registration_status == "unregistered"){
      if(document.getElementById('code-of-conduct-box').checked && document.getElementById('data-sharing-box').checked){
        upd.registration_status = "registered";
      }
    }

    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          updates : {'$set': upd},
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
           this.setState({flash: "Changes saved! Thank you for applying. You will receive an email after your application has been reviewed."});
        }else{
           this.setState({flash: json.body});
        }
      });

  }

  LogoutButtons(){
    return (
					<div className="col-12 text-center">
						<button onClick={this.logout} type="button" className="btn btn-primary UC custom-btn mx-2 p-3"><h6 className="my-1">Logout</h6></button>
						<button onClick={this.save} type="button" className="btn btn btn-primary UC custom-btn p-3"><h6 className="my-1">Save Changes</h6></button>
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

  getTimes(prefix){
    let times = [];
    if(document.getElementById('sat-morn-' + prefix + '-inp').checked === true){
      times.push("Saturday morning");
    }
    if(document.getElementById('sat-noon-' + prefix + '-inp').checked === true){
      times.push("Saturday afternoon");
    }
    if(document.getElementById('sat-night-' + prefix + '-inp').checked === true){
      times.push("Saturday evening");
    }
    if(document.getElementById('sun-' + prefix + '-inp').checked === true){
      times.push("Sunday morning");
    }
    return times;
  }

  applyMentor(e){
    let tempUsr = {
        "role.mentor": true
    };
    tempUsr.mentor_data = {
      skills: this.state.mentorBit,
      times: this.getTimes('ment')
    }

    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates : tempUsr,
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
           this.setState({extraFlash: "Thank you for your interest in becoming a mentor. We will be in contact with you shortly!"});
        }else{
           this.setState({extraFlash: json.body});
        }
      });
  }

  unapplyMentor(e){
    let tempUsr = {
        "role.mentor": false
    };

    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates : tempUsr,
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
           this.setState({extraFlash: "Updated profile!"});
        }else{
           this.setState({extraFlash: json.body});
        }
      });
  }

  applyVolunteer(e){
    let tempUsr = {
        "role.volunteer": true
    };
    tempUsr.volunteer_data = {
      skills: document.querySelector('input[name="vol-cat"]:checked').value,
      times: this.getTimes('vol')
    }

    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates : tempUsr,
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
           this.setState({extraFlash: "Thank you for your interest in becoming a volunteer. We will be in contact with you shortly!"});
        }else{
           this.setState({extraFlash: json.body});
        }
      });
  }

  unapplyVolunteer(e){
    let tempUsr = {
        "role.volunteer": false
    };

    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates :tempUsr,
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
           this.setState({extraFlash: "Updated profile!"});
        }else{
           this.setState({extraFlash: json.body});
        }
      });
  }

  volunteerAndMentorForms() {
    return (
      <div id="extra-form-container">
        <button className="btn btn-success mr-2" onClick={this.showVolunteer} value="Apply to volunteer">Volunteer Sign Up</button>
        <button className="btn btn-primary" onClick={this.showMentor} value="Apply to mentor">Mentor Sign Up</button>
        <div id="volunteer-form" style={{display:'none'}}>
          <div className="extra-left">
            Choose your preferred area:<br/>
            <input name="vol-cat"  type="radio" value="set-up" id="set-up-vol-inp"></input>
            <label htmlFor="set-up-vol-inp">Set-up</label><br/>
            <input name="vol-cat"  type="radio" value="registration" id="registration-vol-inp"></input>
            <label htmlFor="registration-vol-inp">Registration</label><br/>
            <input name="vol-cat"  type="radio" value="event" id="event-vol-inp"></input>
            <label htmlFor="event-vol-inp">Events</label><br/>
            <input name="vol-cat"  type="radio" value="workshop" id="workshop-vol-inp"></input>
            <label htmlFor="workshop-vol-inp">Workshops</label><br/>
            <input name="vol-cat"  type="radio" value="food" id="food-vol-inp"></input>
            <label htmlFor="food-vol-inp">Food</label><br/>
          </div>
          <div className="extra-right">
            Choose your preferred times:<br/>
            <input name="vol-time"  type="checkbox" value="sat-morn" id="sat-morn-vol-inp"></input>
            <label htmlFor="sat-morn-vol-inp">Saturday (24th) Morning</label><br/>
            <input name="vol-time"  type="checkbox" value="sat-noon" id="sat-noon-vol-inp"></input>
            <label htmlFor="sat-noon-vol-inp">Saturday (24th) Afternoon</label><br/>
            <input name="vol-time"  type="checkbox" value="sat-night" id="sat-night-vol-inp"></input>
            <label htmlFor="sat-night-vol-inp">Saturday (24th) Evening</label><br/>
            <input name="vol-time"  type="checkbox" value="sun" id="sun-vol-inp"></input>
            <label htmlFor="sun-vol-inp">Sunday (25th) Morning</label><br/>
          </div>
          <div className="clearfix"></div>
          <button className="btn btn-primary" onClick={this.applyVolunteer}>Submit Application</button>
        </div>
        <div id="mentor-form" style={{display:'none'}}>
          <div className="extra-left">
            <label htmlFor="ment-ed-inp">Education Level</label>
            <textarea onChange={this.mentorBitOnChange} name="ment-ed" id="ment-ed-inp" value={this.state.mentorBit.ment_ed}></textarea>
            <label htmlFor="ment-exp-inp">Relevant Experience</label>
            <textarea onChange={this.mentorBitOnChange} name="ment-exp" id="ment-exp-inp" value={this.state.mentorBit.ment_exp}></textarea>
            <label htmlFor="ment-areas-inp">Areas of Expertise</label>
            <textarea onChange={this.mentorBitOnChange} name="ment-areas" id="ment-areas-inp" value={this.state.mentorBit.ment_areas}></textarea>
            <label htmlFor="ment-langs-inp">Programming Languages</label>
            <textarea onChange={this.mentorBitOnChange} name="ment-langs" id="ment-langs-inp" value={this.state.mentorBit.ment_langs}></textarea>
          </div>
          <div className="extra-right">
            Choose your preferred times:<br/>
            <input name="ment-time"  type="checkbox" value="sat-morn" id="sat-morn-ment-inp"></input>
            <label htmlFor="sat-morn-ment-inp">Saturday (24th) Morning</label><br/>
            <input name="ment-time"  type="checkbox" value="sat-noon" id="sat-noon-ment-inp"></input>
            <label htmlFor="sat-noon-ment-inp">Saturday (24th) Afternoon</label><br/>
            <input name="ment-time"  type="checkbox" value="sat-night" id="sat-night-ment-inp"></input>
            <label htmlFor="sat-night-ment-inp">Saturday (24th) Evening</label><br/>
            <input name="ment-time"  type="checkbox" value="sun" id="sun-ment-inp"></input>
            <label htmlFor="sun-ment-inp">Sunday (25th) Morning</label><br/>
          </div>
          <div className="clearfix"></div>
          <button className="btn btn-primary" onClick={this.applyMentor}>Submit Application</button>
        </div>
        <p>{this.state.extraFlash}</p>
      </div>
    );
  }

  doResume(ev){
    uploadResume(this.state.email, (value) => {
        this.setState({flash: value});
    });
  }

  attending(e){
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates : {'$set': {'registration_status': 'coming'}},
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
           let newser = this.state.user;
           newser.registration_status = 'coming';
           this.setState({upperFlash: "Attendance confirmed!", user: newser});
        }else{
           this.setState({upperFlash: json.body});
        }
      });
  }

  notAttending(e){
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates : {'$set': {'registration_status': 'not-coming'}},
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
           let newser = this.state.user;
           newser.registration_status = 'not-coming';
           this.setState({upperFlash: "RIP :'(", user: newser});
        }else{
           this.setState({upperFlash: json.body});
        }
      });
  }

  render() {
    const formConfig = {
      "email": {
        "select": false,
        "type": "email"
      },
      "github": {
        "select": false,
        "type": "text",
        "searchFn": (i) => fetch(`https://api.github.com/search/users?q=${i}`)
          .then(r => r.json()).then(j => ({options: j.items})),
        "create": false
      },
      "major": {
        "select": true,
        "searchFn": (i) => fetch("majors.json")
          .then(r => r.json()).then(json => ({
            options: json.items.map(i => ({
              'value': i, 'label': i
            }))
          })),
        "create": true
      },
      "shirt_size": {
        "select": true,
        "options": ['Unisex XS', 'Unisex S', 'Unisex M', 'Unisex L', 'Unisex XL'].map(v => ({'value': v, 'label': v})),
        "create": false
      },
      "first_name": {
        "select": false,
        "type": "text"
      },
      "last_name": {
        "select": false,
        "type": "text"
      },
      "dietary_restrictions": {
        "select": false,
        "type": "text"
      },
      "special_needs": {
        "select": false,
        "type": "text"
      },
      "date_of_birth": {
        "select": false,
        "type": "date"
      },
      "school": {
        "select": true,
        "searchFn": (i) => fetch("https://raw.githubusercontent.com/MLH/mlh-policies/master/schools.csv")
          .then(r => r.text()).then(csv => {
            const rv = csv.split("\n").map(ln => ln.replace(/[\r",]/g, ""))
              .slice(1).map(v => ({'label': v, 'value': v}));
            return {options: rv};
          }),
        "create": false
      },
      "grad_year": {
        "select": true,
        "options": [2018, 2019, 2020, 2021, 2022].map(v => ({'value': v, 'label': v})),
        "create": true
      },
      "level_of_study": {
        "select": true,
        "options": ["University (Undergraduate)", "University (Graduate)", "High School"].map(v => ({'value': v, 'label': v})),
        "create": true
      },
      "gender": {
        "select": true,
        "options": ['Male', 'Female', 'Non-binary'].map(v => ({'value': v, 'label': v})),
        "create": true
      },
      "travelling_from": {
        "select": false,
        "type": "text"
      }
    }

    const _usr = this.state.user
    const parseInput = (key) => {
      const mkOnChange = (key) => {
        const handler = (i) => {
          let updated = _usr;
          updated[key] = i.value;
          this.setState({user: updated});
        }
        return handler;
      }

      const conf = formConfig[key];
      if(!conf){
        return (
            <input type="text"
              id={"input-" + key}
              className="form-control mx-3"
              onChange={this.onChange}
              value={_usr[key]}/>);
      }else if(!conf.select){
        return (
            <input type={conf.type}
              id={"input-" + key}
              className="form-control mx-3"
              onChange={this.onChange}
              value={_usr[key]}/>);
      }else if(!conf.searchFn && !conf.create){
        return (
              <Select
                id={"input-" + key}
                className="form-control mx-3"
                value={_usr[key]}
                onChange={mkOnChange(key)}
                options={conf.options}/>);
      }else if(!conf.searchFn){
        return (
              <Creatable
                id={"input-" + key}
                className="form-control mx-3"
                value={_usr[key]}
                onChange={mkOnChange(key)}
                options={conf.options}/>);
      }else if(!conf.create){
        return (
            <Async
              id={"input-" + key}
              className="form-control mx-3"
              matchPos="any"
              ignoreCase={true}
              ignoreAccents={true}
              value={_usr[key]}
              onChange={mkOnChange(key)}
              loadOptions={conf.searchFn}/>);
      }else{
        return (
            <AsyncCreatable
              id={"input-" + key}
              className="form-control mx-3"
              value={_usr[key]}
              onChange={mkOnChange(key)}
              loadOptions={conf.searchFn}/>);
      }
    }

    let userStatus = this.state.user && this.state.user.registration_status;
    if(userStatus && userStatus === 'registered' || userStatus == 'unregistered') userStatus = 'Pending';
    else if(userStatus && userStatus === 'comfirmation') userStatus = 'Pending Confirmation';
    else if(userStatus) userStatus = userStatus.replace('-', ' ');

    ReactDOM.render(<div>
    <h2 class="font-weight-bold" >{this.state.user && this.state.user.first_name + ' ' + this.state.user.last_name} </h2>
    <h6> <a onClick={this.logout}>Logout</a> </h6>
    <br />
    <h6 class="profile-text"><i class="fas fa-graduation-cap fa-fw"></i>{this.state.user && this.state.user.school}</h6>
    <br />
    <h6 class="profile-text"><i class="fas fa-user fa-fw"></i>{this.state.user && this.state.user.level_of_study}</h6>
    <br />
    <h6 class="profile-text"><i class="fas fa-lightbulb fa-fw"></i>{this.state.user && this.state.user.major}</h6>
    <br />
    <h6><i class="fab fa-github fa-fw"></i> <a href="http://github.com" target="_blank">{this.state.user && this.state.user.github}Github</a></h6>
    </div>,
    document.getElementById('register-sidebar'));

    //pardon my indentation - David used tabs.
    return (
    <div>



		   <form className="form-group">

       <div className="text-center">

       <h2 className="blue SC"> Status: {userStatus} </h2>

       {userStatus != 'Pending' &&
         <div>
           <div className="blue">{this.state.upperFlash}</div>
           <button type="button" className="btn btn-primary UC custom-btn p-3 my-1 mx-md-1" onClick={this.attending}><h6 className="my-0">Attending</h6></button>
           <button type="button" className="btn btn-primary UC custom-btn p-3 my-1" onClick={this.notAttending}><h6 className="my-0">Will not Attend</h6></button>
        </div>
       }

       </div>
       <h2 className="blue my-3"> Your Info: </h2>

        <span>
        { this.state.user &&
            Object.keys(formConfig)
              .map(key =>
                 <div className="form-group row mb-4">
                        <label htmlFor={"input-" + key} className="col-lg-8"><h4 className="font-weight-bold blue">{key.replace(/_/g, ' ').toUpperCase()}</h4>{key == "travelling_from" && "(Enter the nearest city center)"}</label>
                        {parseInput(key)}
                 </div>
            )
        }
        </span>
				<div className="form-group row my-2">
                        <label htmlFor="resumeupload" className="col-lg-8"><h4 className="font-weight-bold blue">SHORT ANSWER:</h4> What are you looking for from your experience at HackRU?</label>
                        <textarea className="form-control mx-3" onChange={this.onChange}
                   value={(this.state.user)? this.state.user.short_answer : ""}
                   id="input-short_answer"/>
        </div>
				<div className="form-group row my-2">
                        <label htmlFor="resumeupload" className="col-lg-8"><h4 className="font-weight-bold blue">RESUME</h4></label>
                <input type="file" className="form-control mx-3" onChange={this.doResume} id="resumeupload"/>
        </div>
        {this.state.user && this.state.user.registration_status == "unregistered" &&
				<div className="form-group row my-2 mx-1">
                <h4 className="col-12 font-weight-bold blue mb-2">MLH NOTICES</h4>
                <div className="col-12 form-check mb-4">

                  <input type="checkbox" className="form-check-input mr-4" id="code-of-conduct-box"/>
                  <label htmlFor="code-of-conduct-box" className="form-check-label">
                      I agree to abide by the <a className="blue" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH code of conduct.</a>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="checkbox" className="form-check-input mr-4" id="data-sharing-box"/>
                  <label htmlFor="data-sharing-box" className="form-check-label">
                      I agree to the terms of both the <a className="blue" href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions">MLH Contest Terms and Conditions</a>
                      and <a className="blue" href="https://mlh.io/privacy">the MLH Privacy Policy</a>. Please note that you may
                      receive pre and post-event informational e-mails and occasional messages
                      about hackathons from MLH as per the MLH Privacy Policy.
                  </label>
                  </div>

        </div>}
				<div className="form-group row my-2 mx-1">
          <h4 className="blue">{this.state.flash}</h4>
        </div>
        </form>



    <this.LogoutButtons />

  </div>

    );

  }

}

export default withCookies(UserForm);
