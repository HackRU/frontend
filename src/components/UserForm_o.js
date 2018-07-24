import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {uploadResume, downloadResume} from './resume.js';
import {config_maps} from './config_resume.js';
import Select from 'react-select';
import {Creatable, AsyncCreatable, Async } from 'react-select';
import {instanceOf} from 'prop-types';
import {CookiesProvider, withCookies, Cookies} from 'react-cookie';
import 'react-select/dist/react-select.css';
import ModalError from './modalerror';
import Admin from './Admin';
import Autocomplete from 'react-google-autocomplete';

//OK, this is cancer and will have to be split.
class UserForm extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props);
    this.state = {};
    this.state.travelClean = true;

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
    this.notifyTransport = this.notifyTransport.bind(this);
    this.transMode = this.transMode.bind(this);
  }

  //done?
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
      //this goes in the sidebar
      ReactDOM.render(
        <span>
          <h3 className="text-center">Please login</h3>
        </span>,
        document.getElementById('register-sidebar')
      );
      document.getElementById('profile-qr').setAttribute('src', 'img/wheel.png');
      document.getElementById('qr-border').setAttribute('style', 'display:none;');

      return;
    }else{
      this.setState({
        email: auth.auth.email,
        token: auth.auth.token
      });

      //done
      downloadResume(true, auth.auth.email, (wrk, _) => this.setState({hasResume: wrk}));
    }
  }

  //done?
  isAdmin() {

    if(!this.state.user || (!this.state.user.role.director)){
      return ;
    }

    //this goes in the admin section
    ReactDOM.render(<CookiesProvider><Admin token={this.state.token}
      user={this.state.user}
    /></CookiesProvider>, document.getElementById('register-admin'));

  }

  //done?
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
        fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/qr', {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'email': this.state.email,
            'background': [0xe8, 0xf6, 0xfc],
            'color': [0x25, 0x47, 0x9e]
          })
        }).then(resp => resp.json())
          .then(resp => {
            if(resp.statusCode === 200)
              this.setState({qr: resp.body});
          });
      }).catch(data => this.setState({flash: data.toString()}));
  }

  //done?
  logout() {
    const {cookies} = this.props;
    cookies.remove('authdata');
    //taken care of
    ReactDOM.render(<CookiesProvider><App /></CookiesProvider> , document.getElementById('register-root'));
    //this should go in the sidebar
    ReactDOM.render(<span><h3 className="text-center">Please login</h3></span> , document.getElementById('register-sidebar'));
    document.getElementById('profile-qr').setAttribute('src', 'img/wheel.png');
    document.getElementById('qr-border').setAttribute('style', 'display:none;');
    window.location.href = '/dashboard.html';
  }

  //done
  onChange(e){
    const upd_key = e.target.id.split('-')[1];
    let updated = this.state.user;
    updated[upd_key] = e.target.value;
    this.setState({user: updated});
  }

  //done
  mentorBitOnChange(e){
    const upd_key = e.target.id.substring(0, e.target.id.length - 4).replace('-', '_');
    let newMent = this.state.mentorBit;
    newMent[upd_key] = e.target.value;
    this.setState({mentorBit: newMent});
  }

  //done
  save() {
    let upd = this.state.user;
    if (upd.registration_status == 'unregistered'){
      if(document.getElementById('code-of-conduct-box').checked && document.getElementById('data-sharing-box').checked){
        upd.registration_status = 'registered';
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
          this.setState({flash: 'Changes saved!'});
        }else{
          this.setState({flash: json.body});
        }
      });

  }

  LogoutButtons(){
    return (
      <div className="col-12 text-center">
        <button className="btn btn-primary UC custom-btn mx-2 p-3"
          onClick={this.logout}
          type="button"
        ><h6 className="my-1">Logout</h6></button>
        <button className="btn btn btn-primary UC custom-btn p-3"
          onClick={this.save}
          type="button"
        ><h6 className="my-1">Save Changes</h6></button>
      </div>
    );

  }

  //done?
  showVolunteer(e){
    document.getElementById('mentor-form').style.display = 'none';
    document.getElementById('volunteer-form').style.display = 'block';
  }

  //done?
  showMentor(e){
    document.getElementById('mentor-form').style.display = 'block';
    document.getElementById('volunteer-form').style.display = 'none';
  }

  //not done and not gonna be used
  getTimes(prefix){
    let times = [];
    if(document.getElementById('sat-morn-' + prefix + '-inp').checked === true){
      times.push('Saturday morning');
    }
    if(document.getElementById('sat-noon-' + prefix + '-inp').checked === true){
      times.push('Saturday afternoon');
    }
    if(document.getElementById('sat-night-' + prefix + '-inp').checked === true){
      times.push('Saturday evening');
    }
    if(document.getElementById('sun-' + prefix + '-inp').checked === true){
      times.push('Sunday morning');
    }
    return times;
  }

  //done
  applyMentor(e){
    let tempUsr = {
      'role.mentor': true
    };
    tempUsr.mentor_data = {
      skills: this.state.mentorBit,
      times: this.getTimes('ment')
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
          this.setState({extraFlash: 'Thank you for your interest in becoming a mentor. We will be in contact with you shortly!'});
        }else{
          this.setState({extraFlash: json.body});
        }
      });
  }

  //done
  unapplyMentor(e){
    let tempUsr = {
      'role.mentor': false
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
          this.setState({extraFlash: 'Updated profile!'});
        }else{
          this.setState({extraFlash: json.body});
        }
      });
  }

  //done
  applyVolunteer(e){
    let tempUsr = {
      'role.volunteer': true
    };
    tempUsr.volunteer_data = {
      skills: document.querySelector('input[name="vol-cat"]:checked').value,
      times: this.getTimes('vol')
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
          this.setState({extraFlash: 'Thank you for your interest in becoming a volunteer. We will be in contact with you shortly!'});
        }else{
          this.setState({extraFlash: json.body});
        }
      });
  }

  //done
  unapplyVolunteer(e){
    let tempUsr = {
      'role.volunteer': false
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
          this.setState({extraFlash: 'Updated profile!'});
        }else{
          this.setState({extraFlash: json.body});
        }
      });
  }


  //done?  not in use
  volunteerAndMentorForms() {
    return (
      <div id="extra-form-container">
        <button className="btn btn-success mr-2"
          onClick={this.showVolunteer}
          value="Apply to volunteer"
        >Volunteer Sign Up</button>
        <button className="btn btn-primary"
          onClick={this.showMentor}
          value="Apply to mentor"
        >Mentor Sign Up</button>
        <div id="volunteer-form"
          style={{display:'none'}}
        >
          <div className="extra-left">
            Choose your preferred area:<br/>
            <input id="set-up-vol-inp"
              name="vol-cat"
              type="radio"
              value="set-up"
            />
            <label htmlFor="set-up-vol-inp">Set-up</label><br/>
            <input id="registration-vol-inp"
              name="vol-cat"
              type="radio"
              value="registration"
            />
            <label htmlFor="registration-vol-inp">Registration</label><br/>
            <input id="event-vol-inp"
              name="vol-cat"
              type="radio"
              value="event"
            />
            <label htmlFor="event-vol-inp">Events</label><br/>
            <input id="workshop-vol-inp"
              name="vol-cat"
              type="radio"
              value="workshop"
            />
            <label htmlFor="workshop-vol-inp">Workshops</label><br/>
            <input id="food-vol-inp"
              name="vol-cat"
              type="radio"
              value="food"
            />
            <label htmlFor="food-vol-inp">Food</label><br/>
          </div>
          <div className="extra-right">
            Choose your preferred times:<br/>
            <input id="sat-morn-vol-inp"
              name="vol-time"
              type="checkbox"
              value="sat-morn"
            />
            <label htmlFor="sat-morn-vol-inp">Saturday (24th) Morning</label><br/>
            <input id="sat-noon-vol-inp"
              name="vol-time"
              type="checkbox"
              value="sat-noon"
            />
            <label htmlFor="sat-noon-vol-inp">Saturday (24th) Afternoon</label><br/>
            <input id="sat-night-vol-inp"
              name="vol-time"
              type="checkbox"
              value="sat-night"
            />
            <label htmlFor="sat-night-vol-inp">Saturday (24th) Evening</label><br/>
            <input id="sun-vol-inp"
              name="vol-time"
              type="checkbox"
              value="sun"
            />
            <label htmlFor="sun-vol-inp">Sunday (25th) Morning</label><br/>
          </div>
          <div className="clearfix" />
          <button className="btn btn-primary"
            onClick={this.applyVolunteer}
          >Submit Application</button>
        </div>
        <div id="mentor-form"
          style={{display:'none'}}
        >
          <div className="extra-left">
            <label htmlFor="ment-ed-inp">Education Level</label>
            <textarea id="ment-ed-inp"
              name="ment-ed"
              onChange={this.mentorBitOnChange}
              value={this.state.mentorBit.ment_ed}
            />
            <label htmlFor="ment-exp-inp">Relevant Experience</label>
            <textarea id="ment-exp-inp"
              name="ment-exp"
              onChange={this.mentorBitOnChange}
              value={this.state.mentorBit.ment_exp}
            />
            <label htmlFor="ment-areas-inp">Areas of Expertise</label>
            <textarea id="ment-areas-inp"
              name="ment-areas"
              onChange={this.mentorBitOnChange}
              value={this.state.mentorBit.ment_areas}
            />
            <label htmlFor="ment-langs-inp">Programming Languages</label>
            <textarea id="ment-langs-inp"
              name="ment-langs"
              onChange={this.mentorBitOnChange}
              value={this.state.mentorBit.ment_langs}
            />
          </div>
          <div className="extra-right">
            Choose your preferred times:<br/>
            <input id="sat-morn-ment-inp"
              name="ment-time"
              type="checkbox"
              value="sat-morn"
            />
            <label htmlFor="sat-morn-ment-inp">Saturday (24th) Morning</label><br/>
            <input id="sat-noon-ment-inp"
              name="ment-time"
              type="checkbox"
              value="sat-noon"
            />
            <label htmlFor="sat-noon-ment-inp">Saturday (24th) Afternoon</label><br/>
            <input id="sat-night-ment-inp"
              name="ment-time"
              type="checkbox"
              value="sat-night"
            />
            <label htmlFor="sat-night-ment-inp">Saturday (24th) Evening</label><br/>
            <input id="sun-ment-inp"
              name="ment-time"
              type="checkbox"
              value="sun"
            />
            <label htmlFor="sun-ment-inp">Sunday (25th) Morning</label><br/>
          </div>
          <div className="clearfix" />
          <button className="btn btn-primary"
            onClick={this.applyMentor}
          >Submit Application</button>
        </div>
        <p>{this.state.extraFlash}</p>
      </div>
    );
  }

  //done
  doResume(ev){
    uploadResume(this.state.email, (value) => {
      this.setState({flash: value, hasResume: true});
    });
  }

  //done
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
          this.setState({upperFlash: 'Attendance confirmed!', user: newser});
        }else{
          this.setState({upperFlash: json.body});
        }
      });
  }

  //done
  notAttending(e){
    let upd = {'registration_status': 'not-coming'};
    if(this.state.user.travelling_from && this.state.user.travelling_from.is_real) upd['travelling_from.is_real'] = false;

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
          let newser = this.state.user;
          newser.registration_status = 'not-coming';
          if(newser.travelling_from) newser.travelling_from.is_real = false;
          this.setState({upperFlash: 'Thanks for letting us know!', user: newser});
        }else{
          this.setState({upperFlash: json.body});
        }
      });
  }

  //not done
  notifyTransport(){
    if(!this.state.travelClean) return;

    let mode = document.querySelector('input[name="preferred-transport"]:checked').value;
    let newser = this.state.user;
    newser.travelling_from.mode = mode;

    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates : {'$set': {'travelling_from': newser.travelling_from}},
        user_email: this.state.email,
        auth_email: this.state.email,
        auth: this.state.token
      })
    }).then(data => data.json())
      .then(json => {
        if(json.statusCode == 200){
          this.setState({user: newser, upperFlash: 'Changes saved! We will keep you up-to-date on reimbursement.'});
        }else{
          this.setState({upperFlash: json.body});
        }
      });
  }

  //not done
  transMode(e){
    let newser = this.state.user;
    newser.travelling_from.mode = e.target.value;
    this.setState({user: newser});
  }

  //not done
  render() {
    const formConfig = {
      'email': {
        'select': false,
        'type': 'email'
      },
      'github': {
        'select': false,
        'type': 'text',
        'searchFn': (i) => fetch(`https://api.github.com/search/users?q=${i}`)
          .then(r => r.json()).then(j => ({options: j.items})),
        'create': false
      },
      'major': {
        'select': true,
        'searchFn': (i) => fetch('majors.json')
          .then(r => r.json()).then(json => ({
            options: json.items.map(i => ({
              'value': i, 'label': i
            }))
          })),
        'create': true
      },
      'shirt_size': {
        'select': true,
        'optio/ns': ['Unisex XS', 'Unisex S', 'Unisex M', 'Unisex L', 'Unisex XL'].map(v => ({'value': v, 'label': v})),
        'create': false
      },
      'first_name': {
        'select': false,
        'type': 'text'
      },
      'last_name': {
        'select': false,
        'type': 'text'
      },
      'dietary_restrictions': {
        'select': false,
        'type': 'text'
      },
      'special_needs': {
        'select': false,
        'type': 'text'
      },
      'date_of_birth': {
        'select': false,
        'type': 'date'
      },
      'school': {
        'select': true,
        'searchFn': (i) => fetch('https://raw.githubusercontent.com/MLH/mlh-policies/master/schools.csv')
          .then(r => r.text()).then(csv => {
            const rv = csv.split('\n').map(ln => ln.replace(/[\r",]/g, ''))
              .slice(1).map(v => ({'label': v, 'value': v}));
            return {options: rv};
          }),
        'create': false
      },
      'grad_year': {
        'select': true,
        'options': [2018, 2019, 2020, 2021, 2022].map(v => ({'value': v, 'label': v})),
        'create': true
      },
      'level_of_study': {
        'select': true,
        'options': ['University (Undergraduate)', 'University (Graduate)', 'High School'].map(v => ({'value': v, 'label': v})),
        'create': true
      },
      'gender': {
        'select': true,
        'options': ['Male', 'Female', 'Non-binary'].map(v => ({'value': v, 'label': v})),
        'create': true
      }
    };

    const _usr = this.state.user;
    const parseInput = (key) => {
      const mkOnChange = (key) => {
        const handler = (i) => {
          let updated = _usr;
          updated[key] = i.value;
          this.setState({user: updated});
        };
        return handler;
      };

      const conf = formConfig[key];
      if(!conf){
        return (
          <input className="form-control mx-3"
            id={'input-' + key}
            onChange={this.onChange}
            type="text"
            value={_usr[key]}
          />);
      }else if(!conf.select){
        return (
          <input className="form-control mx-3"
            id={'input-' + key}
            onChange={this.onChange}
            type={conf.type}
            value={_usr[key]}
          />);
      }else if(!conf.searchFn && !conf.create){
        return (
          <Select
            className="form-control mx-3"
            id={'input-' + key}
            onChange={mkOnChange(key)}
            options={conf.options}
            value={_usr[key]}
          />);
      }else if(!conf.searchFn){
        return (
          <Creatable
            className="form-control mx-3"
            id={'input-' + key}
            onChange={mkOnChange(key)}
            options={conf.options}
            value={_usr[key]}
          />);
      }else if(!conf.create){
        return (
          <Async
            className="form-control mx-3"
            id={'input-' + key}
            ignoreAccents
            ignoreCase
            loadOptions={conf.searchFn}
            matchPos="any"
            onChange={mkOnChange(key)}
            value={_usr[key]}
          />);
      }else{
        return (
          <AsyncCreatable
            className="form-control mx-3"
            id={'input-' + key}
            loadOptions={conf.searchFn}
            onChange={mkOnChange(key)}
            value={_usr[key]}
          />);
      }
    };

    let userStatus = this.state.user && this.state.user.registration_status;
    if(userStatus && userStatus === 'registered' || userStatus == 'unregistered') userStatus = 'Pending';
    else if(userStatus && userStatus === 'comfirmation') userStatus = 'Pending Confirmation';
    else if(userStatus) userStatus = userStatus.replace('-', ' ');

    //this goes in the side bar
    if(this.state.user){
      const github = (this.state.user && this.state.user.github)? this.state.user.github : '';
      ReactDOM.render(
        <div>
          <h2 className="font-weight-bold" >{this.state.user && this.state.user.first_name + ' ' + this.state.user.last_name} </h2>
          <h6> <a onClick={this.logout}>Logout</a> </h6>
          <br />
          {this.state.user && this.state.user.school &&
          <span>
            <h6 className="profile-text"><i className="fas fa-graduation-cap fa-fw" />{ this.state.user.school }</h6> <br />
          </span>
          }
          {this.state.user && this.state.user.level_of_study &&
          <span>
            <h6 className="profile-text"><i className="fas fa-user fa-fw" />{ this.state.user.level_of_study }</h6> <br />
          </span>
          }
          {this.state.user && this.state.user.major &&
          <span>
            <h6 className="profile-text"><i className="fas fa-lightbulb fa-fw" />{ this.state.user.major }</h6> <br />
          </span>
          }
          { github && <h6><i className="fab fa-github fa-fw" /> <a href={'http://github.com/' + github}
            target="_blank">{github}</a></h6> }
        </div>,
        document.getElementById('register-sidebar'));

      if(this.state.qr && (userStatus === 'coming' || userStatus === 'waitlist' || userStatus === 'checked in')) {
        document.getElementById('profile-qr').setAttribute('src', this.state.qr);
        document.getElementById('qr-border').setAttribute('style', 'display:block;');
      }
    }

    //pardon my indentation - David used tabs.
    return (
      <div>

        <div className="content-section "
          id="announcements-div"
        >
          <h2 className="content-section-title"><i className="fas fa-sign-in-alt fa-fw" /> <span className="u-highlight">Status:</span></h2>
          <div className="content-section-desc register-root">

            <form className="form-group">

              <div className="text-center">

                <h2 className="blue SC"> Status: {userStatus} </h2>
                {userStatus === 'checked in' &&

                <div>
                  <i className="fas fa-check fa-fw" />
                  <h1 className="blue my-3"> Welcome to HackRU! </h1>
                  <h6 className="blue"> In case of an emergency, call RUPD: 732-932-7211 </h6>
                </div>
                }

                {userStatus != 'Pending' && userStatus != 'waitlist' && userStatus != 'checked in' &&
                <div>
                  <div className="blue"><h3>{this.state.upperFlash}</h3></div>
                  <button className="btn btn-primary UC custom-btn p-3 my-1 mx-md-1"
                    onClick={this.attending}
                    type="button"
                  ><h6 className="my-0">Attending</h6></button>
                  <button className="btn btn-primary UC custom-btn p-3 my-1"
                    onClick={this.notAttending}
                    type="button"
                  ><h6 className="my-0">Will not Attend</h6></button>

                  {userStatus === 'coming' && (!this.state.user.travelling_from || !this.state.user.travelling_from.estimate) &&
                  <span>
                    <br/>
                    <input
                      defaultChecked={this.state.user.travelling_from && this.state.user.travelling_from.is_real}
                      id="toggle-travel-stuff"
                      onClick={(e) => {
                        let newser = this.state.user;
                        if (!newser.travelling_from || typeof(newser.travelling_from) === 'string') newser.travelling_from = {};
                        newser.travelling_from.is_real = !(this.state.user.travelling_from && this.state.user.travelling_from.is_real);
                        if(newser.travelling_from.is_real){
                          this.setState({user: newser});
                        }else{
                          fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/update', {
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'omit',
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              updates : {'$set': {'travelling_from.is_real': false}},
                              user_email: this.state.email,
                              auth_email: this.state.email,
                              auth: this.state.token
                            })
                          }).then(data => data.json())
                            .then(json => {
                              if(json.statusCode == 200){
                                this.setState({user: newser});
                              }else{
                                this.setState({upperFlash: json.body});
                              }
                            });
                        }
                      }}
                      type="checkbox"
                    />
                    <label htmlFor="toggle-travel-stuff"><h5 className="blue">I request travel reimbursement</h5></label>
                  </span>
                  }
                  {this.state.user && this.state.user.travelling_from && this.state.user.travelling_from.is_real && !this.state.user.travelling_from.estimate &&
                  <div>   <h4 className="font-weight-bold blue">Location Traveling from (include City & State)</h4>
                    <Autocomplete
                      className="form-control mx-3"
                      componentRestrictions={{country: 'us'}}
                      onChange={(e) => {
                        let newser = this.state.user;
                        newser.travelling_from.formatted_address = e.target.value;
                        this.setState({user: newser, travelClean: false});
                      }}
                      onPlaceSelected={
                        (place) => {
                          let newser = this.state.user;
                          if(!newser.travelling_from) newser.travelling_from = {};
                          if(!newser.travelling_from.location) newser.travelling_from.location = {};
                          newser.travelling_from.location.lat = place.geometry.location.lat();
                          newser.travelling_from.location.lng = place.geometry.location.lng();
                          newser.travelling_from.formatted_address = place.formatted_address;
                          newser.travelling_from.mode = this.state.user.travelling_from.mode;
                          this.setState({user: newser, travelClean: true});
                        }
                      }
                      placeholder="where are you travelling from?"
                      types={['(cities)']}
                      value={this.state.user && this.state.user.travelling_from && this.state.user.travelling_from.formatted_address}
                    />
                    <div><h6 className="blue mt-3">Preferred mode of transport:</h6></div>
                    <input checked={this.state.user.travelling_from.mode === 'bus'}
                      name="preferred-transport"
                      onClick={this.transMode}
                      type="radio"
                      value="bus"
                    /><label><p className="blue mr-1">Bus</p></label>
                    <input checked={this.state.user.travelling_from.mode === 'train'}
                      name="preferred-transport"
                      onClick={this.transMode}
                      type="radio"
                      value="train"
                    /><label><p className="blue mr-1">Train</p></label>
                    <input checked={this.state.user.travelling_from.mode === 'car'}
                      name="preferred-transport"
                      onClick={this.transMode}
                      type="radio"
                      value="car"
                    /><label><p className="blue mr-1">Car</p></label><br/>
                    <button
                      className={'btn btn-primary UC custom-btn p-3 my-1' + (!this.state.travelClean && ' disabled')}
                      onClick={this.notifyTransport}
                      type="button"
                    >
                      {this.state.travelClean? 'Update Travel Information' : 'Please choose a location from the dropdown to change it'}
                    </button>
                  </div>
                  }
                  {this.state.user && this.state.user.travelling_from && this.state.user.travelling_from.estimate &&
                  <div>   <h4 className="font-weight-bold blue">Estimated reimbursement: ${this.state.user.travelling_from.estimate}</h4>
               Please be prepared to <strong>show us all receipts</strong> related to your reimbursement on the day of HackRU. Please keep in mind you <strong>must submit a project to Devpost and demo on Sunday</strong> to receive your travel reimbursement in the form of an Amazon giftcard.
                  </div>
                  }
                </div>
                }

              </div></form>
          </div></div>
        {this.state.user && userStatus != 'checked in' &&
        <div className="content-section"
          id="announcements-div"
        >
          <h2 className="content-section-title"><i className="fas fa-id-card fa-fw mt-4" /> <span className="u-highlight">Your Info:</span></h2>
          <div className="content-section-desc your-info">


            <span>
              { this.state.user &&
            Object.keys(formConfig)
              .map(key =>
                <div className="form-group row mb-4">
                  <label className="col-lg-8"
                    htmlFor={'input-' + key}
                  ><h4 className="font-weight-bold blue">{key.replace(/_/g, ' ').toUpperCase()}</h4></label>
                  {parseInput(key)}
                </div>
              )
              }
            </span>
            <div className="form-group row my-2">
              <label className="col-lg-8"
                htmlFor="resumeupload"
              ><h4 className="font-weight-bold blue">SHORT ANSWER:</h4> What are you looking for from your experience at HackRU?</label>
              <textarea className="form-control mx-3"
                id="input-short_answer"
                onChange={this.onChange}
                value={(this.state.user)? this.state.user.short_answer : ''}
              />
            </div>
            <div className="form-group row my-2">
              <label className="col-lg-8"
                htmlFor="resumeupload"
              ><h4 className="font-weight-bold blue">RESUME</h4>
                {(this.state.hasResume)? 'You have uploaded one.': 'Please upload a copy!'}
              </label>
              <input className="form-control mx-3"
                id="resumeupload"
                onChange={this.doResume}
                type="file"
              />
            </div>
            {this.state.user && this.state.user.registration_status == 'unregistered' &&
            <div className="form-group row my-2 mx-1">
              <h4 className="col-12 font-weight-bold blue mb-2">MLH NOTICES</h4>
              <div className="col-12 form-check mb-4">

                <input className="form-check-input mr-4"
                  id="code-of-conduct-box"
                  type="checkbox"
                />
                <label className="form-check-label"
                  htmlFor="code-of-conduct-box"
                >
                      I agree to abide by the <a className="blue"
                    href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                                              >MLH code of conduct.</a>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input mr-4"
                  id="data-sharing-box"
                  type="checkbox"
                />
                <label className="form-check-label"
                  htmlFor="data-sharing-box"
                >
                      I agree to the terms of both the <a className="blue"
                        href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
                                                       >MLH Contest Terms and Conditions</a>
                      and <a className="blue"
                        href="https://mlh.io/privacy"
                          >the MLH Privacy Policy</a>. Please note that you may
                      receive pre and post-event informational e-mails and occasional messages
                      about hackathons from MLH as per the MLH Privacy Policy.
                </label>
              </div>

            </div>}
            <div className="form-group row my-2 mx-1">
              <h4 className="blue">{this.state.flash}</h4>
            </div>
            <this.LogoutButtons />
          </div></div>
        }




      </div>

    );

  }

}

export default withCookies(UserForm);
