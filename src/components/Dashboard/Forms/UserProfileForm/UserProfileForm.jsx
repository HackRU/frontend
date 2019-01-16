import React, { Component } from "react";
import { FormGroup, Input, Label, Button, Col, UncontrolledAlert } from "reactstrap";
import { AvForm, AvField, AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation";
import Select, { Creatable, AsyncCreatable } from "react-select";
import ResumeUploader from "./ResumeUploader";
import CustomAVInput from "./CustomAVInput";
import { Icon } from "react-fa";
import { theme } from "../../../../Defaults";
import request from "request";
import majors from "./majors.json";
import selectorOptions from "./selectorOptions.json";

class UserProfileForm extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
    }
    componentWillMount() {
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
                item = item.startsWith('"') ? item.substring(1, item.length - 2) : item;
                return { value: item, label: item }
            });
            schoolList.splice(0, 1); // We remove the first element because we don't like it
            this.setState({ schoolList });
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
        let mlhnotices = [];
        if (this.state.checkedState1) {
            mlhnotices.push("mlh1");
        }
        if (this.state.checkedState2) {
            mlhnotices.push("mlh2");
        }
        let model = { mlhnotices }
        let message = null;
        if (this.state.message) {
            message = (<UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>)
        }
        if (this.state.edit) {
            return (
                <AvForm model={model} onValidSubmit={(event, error, values) => {
                    this.props.onSubmit(this.state.user);
                }} onInvalidSubmit={(event, error, values) => {
                    this.setState({ message: null }, () => { this.setState({ message: "Some fields are invalid." }) });
                }}>
                    <h4>About you</h4>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <AvField name="first" label="First Name *" type="text" placeholder="John" value={user.first_name} onChange={(e) => { user.first_name = e.target.value; this.updateUser(user); }} validate={{
                                required: { value: true, errorMessage: "Invalid first name" },
                                pattern: { value: "^[A-Za-z0-9]+$", errorMessage: "Invalid character" },
                                minLength: { value: 1, errorMessage: "Invalid length" },
                                maxLength: { value: 100, errorMessage: "Invalid length" } }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <AvField name="last" label="Last Name *" type="text" placeholder="Doe" value={user.last_name} onChange={(e) => { user.last_name = e.target.value; this.updateUser(user); }} validate={{
                                required: { value: true, errorMessage: "Invalid last name" },
                                pattern: { value: "^[A-Za-z0-9]+$", errorMessage: "Invalid character" },
                                minLength: { value: 1, errorMessage: "Invalid length" },
                                maxLength: { value: 100, errorMessage: "Invalid length" } }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 4}>
                            <AvField name="number" label="Number" type="text" placeholder="(***) ***-****" value={user.phone_number} onChange={(e) => { user.phone_number = e.target.value; this.updateUser(user); }} validate={{
                                required: { value: false },
                                tel: { value: true, errorMessage: "Invalid number" } }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <AvField name="dob" label="Date of Birth *" type="date" placeholder="mm/dd/yyyy" value={user.date_of_birth} onChange={(e) => { user.date_of_birth = e.target.value; this.updateUser(user); }} validate={{
                                required: { value: true, errorMessage: "Invalid date of birth" },
                                dateRange: {
                                    format: "MM/DD/YYYY",
                                    start: {
                                        value: "01/01/1920"
                                    },
                                    end: {
                                        value: "01/01/2018"
                                    }
                                } }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <CustomAVInput name="size" label="Shirt Size *" value={user.shirt_size} validate={{ required: { value: true, errorMessage: "Invalid shirt size" } }}>
                                <div className="forcestyle">
                                    <Select required id="size" value={{ value: user.shirt_size, label: user.shirt_size }} onChange={(e) => { user.shirt_size = e.value; this.updateUser(user); }} options={selectorOptions["Shirt Size"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="gender" label="Gender *" value={user.gender} validate={{ required: { value: true, errorMessage: "Invalid input"} }}>
                                <div className="forcestyle">
                                    <Creatable id="gender" value={{ value: user.gender, label: user.gender }} onChange={(e) => { user.gender = e.value; this.updateUser(user); }} options={selectorOptions["Gender"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="ethnicity" label="Ethnicity *" value={user.ethnicity} validate={{ required: { value: true, errorMessage: "Invalid input" } }}>
                                <div className="forcestyle">
                                    <Creatable id="ethnicity" value={{ value: user.ethnicity, label: user.ethnicity }} onChange={(e) => { user.ethnicity = e.value; this.updateUser(user); }} options={selectorOptions["Ethnicity"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="github">GitHub Handle</Label>
                        <Input id="github" type="text" placeholder="hackru" value={user.github} onChange={(e) => { user.github = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <h4>Education</h4>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 8}>
                            <CustomAVInput name="school" label="School *" value={user.school} validate={{ required: { value: true, errorMessage: "Invalid school" } }}>
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
                            </CustomAVInput>
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <AvField name="gy" label="Graduation Year *" type="number" placeholder="yyyy" value={user.grad_year} onChange={(e) => { user.grad_year = e.target.value; this.updateUser(user); }} validate={{
                                required: { value: true, errorMessage: "Invalid graduation year" },
                                max: { value: 2030, errorMessage: "Graduation year must be between 2019 and 2030" },
                                min: { value: 2019, errorMessage: "Graduation year must be between 2019 and 2030" } }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="los" label="Level of Study *" value={user.level_of_study} validate={{ required: { value: true, errorMessage: "Invalid level of study" } }}>
                                <div className="forcestyle">
                                    <Creatable id="los" value={{ value: user.level_of_study, label: user.level_of_study }} onChange={(e) => { user.level_of_study = e.value; this.updateUser(user); }} options={selectorOptions["Level of Study"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="major" label="Major *" value={user.major} validate={{ required: { value: true, errorMessage: "Invalid major" } }}>
                                <div className="forcestyle">
                                    <Creatable isMulti id="los" value={(user.major.length > 0) ? (user.major.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])} onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.major = majors; this.updateUser(user); }} options={this.state.majorList} />
                                </div>
                            </CustomAVInput>
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
                            <Creatable isMulti id="hear" value={(user.how_you_heard_about_hackru.length > 0) ? (user.how_you_heard_about_hackru.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])} onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.how_you_heard_about_hackru = majors; this.updateUser(user); }} options={selectorOptions["Hear"]} />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="sa">What are you hoping to experience at HackRU?</Label>
                        <Input id="sa" type="textarea" placeholder="" value={user.short_answer} onChange={(e) => { user.short_answer = e.target.value; this.updateUser(user); }} />
                    </FormGroup>
                    <ResumeUploader userEmail={this.state.user.email} edit={this.state.edit} regStyle={{}} />
                    <AvCheckboxGroup name="mlhnotices" className="custom-av-checkbox" label={<h4>MLH Notices</h4>} required validate={{ required: { value: true, errorMessag: "Please review these MLH guidelines" }, min: { value: 2, errorMessage: "You must select both of these checkboxes" } }}>
                        <AvCheckbox name="mlh1" customInput onChange={() => { this.setState({ checkedState1: !this.state.checkedState1 }) }} label={<p>I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a></p>} value={"mlh1"} />
                        <AvCheckbox name="mlh2" customInput onChange={() => { this.setState({ checkedState2: !this.state.checkedState2 }) }} label={<p>I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. Further, I agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.</p>} value={"mlh2"} />
                    </AvCheckboxGroup>
                    {message}
                    <div style={{ width: "100%" }} align="right">
                        <Button style={{ backgroundColor: theme.accent[0], marginRight: 10 }} type="reset" >Clear</Button>
                        <Button style={{ backgroundColor: theme.primary[0] }} type="submit" >Update</Button>
                    </div>
                </AvForm>
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