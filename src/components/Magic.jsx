import React, { Component } from "react";
import { Container, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, Button, FormText, Alert } from "reactstrap";
import { theme } from "../Defaults";
import { Icon } from "react-fa";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Redirect } from "react-router-dom";
/**
 * Magic link handler component
 */
class MagicPage extends Component {
    constructor(props) {
        super(props);
        this.renderForgot = this.renderForgot.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
    }
    componentWillMount() {
        let mlurl = this.props.match.params.mlurl;
        this.props.setMagic(mlurl);
        this.setState({
            loading: false,
            done: false,
            errors: ""
        });
    }
    /**
     * Default render method, which will check to see what will render
     */
    render() {
        let mlurl = this.props.match.params.mlurl;
        if (mlurl.includes("forgot-")) {
            return this.renderForgot();
        } else {
            return this.renderLogin();
        }
    }
    /**
     * Forgot Password
     */
    renderForgot() {
        let innerText = "Change your password";
        let innerForm = (
            <div>
                <FormGroup row>
                    <InputGroup>
                        <Input required id="email" type="email" placeholder="email" />
                    </InputGroup>
                </FormGroup>
                <FormGroup row>
                    <InputGroup>
                        <Input required id="password" type="password" placeholder="new password" />
                    </InputGroup>
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
            innerForm = <FormText><Link to="/login" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Login</Link></FormText>;
            innerText = "Password changed!";
        }
        let errors = null;
        if (this.state.errors !== "") {
            errors = (<Alert style={{ background: "rgba(255, 0, 0, 0.25)", border: "none", color: "white" }} color="danger">{this.state.errors}</Alert>)
        }
        let contents = (
            <div style={{ padding: 30 }}>
                <h1 className="display-1 theme-font">Reset</h1>
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
                        let conpass = document.getElementById("conpassword").value;
                        this.props.profile.Reset(email, password, conpass, this.props.match.params.mlurl.replace("forgot-", "forgot-"), (msg) => {
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
    /**
     * Render login component
     */
    renderLogin() {
        return <Redirect to="/login" />
    }
}

export default MagicPage;
