# UserForm

## State Handled
```js
{
  userInfoEmail: '', //Seperate from the one in LoginManagement
  token: '',
  resume: '',
  userInfo: null, //Object
  mentorInfo: null, //Object  
  qr: '',
  flash: ''
}
```

## What the Hell is Going On

### Cookies Check

This gets called when the UserForm loads.  
First obtain the `authdata` from the cookies.
*  If there is no `authdata` or the `valid_until` date is before `Date.now()`, re-render the App (not-really) as a non-logged in userInfo:
  *  The LoginForm should show.
  *  The `register-sidebar` should show `'Please login'`.
  *  The `profile-qr` should show `wheel.png`.
  *  The `qr-border` should not display.
*  Otherwise, set the `userInfoEmail` and `token` to the ones stored in the `authdata`
  *  Call `downloadResume` with parameters `true`, `userInfoEmail`, and a function which takes `wrk` and sets `resume` to `wrk`

### Admin Check

This gets called in after the userInfo is read, and checks if the userInfo is an admin.
*  If there is no `userInfo` object or the `userInfo.role` is not `director`, do nothing.
*  Otherwise, render the Admin form with the userInfo `token` and `userInfo` object.

### Read User 

This retrieves the userInfo information from the back-end. This should be called in `componentDidMount()`.
*  Post request the `userInfo_email`, `token`, and a `query` of `{'userInfo_email': userInfoEmail}` to `lcsReadURL`.
*  Upon resolution, grab the `userInfoData` from `data.body[0]` and then set the `userInfo` object to the `userInfoData`.  
  *  Catch errors into `flash`.
*  Start doing various checks on the userInfo.
*  Then retrieve the QR code for the userInfo.

### Retrieving the QR Code

This retrieves the QR code for a userInfo and should be called shortly after reading the userInfo.
*  Post request the `userInfo_email` to `lcsQRURL along with a `background` color and a `color` for the foreground (values subject to change):
  *  `background`: `[0xe8, 0xf6, 0xfc]`
  *  `color`: `[0x25, 0x47, 0x9e]`
*  Upon resolution, if the response `statusCode` is 200, set `qr` to theresponse `body`.
  *  Catch errors into `flash`.
*  Otherwise, set `flash` to the error.

### Logging Out 

Logs out the userInfo from the application.  Called when a logout button is clicked.

*  Remove the `authdata` from the cookies
*  The entire App should re-render (not really)
  *  The LoginForm should show.
  *  The `register-sidebar` should show `'Please login'`.
  *  The `profile-qr` should show `wheel.png`.
  *  The `qr-border` should not display.
*  Set `window.location.href` to `/dashboard.html`.  (routing thing?)

### Update User State

Triggers an update to `userInfo` whenever a change happens in the form.

*  On the event trigger, store the name of the updated key by extracting it from `e.target.id`.
*  Take the current state's `userInfo` and update the aformentioned key with `e.target.value`.
*  Save the updated `userInfo` to the state.

### Changing the Mentor Bit

Triggers an update to `mentor` whenever a change happens in the form.  This is separate from `userInfo` because the 

*  On the event trigger, store the name of the updated key it from `e.target.id`.
*  Take the current state's `mentorInfo` and update the aforementioned key with `e.target.value`.
*  Save the updated `mentorInfo` to the state.

