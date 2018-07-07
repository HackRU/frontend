//index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';


import DashboardProfile from 'static/DashboardProfile';
import InfoSection from 'static/InfoSection';
import ImportantLinks from 'static/ImportantLinks';

import 'styles/index.css';
import 'styles/App.css';

import App from 'components/App';
import Slack from 'components/Slack';
import Events from 'components/Events';



import rootReducer from 'reducers/rootReducer';
import registerServiceWorker from 'registerServiceWorker';
import {CookiesProvider} from 'react-cookie';
	
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));




//ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('register-root'));
//ReactDOM.render(<Slack></Slack>, document.getElementById('announcements-list'));
//ReactDOM.render(<Events></Events>, document.getElementById('upcoming-list'));

// ReactDOM.render(<Col messageText="thisistext" />, document.getElementById('second-root')); <-- what this


const Dashboard = () => (
  <div>
    <Provider store={store}>		
      {/*BEGIN LEFT SIDE OF DASHBOARD*/}
      <DashboardProfile />
      {/*END LEFT SIDE OF DASHBOARD*/}
      {/*BEGIN RIGHT SIDE OF DASHBOARD*/}
      <div className="col-xs-12 col-md-10 offset-md-2" id="dashboard-content">
        <div className="row mb-5"> {/*row mb-5 begin*/}
          <div className="col-xs-12 col-md-5 mb-3">
            <div id="announcements-id">
              <h2 className="content-section-title">
                <i className="fas fa-bullhorn fa-fw" /> <span className="u-highlight">{'Announcements'}</span></h2>
              <div className="content-section-desc" id="announcements-list">
                <Slack /> {/*Slack component goes here*/}
              </div><span title=".announcements-list" HIDDEN/>
            </div><span title=".announcements-id" HIDDEN/>
          </div>
          <div className="col-xs-12 col-md-4 mb-3">
            <div className="content-section" id="upcoming-div">
              <h2 className="content-section-title">
                <i className="fas fa-calendar-alt fa-fw" /> 
                <span className="u-highlight">{'Upcoming'}</span></h2>
              <div className="content-section-desc" id="upcoming-list">
                <Events /> {/*Events component goes here*/}
              </div><span title=".upcoming-list" HIDDEN/>
            </div>
          </div>
          <div className="col-xs-12 col-md-3 mb-3">
            <InfoSection />
          </div> 
        </div> {/*row mb-5 end*/}
        <div className="row mb-5"> {/*row mb-5 begin*/}
          <div className="col-xs-12 col-md-8 offset-md-2 mb-3">
            <div id="register-root">
              <CookiesProvider>
                <App /> {/*App component goes here*/}
              </CookiesProvider>
            </div>
            <div id="register-more" />
          </div>
        </div> {/*row mb-5 end*/}
        <div className="row mb-5"> {/*row mb-5 begin*/}
          <div className="col-xs-12 col-md-8 offset-md-2 mb-3">
            <div id="announcements-id">
              <h2 className="content-section-title"><i className="fas fa-video fa-fw" /> <span className="u-highlight">{'Livestream'}</span></h2>
              <div className="content-section-desc" id="livestream text-center">
                <div id="all">
                  <div className="sub">
                    <iframe title="livestream-iframe"
                      src="https://player.twitch.tv/?channel=hack_ru" 
                      frameBorder="0" 
                      allowFullScreen="true" 
                      scrolling="no" 
                      height="378" 
                      width="620"
                    >
                      {/*Twitch stream*/}
                    </iframe>
                  </div>
                </div>
                <h5>
                  <a href="https://www.twitch.tv/hack_ru?tt_content=text_link&tt_medium=live_embed" 
                    style={{display: 'block'}} 
                    className="blue text-center"
                  >
                    {'Watch live video from Hack_RU on www.twitch.tv'} {/*Twitch Link*/} 
                  </a>
                </h5>
              </div>
            </div>
          </div>
        </div>
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
    </Provider>
  </div>
);

ReactDOM.render(<Dashboard />, document.getElementById('dashboard-full'));
registerServiceWorker();

