import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button, Table, Alert, InputGroup, InputGroupAddon } from "reactstrap";
import Section from "./Section";
import { theme } from "../../Defaults";
import { PulseLoader } from "react-spinners";
import Toggle from "react-toggle";
import { Icon } from "react-fa";
import PropTypes from "prop-types";
class AdminControl extends Component {
    state = {
        updateUser: null,
        loading: false,
        loading2: false,
        msg: null,
        msg2: ["success", null],
        users: [""]
    }
    render() {
        let loading = null;
        let loading2 = null;
        let alert = null;
        if (this.state.loading) {
            loading = <div style={{ width: "100%", textAlign: "center" }}><PulseLoader /></div>;
        }
        if (this.state.loading2) {
            loading2 = <div style={{ width: "100%", textAlign: "center" }}><PulseLoader /></div>;
        }
        if (this.state.msg) {
            alert = <Alert color="danger">{this.state.msg}</Alert>;
        }
        let users = [];
        for (let i = 0; i < this.state.users.length; i++) {
            users.push(
                <div>
                    <InputGroup style={{ marginBottom: 10 }}>
                        <Input required
                            type="email"
                            id={`userbox-${i}`}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    e.preventDefault();
                                    let { users } = this.state;
                                    users.push("");
                                    this.setState({ users }, () => {
                                        document.getElementById(`userbox-${this.state.users.length - 1}`).focus();
                                    });
                                }
                            }}
                            onChange={(e) => {
                                let { users: susers } = this.state;
                                susers[i] = e.target.value;
                                let POINTER = null;
                                if (e.target.value.endsWith(",")) {
                                    susers[i] = e.target.value.substring(0, e.target.value.length - 1);
                                    susers.push("");
                                    POINTER = 1;
                                    e.preventDefault();
                                }
                                this.setState({ users: susers }, () => {
                                    if (POINTER) {
                                        document.getElementById(`userbox-${this.state.users.length - 1}`).focus();
                                    }
                                });
                            }}
                            placeholder="someemail@gmail.com"
                            value={this.state.users[i]} />
                        <InputGroupAddon addonType="append">
                            <Button disabled={this.state.users.length === 1}
                                color="danger"
                                onClick={() => {
                                    if (this.state.users.length !== 1) {
                                        let { users } = this.state;
                                        users.splice(i, 1);
                                        this.setState({users});
                                    }
                                }} ><Icon name="minus" /></Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            );
        }
        let error2 = null;
        if (this.state.msg2[1]) {
            error2 = <Alert color={this.state.msg2[0]}>{this.state.msg2[1]}</Alert>;
        }
        return (
            <div>
                <div style={{ width: "100%", textAlign: "left" }}>
                    <p className="lead">Admin Tools</p>
                </div>
                <Section className="mb-5"
                    title="Bulk Role Editor"
                    subtitle="Send out magic links or promote a bunch of users">
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        let checks = {
                            "role.volunteer": document.getElementById("checkbox-volunteer").checked,
                            "role.judge": document.getElementById("checkbox-judge").checked,
                            "role.sponsor": document.getElementById("checkbox-sponsor").checked,
                            "role.mentor": document.getElementById("checkbox-mentor").checked,
                            "role.organizer": document.getElementById("checkbox-organizer").checked,
                            "role.director": document.getElementById("checkbox-director").checked
                        };
                        let strChecks = [];
                        let keys = Object.keys(checks);
                        for (let i = 0; i < keys.length; i++) {
                            if (checks[keys[i]]) {
                                strChecks.push(keys[i].replace("role.", ""));
                            }
                        }
                        this.setState({
                            msg2: ["", null],
                            loading2: true
                        });
                        if (document.getElementById("checkbox-magical").checked) {
                            // Send out a magic link
                            this.props.profile.SendMagic(this.state.users, strChecks, (error) => {
                                if (error) {
                                    console.error(error);
                                    this.setState({
                                        msg2: ["danger", "Failed to send out links: " + error],
                                        loading2: false
                                    });
                                } else {
                                    this.setState({
                                        msg2: ["success", "Links sent out"],
                                        loading2: false
                                    });
                                }
                            });
                        } else {
                            // Bulk promote
                            let looper = (i) => {
                                if (i < this.state.users.length) {
                                    this.props.profile.SetUser(checks, this.state.users[i], () => {
                                        looper(i + 1);
                                    });
                                } else {
                                    this.setState({
                                        loading2: false,
                                        msg2: ["success", "Bulk role change success"]
                                    });
                                }
                            };
                            looper(0);
                        }
                    }}>
                        {error2}
                        <h4>Who</h4>
                        <div id="user-container">{users}</div>
                        <div style={{ width: "100%", textAlign: "right" }}>
                            <Button color="success"
                                onClick={() => { let { users } = this.state; users.push(""); this.setState({ users }); }}><Icon name="plus" /></Button>
                        </div>
                        <h4>Edit Roles</h4>
                        <FormGroup row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Role</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Volunteer</th>
                                            <th><Toggle id="checkbox-volunteer" /></th>
                                        </tr>
                                        <tr>
                                            <th>Judge</th>
                                            <th><Toggle id="checkbox-judge" /></th>
                                        </tr>
                                        <tr>
                                            <th>Sponsor</th>
                                            <th><Toggle id="checkbox-sponsor" /></th>
                                        </tr>
                                        <tr>
                                            <th>Mentor</th>
                                            <th><Toggle id="checkbox-mentor" /></th>
                                        </tr>
                                        <tr>
                                            <th>Organizer</th>
                                            <th><Toggle id="checkbox-organizer" /></th>
                                        </tr>
                                        <tr>
                                            <th>Director</th>
                                            <th><Toggle id="checkbox-director" /></th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </FormGroup>
                        <h4>Type</h4>
                        <FormGroup row>
                            <Col>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <th>Send a magic link?</th>
                                            <th><Toggle id="checkbox-magical" /></th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </FormGroup>
                        <div style={{ width: "100%" }}
                            align="right">
                            <Button style={{ backgroundColor: theme.accent[0] }}
                                type="submit">Send</Button>
                        </div>
                        {loading2}
                    </Form>
                </Section>
                <Section className="mb-5"
                    title="Privileging"
                    subtitle="Promote and demote users based on their role">
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        // Fetch inputted user details
                        let value = document.getElementById("ADMINuserEmail").value;
                        this.setState({
                            loading: true,
                            msg: null,
                            email: value
                        });
                        this.props.profile.GetUser((msg, data) => {
                            if (msg) {
                                console.error(msg);
                            } else {
                                if (data) {
                                    this.setState({
                                        updateUser: data.role,
                                        loading: false
                                    });
                                } else {
                                    this.setState({
                                        loading: false,
                                        msg: "No user found",
                                        updateUser: null
                                    });
                                }
                            }
                        }, value);
                    }}>
                        {alert}
                        <h4>Whose permissions are you editing?</h4>
                        <FormGroup row>
                            <Col>
                                <Label>User Email</Label>
                                <Input id="ADMINuserEmail"
                                    placeholder="someemail@gmail.com" />
                            </Col>
                        </FormGroup>
                        <div style={{ width: "100%" }}
                            align="right">
                            <Button style={{ backgroundColor: theme.accent[0] }}
                                type="submit" >Fetch</Button>
                        </div>
                    </Form>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        this.setState({
                            loading: true
                        });
                        let obj = {};
                        Object.keys(this.state.updateUser).forEach((key) => {
                            obj["role." + key] = this.state.updateUser[key];
                        });
                        this.props.profile.SetUser(obj, this.state.email, () => {
                            this.setState({
                                loading: false
                            });
                        });
                    }}>
                        <h4>Edit Roles</h4>
                        <FormGroup row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Role</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Volunteer</th>
                                            <th><Toggle disabled={!this.state.updateUser}
                                                checked={(this.state.updateUser) ? (this.state.updateUser.volunteer) : (false)}
                                                onChange={(e) => { let updateUser = this.state.updateUser; updateUser.volunteer = e.target.checked; this.setState({ updateUser }); }} /></th>
                                        </tr>
                                        <tr>
                                            <th>Judge</th>
                                            <th><Toggle disabled={!this.state.updateUser}
                                                checked={(this.state.updateUser) ? (this.state.updateUser.judge) : (false)}
                                                onChange={(e) => { let updateUser = this.state.updateUser; updateUser.judge = e.target.checked; this.setState({ updateUser }); }}/></th>
                                        </tr>
                                        <tr>
                                            <th>Sponsor</th>
                                            <th><Toggle disabled={!this.state.updateUser}
                                                checked={(this.state.updateUser) ? (this.state.updateUser.sponsor) : (false)}
                                                onChange={(e) => { let updateUser = this.state.updateUser; updateUser.sponsor = e.target.checked; this.setState({ updateUser }); }}/></th>
                                        </tr>
                                        <tr>
                                            <th>Mentor</th>
                                            <th><Toggle disabled={!this.state.updateUser}
                                                checked={(this.state.updateUser) ? (this.state.updateUser.mentor) : (false)}
                                                onChange={(e) => { let updateUser = this.state.updateUser; updateUser.mentor = e.target.checked; this.setState({ updateUser }); }}/></th>
                                        </tr>
                                        <tr>
                                            <th>Organizer</th>
                                            <th><Toggle disabled={!this.state.updateUser}
                                                checked={(this.state.updateUser) ? (this.state.updateUser.organizer) : (false)}
                                                onChange={(e) => { let updateUser = this.state.updateUser; updateUser.organizer = e.target.checked; this.setState({ updateUser }); }}/></th>
                                        </tr>
                                        <tr>
                                            <th>Director</th>
                                            <th><Toggle disabled={!this.state.updateUser}
                                                checked={(this.state.updateUser) ? (this.state.updateUser.director) : (false)}
                                                onChange={(e) => { let updateUser = this.state.updateUser; updateUser.director = e.target.checked; this.setState({ updateUser }); }}/></th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </FormGroup>
                        <div style={{ width: "100%" }}
                            align="right">
                            <Button style={{ backgroundColor: theme.accent[0] }}
                                type="submit"
                                disabled={!this.state.updateUser}>Update</Button>
                        </div>
                    </Form>
                    {loading}
                </Section>
            </div>
        );
    }
}

AdminControl.propTypes = {
    profile: PropTypes.object,
};

export default AdminControl;
