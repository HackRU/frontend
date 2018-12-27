/**
 * @author Shivan Modha
 * @description The standard login page
 * @version 0.1.2
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Collapse, Form, FormGroup, Input, Label, ButtonGroup, Button, Col } from "reactstrap";
import { theme } from "../Defaults";
import { Redirect } from "react-router-dom";
import { BounceLoader, PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Icon } from "react-fa";
import Select, { Creatable } from "react-select";
import request from "request";
import majors from "./majors.json";
/***************************************************************IMPORTS***************************************************************/

/**************************************************************DASHBOARD**************************************************************/
/**
 * Application dashboard
 */
class Dashboard extends Component {
    componentWillMount() {
        let majorList = [];
        for (let i = 0; i < majors.items.length; i++) {
            majorList.push({ value: majors.items[i], label: majors.items[i] });
        }
        this.setState({
            loading: true,
            errors: [],
            user: null,
            openDetails: false,
            schoolList: [],
            majorList: majorList
        });
        this.props.profile.Get((msg, data) => {
            if (msg) {

            } else {
                if (data) {
                    console.log(data);
                    this.setState({
                        user: data,
                        loading: false
                    })
                }
            }
        });
        request.get("https://raw.githubusercontent.com/MLH/mlh-policies/master/schools.csv", {}, (error, response, body) => {
            let list = body.split("\n");
            let completeList = [];
            for (let i = 1; i < list.length; i++) {
                let itm = list[i];
                if (itm.startsWith("\"")) {
                    itm = itm.substring(1, itm.length - 2);
                }
                completeList.push({ value: itm, label: itm });
            }
            this.setState({
                schoolList: completeList
            });
        });
    }
    render() {
        // Authorized personal only!
        if (!this.props.profile.isLoggedIn) {
            return (<Redirect to="/login"/>)
        }
        if (this.state.loading) {
            return (
                <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                    <div style={{ width: "100%", color: "rgba(255, 255, 255, 0.1)" }} align="center">
                        <div style={{ display: "inline-block" }}>
                            <h1 className="display-1">L</h1>
                        </div>
                        <div style={{ display: "inline-block" }}>
                            <BounceLoader color="rgba(255, 255, 255, 0.1)" />
                        </div>
                        <div style={{ display: "inline-block" }}>
                            <h1 className="display-1">ading</h1>
                        </div>
                        <div style={{ display: "inline-block" }}>
                            <PulseLoader color="rgba(255, 255, 255, 0.1)" />
                        </div>
                        <p className="lead">Configuring your personalized dashboard</p>
                    </div>
                </Container>
            ); // This is such a sexy loading screen, I am totally going to use this again in my other applications
        }
        let user = this.state.user;
        let inputStyle = { backgroundColor: "rgba(255, 255, 255, 0.1)", border: "0", borderRadius: 0, color: "white" };
        let mobile = this.props.isMobile;
        return (
            <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                <div style={{ zIndex: 3, color: "white", width: "100%" }} align="center">
                    <Container>
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0 }}>
                            <h1 className="display-4 theme-font">Welcome, {user.first_name}</h1>
                            <div style={{ display: "inline-block", margin: 10 }}><p className="lead"><Link to="/" className="theme-home-link" style={{ color: theme.secondary[0] + "ff", textDecoration: "none" }}>Home</Link></p></div>
                            <div style={{ display: "inline-block", margin: 10 }}><p className="lead"><Link to="/logout" className="theme-home-link" style={{ color: theme.secondary[0] + "ff", textDecoration: "none" }}>Logout</Link></p></div>
                            <div style={{ display: "inline-block", margin: 10 }}><p className="lead"><a href="/resources/waiver.pdf" className="theme-home-link" style={{ color: theme.secondary[0] + "ff", textDecoration: "none" }}>Waiver</a></p></div>
                            <div style={{ display: "inline-block", margin: 10 }}><p className="lead"><a href="/resources/menu.pdf" className="theme-home-link" style={{ color: theme.secondary[0] + "ff", textDecoration: "none" }}>Food</a></p></div>
                        </div>
                        <div style={{ width: "100%", textAlign: "left" }}>
                            <p className="lead">Event Information</p>
                        </div>
                        <div style={{ width: "100%" }}>
                            <h1>¯\_(ツ)_/¯</h1>
                            <p>Check again later</p>
                        </div>
                        <div style={{ width: "100%", textAlign: "left" }}>
                            <p className="lead">User Profile</p>
                        </div>
                        <div style={{ width: "100%", textAlign: "left" }}>
                            <ListGroup>
                                <ListGroupItem tag="button" href="#" action style={{ background: theme.primary[0] + "2F", color: theme.primary[1] + "FF", borderRadius: 0 }} onClick={(e) => { this.setState({ openDetails: !this.state.openDetails }) }}>
                                    <ListGroupItemHeading>Basics</ListGroupItemHeading>
                                    <ListGroupItemText>Introduce yourself, don't be shy!</ListGroupItemText>
                                    <Icon style={{ position: "absolute", right: 25, top: 25 }} name={(this.state.openDetails) ? ("chevron-up") : ("chevron-down")} />
                                </ListGroupItem>
                                <Collapse isOpen={this.state.openDetails}>
                                    <ListGroupItem style={{ background: theme.primary[1] + "1F", borderRadius: 0 }}>
                                        <Form>
                                            <h4>About you</h4>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                        <Label for="first">First Name</Label>
                                                        <Input id="first" type="text" placeholder="John" style={inputStyle} />
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                        <Label for="last">Last Name</Label>
                                                        <Input id="last" type="text" placeholder="Doe" style={inputStyle} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 4}>
                                                    <Label for="number">Phone Number</Label>
                                                    <Input id="number" type="text" placeholder="(***) ***-****" style={inputStyle} />
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 4}>
                                                    <Label for="dob">Date of Birth</Label>
                                                    <Input id="dob" type="date" placeholder="mm/dd/yyyy" style={inputStyle} />
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 4}>
                                                    <Label for="size">Shirt Size</Label>
                                                    <div className="forcestyle">
                                                        <Select id="size" options={[
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
                                                        <Creatable id="gender" options={[
                                                            { value: "Female", label: "Female" },
                                                            { value: "Male", label: "Male" },
                                                            { value: "Other", label: "Other" },
                                                            { value: "Prefer not to say", label: "Prefer not to say"}]} />
                                                    </div>
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label for="ethnicity">Ethnicity</Label>
                                                    <div className="forcestyle">
                                                        <Creatable id="ethnicity" options={[
                                                            { value: "American Indian or Alaskan Native", label: "American Indian or Alaskan Native" },
                                                            { value: "Asian/Pacific Islander", label: "Asian/Pacific Islander" },
                                                            { value: "Black or African American", label: "Black or African American" },
                                                            { value: "White/Caucasian", label: "White/Caucasian" }]} />
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="github">GitHub Handle</Label>
                                                <Input id="github" type="text" placeholder="hackru" style={inputStyle} />
                                            </FormGroup>
                                            <h4>Education</h4>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 8}>
                                                    <Label for="school">School</Label>
                                                    <div className="forcestyle">
                                                        <Creatable id="school" options={this.state.schoolList} />
                                                    </div>
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 4}>
                                                    <Label for="gy">Graduation Year</Label>
                                                    <Input id="gy" type="number" placeholder="yyyy" style={inputStyle} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label for="los">Level of Study</Label>
                                                    <div className="forcestyle">
                                                        <Creatable id="los" options={[
                                                            { value: "University (Undergraduate)", label: "University (Undergraduate)" },
                                                            { value: "University (Graduate)", label: "University (Graduate)" },
                                                            { value: "Highschool", label: "Highschool" }]} />
                                                    </div>
                                                </Col>
                                                <Col xs={(mobile) ? 12 : 6}>
                                                    <Label for="los">Major</Label>
                                                    <div className="forcestyle">
                                                        <Creatable isMulti id="los" options={this.state.majorList} />
                                                    </div>
                                                </Col>
                                            </FormGroup>
                                            <h4>HackRU</h4>
                                            <FormGroup>
                                                <Label for="dr">Dietary Restrictions</Label>
                                                <Input id="dr" type="text" placeholder="Allergies? Vegetarian?" style={inputStyle} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="sn">Special Needs</Label>
                                                <Input id="sn" type="text" placeholder="Anything we should account for?" style={inputStyle} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="hear">How did you hear about HackRU?</Label>
                                                <div className="forcestyle">
                                                    <Creatable isMulti id="hear" options={[
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
                                                <Input id="sa" type="textarea" placeholder="" style={inputStyle} />
                                            </FormGroup>
                                            <h4>MLH Notices</h4>
                                            <FormGroup>
                                                <Input id="mlh1" type="checkbox" placeholder="" style={{...inputStyle, marginLeft: 5 }} />
                                                <Label style={{ marginLeft: 25, textAlign: "justify" }} for="mlh1">I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a></Label>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input id="mlh2" type="checkbox" placeholder="" style={{...inputStyle, marginLeft: 5 }} />
                                                <Label style={{ marginLeft: 25, textAlign: "justify" }} for="mlh2">I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>. Further, I agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy">MLH Privacy Policy</a>.</Label>
                                            </FormGroup>
                                            <div style={{ width: "100%" }} align="right">
                                                <ButtonGroup>
                                                    <Button type="reset" outline color="danger">Clear</Button>
                                                    <Button type="submit" color="success">Update</Button>
                                                </ButtonGroup>
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
/**************************************************************DASHBOARD**************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default Dashboard;
/***************************************************************EXPORTS***************************************************************/