g# UserForm

## State Handled
```js
{
  user_email: '', //Seperate from the one in LoginManagement
  token: '',
  resume: '',
  user: null, //Object
  qr: '',
  flash: ''
}
```

## What the Hell is Going On

### Cookies Check

This gets called when the UserForm loads.  
First obtain the `authdata` from the cookies.
*  If there is no `authdata` or the `valid_until` date is before `Date.now()`, re-render the App (not-really) as a non-logged in user:
  *  The LoginForm should show.
  *  The `register-sidebar` should show `'Please login'`.
  *  The `profile-qr` should show `wheel.png`.
  *  The `qr-border` should not display.
*  Otherwise, set the `user_email` and `token` to the ones stored in the `authdata`
  *  Call `downloadResume` with parameters `true`, `user_email`, and a function which takes `wrk` and sets `resume` to `wrk`

### Admin Check

This gets called in after the user is read, and checks if the user is an admin.
*  If there is no `user` object or the `user.role` is not `director`, do nothing.
*  Otherwise, render the Admin form with the user `token` and `user` object.

### Read User 

This retrieves the user information from the back-end. This should be called in `componentDidMount()`.
*  Post request the `user_email`, `token`, and a `query` of `{'user_email': user_email}` to `lcsReadURL`.
*  Upon resolution, grab the `userData` from `data.body[0]` and then set the `user` object to the `userData`.  
  *  Catch errors into `flash`.
*  Start doing various checks on the user.
*  Then retrieve the QR code for the user.

### Retrieving the QR Code

This retrieves the QR code for a user and should be called shortly after reading the user.
*  Post request the `user_email` to `lcsQRURL along with a `background` color and a `color` for the foreground (values subject to change):
  *  `background`: `[0xe8, 0xf6, 0xfc]`
  *  `color`: `[0x25, 0x47, 0x9e]`
*  Upon resolution, if the response `statusCode` is 200, set `qr` to theresponse `body`.
  *  Catch errors into `flash`.
*  Otherwise, set `flash` to the error.

### Logging Out 

Logs out the user from the application.  Called when a logout button is clicked.

*  Remove the `authdata` from the cookies
*  The entire App should re-render (not really)
  *  The LoginForm should show.
  *  The `register-sidebar` should show `'Please login'`.
  *  The `profile-qr` should show `wheel.png`.
  *  The `qr-border` should not display.
*  Set `window.location.href` to `/dashboard.html`.  (routing thing?)

### Update User State

Triggers an update to the state whenever a change happens in the form.
