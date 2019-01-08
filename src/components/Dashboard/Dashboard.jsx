import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Form, FormGroup, Input, Label, Button, Row, Col } from "reactstrap";
import { theme } from "../../Defaults";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "react-fa";
import ApplicationStatus from './ApplicationStatus';
import Loading from './Loading';
import ProfileMessage from './ProfileMessage';
import ResumeUploader from './ResumeUploader';
import Select, { Creatable, AsyncCreatable } from "react-select";
import request from "request";
import majors from "./majors.json";

class Dashboard extends Component {
    state = {
        loading: 'Loading your personal dashboard...',
        user: null,
        openDetails: false,
        schoolList: [],
        majorList: majors.items.map(major => ({
            value: major,
            label: major
        })),
        profileMSG: null
    }

    componentWillMount() {
        this.props.profile.Get((msg, data) => {
            if (msg) {
                console.error(msg);
            } else {
                if (data) {
                    delete data.auth;
                    delete data.role;
                    delete data.day_of;
                    this.setState({
                        user: data,
                        loading: false,
                        openDetails: (data.registration_status !== "registered")
                    });
                }
            }
        });
        request.get("https://raw.githubusercontent.com/MLH/mlh-policies/master/schools.csv", {}, (_err, _resp, body) => {
            let schoolList = body.split("\n").map(item => {
                    item = item.startsWith('"') ? item.substring(1, item.length - 2) : item;
                    return { value: item, label: item }
                });
            schoolList.splice(0, 1); // We remove the first element because we don't like it
            this.setState({ schoolList });
        });
    }

