//Dashboard.js
import React, { Fragment } from 'react';

import 'styles/index.css';
import 'styles/App.css';

import DetailLinks from 'dumb_components/DetailLinks';
import Events from 'dumb_components/Events';
import ImportantLinks from 'dumb_components/ImportantLinks';
import ContentSection from 'dumb_components/ContentSection';
import SlackContainer from 'smart_components/SlackContainer';

import LoginManagement from 'smart_components/LoginManagement';

import resURLS from 'resources/resURLS';
//import Slack from 'components/Slack';
//import Events from 'components/Events';




//ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('register-root'));
//ReactDOM.render(<Slack></Slack>, document.getElementById('announcements-list'));
//ReactDOM.render(<Events></Events>, document.getElementById('upcoming-list'));

// ReactDOM.render(<Col messageText="thisistext" />, document.getElementById('second-root')); <-- what this


class Dashboard extends React.Component {
  render = () => (
    <div className="col-12" id="dashboard-content">
      <img className="overlay-design d-none d-lg-block overlay-one" alt="ufo" src="../assets/icons/hackethon_alien_noplat_2.png" />  
      <img className="overlay-design d-none d-lg-block overlay-two" alt="ufo" src="../assets/icons/hackethon_alien_noplat_2.png" />
      <div className="row mb-5"> {/*row mb-5 begin*/}
        <div className="col-xs-12 col-lg-10 offset-lg-1 mb-3">
          <LoginManagement /> {/*LoginManagement component goes here*/}
        </div>
      </div> {/*row mb-5 end*/}
      <div className="row">
        <div className="col-xs-12 col-md-2 offset-xs-0 offset-md-5">
          <ImportantLinks />
        </div>
      </div>
    </div>
  )
}


export default Dashboard;
