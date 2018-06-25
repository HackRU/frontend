//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import './styles/index.css';
import App from './components/App';
import Slack from './components/Slack';
import Events from './components/Events';
import './styles/App.css';
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';
import {CookiesProvider} from 'react-cookie';
	
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk)));

const Dashboard = () => (
	<div>
		<Provider store = {store}>
			<CookiesProvider> 
				<App />
			</CookiesProvider>	
			<Slack />
			<Events />
		</Provider>
	</div>
)
//ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('register-root'));
//ReactDOM.render(<Slack></Slack>, document.getElementById('announcements-list'));
//ReactDOM.render(<Events></Events>, document.getElementById('upcoming-list'));



// ReactDOM.render(<Col messageText="thisistext" />, document.getElementById('second-root'));

ReactDOM.render(<Dashboard />, document.getElementById('root'))

registerServiceWorker();

