import React, { Component } from "react";
import { FormGroup, Input, Label, Button, UncontrolledAlert } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { theme } from "../../../../Defaults";
import request from "request";
import majors from "./majors.json";
import { Icon } from "react-fa";
import { ProfileType } from "../../../Profile";
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
            schoolList: [],
            majorList: majors.items.map(major => ({
                value: major,
                label: major
            })),
            checkedState1: (this.props.user.registration_status !== "unregistered"),
            checkedState2: (this.props.user.registration_status !== "unregistered"),
            message: null
        });
        request.get("https://raw.githubusercontent.com/MLH/mlh-policies/master/schools.csv", {}, (_err, _resp, body) => {
            let schoolList = body.split("\n").map(item => {
                item = item.startsWith("\"") ? item.substring(1, item.length - 2) : item;
                return { value: item, label: item };
            });
            schoolList.splice(0, 1); // We remove the first element because we don't like it
            this.setState({ schoolList });
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
        let mlhnotices = [];
        if (this.state.checkedState1) {
            mlhnotices.push("mlh1");
        }
        if (this.state.checkedState2) {
            mlhnotices.push("mlh2");
        }
        let polls = [];
        if (user.want_bus) {
            polls.push("poll-bus");
        }
        if (user.want_team) {
            polls.push("poll-team");
        }
        let model = { mlhnotices, polls };
        let message = null;
        if (this.state.message) {
            message = (<UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>);
        }
        if (this.state.edit) {
            return (
                <AvForm model={model}
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
