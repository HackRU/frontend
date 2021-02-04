import request from "request";
import { defaults } from "../Defaults";
import PropTypes from "prop-types";

/**
 * Configure the all of the urls that we will need to access the rest api
 */
const BASE =
    process.env.REACT_APP_MODE && process.env.REACT_APP_MODE === "development"
        ? defaults.rest.dev
        : defaults.rest.prod;
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
    login: BASE + "/authorize",
    /**
     * Default signup url, expects
     */
    signup: BASE + "/create",
    /**
     * Default logout url, expects
     */
    logout: "< IMPLEMENT ME >",
    /**
     * Default user url, expects
     */
    userData: BASE + "/read",
    /**
     * Default user update information, expects
     */
    update: BASE + "/update",
    /**
     * Create forgot magic link to reset password
     */
    forgot: BASE + "/createmagiclink",
    /**
     * Reset password from magic link to reset password
     */
    resetpassword: BASE + "/consume",
    /**
     * Digest magic links
     */
    magic: BASE + "/consume",
    /**
     * Day of event schedule
     */
    schedule: BASE + "/dayof-events",
    /**
     * Day of slack
     */
    slack: BASE + "/dayof-slack",
    /*
     * Get QR codes
     */
    qr: BASE + "/qr",
    resume: BASE + "/resume",
    waiver: BASE + "/waiver",
    sendmagic: BASE + "/createmagiclink"
};
/**
 * TeamRU Base URL
 */
const TEAMRU_BASE = 
    process.env.REACT_APP_MODE && process.env.REACT_APP_MODE === "development"
        ? defaults.rest.teamru
        : defaults.rest.teamruprod;

const TEAMRU_ENDPOINTS = {
    users: TEAMRU_BASE + "/users",

    profile: TEAMRU_BASE + "/users/profile",

    teams: TEAMRU_BASE + "/teams",

    update: TEAMRU_BASE + "/teams/team_id",

    invite: TEAMRU_BASE + "/teams/team_id/invite",

    confirm: TEAMRU_BASE + "/teams/team_id/confirm",

    rescind: TEAMRU_BASE + "/teams/team_id/rescind",

    reject: TEAMRU_BASE + "/teams/team_id/reject",

    complete: TEAMRU_BASE + "/teams/team_id/complete",

    leave: TEAMRU_BASE + "/teams/team_id/leave",

    matches: TEAMRU_BASE + "/matches/team_id",
};
/**
 * Standard profile handler for the entire application
 */
class Profile {
    constructor() {
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
        this.SignUp = this.SignUp.bind(this);
        this._login = this._login.bind(this);
        this.Get = this.Get.bind(this);
        this.Set = this.Set.bind(this);
        this.GetUser = this.GetUser.bind(this);
        this.SetUser = this.SetUser.bind(this);
        this.SendMagic = this.SendMagic.bind(this);
        this._token = localStorage.getItem("token");
        this._email = localStorage.getItem("email");
        this._valid_until = localStorage.getItem("valid_until");
        if (
            this._token &&
            this._email &&
            this._valid_until &&
            this._valid_until > Date.now()
        ) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }
    /* Parses the JWT token to get the data */
    parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function(c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }

