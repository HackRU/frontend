import React, { Component } from "react";
import { Container, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, Button, FormText, Alert } from "reactstrap";
import { theme } from "../Defaults";
import { Icon } from "react-fa";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Redirect } from "react-router-dom";

/**
 * Signup application for "/signup"
 */
class SignUpPage extends Component {
    componentWillMount() {
        this.setState({
            loading: false,
            done: false,
            errors: ""
        });
    }
    render() {
        // Check if the user is already logged in
        if (this.props.profile.isLoggedIn) {
            return (<Redirect to="/dashboard" />);
        }
        let innerText = "Join us at HackRU!";
        let innerForm = (
            <div>
                <FormGroup row>
                    <Col xs={6} style={{ margin: 0, paddingLeft: 0, paddingRight: 7 }}>
                        <Input required id="first" type="text" placeholder="first name" />
                    </Col>
                    <Col xs={6} style={{ margin: 0, paddingRight: 0, paddingLeft: 7 }}>
                        <Input required id="last" type="text" placeholder="last name" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Input required type="email" id="email" placeholder="email" />
                </FormGroup>
                <hr style={{ background: "rgba(255, 255, 255, 0.25)" }} />
                <FormGroup row>
                    <Input required type="password" id="password" placeholder="password" />
                </FormGroup>
                <FormGroup row>
                    <InputGroup>
                        <Input required type="password" id="conpassword" placeholder="confirm password" />
                        <InputGroupAddon addonType="append">
                            <Button color="success" style={{ borderRadius: 0 }}><Icon name="chevron-right" /></Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </div>
        );
        if (this.state.loading) {
            innerForm = (<div style={{ display: "block", width: "100%" }} align="center"><RingLoader color={theme.primary[0]} /> </div>);
            innerText = "";
        }
        if (this.state.done) {
            innerForm = (<Redirect to="/dashboard" />)
            innerText = "";
        }
        let errors = null;
        if (this.state.errors !== "") {
            errors = (<Alert style={{ background: "rgba(255, 0, 0, 0.25)", border: "none", color: "white" }} color="danger">{this.state.errors}</Alert>)
        }
        let contents = (
            <div style={{ padding: 30 }}>
                <h1 className="display-1 theme-font">Sign Up</h1>
                <p className="lead">{innerText}</p>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    if (!this.state.loading) {
                        this.setState({
                            loading: true,
                            errors: ""
                        });
                        let firstName = document.getElementById("first").value;
                        let lastName = document.getElementById("last").value;
                        let email = document.getElementById("email").value;
                        let password = document.getElementById("password").value;
                        let confirmPassword = document.getElementById("conpassword").value;
                        this.props.profile.SignUp(firstName, lastName, email, password, confirmPassword, (msg) => {
                            if (msg) {
                                this.setState({
                                    loading: false,
                                    errors: msg
                                });
                            } else {
                                this.setState({
                                    loading: false,
                                    done: true,
                                    errors: ""
                                });
                            }
                        });
                    }
                }}>
                    {errors}
                    {innerForm}
                    <FormText><Link to="/login" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Already a member? Login!</Link></FormText>
                    <FormText><Link to="/" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Return Home</Link></FormText>
                </Form>
            </div>
        );
        if (!this.props.isMobile) {
            return (
                <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                    <Col />
                    <Col xs={3} style={{ display: "block", zIndex: 3, color: "white", background: "rgba(255, 255, 255, 0.05)" }}>
                        {contents}
                    </Col>
                    <Col />
                </Container>
            );
        } else {
            return (
                <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                    <Col xs={12} style={{ display: "block", zIndex: 3, color: "white", background: "rgba(255, 255, 255, 0.05)" }}>
                        {contents}
                    </Col>
                </Container>
            );
        }
    }
}

export default SignUpPage;
