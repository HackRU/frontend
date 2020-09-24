import React, { Component } from "react";
import { FormGroup, Input, Label, Button, UncontrolledAlert } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { theme } from "../../../../../Defaults";
import { Icon } from "react-fa";
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
            edit: (this.props.user.registration_status === "unregistered"),
            message: null
        });
    }

    updateUser(user) {
        console.log(user);
        this.setState({
            user
        });
        this.props.onChange(user);
    }

    render() {
        // let mobile = this.props.mobile;
        let user = this.state.user;
        let message = null;
        if (this.state.message) {
            message = (<UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>);
        }
        if (this.state.edit) {
            return (
                <AvForm 
                    onValidSubmit={() => {
                        this.props.onSubmit(this.state.user);
                    }}
                    onInvalidSubmit={() => {
                        this.setState({ message: null }, () => { this.setState({ message: "Some fields are invalid." }); });
                    }}>

                    <FormGroup>
                        <Label for="github">GitHub Handle</Label>
                        <Input id="github"
                            type="text"
                            placeholder="hackru"
                            value={user.github}
                            onChange={(e) => { user.github = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="github">GitHub Handle</Label>
                        <Input id="github"
                            type="text"
                            placeholder="hackru"
                            value={user.github}
                            onChange={(e) => { user.github = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    {message}
                    <div style={{ width: "100%" }}
                        align="right">
                        <Button className="pill-btn"
                            color="warning"
                            style={{ marginRight: 10 }}
                            type="reset">Clear</Button>
                        <Button color="success"
                            className="pill-btn"
                            type="submit">Update</Button>
                    </div>
                </AvForm>
            );
        } else {
            let pStyle = {
                color: theme.disabled[0], padding: 5, minHeight: 35
            };
            let field = (text) => {
                return <p style={pStyle}>{(text) ? text : <i>unanswered</i> }</p>;
            };
            return (
                <div>
                    <h4>
                        <Button color="primary"
                            className="pill-btn"
                            style={{ position: "absolute", right: 40 }}
                            onClick={() => { this.setState({ edit: true }); }} ><Icon name="edit" /></Button>
                    </h4>
                    <FormGroup>
                        <Label>GitHub Handle</Label>
                        {field(user.github)}
                    </FormGroup>
                    <FormGroup>
                        <Label>Slack Handle</Label>
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
