import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button, Col } from "reactstrap";
import Select, { Creatable, AsyncCreatable } from "react-select";
import ResumeUploader from "./ResumeUploader";
import { Icon } from "react-fa";
import { theme } from "../../../../Defaults";

class UserProfileForm extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
    }
    componentWillMount() {
        this.setState({
            user: this.props.user,
            edit: (this.props.user.registration_status !== "registered"),
            checkedState1: this.props.user.registration_status === "registered",
            checkedState2: this.props.user.registration_status === "registered"
        });
    }
    updateUser(user) {
        this.setState({
            user
        });
        this.props.onChange(user);
    }
    render() {
        let mobile = this.props.mobile;
        let user = this.state.user;
        if (this.state.edit) {
            return (
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(this.state.user);
                }}>
                    <h4>About you</h4>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label for="first">First Name *</Label>
                            <Input required id="first" type="text" placeholder="John" value={user.first_name} onChange={(e) => { user.first_name = e.target.value; this.updateUser(user); }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label for="last">Last Name *</Label>
                            <Input required id="last" type="text" placeholder="Doe" value={user.last_name} onChange={(e) => { user.last_name = e.target.value; this.updateUser(user); }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 4}>
                            <Label for="number">Phone Number</Label>
                            <Input id="number" type="text" placeholder="(***) ***-****" value={user.phone_number} onChange={(e) => { user.phone_number = e.target.value; this.updateUser(user); }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <Label for="dob">Date of Birth *</Label>
                            <Input required id="dob" type="date" placeholder="mm/dd/yyyy" value={user.date_of_birth} onChange={(e) => { user.date_of_birth = e.target.value; this.updateUser(user); }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <Label for="size">Shirt Size</Label>
                            <div className="forcestyle">
                                <Select required id="size" value={{ value: user.shirt_size, label: user.shirt_size }} onChange={(e) => { user.shirt_size = e.value; this.updateUser(user); }} options={[
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
                            <Label for="gender">Gender</Label>
                            <div className="forcestyle">
                                <Creatable id="gender" value={{ value: user.gender, label: user.gender }} onChange={(e) => { user.gender = e.value; this.updateUser(user); }} options={[
                                    { value: "Female", label: "Female" },
                                    { value: "Male", label: "Male" },
                                    { value: "Other", label: "Other" },
                                    { value: "Prefer not to say", label: "Prefer not to say" }]} />
                            </div>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label for="ethnicity">Ethnicity</Label>
                            <div className="forcestyle">
                                <Creatable id="ethnicity" value={{ value: user.ethnicity, label: user.ethnicity }} onChange={(e) => { user.ethnicity = e.value; this.updateUser(user); }} options={[
                                    { value: "American Indian or Alaskan Native", label: "American Indian or Alaskan Native" },
                                    { value: "Asian/Pacific Islander", label: "Asian/Pacific Islander" },
                                    { value: "Black or African American", label: "Black or African American" },
                                    { value: "White/Caucasian", label: "White/Caucasian" }]} />
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="github">GitHub Handle</Label>
                        <Input id="github" type="text" placeholder="hackru" value={user.github} onChange={(e) => { user.github = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <h4>Education</h4>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 8}>
                            <Label for="school">School</Label>
                            <div className="forcestyle">
                                <AsyncCreatable id="school" value={{ value: user.school, label: user.school }} onChange={(e) => { user.school = e.value; this.updateUser(user); }} cacheOptions defaultOptions loadOptions={(inputValue, callback) => {
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
                            <Label for="gy">Graduation Year</Label>
                            <Input required id="gy" type="number" placeholder="yyyy" value={user.grad_year} onChange={(e) => { user.grad_year = e.target.value; this.updateUser(user); }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label for="los">Level of Study</Label>
                            <div className="forcestyle">
                                <Creatable id="los" value={{ value: user.level_of_study, label: user.level_of_study }} onChange={(e) => { user.level_of_study = e.value; this.updateUser(user); }} options={[
                                    { value: "University (Undergraduate)", label: "University (Undergraduate)" },
                                    { value: "University (Graduate)", label: "University (Graduate)" },
                                    { value: "High School", label: "High School" }]} />
                            </div>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label for="los">Major</Label>
                            <div className="forcestyle">
                                <Creatable isMulti id="los" value={(user.major.length > 0) ? (user.major.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])} onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.major = majors; this.updateUser(user); }} options={this.state.majorList} />
                            </div>
                        </Col>
                    </FormGroup>
                    <h4>HackRU</h4>
                    <FormGroup>
                        <Label for="dr">Dietary Restrictions</Label>
                        <Input id="dr" type="text" placeholder="Allergies? Vegetarian?" value={user.dietary_restrictions} onChange={(e) => { user.dietary_restrictions = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="sn">Special Needs</Label>
                        <Input id="sn" type="text" placeholder="Anything we should account for?" value={user.special_needs} onChange={(e) => { user.special_needs = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="hear">How did you hear about HackRU?</Label>
                        <div className="forcestyle">
                            <Creatable isMulti id="hear" value={(user.how_you_heard_about_hackru.length > 0) ? (user.how_you_heard_about_hackru.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])} onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.how_you_heard_about_hackru = majors; this.updateUser(user); }} options={[
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
                        <Label for="sa">What are you hoping to experience at HackRU?</Label>
                        <Input id="sa" type="textarea" placeholder="" value={user.short_answer} onChange={(e) => { user.short_answer = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <ResumeUploader userEmail={this.state.user.email} edit={this.state.edit} regStyle={{}} />
                    <h4>MLH Notices</h4>
                    <FormGroup>
                        <div className="custom-control custom-checkbox">
                            <input required type="checkbox" className="custom-control-input" id="mlh1" checked={this.state.checkedState1} onChange={() => { this.setState({ checkedState1: !this.state.checkedState1 }) }} />
                            <label className="custom-control-label" for="mlh1">I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a></label>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="custom-control custom-checkbox">
                            <input required type="checkbox" className="custom-control-input" id="mlh2" checked={this.state.checkedState2} onChange={() => { this.setState({ checkedState2: !this.state.checkedState2 }) }} />
                            <label className="custom-control-label" for="mlh2">I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. Further, I agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.</label>
                        </div>
                    </FormGroup>
                    <div style={{ width: "100%" }} align="right">
                        <Button style={{ backgroundColor: theme.accent[0], marginRight: 10 }} type="reset" >Clear</Button>
                        <Button style={{ backgroundColor: theme.primary[0] }} type="submit" >Update</Button>
                    </div>
                </Form>
            )
        } else {
            let pStyle = {
                color: theme.disabled[0] + "70", padding: 5, height: 35
            };
            let field = (text) => {
                return <p style={pStyle}>{(text) ? text : <i>unanswered</i> }</p>
            }
            return (
                <div>
                    <h4>
                        About you
                        <Button style={{ position: "absolute", right: 20 }} onClick={(e) => { this.setState({ edit: true }); }} ><Icon name="edit" /></Button>
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
                        <Label>GitHub Handle</Label>
                        {field(user.github)}
                    </FormGroup>
                    <h4>Education</h4>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 8}>
                            <Label>School</Label>
                            {field(user.school)}
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <Label>Graduation Year</Label>
                            {field(user.grad_year)}
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label>Level of Study</Label>
                            {field(user.level_of_study)}
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label>Major</Label>
                            {field(user.major)}
                        </Col>
                    </FormGroup>
                    <h4>HackRU</h4>
                    <FormGroup>
                        <Label>Dietary Restrictions</Label>
                        {field(user.dietary_restrictions)}
                    </FormGroup>
                    <FormGroup>
                        <Label>Special Needs</Label>
                        {field(user.special_needs)}
                    </FormGroup>
                    <FormGroup>
                        <Label>How did you hear about HackRU?</Label>
                        {field(user.how_you_heard_about_hackru)}
                    </FormGroup>
                    <FormGroup>
                        <Label>What are you hoping to experience at HackRU?</Label>
                        {field(user.short_answer)}
                    </FormGroup>
                    <ResumeUploader userEmail={this.state.user.email} edit={this.state.edit} regStyle={pStyle} />
                    <h4>MLH Notices</h4>
                    <FormGroup>
                        {user.registration_status === "registered" ? <p style={{ ...pStyle, height: 100 }}>I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a> and I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. Further, I agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.</p>
                        : <p style={{...pStyle, color: theme.accent[0] }}>You have not yet agreed to MLH policies. Please fill out your user profile.</p>}
                    </FormGroup>
                    <div style={{ width: "100%" }} align="right">
                        <Button style={{ backgroundColor: theme.primary[0] }} onClick={(e) => { this.setState({ edit: true }); }}>Edit</Button>
                    </div>
                </div>
            )
        }
    }
}
export default UserProfileForm;