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
            edit: (this.props.user.registration_status === "unregistered"),
            user: this.props.user,
            checkedState1: (this.props.user.registration_status !== "unregistered"),
            checkedState2: (this.props.user.registration_status !== "unregistered"),
            message: null
        });
    }

    updateUser(user) {
        // console.log(user);
        this.setState({
            user
        });
    }

    checkStatus = async (user) => {
        //console.log(user);

        let waiver_promise = new Promise( (resolve) => {
            resolve(this.props.profile.DoesWaiverExist());
        });

        // console.log("waiting for waiver_promise");
        let check_waiver = await waiver_promise;
       
        if (check_waiver) {
            if (user.hackathon_count !== "" && user.school !== "") {
                // console.log("Succeeded all checks!");
                return true;
            } else {
                // console.log("Failed about and education check");
                return false;
            }
        } else {
            // console.log("failed waiver");
            return false;
        }
        
    }
    

    submitUser = async () => {
        this.setState({
            profileMSG: null,
            loading: true,
        });

        let promise = this.props.profile.Get();
       

        let got_user = await promise;
        // console.log(got_user);

        let status_promise = new Promise((resolve) => {
            resolve(this.checkStatus(got_user));
        });

        
        let validated = await status_promise;
        // console.log(validated);

        if (validated) {
            console.log("All fields valid");
            got_user.registration_status = "registered";
            this.updateUser(got_user);

            let error = await this.props.profile.Set(this.state.user)
                .then(res => {
                    this.setState({
                        profileMSG: null,
                        loading: false,
                    });
                    return res;
                });
                
            if (error) {
                this.setState({
                    message: "An error occured!"
                });
            } else {
                // console.log("User successfully registered");
                this.setState({
                    edit: false,
                    loading: false,
                    profileMSG: { color: "success", value: "Profile Updated!" }
                });
            }

        } else {
            console.log("Not all fields valid!");
            this.setState({
                loading: false,
                profileMSG: { color: "danger", value: "An error occured!" },
            });
            this.setState({ message: null }, () => { this.setState({ message: "Please make sure all required fields are filled out." }); });
        }
    }

    render() {
        // let user = this.state.user;
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
        if (this.state.edit) {
            return (
                <AvForm model={model}
                    onValidSubmit={() => {
                        this.submitUser();
                    }}
                    onInvalidSubmit={() => {
                        this.setState({ message: null }, () => { this.setState({ message: "Some fields are invalid." }); });
                    }}>
                    <AvCheckboxGroup name="mlhnotices"
                        className="custom-av-checkbox"
                        label={<h4>MLH Notices</h4>}
                        required
                        validate={{ required: { value: true, errorMessage: "Please review these MLH guidelines" }, min: { value: 2, errorMessage: "You must select both of these checkboxes" } }}>
                        <AvCheckbox name="mlh1"
                            customInput
                            onChange={() => { this.setState({ checkedState1: !this.state.checkedState1 }); }}
                            label={<p>I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" 
                                rel="noopener noreferrer"
                                target="_blank">MLH Code of Conduct</a></p>}
                            value={"mlh1"} />
                        <AvCheckbox name="mlh2"
                            customInput
                            onChange={() => { this.setState({ checkedState2: !this.state.checkedState2 }); }}
                            label={<p>I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the{" "} 
                                <a href="https://mlh.io/privacy" 
                                    rel="noopener noreferrer"
                                    target="_blank">MLH Privacy Policy</a>. Further, I agree to the terms of both the{" "} 
                                <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md" 
                                    rel="noopener noreferrer"
                                    target="_blank">MLH Contest Terms and Conditions</a> and the{" "} 
                                <a href="https://mlh.io/privacy"
                                    rel="noopener noreferrer"
                                    target="_blank">MLH Privacy Policy</a>.</p>}
                            value={"mlh2"} />
                    </AvCheckboxGroup>
                    <h4>Registration</h4>
                    <p>After filling out all required parts in About and Education, please make sure you have uploaded a filled and signed{" "}
                        <a style={{textDecoration: "underline"}}
                            href="/resources/waiver.pdf"
                            rel="noopener noreferrer"
                            target="_blank" >
                            Waiver
                        </a>{" "}
                    form.</p>
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
                        <p style={{ ...pStyle, height: "100%" }}>
                            I have read and agree to the{" "} 
                            <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                                rel="noopener noreferrer"
                                target="_blank">
                                MLH Code of Conduct
                            </a> and I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the{" "}  
                            <a href="https://mlh.io/privacy"
                                rel="noopener noreferrer"
                                target="_blank">MLH Privacy Policy</a>. Further, I agree to the terms of both the {" "} 
                            <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md"
                                rel="noopener noreferrer"
                                target="_blank">MLH Contest Terms and Conditions</a> 
                            {" "}and the{" "} 
                            <a href="https://mlh.io/privacy"
                                rel="noopener noreferrer"
                                target="_blank">MLH Privacy Policy</a>.</p>
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
