//Dashboard.js
import React, { Fragment } from 'react';

import 'styles/index.css';
import 'styles/App.css';

import DashboardProfile from 'dumb_components/DashboardProfile';
import DetailLinks from 'dumb_components/DetailLinks';
import Events from 'dumb_components/Events';
import InfoSection from 'dumb_components/InfoSection';
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
    <Fragment>
      {/*BEGIN LEFT SIDE OF DASHBOARD*/}
      <DashboardProfile />
      {/*END LEFT SIDE OF DASHBOARD*/}
      {/*BEGIN RIGHT SIDE OF DASHBOARD*/}
      <div className="col-xs-12 col-md-10 offset-md-2" id="dashboard-content">
        <img className="overlay-design d-none d-lg-block overlay-one" alt="ufo" src="../assets/icons/hackethon_alien_noplat_2.png" />  
        <img className="overlay-design d-none d-lg-block overlay-two" alt="ufo" src="../assets/icons/hackethon_alien_noplat_2.png" />
        <div className="row mb-5"> {/*row mb-5 begin*/}
          <div className="col-xs-12 col-lg-10 offset-lg-1 mb-3">
            <ContentSection title="Important Links">
              <DetailLinks />
            </ContentSection>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-5 offset-lg-1 offset-md-0 mb-3">
            <ContentSection sectionID="announcements-list" title="Announcements">
              <SlackContainer />
            </ContentSection>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-5 mb-3">
            <ContentSection sectionID="upcoming-list" title="Upcoming">
              <Events /> {/*Events component goes here*/}
            </ContentSection>
          </div>
        </div> {/*row mb-5 end*/}
        <div className="row mb-5"> {/*row mb-5 begin*/}
          <div className="col-xs-12 col-lg-10 offset-lg-1 mb-3">
            <div id="register-root">
              <LoginManagement /> {/*LoginManagement component goes here*/}
            </div>
            {<div id="register-more" />}
          </div>
        </div> {/*row mb-5 end*/}
        <div className= "row mb-5"> {/*row mb-5 begin*/}
          <div className="col-xs-12 col-md-12 col-lg-10 offset-lg-1 offset-md-0 mb-3"> {/*original col-xs-12 col-md-3 mb-3, no id*/}
            <InfoSection />
          </div>
        </div> {/*row mb-5 end*/}
        <div className= "row mb-5"> {/*row mb-5 begin*/}
          <div className="col-xs-12 col-md-12 col-lg-10 offset-lg-1 offset-md-0 mb-3">
            <ContentSection sectionID="image" title="Floorplan">
              <a href={resURLS.miscMap} target="_blank">
                <img className="img-fluid" src={resURLS.miscMap} />
              </a>  
            </ContentSection>
          </div>
        </div> {/*row mb-5 end*/}
        <div className="row mb-5"> {/*row mb-5 nested begin*/}
          <div className="col-xs-12 col-md-8 offset-md-2 mb-3">
            <div className=" mt-2 mb-2" id="register-admin" />
          </div>
        </div> {/*row mb-5 nested end*/}
        <div className="row">
          <div className="col-xs-12 col-md-2 offset-xs-0 offset-md-5">
            <ImportantLinks />
          </div>
        </div>
      </div>
    </Fragment>
  )
}


export default Dashboard;
