import React, { Component } from "react";
import { FormGroup, Label, Button, UncontrolledAlert } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { theme } from "../../../../../Defaults";
import { Icon } from "react-fa";
import { ProfileType } from "../../../../Profile";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";

class UserProfileForm extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.setState({
            user: JSON.parse(JSON.stringify(this.props.user)),
            edit: this.props.user.registration_status === "unregistered",
            error: false,
            message: null,
            loading: false,
        });
    }

    updateUser(user) {
        // console.log(user);
        this.setState({
            user: user,
        });
        // this.props.onChange(user);
    }

    submitUser = async (user) => {
        this.setState({
            profileMSG: null,
            loading: true,
            user,
        });

        let update_user = {};
        update_user.slack_id = this.state.user.slack_id;
        update_user.github = this.state.user.github;

        let update_promise = new Promise((resolve) => {
            this.props.profile.Set(update_user, (err) => {resolve(err);} );
        });

        await update_promise;

        this.setState({
            edit: false,
            loading: false
        });
    }

    render() {
        // let mobile = this.props.mobile;
        let user = this.state.user;
        // let message = null;
        // if (this.state.message) {
        //     message = <UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>;
        // }
        if (this.state.edit) {
            return (
                <AvForm
                    onValidSubmit={() => {
                        this.submitUser(this.state.user);
                    }}
                    onInvalidSubmit={() => {
                        this.setState({ message: null }, () => {
                            this.setState({ message: "Some fields are invalid." });
                        });
                    }}
                >
                    <FormGroup>
                        <AvField
                            name="slack"
                            label="Slack ID"
                            type="text"
                            placeholder="hackru"
                            value={user.slack_id}
                            onChange={(e) => { user.slack_id = e.target.value; this.updateUser(user); }}
                            validate={{
                                required: {value: false },
                                pattern: { value: "^[UW][A-Z0-9]{2,}$", errorMessage: "Invalid Slack ID" } }} />
                    </FormGroup>
                    <FormGroup>
                        <AvField
                            name="github"
                            label="Github Handle"
                            type="text"
                            placeholder="hackru"
                            value={user.github}
                            onChange={(e) => { user.github = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    {this.state.error ? <UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert> : ""}
                    <div style={{ width: "100%" }} 
                        align="right">
                        <Button color="success" 
                            className="pill-btn" 
                            type="submit"> { this.state.loading ?  <PulseLoader color={theme.accent[0]} /> : "Update" } </Button>
                    </div>
                </AvForm>
            );
        } else {
            let pStyle = {
                color: theme.disabled[0],
                padding: 5,
                minHeight: 35,
            };
            let field = (text) => {
                return <p style={pStyle}>{text ? text : <i>unanswered</i>}</p>;
            };
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
                    <FormGroup>
                        <Label>Slack ID</Label>
                        {field(user.slack_id)}
                    </FormGroup>
                    <FormGroup>
                        <Label>GitHub Handle</Label>
                        {field(user.github)}
                    </FormGroup>
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