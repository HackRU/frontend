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
}
/**
 * Standard profile handler for the entire application
 */
class Profile {
    constructor() {
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
        this.SignUp = this.SignUp.bind(this);
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
                    } else {
                        callback();
                    }
                }
            });
        }
    }
    SignUp(email, password) {

    }
    Logout() {

    }
}
/***************************************************************PROFILE***************************************************************/

/***************************************************************EXPORTS***************************************************************/
export { Profile };
/***************************************************************EXPORTS***************************************************************/