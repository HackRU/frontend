import cookie from "react-cookies";
import request from "request";
import { defaults } from "../Defaults";

/**
 * Configure the all of the urls that we will need to access the rest api
 */
const BASE = ((process.env.NODE_ENV && process.env.NODE_ENV === "development") || window.location.origin.includes("dev.hackru.org")) ? (defaults.rest.dev) : (defaults.rest.prod);
const ENDPOINTS = {
    /**
     * Default login url
     * @params
     * {
     *     "headers": {
     *         "Content-Type": "application/json"
     *     },
     *     "body": {
     *         "email": "<EMAIL>",
     *         "password": "<PASSWORD>"
     *     }
     * }
     * @returns 
     * {
     *     "statusCode": 200,
     *     "isBase64Encoded": false,
     *     "headers": {
     *         "Content-Type": "application/json",
     *         "Access-Control-Allow-Origin": [
     *             "*"
     *         ],
     *         "Access-Control-Allow-Headers": [
     *             "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
     *         ],
     *         "Access-Control-Allow-Credentials": [
     *             true
     *         ]
     *     },
     *     "body": "{\"auth\": {\"token\": \"a6390c07-3bef-4062-ae69-3a0e983af124\", \"valid_until\": \"2018-12-29T18:41:17.225329\", \"email\": \"TESTING123\"}}"
     * }
     */
    "login": BASE + "/authorize",
    /**
     * Default signup url, expects
     */
    "signup": BASE + "/create",
    /**
     * Default logout url, expects
     */
    "logout": "< IMPLEMENT ME >",
    /**
     * Default user url, expects
     */
    "userData": BASE + "/read",
    /**
     * Default user update information, expects
     */
    "update": BASE + "/update",
    /**
     * Create forgot magic link to reset password
     */
    "forgot": BASE + "/createmagiclink",
    /**
     * Reset password from magic link to reset password
     */
    "resetpassword": BASE + "/consume",
    /**
     * Digest magic links
     */
    "magic": BASE + "/consume",
    /**
     * Day of event schedule
     */
    "schedule": BASE + "/dayof-events",
    /**
     * Day of slack
     */
    "slack": BASE + "/dayof-slack"
}
/**
 * Standard profile handler for the entire application
 */
