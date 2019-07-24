import React, { Component } from "react";
import { Col, Input, InputGroup, InputGroupAddon, FormGroup, Button, FormText } from "reactstrap";
import { Icon } from "react-fa";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import PropTypes from "prop-types";

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
        if (this.props.profile.isLoggedIn || this.state.done) {
            return (<Redirect to="/dashboard" />);
        }
        return <AuthForm
            errors={this.state.errors}
            label="Join us at HackRU!"
            loading={this.state.loading}
            isMobile={this.props.isMobile}
            onSubmit={this.onSubmit}
            title="Sign Up"
        >
            <FormGroup row>
                <Col xs={6}
                    style={{ margin: 0, paddingLeft: 0, paddingRight: 7 }}>
                    <Input required
                        id="first"
                        type="text"
                        placeholder="first name" />
                </Col>
                <Col xs={6}
                    style={{ margin: 0, paddingRight: 0, paddingLeft: 7 }}>
                    <Input required
                        id="last"
                        type="text"
                        placeholder="last name" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Input required
                    type="email"
                    id="email"
                    placeholder="email" />
            </FormGroup>
            <hr style={{ background: "rgba(255, 255, 255, 0.25)" }} />
            <FormGroup row>
                <Input required
                    type="password"
                    id="password"
                    placeholder="password" />
            </FormGroup>
            <FormGroup row>
                <InputGroup>
                    <Input required
                        type="password"
                        id="conpassword"
                        placeholder="confirm password" />
                    <InputGroupAddon addonType="append">
                        <Button color="success"
                            style={{ borderRadius: 0 }}>
                            <Icon name="chevron-right" />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            <FormText>
                <Link to="/login"
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                    Already a member? Login!
                </Link>
            </FormText>
            <FormText>
                <Link to="/"
                    style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                    Return Home
                </Link>
            </FormText>
        </AuthForm>;
    }

    onSubmit = (e) => {
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
    }
}

SignUpPage.propTypes = {
    profile: {
        isLoggedIn: PropTypes.bool,
        SignUp: PropTypes.func,
    },
    isMobile: PropTypes.bool,
};

export default SignUpPage;
