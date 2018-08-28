//PageActions.test.js

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Cookies from 'js-cookie';
import { createCookieMiddleware } from 'redux-cookie';
import { getCookie, setCookie, removeCookie } from 'redux-cookie';
import { URLSearchParams } from 'url';

import { LOGIN_MNGMNT } from 'action_creators/ActionTypes';
import * as actions from 'action_creators/PageActions';



const middlewares = [thunk, createCookieMiddleware(Cookies)];
const mockStore = configureMockStore(middlewares);




describe('PageActions', () => {

  it('should determine if url parameters are unreadable', () => {

    let urlParams = 'fake params';
  
    expect(actions.checkURL(urlParams)).toEqual('unreadable');
    
  });

  it('should determine if url parameters have errors', () => {

    let urlParams = new URLSearchParams();

    urlParams.append('error', 'bad params');

    expect(actions.checkURL(urlParams)).toEqual('bad params');
  });

  it('should determine if url parameters are valid', () => {

    let urlParams = new URLSearchParams();

    urlParams.append('magiclink', 'this is the link');

    expect(actions.checkURL(urlParams)).toEqual('valid');
  });

  it('should detect if there is no magic link in url parameters', () => {

    let urlParams = new URLSearchParams();

    const expectedActions = [{
      type: LOGIN_MNGMNT.SET_MAGIC_LINK,
      magicLink: ''
    }, {
      type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD,
      forgottenPassword: false
    }];

    const store = mockStore({
      forgottenPassword: false,
      magicLink: ''
    });

    expect(store.dispatch(actions.confirmLink(urlParams))).toEqual('no magic link found');

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should be able to find a magic link in url parameters if one exists', () => {

    let urlParams = new URLSearchParams();
    urlParams.append('magiclink', 'abc123');

    const expectedActions = [{
      type: LOGIN_MNGMNT.SET_MAGIC_LINK,
      magicLink: 'abc123'
    }, {
      type: LOGIN_MNGMNT.HAS_FORGOTTEN_PASSWORD,
      forgottenPassword: true
    }];


    const store = mockStore({
      forgottenPassword: false,
      magicLink: ''
    });

    expect(store.dispatch(actions.confirmLink(urlParams))).toEqual('magic link success');

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should be able to determine if a cookie does not exist in the browser', () => {
    
    const store = mockStore({});
      
    expect(store.dispatch(actions.retrieveCookie('test'))).toEqual(null);
  });

  it('should be able to retrieve cookie data if a cookie exists', () => {

    const store = mockStore({});

    const data = {
      foo : 'bar',
      abc: 123
    };
    
    store.dispatch(setCookie('data', data));

    expect(store.dispatch(actions.retrieveCookie('data'))).toEqual(data);
  });

  it('should be check if a cookie does not have a expiry date', () => {

    const emptyCookie = null;

    expect(actions.checkCookieValid(emptyCookie)).toEqual(false);

    const noAuthCookie = {
      foo: 'bar'
    };

    expect(actions.checkCookieValid(noAuthCookie)).toEqual(false);

    const noDateCookie = {
      auth: {
        foo : 'bar'
      }
    };

    expect(actions.checkCookieValid(noDateCookie)).toEqual(false);
    
  });

  it('should check if a cookie is expired or not', () => {

    const expiredCookie = {
      auth: {
        valid_until: new Date()
      }
    };

    expect(actions.checkCookieValid(expiredCookie)).toEqual(false);

    
    let now = new Date();
    now.setDate(now.getDate() + 1);

    const unexpiredCookie = {
      auth: {
        valid_until: now
      }
    };

    expect(actions.checkCookieValid(unexpiredCookie)).toEqual(true);
  });


});
