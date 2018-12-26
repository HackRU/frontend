/**
 * @author Shivan Modha
 * @description User Profile Handler with Server Side Interaction
 * @version 0.0.1
 * Created 12/26/18
 */
/***************************************************************IMPORTS***************************************************************/
import cookie from "react-cookies";
import request from "request";
/***************************************************************IMPORTS***************************************************************/

/***************************************************************PROFILE***************************************************************/
/**
 * Configure the all of the urls that we will need to access the rest api
 */
const BASE = (process.env.NODE_ENV && process.env.NODE_ENV === "development") ? ("https://7c5l6v7ip3.execute-api.us-west-2.amazonaws.com/lcs-test") : ("https://m7cwj1fy7c.execute-api.us-west-2.amazonaws.com/mlhtest");
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
    "getUserData": BASE + "/read",
    /**
     * Default user update information, expects
     */
    "update": BASE + "/update"
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
        this._token = cookie.load("token");
        this._email = cookie.load("email");
        this._valid_until = Date.parse(cookie.load("valid_until"));
        if (this._token && this._email && this._valid_until && this._valid_until > Date.now()) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
        console.log(cookie.loadAll());
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
                            callback(body.body);
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
                callback("invalid first name");
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
                request({
                    method: "POST",
                    uri: ENDPOINTS.signup,
                    body: {
                        email: email,
                        password: password,
                        registration_status: "<< IDK WHAT THE REGISTRATION STATUS ENUMS ARE >>" //"waitlist" is one of them
                    },
                    json: true
                }, (error, response, body) => {
                    if (error) {
                        callback("An error occured when attempting signup");
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
                                    console.error(error);
                                } else {
                                    if (body.statusCode === 200) {
                                        this._login(email, token, valid_until);
                                        callback();
                                    } else {
                                        callback(body.body);
                                    }
                                }
                            });
                        } else {
                            callback(body.body);
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
        this._token = null;
        this._email = null;
        this._valid_until = null;
        this.isLoggedIn = false;
    }
    Get(callback) {
        if (this.isLoggedIn) {

        } else {
            callback("Please log in");
        }
    }
    Set(data, callback) {

    }
}
/***************************************************************PROFILE***************************************************************/

/***************************************************************EXPORTS***************************************************************/
export { Profile };
/***************************************************************EXPORTS***************************************************************/