import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Col from './Col';
import './App.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('register-root'));
// ReactDOM.render(<Col messageText="thisistext" />, document.getElementById('second-root'));
registerServiceWorker();
