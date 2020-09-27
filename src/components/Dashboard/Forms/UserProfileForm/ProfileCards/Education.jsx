import React, { Component } from "react";
import { FormGroup, Label, Button, Col, UncontrolledAlert } from "reactstrap";
import { AvForm, AvField,  } from "availity-reactstrap-validation";
import { Creatable, AsyncCreatable } from "react-select";
import CustomAVInput from "../CustomAVInput";
import { Icon } from "react-fa";
import { theme } from "../../../../../Defaults";
import request from "request";
import majors from "../majors.json";
import selectorOptions from "../selectorOptions.json";
import { ProfileType } from "../../../../Profile";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";

class Education extends Component {
    constructor(props) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.setState({
            user: JSON.parse(JSON.stringify(this.props.user)),
            edit: (this.props.user.registration_status === "unregistered"),
            schoolList: [],
            loading: false,
            majorList: majors.items.map(major => ({
                value: major,
                label: major
            })),
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
        // console.log(user);
        this.setState({
            user
        });
        // this.props.onChange(user);
    }

    
    
    submitUser = (user) => {
        this.setState({
            profileMSG: null,
            loading: true,
            user,
        }, () => {
            this.props.profile.Set(this.state.user, (err) => {
                this.setState({
                    edit: false,
                    loading: false,
                    profileMSG: err ?
                        { color: "danger", value: err } :
                        { color: "success", value: "Profile Updated!" }
                });
            });
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
                        <Col xs={(mobile) ? 12 : 8}>
                            <CustomAVInput name="school"
                                label="School *"
                                value={user.school}
                                validate={{ required: { value: true, errorMessage: "Invalid school" } }}>
                                <div className="forcestyle">
                                    <AsyncCreatable id="school"
                                        value={{ value: user.school, label: user.school }}
                                        onChange={(e) => { user.school = e.value; this.updateUser(user); }}
                                        cacheOptions
                                        defaultOptions={this.state.schoolList}
                                        options={["test"]}
                                        styles={{ noOptionsMessage: (base) => ({ ...base, visibility: "hidden" }) }}
                                        loadOptions={(inputValue, callback) => {
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
                            <AvField name="gy"
                                label="Graduation Year *"
                                type="number"
                                placeholder="yyyy"
                                value={user.grad_year}
                                onChange={(e) => { user.grad_year = e.target.value; this.updateUser(user); }}
                                validate={{
                                    required: { value: true, errorMessage: "Invalid graduation year" },
                                    max: { value: 2030, errorMessage: "Graduation year must be between 2020 and 2030" },
                                    min: { value: 2020, errorMessage: "Graduation year must be between 2020 and 2030" } }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="los"
                                label="Level of Study *"
                                value={user.level_of_study}
                                validate={{ required: { value: true, errorMessage: "Invalid level of study" } }}>
                                <div className="forcestyle">
                                    <Creatable id="los"
                                        value={{ value: user.level_of_study, label: user.level_of_study }}
                                        onChange={(e) => { user.level_of_study = e.value; this.updateUser(user); }}
                                        options={selectorOptions["Level of Study"]} />
                                </div>
                            </CustomAVInput>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <CustomAVInput name="major"
                                label="Major *"
                                value={user.major}
                                validate={{ required: { value: true, errorMessage: "Invalid major" } }}>
                                <div className="forcestyle">
                                    <Creatable isMulti
                                        id="los"
                                        value={(user.major.length > 0) ? (user.major.split(";").map(((val) => { return { value: val, label: val }; }))) : ([])}
                                        onChange={(e) => { let majors = ""; for (let i = 0; i < e.length; i++) { majors += ";" + e[i].value; } majors = majors.substring(1); user.major = majors; this.updateUser(user); }}
                                        options={this.state.majorList} />
                                </div>
                            </CustomAVInput>
                        </Col>
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
                        Education
                        <Button color="primary"
                            className="pill-btn"
                            style={{ position: "absolute", right: 40 }}
                            onClick={() => { this.setState({ edit: true }); }} ><Icon name="edit" /></Button>
                    </h4>
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
                </div>
            );
        }
    }
}


Education.propTypes = {
    user: {
        registration_status: PropTypes.string,
    },
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    mobile: PropTypes.bool,
    profile: ProfileType,
};

export default Education;