    async Login(email, password) {

        let resp = {
            error: "",
            response: ""
        };

        if (this.isLoggedIn) {
            resp.error = "User is already logged in";
            return resp;
        } else {
            if (!email) {
                resp.error = "Invalid email";
                return resp;
            } else if (!password) {
                resp.error = "Invalid password";
                return resp;
            } else {
                await fetch(ENDPOINTS.login, {
                    method: "POST",
                    body: {
                        email: email,
                        password: password
                    },
                    json: true
                })
                .then(async res => {
                    if (body.statusCode === 403) {
                        resp.error = "Invalid email or password";
                        return resp;
                    } else if (body.statusCode === 200) {
                        let data = body.body;
                        let token = data.token;
                        // Convert seconds to milliseconds
                        let valid_until =
                            this.parseJwt(token).exp * 1000;
                        this._login(email, token, valid_until);
                        if (defaults.autocheckin && defaults.dayof) {
                            // Auto checkin the user
                            this.Set(
                                {
                                    "check-in-after": true
                                }
                            );
                        }
                        // } else {
                        //     callback();
                        // }
                    } else {
                        if (body.body) {
                            return body.body;
                        } else {
                            resp.error = "Unexpected Error";
                            return error;
                        }
                    }
                })
                .catch(error => {
                    resp.error = "An error occured when attempting login";
                    return resp;
                })
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
                request(
                    {
                        method: "POST",
                        uri: ENDPOINTS.signup,
                        body: {
                            email: email,
                            password: password,
                            registration_status: "unregistered" //"waitlist" is one of them
                        },
                        json: true
                    },
                    (error, response, body) => {
                        if (error) {
                            callback(
                                "An error occured when attempting signup. Failed at 1/2"
                            );
                        } else {
                            if (body.statusCode === 400) {
                                callback(
                                    "User with email " +
                                        email +
                                        " already exists"
                                );
                            } else if (body.statusCode === 200) {
                                // Set the first and last name
                                let data = body.body;
                                let token = data.token;
                                let valid_until =
                                    this.parseJwt(token).exp * 1000;
                                request(
                                    {
                                        method: "POST",
                                        uri: ENDPOINTS.update,
                                        body: {
                                            updates: {
                                                $set: {
                                                    first_name: firstname,
                                                    last_name: lastname
                                                }
                                            },
                                            user_email: email,
                                            auth_email: email,
                                            token: token
                                        },
                                        json: true
                                    },
                                    (error, response, body) => {
                                        if (error) {
                                            callback(
                                                "An error occured when attempting signup. Failed at 2/2"
                                            );
                                        } else {
                                            if (body.statusCode === 200) {
                                                this._login(
                                                    email,
                                                    token,
                                                    valid_until
                                                );
                                                /**
                                                 * Create new TeamRU user on signup
                                                 */
                                                if (defaults.teamru_user)
                                                    this.newUser({
                                                        bio: firstname
                                                    });
                                                callback();
                                            } else {
                                                callback(
                                                    body.body
                                                        ? body.body
                                                        : "Unexpected Error"
                                                );
                                            }
                                        }
                                    }
                                );
                            } else {
                                callback(
                                    body.body ? body.body : "Unexpected Error"
                                );
                            }
                        }
                    }
                );
            }
        }
    }
    _login(email, token, valid_until) {
        email = email.toLowerCase();
        localStorage.setItem("valid_until", valid_until);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        this.isLoggedIn = true;
        this._token = token;
        this._email = email;
        this._valid_until = valid_until;
    }
    Logout() {
        localStorage.removeItem("magic");
        localStorage.removeItem("valid_until");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        this._token = null;
        this._email = null;
        this._valid_until = null;
        this.isLoggedIn = false;
    }
    GetUser(callback, email) {
        if (this.isLoggedIn) {
            request(
                {
                    method: "POST",
                    uri: ENDPOINTS.userData,
                    body: {
                        email: this._email,
                        token: this._token,
                        query: {
                            email: email
                        }
                    },
                    json: true
                },
                (error, response, body) => {
                    if (error) {
                        callback("An error occured retrieving data", null);
                    } else {
                        if (body.statusCode === 200) {
                            callback(null, body.body[0]);
                            if (email === this._email) {
                                this._registration_status =
                                    body.body[0].registration_status;
                                this._want_team = body.body[0].want_team;
                            }
                        } else {
                            callback(
                                body.body ? body.body : "Unexpected Error",
                                null
                            );
                        }
                    }
                }
            );
        } else {
            callback("Please log in", null);
        }
    }
    Get(callback) {
        this.GetUser(callback, this._email);
    }
    SetUser(data, user) {
        // console.log(JSON.stringify({
        //     updates: {
        //         $set: data
        //     },
        //     user_email: user,
        //     auth_email: this._email,
        //     token: this._token
        // }));

        let resp = {
            error: "",
            response: "",
        };

        if (this.isLoggedIn) {
            await fetch(ENDPOINTS.login, {
                method: "POST",
                body: {
                    updates: {
                        $set: data
                    },
                    user_email: user,
                    auth_email: this._email,
                    token: this._token
                },
                json: true
            })
            .then(async res =>  {
                if (error) {
                    resp.error = "An error occured when attempting to update data";
                    return resp;
                } else {
                    if (body.statusCode === 200) {
                        return resp;
                        // ?
                        // callback();
                    } else {
                        if (body.body) {
                            return body.body;
                        } else {
                            resp.error = "Unexpected Error";
                            return resp;
                        }
                    }
                }
            })
            .catch(error => {
                resp.error = "Please log in";
                return resp;
            })
        }
    }
    async Set(data) {
        this.SetUser(data, this._email);
    }
    Forgot(email, callback) {
        if (this.isLoggedIn) {
            callback("User is already logged in");
        } else {
            if (!email) {
                callback("Invalid email");
            } else {
                request(
                    {
                        method: "POST",
                        uri: ENDPOINTS.forgot,
                        body: {
                            email: email,
                            forgot: true
                        },
                        json: true
                    },
                    (error, response, body) => {
                        if (error) {
                            callback(
                                "An error occured when attempting to general url"
                            );
                        } else {
                            if (body.statusCode === 200) {
                                callback();
                            } else {
                                callback(
                                    body.body ? body.body : "Unexpected Error"
                                );
                                if (body.errorMessage) {
                                    console.error(body.errorMessage);
                                }
                            }
                        }
                    }
                );
            }
        }
    }
    Reset(email, password, conpassword, magic, callback) {
        if (!password) {
            callback("Input a new password");
        } else if (!conpassword) {
            callback("Confirm your new password");
        } else if (password !== conpassword) {
            callback("Passwords don't match!");
        } else {
            request(
                {
                    method: "POST",
                    uri: ENDPOINTS.resetpassword,
                    body: {
                        email: email,
                        forgot: true,
                        password: password,
                        link: magic
                    },
                    json: true
                },
                (error, response, body) => {
                    if (error) {
                        callback(
                            "An error occured when attempting to reset password"
                        );
                    } else {
                        if (body.errorMessage) {
                            callback(body.errorMessage);
                        } else if (body.statusCode === 200) {
                            callback();
                        } else {
                            callback(
                                body.body ? body.body : "Unexpected Error"
                            );
                        }
                    }
                }
            );
        }
    }
    Eat(magic, callback) {
        if (!magic) {
            callback("Input a valid magic link");
        } else if (!this.isLoggedIn) {
            callback("User needs to be logged in");
        } else {
            request(
                {
                    method: "POST",
                    uri: ENDPOINTS.magic,
                    body: {
                        email: this._email,
                        link: magic,
                        token: this._token
                    },
                    json: true
                },
                (error, response, body) => {
                    if (error) {
                        callback(
                            "An error occured while digesting the magic link"
                        );
                    } else {
                        if (body.errorMessage) {
                            callback(body.errorMessage);
                        } else if (body.statusCode === 200) {
                            callback();
                        } else {
                            callback(
                                body.body ? body.body : "Unexpected Error"
                            );
                        }
                    }
                }
            );
        }
    }
    SendMagic(emails, permissions, callback) {
        if (!emails) {
            callback("Input a valid email list");
        } else if (!this.isLoggedIn) {
            callback("User needs to be logged in");
        } else {
            request(
                {
                    method: "POST",
                    uri: ENDPOINTS.sendmagic,
                    body: {
                        email: this._email,
                        token: this._token,
                        emailsTo: emails,
                        permissions: permissions,
                        numLinks: emails.length
                    },
                    json: true
                },
                (error, response, body) => {
                    if (error) {
                        callback(
                            "An error occured while sending the magic links"
                        );
                    } else {
                        if (body.errorMessage) {
                            callback(body.errorMessage);
                        } else if (body.statusCode === 200) {
                            callback();
                        } else {
                            callback(
                                body.body ? body.body : "Unexpected Error"
                            );
                        }
                    }
                }
            );
        }
    }
    ClearMagic() {
        localStorage.removeItem("magic");
    }
    SetMagic(magic) {
        localStorage.setItem("magic", magic);
    }
    GetMagic() {
        return localStorage.getItem("magic");
    }
    GetQR(callback) {
        request(
            {
                method: "POST",
                uri: ENDPOINTS.qr,
                body: {
                    email: this._email,
                    background: [0xff, 0xff, 0xff],
                    color: [0x00, 0x00, 0x00],
                    transparentBackground: true
                },
                json: true
            },
            (error, response, body) => {
                callback(error, body);
            }
        );
    }
    async GetResumeInfo() {
        const json = await fetch(ENDPOINTS.resume, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: this._email,
                token: this._token
            })
        }).then(res => res.json());
        return json.body;
    }
    async DoesResumeExist() {
        const info = await this.GetResumeInfo();
        return info.exists;
    }
    async UploadResume(file) {
        const info = await this.GetResumeInfo();
        return await fetch(info.upload, {
            method: "PUT",
            headers: {
                "content-type": "application/pdf"
            },
            body: file
        });
    }
    async GetWaiverInfo() {
        const json = await fetch(ENDPOINTS.waiver, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: this._email,
                token: this._token
            })
        }).then(res => res.json());
        return json.body;
    }
    async DoesWaiverExist() {
        const info = await this.GetWaiverInfo();
        return info.exists;
    }
    async UploadWaiver(file) {
        const info = await this.GetWaiverInfo();
        return await fetch(info.upload, {
            method: "PUT",
            headers: {
                "content-type": "application/pdf"
            },
            body: file
        });
    }

    /**
     * TeamRU API Calls
     */
    async getTeamUser() {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(TEAMRU_ENDPOINTS.profile, {
            method: "GET",
            headers: {
                token: this._token
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 404) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async newUser(user) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(TEAMRU_ENDPOINTS.users, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: this._token
            },
            body: JSON.stringify(user)
        })
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 400) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async updateUser(user) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(TEAMRU_ENDPOINTS.profile, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: this._token
            },
            body: JSON.stringify(user)
        })
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 404) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async newTeam(team) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(TEAMRU_ENDPOINTS.teams, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: this._token
            },
            body: JSON.stringify(team)
        })
            .then(async res => {
                if (res.status === 201) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 400) resp.error = await res.json();
                    if (res.status === 404) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async getAllTeams(offset, limit) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(
            TEAMRU_ENDPOINTS.teams + "?limit=" + limit + "&offset=" + offset,
            {
                method: "GET",
                headers: {
                    token: this._token
                }
            }
        )
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 400) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async getTeam(team_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(TEAMRU_ENDPOINTS.update.replace("team_id", team_id), {
            method: "GET",
            headers: {
                token: this._token
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 400) resp.error = await res.json();
                    if (res.status === 403) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });
        return resp;
    }

    async updateTeam(team, team_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(TEAMRU_ENDPOINTS.update.replace("team_id", team_id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: this._token
            },
            body: JSON.stringify(team)
        })
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 403) resp.error = await res.json();
                    if (res.status === 404) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async completeTeam(team_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(
            TEAMRU_ENDPOINTS.complete.replace("team_id", team_id),
            {
                method: "PUT",
                headers: {
                    token: this._token
                }
            }
        )
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 400) resp.error = await res.json();
                    if (res.status === 403) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async leaveTeam(team_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(
            TEAMRU_ENDPOINTS.leave.replace("team_id", team_id),
            {
                method: "PUT",
                headers: {
                    token: this._token
                }
            }
        )
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 400) resp.error = await res.json();
                    if (res.status === 403) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async inviteTeam(team_id, invite_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(
            TEAMRU_ENDPOINTS.invite.replace("team_id", team_id),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: this._token
                },
                body: JSON.stringify({
                    team2_id: invite_id
                })
            }
        )
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 403) resp.error = await res.json();
                    if (res.status === 404) resp.error = await res.json();
                    if (res.status === 409) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async confirmInvite(team_id, invite_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(
            TEAMRU_ENDPOINTS.confirm.replace("team_id", team_id),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: this._token
                },
                body: JSON.stringify({
                    team2_id: invite_id
                })
            }
        )
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 403) resp.error = await res.json();
                    if (res.status === 404) resp.error = await res.json();
                    if (res.status === 409) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async rescindInvite(team_id, invite_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(
            TEAMRU_ENDPOINTS.rescind.replace("team_id", team_id),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: this._token
                },
                body: JSON.stringify({
                    team2_id: invite_id
                })
            }
        )
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 403) resp.error = await res.json();
                    if (res.status === 404) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async rejectInvite(team_id, invite_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(
            TEAMRU_ENDPOINTS.reject.replace("team_id", team_id),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: this._token
                },
                body: JSON.stringify({
                    team2_id: invite_id
                })
            }
        )
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    if (res.status === 403) resp.error = await res.json();
                    if (res.status === 404) resp.error = await res.json();
                    else resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }

    async matches(team_id) {
        let resp = {
            error: "",
            response: ""
        };
        await fetch(TEAMRU_ENDPOINTS.matches.replace("team_id", team_id), {
            method: "GET",
            headers: {
                token: this._token
            }
        })
            .then(async res => {
                if (res.status === 200) {
                    resp.response = await res.json();
                } else {
                    resp.error = await res.text();
                }
            })
            .catch(error => {
                resp.error = error;
            });

        return resp;
    }
}

const ProfileType = PropTypes.shape({
    Login: PropTypes.func,
    Logout: PropTypes.func,
    SignUp: PropTypes.func,
    _login: PropTypes.func,
    _token: PropTypes.string,
    _email: PropTypes.string,
    _valid_until: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    DoesResumeExist: PropTypes.func,
    UploadResume: PropTypes.func
});

export { Profile, ProfileType, ENDPOINTS };
