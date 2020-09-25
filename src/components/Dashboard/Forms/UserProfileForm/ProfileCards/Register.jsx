import React, { Component } from "react";
import { FormGroup, Button, UncontrolledAlert } from "reactstrap";
import { AvForm, AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation";
import { theme } from "../../../../../Defaults";
import { ProfileType } from "../../../../Profile";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";

class Register extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.setState({
            user: this.props.user,
            checkedState1: (this.props.user.registration_status !== "unregistered"),
            checkedState2: (this.props.user.registration_status !== "unregistered"),
            message: null
        });
    }
    updateUser(user) {
        console.log(user);
        this.setState({
            user
        });
    }

    checkStatus(user) {
        console.log(user);
        if (user.hackathon_count !== "" && user.school !== "") {
            return true;
        } else { 
            return false;
        }
    }

    submitUser = (user) => {
        this.setState({
            profileMSG: null,
            loading: true,
            user,
        }, () => {

            this.props.profile.Get((msg, data) => {
                if (msg) {
                    console.error(msg);
                } else {
                    if (data) {
                        delete data.auth;
                        if (this.checkStatus(data)){
                            console.log("All fields valid");
                            data.registration_status = "registered";
                            this.updateUser(data);
                            this.props.profile.Set(this.state.user, (err) => {
                                this.setState({
                                    loading: false,
                                    profileMSG: err ?
                                        { color: "danger", value: err } :
                                        { color: "success", value: "Profile Updated!" }
                                });
                            });

                        } else {
                            console.log("Not all fields valid");
                            this.setState({
                                loading: false,
                                profileMSG: { color: "danger", value: "An error occured!" },
                                message: "Please make sure all required fields are filled out."
                            });
                        }
                        
                    }
                }
            });
        });
    }

    render() {
        let user = this.state.user;
        let mlhnotices = [];
        if (this.state.checkedState1) {
            mlhnotices.push("mlh1");
        }
        if (this.state.checkedState2) {
            mlhnotices.push("mlh2");
        }
        let model = { mlhnotices };
        let message = null;
        if (this.state.message) {
            message = (<UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>);
        }
        if (this.state.user.registration_status === "unregistered") {
            return (
                <AvForm model={model}
                    onValidSubmit={() => {
                        this.submitUser(this.state.user);
                    }}
                    onInvalidSubmit={() => {
                        this.setState({ message: null }, () => { this.setState({ message: "Some fields are invalid." }); });
                    }}>
                    <AvCheckboxGroup name="mlhnotices"
                        className="custom-av-checkbox"
                        label={<h4>MLH Notices</h4>}
                        required
                        validate={{ required: { value: true, errorMessag: "Plase review these MLH guidelienes" }, min: { value: 2, errorMessage: "You must select both of these checkboxes" } }}>
                        <AvCheckbox name="mlh1"
                            customInput
                            onChange={() => { this.setState({ checkedState1: !this.state.checkedState1 }); }}
                            label={<p>I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a></p>}
                            value={"mlh1"} />
                        <AvCheckbox name="mlh2"
                            customInput
                            onChange={() => { this.setState({ checkedState2: !this.state.checkedState2 }); }}
                            label={<p>I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. Further, I agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.</p>}
                            value={"mlh2"} />
                    </AvCheckboxGroup>
                    {message}
                    <div style={{ width: "100%" }}
                        align="right">
                        <Button color="success"
                            className="pill-btn"
                            type="submit"> { this.state.loading ?  <PulseLoader color={theme.accent[0]} /> : "Register" } </Button> 
                    </div>
                </AvForm>
            );
        } else {
            let pStyle = {
                color: theme.disabled[0], padding: 5, minHeight: 35
            };
            return (
                <div>
                    <h4>MLH Notices</h4>
                    <FormGroup>
                        {user.registration_status === "registered" ? <p style={{ ...pStyle, height: "100%" }}>I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a> and I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. Further, I agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.</p>
                            : <p style={{...pStyle, color: theme.accent[0] }}>You have not yet agreed to MLH policies. Please fill out your user profile.</p>}
                    </FormGroup>
                    <div style={{ width: "100%" }}
                        align="right">
                        <Button 
                            disabled={true}
                            color="success"
                            className="pill-btn"
                            type="submit"> Registered </Button>
                    </div>
                </div>
            );
        }
    }
}


Register.propTypes = {
    user: {
        registration_status: PropTypes.string,
    },
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    mobile: PropTypes.bool,
    profile: ProfileType,
};

export default Register;
