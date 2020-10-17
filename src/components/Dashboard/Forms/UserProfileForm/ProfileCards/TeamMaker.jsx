import React, { Component } from "react";
import { FormGroup, Label, Button, Col, UncontrolledAlert, Input } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Slider, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Creatable } from "react-select";
import CustomAVInput from "../CustomAVInput";
import { Icon } from "react-fa";
import { theme } from "../../../../../Defaults";
import selectorOptions from "../selectorOptions.json";
import { ProfileType } from "../../../../Profile";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";


class Team extends Component {
    // constructor(props) {
    //     super(props);
    //     this.updateUser = this.updateUser.bind(this);
    // }
    UNSAFE_componentWillMount() {
        const team = {
            user_email: localStorage.getItem("email"),
            skills: [],
            prizes: [],
            bio: "",
            github: "",
            interests: [],
            seriousness: 3,
        };
        this.setState({
            team: team,
            user: JSON.parse(JSON.stringify(this.props.user)),
            edit: (this.props.user.registration_status === "unregistered"),
            loading: false,
            message: null
        });
    }

    updateTeam(team) {
        this.setState({
            team: team
        });
        console.log(this.state.team);
    }

    submitTeam = async (team) => {
        this.setState({
            profileMSG: null,
            loading: true,
            team,
        });

        let check = await this.props.profile.getTeamUser();

        console.log(check);

        // console.log(this.state.team);

        this.setState({
            profileMSG: null,
            loading: false,
            team,
        });

    }


    render() {
        const new_theme = createMuiTheme({
            palette: {
                secondary: {
                    main: theme.secondary[1].trim(),
                },
            },
        });
        let mobile = this.props.mobile;
        let user = this.state.user;
        let message = null;
        let team = this.state.team;
        if (this.state.message) {
            message = (<UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>);
        }
        if (this.state.edit) {
            return (
                <AvForm
                    onValidSubmit={() => {
                        this.submitTeam(this.state.team);
                    }}
                    onInvalidSubmit={() => {
                        this.setState({ message: null }, () => { this.setState({ message: "Some fields are invalid." }); });
                    }}>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <AvField name="github"
                                label="Github *"
                                type="text"
                                placeholder="hackru"
                                value={team.github}
                                onChange={(e) => { team.github = e.target.value; this.updateTeam(team); }}
                                validate={{
                                    required: { value: true,  errorMessage: "Invalid Github"} }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="interests"
                                label="Interests *">
                                <div className="forcestyle">
                                    <Creatable 
                                        isMulti
                                        id="interests"
                                        value={(team.interests != null) ? (team.interests.map(((val) => { return { value: val, label: val }; }))) : ([])}
                                        onChange={(e) => { let hold = []; for (let i = 0; i < e.length; i++) { hold.push(e[i].value); }  team.interests = hold ; this.updateTeam(team); }}
                                        options={selectorOptions["Interests"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="prizes"
                                label="Prizes *">
                                <div className="forcestyle">
                                    <Creatable
                                        isMulti
                                        id="prizes"
                                        value={(team.prizes != null) ? (team.prizes.map(((val) => { return { value: val, label: val }; }))) : ([])}
                                        onChange={(e) => { let hold = []; for (let i = 0; i < e.length; i++) { hold.push(e[i].value); }  team.prizes = hold ; this.updateTeam(team); }}
                                        options={selectorOptions["Prizes"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="Skills"
                                label="Skills *">
                                <div className="forcestyle">
                                    <Creatable
                                        isMulti
                                        id="skills"
                                        value={(team.skills != null) ? (team.skills.map(((val) => { return { value: val, label: val }; }))) : ([])}
                                        onChange={(e) => { let hold = []; for (let i = 0; i < e.length; i++) { hold.push(e[i].value); }  team.skills = hold ; this.updateTeam(team); }}
                                        options={selectorOptions["Skills"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="bio">Bio: A bit about yourself.</Label>
                        <Input id="bio"
                            type="textarea"
                            placeholder=""
                            value={team.bio}
                            onChange={(e) => { team.bio = e.target.value; this.updateTeam(team); }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="serious">What level of seriousness are you looking for?</Label>
                        <ThemeProvider theme={new_theme}>
                            <Slider
                                color="secondary"
                                id="serious"
                                default={3}
                                step={1}
                                min={1}
                                max={5}
                                marks={selectorOptions["Marks"]}
                                value={team.seriousness}
                                onChange={(e, value) => { team.seriousness = value; this.updateTeam(team); }}
                            />
                        </ThemeProvider>
                        
                    </FormGroup>
                    {message}
                    <div style={{ width: "100%" }}
                        align="right">
                        <Button color="success"
                            className="pill-btn"
                            type="submit"> { this.state.loading ?  <PulseLoader color={theme.accent[0]} /> : "Create!" } </Button>
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
                        About
                        <Button color="primary"
                            className="pill-btn"
                            style={{ position: "absolute", right: 40 }}
                            onClick={() => { this.setState({ edit: true }); }} ><Icon name="edit" /></Button>
                    </h4>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label>First Name</Label>
                            {field(user.first_name)}
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label>Last Name</Label>
                            {field(user.last_name)}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 4}>
                            <Label>Phone Number</Label>
                            {field(user.phone_number)}
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <Label>Date of Birth</Label>
                            {field(user.date_of_birth)}
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <Label>Shirt Size</Label>
                            {field(user.shirt_size)}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label>Gender</Label>
                            {field(user.gender)}
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label>Ethnicity</Label>
                            {field(user.ethnicity)}
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label>How many hackathons have you attended?</Label>
                        {field(user.hackathon_count)}
                    </FormGroup>
                </div>
            );
        }
    }
}


Team.propTypes = {
    user: {
        registration_status: PropTypes.string,
    },
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    mobile: PropTypes.bool,
    profile: ProfileType,
};

export default Team;
