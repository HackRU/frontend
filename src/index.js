//index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';


import 'static/DashboardProfile.js'

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
      <div class="col-xs-12 col-md-10 offset-md-2" id="dashboard-content">
        <div class="row mb-5">
          <div class="col-xs-12 col-md-5 mb-3">
            <div id="announcements-id">
              <h2 class="content-section-title"><i class="fas fa-bullhorn fa-fw"></i> <span class="u-highlight">Announcements</span></h2>
              <div class="content-section-desc" id="announcements-list">
                <Slack />
              </div><span title =".announcements-list" HIDDEN/>
            </div><span title=".announcements-id" HIDDEN/>
          </div>
          <div class="col-xs-12 col-md-4 mb-3">
            <div class="content-section" id="upcoming-div">
              <h2 class="content-section-title">
              <i class="fas fa-calendar-alt fa-fw"></i> 
              <span class="u-highlight">Upcoming</span></h2>
              <div class="content-section-desc" id="upcoming-list">
                <Events />
              </div><span title = ".upcoming-list" HIDDEN/>
						</div>
          </div>
					<div class="col-xs-12 col-md-3 mb-3">
						<div class="content-section" id="info-div">
												<h2 class="content-section-title"><i class="fas fa-info-circle fa-fw"></i> <span class="u-highlight">Info</span></h2>
												<div class="content-section-desc" id="info-list">

													<h5 class="content-title">Date</h5>
													<p class="content-desc">
														April 21st-22nd
													</p>
													<h5 class="content-title">Location</h5>
													<span class="font-weight-bold blue"><a class="blue" href="https://goo.gl/maps/a6gNk22V6px">Rutgers Athletic Center</a></span>
													<p class="content-desc">
                            83 Rockafeller Rd, <br>Piscataway Township, </br>NJ 08854
													</p>
													<h5 class="content-title">Devpost</h5>
													<p class="content-desc">
														Click <a href="https://hackru-s18.devpost.com/">here</a> to view the devpost
													</p>
													<h5 class="content-title">Want to mentor?</h5>
													<p class="content-desc">
                            Click <a href="https://docs.google.com/forms/d/e/1FAIpQLSdGuoY6ATqMlOxOqoiP8FPyzgWMGg60gVzryvUrQBjV6T8h-w/viewform">here</a> to sign up
                          </p>
													<h5 class="content-title">Questions?</h5>
													<p class="content-desc">
													Email us at <a href="mailto:info@hackru.org">info@hackru.org</a>
													</p>
													<h5 class="content-title">Emergency Contact</h5>
													<p class="content-desc">
                            <span class="font-weight-bold">RUPD</span><br>732-932-7211</br>
													</p>


												</div>
											</div>

									</div>
								</div>


				<div class="row mb-5">
					<div class="col-xs-12 col-md-8 offset-md-2 mb-3">

								<div id="register-root">
								</div>
								<div id="register-more">
								</div>
						</div>

				</div> <!-- row -->

				<div class="row mb-5">
					<div class="col-xs-12 col-md-8 offset-md-2 mb-3">

								<div id="announcements-id">
									<h2 class="content-section-title"><i class="fas fa-video fa-fw"></i> <span class="u-highlight">Livestream</span></h2>
									<div class="content-section-desc" id="livestream text-center">
										<div id="all">
    									<div class="sub">
												<iframe src="https://player.twitch.tv/?channel=hack_ru" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
											</div>
										</div>
									<h5><a href="https://www.twitch.tv/hack_ru?tt_content=text_link&tt_medium=live_embed" style="display:block;" class="blue text-center">Watch live video from Hack_RU on www.twitch.tv</a></h5>

								</div>
							</div>
						</div>
					</div>


				<div class="row mb-5">
					<div class="col-xs-12 col-md-8 offset-md-2 mb-3">

							<div class=" mt-2 mb-2" id="register-admin">

							</div>
						</div>

				</div> <!-- row -->




				<div class="row">


					<div class="col-xs-12 col-md-2 offset-xs-0 offset-md-5">
						<div class="row">

							<div class="col-3 text-center">
								<h5>
									<a href="https://www.facebook.com/theHackRU/" class="color-two" target="_blank"><i class="fab fa-facebook-square fa-fw"></i></a>
								</h5>
							</div>

							<div class="col-3 text-center">
								<h5>
									<a href="https://www.instagram.com/thehackru/" class="color-two" target="_blank"><i class="fab fa-instagram fa-fw"></i></a>
								</h5>
							</div>

							<div class="col-3 text-center">
								<h5>
									<a href="https://medium.com/the-hackru" class="color-two" target="_blank"><i class="fab fa-medium fa-fw"></i></a>
								</h5>
							</div>

							<div class="col-3 text-center">
								<h5>
									<a href="https://twitter.com/theHackRU" class="color-two" target="_blank"><i class="fab fa-twitter-square fa-fw"></i></a>
								</h5>
							</div>

							<div class="col-12 text-center mt-3">
								<p><a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" class="color-two" target="_blank">MLH's Code of Conduct</a></p>
								<p><a href="mailto:info@hackru.org" class="color-two" target="_blank" data-email="info@hackru.org">info@hackru.org</a></p>
							</div>

						</div>
					</div>

				</div>


			</div>
    </Provider>
	</div>

	);

ReactDOM.render(<Dashboard />, document.getElementById('dashboard-full'));

registerServiceWorker();

