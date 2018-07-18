//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js2-cookie';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createCookieMiddleware } from 'redux-cookie';

import 'styles/index.css';
import 'styles/App.css';

import Dashboard from 'containers/Dashboard';

import rootReducer from 'reducers/rootReducer';
import registerServiceWorker from 'registerServiceWorker';
	
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk, createCookieMiddleware(Cookies))));


//ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('register-root'));
//ReactDOM.render(<Slack></Slack>, document.getElementById('announcements-list'));
//ReactDOM.render(<Events></Events>, document.getElementById('upcoming-list'));

// ReactDOM.render(<Col messageText="thisistext" />, document.getElementById('second-root')); <-- what this

store.subscribe(() => (console.log(store.getState())));


class App extends React.Component {
  
  render() {
    

    return (
      <div>
        <Provider store={store}>		
          <Dashboard />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('dashboard-full'));
registerServiceWorker();

export default App;