    render() {
        // Authorized personal only!
        if (!this.props.profile.isLoggedIn) {
            return (<Redirect to="/login"/>);
        }
        if (this.state.loading) {
            return (<Loading text={this.state.loading} />)
        }
        let user = this.state.user;
        user.phone_number = user.phone_number || "";
        user.ethnicity = user.ethnicity || "";
        user.how_you_heard_about_hackru = user.how_you_heard_about_hackru || "";
        let mobile = this.props.isMobile;
        return (
            <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                <div style={{ zIndex: 3, color: "white", width: "100%" }} align="center">
                    <Container>
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0, paddingTop: 35 }}>
                            <Row>
                                <Col md={9} xs={12}>
                                    <h1 className="display-4 theme-font">Welcome, {user.first_name}</h1>
                                    <div style={{ display: "inline-block", marginRight: 20 }}>
                                        <p className="lead">
                                            <Link to="/" className="theme-home-link" style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>
                                                Home
                                            </Link>
                                        </p>
                                    </div>
                                    <div style={{ display: "inline-block", marginRight: 20 }}><p className="lead"><Link to="/logout" className="theme-home-link" style={{ color: theme.accent[0] + "ff", textDecoration: "none" }}>Logout</Link></p></div>
                                </Col>
                                <Col style={{ textAlign: "center" }} md={3} xs={12}>
                                    <img width="250"  style={{ marginTop: 0 }} alt="logo" src="./assets/icons/hru-logo-green.svg" />
                                </Col>
                            </Row>
                        </div>
                        <ApplicationStatus status={user.registration_status} />
                        <div style={{ width: "100%", textAlign: "left" }}>
                            <p className="lead">User Profile</p>
                        </div>
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 25 }}>
                            <ListGroup>
                                <ListGroupItem tag="button" href="#" action style={{ background: theme.primary[0] + "2F", color: theme.primary[1] + "FF", borderRadius: 0 }} onClick={(e) => { this.setState({ openDetails: !this.state.openDetails }) }}>
                                    <ListGroupItemHeading>Basics</ListGroupItemHeading>
                                    <ListGroupItemText>Introduce yourself, don't be shy!</ListGroupItemText>
                                    <Icon style={{ position: "absolute", right: 25, top: 25 }} name={(this.state.openDetails) ? ("chevron-up") : ("chevron-down")} />
                                </ListGroupItem>
                                <Collapse isOpen={this.state.openDetails}>
                                    <ListGroupItem style={{ background: theme.primary[1] + "1F", borderRadius: 0 }}>
                                        <Form onSubmit={(e) => {
                                            e.preventDefault();
                                            // If the form is even submitted, then we know that both the mlh text boxes have been pressed, so we are going to set the mlh tag to true
                                            let user = this.state.user;
                                            user.mlh = true;
                                            user.registration_status = "registered";
                                            this.setState({
                                                loading: 'Saving your information',
                                                profileMSG: null,
                                                user,
                                            }, () => {
                                                this.props.profile.Set(this.state.user, (err) => {
                                                    this.setState({
                                                        loading: false,
                                                        profileMSG: err ?
                                                            { success: true, value: err } :
                                                            { success: false, value: 'Profile Updated!' }
                                                    })
                                                });
                                            });
                                        }}>
                                            <ProfileMessage message={this.state.profileMSG} />
                                            <h4>About you</h4>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label htmlFor="first">First Name</Label>
                                                    <Input required id="first" type="text" placeholder="John" value={user.first_name} onChange={(e) => { user.first_name = e.target.value; this.setState({ user: user }); }} />
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label htmlFor="last">Last Name</Label>
                                                    <Input required id="last" type="text" placeholder="Doe" value={user.last_name} onChange={(e) => { user.last_name = e.target.value; this.setState({ user: user }); }} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 4}>
                                                    <Label htmlFor="number">Phone Number</Label>
                                                    <Input id="number" type="text" placeholder="(***) ***-****" value={user.phone_number} onChange={(e) => { user.phone_number = e.target.value; this.setState({ user: user }); }} />
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 4}>
                                                    <Label htmlFor="dob">Date of Birth</Label>
                                                    <Input required id="dob" type="date" placeholder="mm/dd/yyyy" value={user.date_of_birth} onChange={(e) => { user.date_of_birth = e.target.value; this.setState({ user: user }); }} />
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 4}>
                                                    <Label htmlFor="size">Shirt Size</Label>
                                                    <div className="forcestyle">
                                                        <Select required id="size" value={{ value: user.shirt_size, label: user.shirt_size }} onChange={(e) => { user.shirt_size = e.value; this.setState({ user: user }); }} options={[
                                                            { value: "Unisex XS", label: "Unisex XS" },
                                                            { value: "Unisex S", label: "Unisex S" },
                                                            { value: "Unisex M", label: "Unisex M" },
                                                            { value: "Unisex L", label: "Unisex L" },
                                                            { value: "Unisex XL", label: "Unisex XL" }]} />
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label htmlFor="gender">Gender</Label>
                                                    <div className="forcestyle">
                                                        <Creatable id="gender" value={{ value: user.gender, label: user.gender }} onChange={(e) => { user.gender = e.value; this.setState({ user: user }); }} options={[
                                                            { value: "Female", label: "Female" },
                                                            { value: "Male", label: "Male" },
                                                            { value: "Other", label: "Other" },
                                                            { value: "Prefer not to say", label: "Prefer not to say"}]} />
                                                    </div>
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label htmlFor="ethnicity">Ethnicity</Label>
                                                    <div className="forcestyle">
                                                        <Creatable id="ethnicity" value={{ value: user.ethnicity, label: user.ethnicity }} onChange={(e) => { user.ethnicity = e.value; this.setState({ user: user }); }} options={[
                                                            { value: "American Indian or Alaskan Native", label: "American Indian or Alaskan Native" },
                                                            { value: "Asian/Pacific Islander", label: "Asian/Pacific Islander" },
                                                            { value: "Black or African American", label: "Black or African American" },
                                                            { value: "White/Caucasian", label: "White/Caucasian" }]} />
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="github">GitHub Handle</Label>
                                                <Input id="github" type="text" placeholder="hackru"  value={user.github} onChange={(e) => { user.github = e.target.value; this.setState({ user: user }); }} />
                                            </FormGroup>
                                            <h4>Education</h4>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 8}>
                                                    <Label htmlFor="school">School</Label>
                                                    <div className="forcestyle">
                                                        <AsyncCreatable id="school" value={{ value: user.school, label: user.school }} onChange={(e) => { user.school = e.value; this.setState({ user: user }); }} cacheOptions defaultOptions loadOptions={(inputValue, callback) => {
                                                            if (inputValue) {
                                                                callback(this.state.schoolList.filter((i) => {
                                                                    return i.label.toLowerCase().includes(inputValue.toLowerCase());
                                                                }));
                                                            } else {
                                                                callback(this.state.schoolList);
                                                            }
                                                        }} />
                                                    </div>
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 4}>
                                                    <Label htmlFor="gy">Graduation Year</Label>
                                                    <Input required id="gy" type="number" placeholder="yyyy"  value={user.grad_year} onChange={(e) => { user.grad_year = e.target.value; this.setState({ user: user }); }} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label htmlFor="los">Level of Study</Label>
                                                    <div className="forcestyle">
                                                        <Creatable id="los" value={{ value: user.level_of_study, label: user.level_of_study }} onChange={(e) => { user.level_of_study = e.value; this.setState({ user: user }); }} options={[
                                                            { value: "University (Undergraduate)", label: "University (Undergraduate)" },
                                                            { value: "University (Graduate)", label: "University (Graduate)" },
                                                            { value: "High School", label: "High School" }]} />
                                                    </div>
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label htmlFor="los">Major</Label>
                                                    <div className="forcestyle">
                                                        <Creatable isMulti id="los" value={(user.major.length > 0) ? (user.major.split(";").map(((val) => { return {value: val, label: val}; }))) : ([]) } onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.major = majors; this.setState({ user: user }); }} options={this.state.majorList} />
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                            <h4>HackRU</h4>
                                            <FormGroup>
                                                <Label htmlFor="dr">Dietary Restrictions</Label>
                                                <Input id="dr" type="text" placeholder="Allergies? Vegetarian?"  value={user.dietary_restrictions} onChange={(e) => { user.dietary_restrictions = e.target.value; this.setState({ user: user }); }} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="sn">Special Needs</Label>
                                                <Input id="sn" type="text" placeholder="Anything we should account for?" value={user.special_needs} onChange={(e) => { user.special_needs = e.target.value; this.setState({ user: user }); }}  />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="hear">How did you hear about HackRU?</Label>
                                                <div className="forcestyle">
                                                    <Creatable isMulti id="hear" value={(user.how_you_heard_about_hackru.length > 0) ? (user.how_you_heard_about_hackru.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])} onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.how_you_heard_about_hackru = majors; this.setState({ user: user }); }} options={[
                                                        { value: "Facebook", label: "Facebook" },
                                                        { value: "Instagram", label: "Instagram" },
                                                        { value: "MLH Website", label: "MLH Website" },
                                                        { value: "Mailing List", label: "Mailing List" },
                                                        { value: "Medium", label: "Medium" },
                                                        { value: "Reddit", label: "Reddit" },
                                                        { value: "Twitch", label: "Twitch" },
                                                        { value: "Youtube", label: "Youtube" }]} />
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="sa">What are you hoping to experience at HackRU?</Label>
                                                <Input id="sa" type="textarea" placeholder=""  value={user.short_answer} onChange={(e) => { user.short_answer = e.target.value; this.setState({ user: user }); }} />
                                            </FormGroup>
                                            <ResumeUploader userEmail={this.state.user.email} />
                                            <h4>MLH Notices</h4>
                                            <FormGroup>
                                                <div className="custom-control custom-checkbox">
                                                    <input required type="checkbox" className="custom-control-input" id="mlh1"/>
                                                    <label className="custom-control-label" htmlFor="mlh1">I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a></label>
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <div className="custom-control custom-checkbox">
                                                    <input required type="checkbox" className="custom-control-input" id="mlh2" />
                                                    <label className="custom-control-label" htmlFor="mlh2">I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. Further, I agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.</label>
                                                </div>
                                            </FormGroup>
                                            <div style={{ width: "100%" }} align="right">
                                                <Button style={{ backgroundColor: theme.accent[0], marginRight: 10 }} type="reset" >Clear</Button>
                                                <Button style={{ backgroundColor: theme.primary[0] }} type="submit" >Update</Button>
                                            </div>
                                        </Form>
                                    </ListGroupItem>
                                </Collapse>
                            </ListGroup>
                        </div>
                    </Container>
                </div>
            </Container>
        );
    }
}

export default Dashboard;