class Profile {
    constructor() {
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
        this.SignUp = this.SignUp.bind(this);
        this._login = this._login.bind(this);
        this._token = cookie.load("token", { path: "/" });
        this._email = cookie.load("email", { path: "/" });
        this._valid_until = Date.parse(cookie.load("valid_until", { path: "/" }));
        if (this._token && this._email && this._valid_until && this._valid_until > Date.now()) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }
    Login(email, password, callback) {
        if (this.isLoggedIn) {
            callback("User is already logged in");
        } else {
            if (!email) {
                callback("Invalid email");
            } else if (!password) {
                callback("Invalid password");
            } else {
                request({
                    method: "POST",
                    uri: ENDPOINTS.login,
                    body: {
                        email: email,
                        password: password
                    },
                    json: true
                }, (error, response, body) => {
                    if (error) {
                        callback("An error occured when attempting login");
                    } else {
                        if (body.statusCode === 403) {
                            callback("Invalid email or password")
                        } else if (body.statusCode === 200) {
                            let data = JSON.parse(body.body);
                            let token = data.auth.token;
                            let valid_until = data.auth.valid_until;
                            this._login(email, token, valid_until);
                            callback();
                        } else {
                            callback((body.body) ? (body.body) : ("Unexpected Error"));
                        }
                    }
                });
            }
        }
    }
    SignUp(firstname, lastname, email, password, confirmpassword, callback) {
        if (this.isLoggedIn) {
            callback("User is already logged in");
        } else {
            if (!firstname) {
                callback("Invalid first name");
            } else if (!lastname) {
                callback("Invalid last name");
            } else if (!email) {
                callback("Invalid email");
            } else if (!password) {
                callback("Invalid password");
            } else if (!confirmpassword) {
                callback("Invalid password");
            } else if (password !== confirmpassword) {
                callback("Passwords don't match");
            } else {
                /*
                From the legacy code. These are all of the fields of registration_status, and what they mean
                ```jsx
                const displayStatuses = {
                    'unregistered': 'Not registered',
                    'registered': 'Application submitted',
                    'rejected': 'Application submitted',
                    'checked-in': 'Checked in!',
                    'confirmation': 'Accepted! Please RSVP',
                    'coming': 'Attending',
                    'not-coming': 'Not Attending',
                    'confirmed': 'Attendance confirmed!',
                    'waitlist': 'Application submitted'
                };
                ```
                */
                request({
                    method: "POST",
                    uri: ENDPOINTS.signup,
                    body: {
                        email: email,
                        password: password,
                        registration_status: "unregistered" //"waitlist" is one of them
                    },
                    json: true
                }, (error, response, body) => {
                    if (error) {
                        callback("An error occured when attempting signup. Failed at 1/2");
                    } else {
                        console.log(body);
                        if (body.statusCode === 400) {
                            callback("User with email " + email + " already exists")
                        } else if (body.statusCode === 200) {
                            // Set the first and last name
                            let data = JSON.parse(body.body);
                            let token = data.auth.token;
                            let valid_until = data.auth.valid_until;
                            request({
                                "method": "POST",
                                uri: ENDPOINTS.update,
                                body: {
                                    updates: {
                                        "$set": {
                                            "first_name": firstname,
                                            "last_name": lastname
                                        }
                                    },
                                    user_email: email,
                                    auth_email: email,
                                    auth: token
                                },
                                json: true
                            }, (error, response, body) => {
                                if (error) {
                                    callback("An error occured when attempting signup. Failed at 2/2")
                                } else {
                                    if (body.statusCode === 200) {
                                        this._login(email, token, valid_until);
                                        callback();
                                    } else {
                                        callback((body.body) ? (body.body) : ("Unexpected Error"));
                                    }
                                }
                            });
                        } else {
                            callback((body.body) ? (body.body) : ("Unexpected Error"));
                        }
                    }
                });
            }
        }
    }
    _login(email, token, valid_until) {
        cookie.save("token", token);
        cookie.save("email", email);
        cookie.save("valid_until", valid_until);
        this.isLoggedIn = true;
        this._token = token;
        this._email = email;
        this._valid_until = Date.parse(valid_until);
    }
    Logout() {
        cookie.remove("token");
        cookie.remove("email");
        cookie.remove("valid_until");
        cookie.remove("magic");
        this._token = null;
        this._email = null;
        this._valid_until = null;
        this.isLoggedIn = false;
    }
    Get(callback) {
        if (this.isLoggedIn) {
            request({
                method: "POST",
                uri: ENDPOINTS.userData,
                body: {
                    email: this._email,
                    token: this._token,
                    query: {
                        email: this._email
                    }
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    callback("An error occured retrieving data", null)
                } else {
                    if (body.statusCode === 200) {
                        callback(null, body.body[0]);
                    } else {
                        callback((body.body) ? (body.body) : ("Unexpected Error"), null);
                    }
                }
            });
        } else {
            callback("Please log in", null);
        }
    }
    Set(data, callback) {
        if (this.isLoggedIn) {
            request({
                "method": "POST",
                uri: ENDPOINTS.update,
                body: {
                    updates: {
                        "$set": data
                    },
                    user_email: this._email,
                    auth_email: this._email,
                    auth: this._token
                },
                json: true
            }, (error, response, body) => {
                console.log(body);
                if (error) {
                    callback("An error occured when attempting to update data")
                } else {
                    if (body.statusCode === 200) {
                        callback();
                    } else {
                        callback((body.body) ? (body.body) : ("Unexpected Error"));
                    }
                }
            });
        } else {
            callback("Please log in");
        }
    }
    Forgot(email, callback) {
        if (this.isLoggedIn) {
            callback("User is already logged in");
        } else {
            if (!email) {
                callback("Invalid email");
            } else {
                request({
                    method: "POST",
                    uri: ENDPOINTS.forgot,
                    body: {
                        email: email,
                        forgot: true
                    },
                    json: true
                }, (error, response, body) => {
                    if (error) {
                        callback("An error occured when attempting to general url");
                    } else {
                        if (body.statusCode === 200) {
                            callback();
                        } else {
                            callback((body.body) ? (body.body) : ("Unexpected Error"));
                            if (body.errorMessage) {
                                console.error(body.errorMessage);
                            }
                        }
                    }
                });
            }
        }
    }
    Reset(email, password, conpassword, magic, callback) {
        if (!password) {
            callback("Input a new password");
        } else if (!conpassword) {
            callback("Confirm your new password");
        } else if (password !== conpassword) {
            callback("Passwords don't match!")
        } else {
            request({
                method: "POST",
                uri: ENDPOINTS.resetpassword,
                body: {
                    email: email,
                    forgot: true,
                    password: password,
                    link: magic
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    callback("An error occured when attempting to reset password");
                } else {
                    if (body.errorMessage) {
                        callback(body.errorMessage);
                    } else if (body.statusCode === 200) {
                        callback();
                    } else {
                        callback((body.body) ? (body.body) : ("Unexpected Error"));
                    }
                }
            });
        }
    }
    Eat(magic, callback) {
        if (!magic) {
            callback("Input a valid magic link");
        } else if (!this.isLoggedIn) {
            callback("User needs to be logged in");
        } else {
            request({
                method: "POST",
                uri: ENDPOINTS.magic,
                body: {
                    email: this._email,
                    link: magic,
                    token: this._token
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    callback("An error occured while digesting the magic link");
                } else {
                    if (body.errorMessage) {
                        callback(body.errorMessage);
                    } else if (body.statusCode === 200) {
                        callback();
                    } else {
                        callback((body.body) ? (body.body) : ("Unexpected Error"));
                    }
                }
            });
        }
    }
    ClearMagic() {
        cookie.remove("magic", { path: "/" });
    }
    SetMagic(magic) {
        cookie.save("magic", magic, { path: "/" });
    }
    GetMagic() {
        return cookie.load("magic", { path: "/" });
    }
    
}

export { Profile, ENDPOINTS };