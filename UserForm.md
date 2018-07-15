# UserForm

## State Handled
```js

```

## What the Hell is Going On

### Cookies Check

This gets called when the UserForm loads.  
First obtain the `authdata` from the cookies.
*  If there is no `authdata` or the `valid_until` date is before `Date.now()`, assume that the cookie is the authdata and check the validity
