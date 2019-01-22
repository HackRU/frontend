import React, { Component } from "react";
import { Container, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, Button, FormText, Alert } from "reactstrap";
import { theme } from "../Defaults";
import { Icon } from "react-fa";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Redirect } from "react-router-dom";

/**
 * Login application for "/login"
 */
class LoginPage extends Component {
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
            return ( <Redirect to="/dashboard" />);
        }
        let innerText = "Welcome to HackRU!";
        let innerForm = (
            <div>
                <FormGroup row>
                    <InputGroup>
                        <Input required id="email" type="email" placeholder="email" />
                    </InputGroup>
                </FormGroup>
                <FormGroup row>
                    <InputGroup>
                        <Input required type="password" id="password" placeholder="password" />
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
                <h1 className="display-1 theme-font">Login</h1>
                <p className="lead">{innerText}</p>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    if (!this.state.loading) {
                        this.setState({
                            loading: true,
                            errors: ""
                        });
                        let email = document.getElementById("email").value;
                        let password = document.getElementById("password").value;
                        this.props.profile.Login(email, password, (msg) => {
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
                    <FormText><Link to="/signup" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Not a member? Create an Account!</Link></FormText>
                    <FormText><Link to="/forgot" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Forgot your password?</Link></FormText>
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

export default LoginPage;
