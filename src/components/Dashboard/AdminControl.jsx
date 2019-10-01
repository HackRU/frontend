import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Col, Button, Table, Alert } from "reactstrap";
import Section from "./Section";
import { theme } from "../../Defaults";
import { PulseLoader } from "react-spinners";
import Toggle from "react-toggle";
class AdminControl extends Component {
    state = {
        updateUser: null,
        loading: false,
        msg: null
    }
    render() {
        let loading = null;
        let alert = null;
        if (this.state.loading) {
            loading = <div style={{ width: "100%", textAlign: "center" }}><PulseLoader /></div>
        }
        if (this.state.msg) {
            alert = <Alert color="danger">{this.state.msg}</Alert>
        }
        return [               
            <div style={{ width: "100%", textAlign: "left" }}>
                <p className="lead">Admin Tools</p>
            </div>,
            <Section className="mb-5"
                title="Magic"
                subtitle="Send out magic links for directors, organizers, and volunteers">
                HAI
            </Section>,
            <Section className="mb-5"
                title="Privileging"
                subtitle="Promote and demote users based on their role">
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    // Fetch inputted user details
                    let value = document.getElementById("ADMINuserEmail").value;
                    this.setState({
                        loading: true,
                        msg: null
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
                            <Input id="ADMINuserEmail" placeholder="someemail@gmail.com" />
                        </Col>
                    </FormGroup>
                    <div style={{ width: "100%" }} align="right">
                        <Button style={{ backgroundColor: theme.accent[0] }} type="submit" >Fetch</Button>
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
                    })
                    this.props.profile.Set(obj, (err) => {
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
                                        <th><Toggle disabled={!this.state.updateUser} checked={(this.state.updateUser) ? (this.state.updateUser.volunteer) : (false)} onChange={(e) => { let updateUser = this.state.updateUser; updateUser.volunteer = e.target.checked; this.setState({ updateUser }); }} /></th>
                                    </tr>
                                    <tr>
                                        <th>Judge</th>
                                        <th><Toggle disabled={!this.state.updateUser} checked={(this.state.updateUser) ? (this.state.updateUser.judge) : (false)} onChange={(e) => { let updateUser = this.state.updateUser; updateUser.judge = e.target.checked; this.setState({ updateUser }); }}/></th>
                                    </tr>
                                    <tr>
                                        <th>Sponsor</th>
                                        <th><Toggle disabled={!this.state.updateUser} checked={(this.state.updateUser) ? (this.state.updateUser.sponsor) : (false)} onChange={(e) => { let updateUser = this.state.updateUser; updateUser.sponsor = e.target.checked; this.setState({ updateUser }); }}/></th>
                                    </tr>
                                    <tr>
                                        <th>Mentor</th>
                                        <th><Toggle disabled={!this.state.updateUser} checked={(this.state.updateUser) ? (this.state.updateUser.mentor) : (false)} onChange={(e) => { let updateUser = this.state.updateUser; updateUser.mentor = e.target.checked; this.setState({ updateUser }); }}/></th>
                                    </tr>
                                    <tr>
                                        <th>Organizer</th>
                                        <th><Toggle disabled={!this.state.updateUser} checked={(this.state.updateUser) ? (this.state.updateUser.organizer) : (false)} onChange={(e) => { let updateUser = this.state.updateUser; updateUser.organizer = e.target.checked; this.setState({ updateUser }); }}/></th>
                                    </tr>
                                    <tr>
                                        <th>Director</th>
                                        <th><Toggle disabled={!this.state.updateUser} checked={(this.state.updateUser) ? (this.state.updateUser.director) : (false)} onChange={(e) => { let updateUser = this.state.updateUser; updateUser.director = e.target.checked; this.setState({ updateUser }); }}/></th>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </FormGroup>
                    <div style={{ width: "100%" }} align="right">
                        <Button style={{ backgroundColor: theme.accent[0] }} type="submit" disabled={!this.state.updateUser}>Update</Button>
                    </div>
                </Form>
                {loading}
            </Section>
        ]
    }
}
export default AdminControl;