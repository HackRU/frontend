# UserForm

## State Handled
```js
{
  email: '', 
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
*  If there is no `authdata` or the `valid_until` date is before `Date.now()`, assume that the cookie is the authdata and check the validity
  *  Re-render the App (?????????????????)
  *  Render a 'Please login' message in the `register-sidebar` element and also set logos and display stuff in the `profile-qr` and `qr-border` elements
*  Otherwise, set the `email` and `token` to the ones stored in the `authdata`
  *  Call `downloadResume` with parameters `true`, `email`, and a function which takes `wrk` and sets `resume` to `wrk`

### Admin Check

This gets called in after the user is read, and checks if the user is an admin.
*  If there is no `user` object or the `user.role` is not `director`, do nothing.
*  Otherwise, render the Admin form with the user `token` and `user` object.

### Read User 

This retrieves the user information from the back-end. This should be called in `componentDidMount()`.
*  Post request the `email`, `token`, and a `query` of `{'email': email}` to `lcsReadURL`.
*  Upon resolution, grab the `userData` from `data.body[0]` and then set the `user` object to the `userData`.  
  *  Catch errors into `flash`.
*  Start doing various checks on the user.
*  Then retrieve the QR code for the user.

### Retrieving the QR Code

This retrieves the QR code for a user and should be called shortly after reading the user.
*  Post request the `email` to `lcsQRURL along with a `background` color and a `color` for the foreground (values subject to change):
  *  `background`: `[0xe8, 0xf6, 0xfc]`
  *  `color`: `[0x25, 0x47, 0x9e]`
*  Upon resolution, if the response `statusCode` is 200, set `qr` to theresponse `body`.
  *  Catch errors into `flash`.
*  Otherwise, set `flash` to the error.

### Logging Out 

