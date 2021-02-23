import React, { Component } from "react";
import { FormGroup, Input, Label, Button, UncontrolledAlert } from "reactstrap";
import { AvForm } from "availity-reactstrap-validation";
import { Creatable } from "react-select";
import { Icon } from "react-fa";
import { theme } from "../../../../../Defaults";
import selectorOptions from "../selectorOptions.json";
import { ProfileType } from "../../../../Profile";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";

class Questions extends Component {
    // constructor(props) {
    //     super(props);
    //     this.updateUser = this.updateUser.bind(this);
    // }
    UNSAFE_componentWillMount() {
        this.setState({
            user: JSON.parse(JSON.stringify(this.props.user)),
            edit: (this.props.user.registration_status === "unregistered"),
            loading: false,
            message: null
        });
    }

    updateUser(user) {
        // console.log(user);
        this.setState({
            user: user
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

        update_user.how_you_heard_about_hackru = this.state.user.how_you_heard_about_hackru;
        update_user.reasons = this.state.user.reasons;
        update_user.short_answer = this.state.user.short_answer;
        update_user.virtual_short_answer = this.state.user.virtual_short_answer;
        update_user.special_needs = this.state.user.special_needs;
        update_user.want_team = this.state.user.want_team;

        this.props.profile.Set(update_user)
            .then(res => {
                this.setState({
                    edit: false,
                    loading: false
                });
                return res;
            });
    }

    render() {
        let user = this.state.user;
        let polls = [];
        if (user.want_bus) {
            polls.push("poll-bus");
        }
        if (user.want_team) {
            polls.push("poll-team");
        }
        let model = { polls };
        let message = null;
        if (this.state.message) {
            message = (<UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>);
        }
        if (this.state.edit) {
            return (
                <AvForm model={model}
                    onValidSubmit={() => {
                        this.submitUser(this.state.user);
                    }}
                    onInvalidSubmit={() => {
                        this.setState({ message: null }, () => { this.setState({ message: "Some fields are invalid." }); });
                    }}>
                    {/* <FormGroup row>
                        <Col>
                            <CustomAVInput name="dr"
                                label="Dietary Restrictions"
                                value={user.dietary_restrictions}>
                                <div className="forcestyle">
                                    <Creatable id="dr"
                                        value={{ value: user.dietary_restrictions, label: user.dietary_restrictions }}
                                        onChange={(e) => { user.dietary_restrictions = e.value; this.updateUser(user); }}
                                        options={selectorOptions.dietaryRestrictions} />
                                </div>
                            </CustomAVInput>
                        </Col>
                    </FormGroup> */}
                    <FormGroup>
                        <Label for="hear">How did you hear about HackRU?</Label>
                        <div className="forcestyle">
                            <Creatable isMulti
                                id="hear"
                                value={(user.how_you_heard_about_hackru.length > 0) ? (user.how_you_heard_about_hackru.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])}
                                onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.how_you_heard_about_hackru = majors; this.updateUser(user); }}
                                options={selectorOptions["Hear"]} />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="reasons">What are your reasons for coming? (Rank them from highest to lowest) </Label>
                        <div className="forcestyle">
                            <Creatable isMulti
                                id="reasons"
                                value={(user.reasons.length > 0) ? (user.reasons.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])}
                                onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.reasons = majors; this.updateUser(user); }}
                                options={selectorOptions["Reasons"]} />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="sa">What are you hoping to experience at HackRU?</Label>
                        <Input id="sa"
                            type="textarea"
                            placeholder=""
                            value={user.short_answer}
                            onChange={(e) => { user.short_answer = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="sa">What are your initial thoughts on a virtual hackathon?</Label>
                        <Input id="sa"
                            type="textarea"
                            placeholder=""
                            value={user.virtual_short_answer}
                            onChange={(e) => { user.virtual_short_answer = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="sn">Anything we should account for?</Label>
                        <Input id="sn"
                            type="text"
                            placeholder=""
                            value={user.special_needs}
                            onChange={(e) => { user.special_needs = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    {/* <AvCheckboxGroup name="polls"
                        className="custom-av-checkbox"
                        label={<h4>Polls</h4>}
                        validate={{ required: { value: false, errorMessag: "" } }}>
                        <AvCheckbox name="poll-bus"
                            customInput
                            onChange={() => { user.want_bus = (user.want_bus) ? !user.want_bus : (true); }}
                            label={<p>Would you be interested in a bus from your school to HackRU? (Note: this is not a guarantee that a bus will pick you up from your particular school!)</p>}
                            value={"poll-bus"} />
                        <AvCheckbox name="poll-team"
                            customInput
                            onChange={() => { user.want_team = (user.want_team) ? !user.want_team : (true); }}
                            label={<p>Are you looking for team members?</p>}
                            value={"poll-team"} />
                    </AvCheckboxGroup> */}
                    {message}
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
                color: theme.disabled[0], padding: 5, minHeight: 35
            };
            let field = (text) => {
                return <p style={pStyle}>{(text) ? text : <i>unanswered</i> }</p>;
            };
            return (
                <div>
                    <h4>
                        Questions
                        <Button color="primary"
                            className="pill-btn"
                            style={{ position: "absolute", right: 40 }}
                            onClick={() => { this.setState({ edit: true }); }} ><Icon name="edit" /></Button>
                    </h4>
                 
                    {/* <FormGroup>
                        <Label>Dietary Restrictions</Label>
                        {field(user.dietary_restrictions)}
                    </FormGroup> */}
                    <FormGroup>
                        <Label>How did you hear about HackRU?</Label>
                        {field(user.how_you_heard_about_hackru)}
                    </FormGroup>
                    <FormGroup>
                        <Label>What are your reasons for coming? (Rank them from highest to lowest)</Label>
                        {field(user.reasons)}
                    </FormGroup>
                    <FormGroup>
                        <Label>What are you hoping to experience at HackRU?</Label>
                        {field(user.short_answer)}
                    </FormGroup>
                    <FormGroup>
                        <Label>What are your initial thoughts on a virtual hackathon?</Label>
                        {field(user.virtual_short_answer)}
                    </FormGroup>
                    <FormGroup>
                        <Label>Anything we should account for?</Label>
                        {field(user.special_needs)}
                    </FormGroup>
                    {/* <FormGroup>
                        <Label>Are you looking for team members? </Label>
                        {field(user.want_team ? ("Yes, I am looking for team members") : ("No, I already have a team"))}
                    </FormGroup> */}
                </div>
            );
        }
    }
}


Questions.propTypes = {
    user: {
        registration_status: PropTypes.string,
    },
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    mobile: PropTypes.bool,
    profile: ProfileType,
};

export default Questions;
