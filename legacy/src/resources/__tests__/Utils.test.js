//Utils.test.js

import * as functions from 'resources/Utils';

describe('Utils', () => {

  //hasFields
  it('should determine if an object is missing specified fields', () => {

    //object with no fields
    const obj1 = {};
    const fields1 = ['a', 'b'];

    expect(functions.hasFields(obj1, fields1)).toEqual(false);

    //object with undefined
    const obj2 = {
      a: undefined,
      c: 3
    };

    const fields2 = ['a', 'c'];
    expect(functions.hasFields(obj2, fields2)).toEqual(false);

    //object with missing field
    const obj3 = {
      a: 'abc'
    };

    const fields3 = ['a', 'd'];
    expect(functions.hasFields(obj3, fields3)).toEqual(false);

  });
  it('should be able to determine if an object includes specified fields', () => {

    //object with fields, with one empty and one null
    const obj = {
      a: 'x',
      b: 'y',
      c: {
        
      },
      d: null
    };

    const fields_full = ['a', 'b', 'c', 'd'];
    const fields_sub = ['a', 'd', 'c'];

    expect(functions.hasFields(obj, fields_sub)).toEqual(true);
    expect(functions.hasFields(obj, fields_full)).toEqual(true);
  });

  //validateResponse
  it('should be able to determine if an object is an HTTP response', () => {

    //non-object
    const nonObj = 'lol';

    expect(functions.validateResponse(nonObj)).toEqual(false);

    //non-response
    const nonResp = {
      status: 'x'
    };

    expect(functions.validateResponse(nonResp)).toEqual(false);

    //response
    const resp = {
      body: 'aaa',
      headers: {
        'yarr': 'yeet'
      },
      statusCode: 200
    };

    expect(functions.validateResponse(resp)).toEqual(true);
  });

  //validateEmail
  it('should be able to determine if a string is an email', () => {

    //non-string
    const nonString = {
      x: 3
    };

    expect(functions.validateEmail(nonString)).toEqual(false);

    //non-email
    const nonEmail = 'a@a';

    expect(functions.validateEmail(nonEmail)).toEqual(false);

    //email
    const email = 'br@bt.domain';

    expect(functions.validateEmail(email)).toEqual(true);
  });

  //validatePassword
  it('should be able to determine if a string is a password', () => {

    //non-string
    const nonString = 3;

    expect(functions.validatePassword(nonString)).toEqual(false);

    //string
    const string = '3';

    expect(functions.validatePassword(string)).toEqual(true);
  });

  //validateAttempt
  it('should be able to determine if an object is a valid login attempt (LoginManager instance)', () => {

    //non-object
    const nonObj = 12;

    expect(functions.validateAttempt(nonObj)).toEqual(false);

    //non-attempt
    const nonAttempt = {
      email: 'a@a.com'
    };

    expect(functions.validateAttempt(nonAttempt)).toEqual(false);

    //attempt
    const attempt = {
      email: 'b@b.com',
      password: 'right',
      forgottenPassword: false,
      magicLink: 'a73ckvyxl'
    };

    expect(functions.validateAttempt(attempt)).toEqual(true);
  });

  //makePostBody
  it('should be able to generate a POST from a body', () => {

    //non-object
    const nonObj = 'not an object';

    expect(functions.makePostBody(nonObj)).toEqual(null);

    //body
    const body = {
      email: 'example@a.com',
      password: 'Hyacinth'
    };

    const expectedObj = {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    expect(functions.makePostBody(body)).toEqual(expectedObj);
  });
});
