import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Slack from './Slack';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('register-root'));
ReactDOM.render(<Slack></Slack>, document.getElementById('announcements-list'));
// ReactDOM.render(<Col messageText="thisistext" />, document.getElementById('second-root'));
registerServiceWorker();
