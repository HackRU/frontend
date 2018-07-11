# Login Management

## State Handled
```js
{
  email: '',
  password: '', << hmmm
  isLoggedIn: false,
  forgotPassword: false,
  magicLink: '',
  errorMessage: ''
}
```

## What The Hell Is Going On

### Checking the URLParams
Either the UserForm or the LoginForm will render.  Which one appears depends on several things.  In the beginning, the URL in the window is checked.  (CANCER)

*  If there is an error, set `errorMessage` to the one in the URL.
*  If there is a magic link in the URL, check the following:
  *  If the link starts with `'forgot-'`, set `errorMessage` to notify the user they have a magic link and must enter their email and new password. Then set `magicLink` to the link.
  *  Otherwise, set `errorMessage` to notify the user they have a magic link and must login to apply it.  Then set `magicLink` to the link.
*  If there is `'authdata'` in the URL, set the cookie `authdata` to the JSON-parsed URL auth data.
*  Otherwise, grab `authdata` from the cookie.
*  If `authdata` is valid, and its `valid_until` is greater than `Date.now()`, load the UserForm.
*  Otherwise, load the LoginForm

### Loading the UserForm
When loading the UserForm, automatically set `isLoggedIn` to `true`.  The `authdata` should be taken and stored in the cookie.  Now check if there is a `magicLink`:

*  If there is no link or the link starts with `'forgot-'`, render the userForm as usual.
*  Otherwise, post request the `magicLink`, `email`, and `authdata.token` to `mlhTestConsumeURL` and render the response along with the UserForm.

### Logging In
Logging in is triggered by clicking the appropriate button in the LoginForm.
*  If the `email` or the `password` are empty, set `errorMessage` to notify the user of such.
*  Otherwise, post request the `email` and `password` to `mlhTestAuthURL` as a promise.
  *  On fulfillment, check for status code 200 (login).
  *  Catch rejection errors into `errorMessage`.

### Checking for Status Code 200 (Login)
*  Check the response data `statusCode`.
*  If the value is not 200, check the error message in the body for an incorrect email/password combo or just an incorrect password.  Then put an appropriate message in `errorMessage`.
*  Otherwise, the login was successful - load the UserForm.

### Signing Up
Signing up is triggered by clicking the appropriate butotn in the LoginForm.
*  If the `email` or the `password` are empty, set `errorMessage` to notify the user of such.
*  Otherwise, post request the `email` and `password` to `mlhTestCreateURL` as a promise.
  *  On fulfillment, check for status code 200 (signup).
  *  Catch rejection errors into `errorMessage`.

### Checking for Status Code 200 (Signup) 
*  Check the response data `statusCode`.
*  If the value is not 200:
  *  Check the error message in the body for a duplicate user alert and put an appropriate message in `errorMessage`.
  *  If the error is not as above, put it in `errorMessage` as is.
*  Otherwise, the signup was successful- load the UserForm.

### Changing Email
Changing the target email is triggered by changing the text in the appropriate input form.  It just changes `email`.

### Changing Password
Changing the target password is triggered by changing the password in the appropriate input form.  It just changes `password`.

### Logging In wwith MLH
Logging in with MLH is triggered by clicking the appropriate button  in the LoginForm.  A `redirect` URL is created by:
*  If there is a `magicLink` and the link does not start with `'forgot-'`, the `magicLinkRedirectURL` is concatenated with the `magicLink` itself to form `redirect`.
*  Otherwise, the `redirect` URL is left empty.
*  A window is opened to mlh.io, with `redirect` used as an `mlhcallback`.

### Recovering Password
An attempt to recover a forgotten password is triggered by clicking the appropriate button in the LoginForm.  The retrieval process begins by checking the `magicLink`.
*  If there is a link:
  *  If the `email` or the `password` are empty, set `errorMessage` to notify the user of such.  The user needs to enter in a new password if they have a `magicLink`.
  *  Otherwise, set `forgotPassword` to `true`.  Then post request the `email`, `forgotPassword`, `password`, and `magicLink` to `mlhTestConsumeURL` as a promise.
    *  On fulfillment, set `errorMessage` as the response's `errorMessage` or its `body`.  Set `magicLink` to `''`.
*  Otherwise, set `forgotPassword` to `true`. Then post request the `email` and `forgotPassword` to `mlhTestMagicURL` as a promise.  
  *  On fulfillment, set `errorMessage` as the response's `errorMessage` or its `body`.


  
