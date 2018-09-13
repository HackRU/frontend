import React from 'react';
import ReactDOM from 'react-dom';
import {instanceOf} from 'prop-types';
import ModalError from './modalerror';

class AdminEmailing extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      user: props.user,
      token: props.token
    };

    this.sendEmails = this.sendEmails.bind(this);
    this.sendLink = this.sendLink.bind(this);
  }

  componentWillMount(){
    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/email-templates', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.user.email,
        'token': this.state.token
      })
    }).then(resp => resp.json())
      .then(templates => {
        if(templates.statusCode === 200){
          this.setState({templates: templates.body});
        }
      });
  }

  sendEmails(e){
    const reg_stat = document.getElementById('email-recipient-status').value;
    const isEvery = document.querySelector('input[name="email-recipients"]:checked').value === 'all';
    const query = [
      {'$match': {'registration_status': reg_stat}},
      {'$addFields': {
        'create_time': {'$arrayElemAt': ['auth', 0]}
      }},
      {'$sort': {'create_time': 1}}
    ].concat(isEvery ? [] : [{'$limit': document.getElementById('email-how-many-recipients').value}]);

    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/send-email', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.user.email,
        'token': this.state.token,
        'template': document.getElementById('choose-email-template').value,
        'query': query,
        'aggregate': true
      })
    }).then(resp => resp.json())
      .then(templates => {
        if(templates.statusCode === 200){
          alert('Worked!');
        }else{
          alert('Error: ' + templates.body);
        }
      });
  }

  sendLink(e){
    let perms = [];
    document.querySelectorAll('input[name="magiclink-permission"]:checked')
      .forEach(p => perms.push(p.value));
    const emails = document.getElementById('emails').value.split('\n');

    fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/createmagiclink', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.user.email,
        'token': this.state.token,
        'template': (document.getElementById('choose-email-template')) ? document.getElementById('choose-email-template').value : 'judge-invite',
        'permissions': perms,
        'emailsTo': emails,
        'numLinks': emails.length
      })
    }).then(resp => resp.json())
      .then(templates => {
        if(templates.statusCode === 200){
          console.log('nani');
          fetch('https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest/send-emails', {
            method: 'POST',
            mode: 'cors',
            credentials: 'omit',
            headers: {
              //'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'email': this.state.user.email,
              'token': this.state.token,
              'template': (document.getElementById('choose-email-template')) ? document.getElementById('choose-email-template').value : 'judge-invite',
              'recipients': emails,
              'links': templates.body.map(l => 'https://hackru.org/dashboard.html?magiclink=' + l)
            })
          }).then(resp => resp.json())
            .then(data => console.log(data));

        }else{
          alert('Error: ' + JSON.stringify(templates));
        }
      });
  }

  render(){
    return(
      <div>
        <h1 className="text-center">Send Emails</h1>
        {
          (!this.state.templates && 'Using "judge-invite" by default') ||
            <select id="choose-email-template">
              {
                this.state.templates.map(t => <option value={t.id}>{t.name}</option>)
              }
            </select>
            // <div> TODO: (for next HackRU): make this work.
            //   Email <input type="radio" name="email-recipients" value="all"/> every
            //   <input type="radio" name="email-recipients" value="some"/> the first
            //   <input type="number" id="email-how-many-recipients" /> users that are
            //   <select id="email-recipient-status">
            //     <option value="unregistered">Unregistered</option>
            //     <option value="registered">Registered</option>
            //     <option value="confirmation">Confirming attendence</option>
            //     <option value="coming">Coming</option>
            //     <option value="not-coming">Not Coming</option>
            //     <option value="waitlisted">Waitlisted</option>
            //     <option value="confirmed">Confirmed Attendence</option>
            //     <option value="checked-in">Checked In</option>
            //   </select>
            //   that template that I selected above.
            // </div>
            // <button onClick={this.sendEmails} className="btn btn-primary custom-btn p-3 mx-1 my-3">Send thingy I described</button>
        }
        <div>
          Email these addresses: (each email on a line) <textarea id="emails"></textarea>
          to be <input type="checkbox" name="magiclink-permission" value="director"/>director
          <input type="checkbox" name="magiclink-permission" value="judge"/>judge
          <input type="checkbox" name="magiclink-permission" value="organizer"/>organizer
          <input type="checkbox" name="magiclink-permission" value="volunteer"/>volunteer
          <input type="checkbox" name="magiclink-permission" value="mentor"/>mentor
          - use that template that I selected above.
        </div>
        <button onClick={this.sendLink} className="btn btn-primary custom-btn p-3 mx-1 my-3">Send link I described</button>
      </div>);
  }

}

export default AdminEmailing;
