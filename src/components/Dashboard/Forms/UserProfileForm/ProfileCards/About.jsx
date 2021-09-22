import React, { Component } from "react";
import { FormGroup, Label, Button, Col, UncontrolledAlert } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select, { Creatable } from "react-select";
import CustomAVInput from "../CustomAVInput";
import { Icon } from "react-fa";
import { theme } from "../../../../../Defaults";
import selectorOptions from "../selectorOptions.json";
import { ProfileType } from "../../../../Profile";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";


class About extends Component {
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

        update_user.first_name = this.state.user.first_name;
        update_user.last_name = this.state.user.last_name;
        update_user.phone_number = this.state.user.phone_number;
        update_user.date_of_birth = this.state.user.date_of_birth;
        update_user.shirt_size = this.state.user.shirt_size;
        update_user.gender = this.state.user.gender;
        update_user.ethnicity = this.state.user.ethnicity;
        update_user.hackathon_count = this.state.user.hackathon_count;
        
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
        let mobile = this.props.mobile;
        let user = this.state.user;
        let message = null;
        if (this.state.message) {
            message = (<UncontrolledAlert color="danger">{this.state.message}</UncontrolledAlert>);
        }
        if (this.state.edit) {
            return (
                <AvForm
                    onValidSubmit={() => {
                        this.submitUser(this.state.user);
                    }}
                    onInvalidSubmit={() => {
                        this.setState({ message: null }, () => { this.setState({ message: "Some fields are invalid." }); });
                    }}>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <AvField name="first"
                                label="First Name *"
                                type="text"
                                placeholder="John"
                                value={user.first_name}
                                onChange={(e) => { user.first_name = e.target.value; this.updateUser(user); }}
                                validate={{
                                    required: { value: true, errorMessage: "Invalid first name" },
                                    pattern: { value: "^[A-Za-z0-9]+$", errorMessage: "Invalid character" },
                                    minLength: { value: 1, errorMessage: "Invalid length" },
                                    maxLength: { value: 100, errorMessage: "Invalid length" } }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <AvField name="last"
                                label="Last Name *"
                                type="text"
                                placeholder="Doe"
                                value={user.last_name}
                                onChange={(e) => { user.last_name = e.target.value; this.updateUser(user); }}
                                validate={{
                                    required: { value: true, errorMessage: "Invalid last name" },
                                    pattern: { value: "^[A-Za-z0-9]+$", errorMessage: "Invalid character" },
                                    minLength: { value: 1, errorMessage: "Invalid length" },
                                    maxLength: { value: 100, errorMessage: "Invalid length" } }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 4}>
                            <AvField name="number"
                                label="Number *"
                                type="text"
                                placeholder="(***) ***-****"
                                value={user.phone_number}
                                onChange={(e) => { user.phone_number = e.target.value; this.updateUser(user); }}
                                validate={{
                                    required: { value: true,  errorMessage: "Invalid number"},
                                    pattern: { value: "^[\\+]?[0-9]{0,3}?[-\\s\\.]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", errorMessage: "Invalid number" } }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <AvField name="dob"
                                label="Date of Birth *"
                                type="date"
                                placeholder="mm/dd/yyyy"
                                value={user.date_of_birth}
                                onChange={(e) => { user.date_of_birth = e.target.value; this.updateUser(user); }}
                                validate={{
                                    required: { value: true, errorMessage: "Invalid date of birth" },
                                    dateRange: {
                                        format: "MM/DD/YYYY",
                                        start: {
                                            value: "01/01/1920"
                                        },
                                        end: {
                                            value: "10/16/2003"
                                        }
                                    } }} />
                        </Col>
                        <Col xs={(mobile) ? 12 : 4}>
                            <CustomAVInput name="size"
                                label="Shirt Size *"
                                value={user.shirt_size}
                                validate={{ required: { value: true, errorMessage: "Invalid shirt size" } }}>
                                <div className="forcestyle">
                                    <Select required
                                        id="size"
                                        value={{ value: user.shirt_size, label: user.shirt_size }}
                                        onChange={(e) => { user.shirt_size = e.value; this.updateUser(user); }}
                                        options={selectorOptions["Shirt Size"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="gender"
                                label="Gender *"
                                value={user.gender}
                                validate={{ required: { value: true, errorMessage: "Invalid input"} }}>
                                <div className="forcestyle">
                                    <Creatable id="gender"
                                        value={{ value: user.gender, label: user.gender }}
                                        onChange={(e) => { user.gender = e.value; this.updateUser(user); }}
                                        options={selectorOptions["Gender"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="ethnicity"
                                label="Ethnicity *"
                                value={user.ethnicity}
                                validate={{ required: { value: true, errorMessage: "Invalid input" } }}>
                                <div className="forcestyle">
                                    <Creatable id="ethnicity"
                                        value={{ value: user.ethnicity, label: user.ethnicity }}
                                        onChange={(e) => { user.ethnicity = e.value; this.updateUser(user); }}
                                        options={selectorOptions["Ethnicity"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <AvField name="hackathon_count"
                            label="How many hackathons have you attended? *"
                            type="number"
                            // placeholder=""
                            value={user.hackathon_count}
                            onChange={(e) => { user.hackathon_count = e.target.value; this.updateUser(user); }}
                            validate={{
                                required: { value: true, errorMessage: "Invalid hackathon count" },
                                min: { value: 0, errorMessage: "Hackathon count must be non-negative" } }} />
                    </FormGroup>
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


About.propTypes = {
    user: {
        registration_status: PropTypes.string,
    },
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    mobile: PropTypes.bool,
    profile: ProfileType,
};

export default About;
