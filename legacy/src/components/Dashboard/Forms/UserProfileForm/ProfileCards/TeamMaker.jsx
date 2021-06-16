import React, { Component } from "react";
import { FormGroup, Label, Button, Col, UncontrolledAlert, Input, Collapse} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Slider, createMuiTheme, ThemeProvider, Grid } from "@material-ui/core";
import { Creatable } from "react-select";
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
        // console.log(this.props.teamProfile);
        // console.log(this.props.team);
        if (this.props.hasTeam) {
            this.setState({
                teamName: this.props.teamProfile.name,
                teamDescription: this.props.teamProfile.desc,
            });
        } else {
            this.setState({
                teamName: "",
                teamDescription: "",
            });
        }

        this.setState({
            want: this.props.user.want_team,
            team: this.props.team,
            user: JSON.parse(JSON.stringify(this.props.user)),
            edit: !this.props.hasTeam,
            loading: false,
            message: null
        });

        //console.log(this.props.team);
    }

    updateTeam(team) {
        this.setState({
            team: team
        });
        // console.log(this.state.team);
    }

    submitTeam = async (team) => {
        this.setState({
            profileMSG: null,
            loading: true,
            team,
        });

        this.props.profile.Set({want_team: this.state.want})
            .then(res => {
                this.setState({
                    profileMSG: null,
                    loading: false,
                    edit: false,
                    team,
                });
                return res;
            });

        await this.props.profile.updateUser(team);

        if (this.props.hasTeam) {
            await this.props.profile.updateTeam({name: this.state.teamName, desc: this.state.teamDescription, complete: this.state.want}, team.team_id);
           
        } else {
            if (this.state.want) {
                if (this.state.teamName === "") {
                    this.setState({ message: null }, () => { this.setState({ message: "Please fill out Team Name and Description." }); });
                    this.setState({
                        loading: false
                    });
                    return;
                } else if (this.state.teamDescription === "") {
                    this.setState({ message: null }, () => { this.setState({ message: "Please fill out Team Name and Description." }); });
                    this.setState({
                        loading: false
                    });
                    return;
                } else {
                    await this.props.profile.newTeam({
                        name: this.state.teamName,
                        desc: this.state.teamDescription,
                        skills: team.skills,
                        prizes: team.prizes,
                        complete: this.state.want
                    });
                }
            }
        }
        // console.log(this.state.team);
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
        // let user = this.state.user;
        let message = null;
        let team = this.state.team;
        let name = this.state.teamName;
        let desc = this.state.teamDescription;
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
                    <FormGroup>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="want-team"
                                checked={this.state.want}
                                onChange={() => this.setState({want: !this.state.want})}
                            />
                            <label className="custom-control-label"
                                htmlFor="want-team">I am looking for team members</label>
                        </div>
                    </FormGroup>
                    <Collapse isOpen={this.state.want}>
                        <FormGroup row>
                            <Col xs={(mobile) ? 12 : 6}>
                                <AvField name="first"
                                    label="Team Name"
                                    type="text"
                                    placeholder="TeamRU"
                                    value={name}
                                    onChange={(e) => { name = e.target.value; this.setState({teamName: name}); }}
                                    validate={{
                                        required: { value: false, errorMessage: "Invalid team name" }}} />
                            </Col>
                            <Col xs={(mobile) ? 12 : 6}>
                                <Label for="interests">Interests</Label>
                                <div className="forcestyle">
                                    <Creatable 
                                        isMulti
                                        id="interests"
                                        value={(team.interests != null) ? (team.interests.map(((val) => { return { value: val, label: val }; }))) : ([])}
                                        onChange={(e) => { let hold = []; for (let i = 0; i < e.length; i++) { hold.push(e[i].value); }  team.interests = hold ; this.updateTeam(team); }}
                                        options={selectorOptions["Interests"]} />
                                </div>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                        
                            {/* <Col xs={(mobile) ? 12 : 4}>
                                <CustomAVInput name="interests"
                                    label="Interests">
                                    <div className="forcestyle">
                                        <Creatable 
                                            isMulti
                                            id="interests"
                                            value={(team.interests != null) ? (team.interests.map(((val) => { return { value: val, label: val }; }))) : ([])}
                                            onChange={(e) => { let hold = []; for (let i = 0; i < e.length; i++) { hold.push(e[i].value); }  team.interests = hold ; this.updateTeam(team); }}
                                            options={selectorOptions["Interests"]} />
                                    </div>
                                </CustomAVInput>
                            </Col> */}
                            <Col xs={(mobile) ? 12 : 6}>
                                <Label for="prizes">Prizes</Label>
                                <div className="forcestyle">
                                    <Creatable
                                        isMulti
                                        id="prizes"
                                        value={(team.prizes != null) ? (team.prizes.map(((val) => { return { value: val, label: val }; }))) : ([])}
                                        onChange={(e) => { let hold = []; for (let i = 0; i < e.length; i++) { hold.push(e[i].value); }  team.prizes = hold ; this.updateTeam(team); }}
                                        options={selectorOptions["Prizes"]} />
                                </div>
                            </Col>
                            <Col xs={(mobile) ? 12 : 6}>
                                <Label for="skills">Skills</Label>
                                <div className="forcestyle">
                                    <Creatable
                                        isMulti
                                        id="skills"
                                        value={(team.skills != null) ? (team.skills.map(((val) => { return { value: val, label: val }; }))) : ([])}
                                        onChange={(e) => { let hold = []; for (let i = 0; i < e.length; i++) { hold.push(e[i].value); }  team.skills = hold ; this.updateTeam(team); }}
                                        options={selectorOptions["Skills"]} />
                                </div>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Label for="bio">Team descripton</Label>
                            <Input id="bio"
                                type="textarea"
                                placeholder="A chill team looking to make a full stack project"
                                value={desc}
                                onChange={(e) => { desc = e.target.value; this.setState({teamDescription: desc}); }} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="serious">What level of seriousness are you looking for?</Label>
                            <Grid container
                                justify="center"
                                alignItems="center">
                                <Grid xs={11}>
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
                                </Grid>
                            </Grid>
                        </FormGroup>
                        <div style={{ textAlign: "left", width: "100%" }}>
                            <i className="text-muted">Note: Your email will be automatically shared with all members of your team</i>
                        </div>
                    </Collapse>
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
            if (this.state.want){
                return (
                    <div>
                        <h4>
                            <Button color="primary"
                                className="pill-btn"
                                style={{ position: "absolute", right: 40 }}
                                onClick={() => { this.setState({ edit: true }); }} ><Icon name="edit" /></Button>
                        </h4>
                        <FormGroup>
                            {field("Yes, I am looking for team members") }
                        </FormGroup>
                        <FormGroup row>
                            <Col xs={(mobile) ? 12 : 6}>
                                <Label>Team Name</Label>
                                {field(this.state.teamName)}
                            </Col>
                            <Col xs={(mobile) ? 12 : 6}>
                                <Label>Interests</Label>
                                {field(team.interests.join("; "))}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs={(mobile) ? 12 : 6}>
                                <Label>Prizes</Label>
                                {field(team.prizes.join("; "))}
                            </Col>
                            <Col xs={(mobile) ? 12 : 6}>
                                <Label>Skills</Label>
                                {field(team.skills.join("; "))}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs={12}>
                                <Label>Team Description</Label>
                                {field(this.state.teamDescription)}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs={12}>
                                <Label>Seriousness</Label>
                                {field(selectorOptions["Marks"][team.seriousness-1].label)}
                            </Col>
                        </FormGroup>
                    </div>
                );

            } else {
                return (
                    <div>
                        <h4>
                            <Button color="primary"
                                className="pill-btn"
                                style={{ position: "absolute", right: 40 }}
                                onClick={() => { this.setState({ edit: true }); }} ><Icon name="edit" /></Button>
                        </h4>
                        <FormGroup>
                            {field("I already have a team") }
                        </FormGroup>
                    </div>
                );
            }
            
        }
    }
}


Team.propTypes = {
    user: {
        registration_status: PropTypes.string,
    },
    team: PropTypes.object,
    hasTeam: PropTypes.bool,
    teamProfile: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    mobile: PropTypes.bool,
    profile: ProfileType,
};

export default Team;
