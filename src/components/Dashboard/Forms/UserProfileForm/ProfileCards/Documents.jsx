import React, { Component } from "react";
import { Button, UncontrolledAlert } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { Icon } from "react-fa";
import ResumeUploader from "../ResumeUploader";
import WaiverUploader from "../WaiverUploader";
import VaccineUploader from "../VaccineUploader";

// import { theme } from "../../../../Defaults";
import { ProfileType } from "../../../../Profile";
import PropTypes from "prop-types";

class UserProfileForm extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.setState({
            user: this.props.user,
            edit: this.props.user.registration_status === "unregistered",
            message: null,
            waiver_message: null
        });
    }

    updateUser(user) {
        console.log(user);
        this.setState({
            user,
        });
        // this.props.onChange(user);
    }

    validateUpload = (user) => {
        this.setState({
            profileMSG: null,
            edit: false,
            user,
        });
    }

    checkWaiver = (message) => {
        this.setState({
            waiver_message: message
        });
    }
    checkVacciner = (message) => {
        this.setState({
            vaccine_message: message
        });
    }


    render() {
        // let user = this.state.user;
        let message = null;
        if (this.state.message) {
            message = <UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>;
        }
        if (this.state.edit) {
            return (
                <AvForm
                    model={{}}
                    onValidSubmit={() => {
                        if (this.state.waiver_message === "Waiver uploaded successfully." || this.state.waiver_message === "Waiver found") {
                            this.validateUpload(this.state.user);
                        } else {
                            this.setState({ message: null }, () => {
                                this.setState({ message: "Please upload a waiver" });
                            });
                        }
                        
                    }}
                    onInvalidSubmit={() => {
                        this.setState({ message: null }, () => {
                            this.setState({ message: "Some fields are invalid." });
                        });
                    }}
                >
                    <div>
                        Upload filled and signed{" "}
                        <a style={{ textDecoration: "underline" }}
                            href="/resources/waiver.pdf"
                            rel="noopener noreferrer"
                            target="_blank" >
                            Waiver
                        </a>
                        {" "}*
                    </div>
                    <WaiverUploader edit={this.state.edit} 
                        profile={this.props.profile}
                        checkWaiver={this.checkWaiver} />
                    <div> Upload Resume </div>
                    <ResumeUploader edit={this.state.edit} 
                        profile={this.props.profile} />
                    
                    {message}
                    <div>Vaccine Card Upload</div>
                    <VaccineUploader edit={this.state.edit}
                        profile={this.props.profile} />


                    <div style={{ width: "100%" }} 
                        align="right">
                        <Button color="success" 
                            className="pill-btn" 
                            type="submit">
                            Update
                        </Button>
                    </div>
                </AvForm>
            );
        } else {
            // let pStyle = {
            //     color: theme.disabled[0], padding: 5, minHeight: 35
            // };
            // let field = (text) => {
            //     return <p style={pStyle}>{(text) ? text : <i>unanswered</i> }</p>;
            // };
            return (
                <div>
                    <h4>
                        <Button
                            color="primary"
                            className="pill-btn"
                            style={{ position: "absolute", right: 40 }}
                            onClick={() => {
                                this.setState({ edit: true });
                            }}
                        >
                            <Icon name="edit" />
                        </Button>
                    </h4>
                    <div>
                        <a style={{textDecoration: "underline" }}
                            href="/resources/waiver.pdf"
                            rel="noopener noreferrer"
                            target="_blank" >
                            Waiver
                        </a>
                    </div>
                    <WaiverUploader edit={this.state.edit} 
                        profile={this.props.profile}
                        checkWaiver={this.checkWaiver}  />
                    <div>Resume</div>
                    <ResumeUploader edit={this.state.edit} 
                        profile={this.props.profile} />
                    <div>Vaccine Card Upload</div>
                    <VaccineUploader edit={this.state.edit} 
                        profile={this.props.profile} />
                </div>

                
            );
        }
    }
}

UserProfileForm.propTypes = {
    user: {
        registration_status: PropTypes.string,
    },
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    mobile: PropTypes.bool,
    profile: ProfileType,
};

export default UserProfileForm;