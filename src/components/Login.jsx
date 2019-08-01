import React, { Component } from "react";
import { Input, InputGroup, InputGroupAddon, FormGroup, Button, FormText } from "reactstrap";
import { Icon } from "react-fa";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import { ProfileType } from "./Profile";
import PropTypes from "prop-types";

/**
 * Login application for "/login"
 */
class LoginPage extends Component {
    componentWillMount() {
        this.setState({
            loading: false,
            done: false,
            errors: "",
        });
    }

    render() {
        // Check if the user is already logged in
        if (this.props.profile.isLoggedIn || this.state.done) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <AuthForm
                errors={this.state.errors}
                label="Welcome to HackRU!"
                loading={this.state.loading}
                isMobile={this.props.isMobile}
                onSubmit={this.onSubmit}
                title="Log In"
            >
                <FormGroup row>
                    <InputGroup>
                        <Input required id="email" type="email" placeholder="email" />
                    </InputGroup>
                </FormGroup>
                <FormGroup row>
                    <InputGroup>
                        <Input required type="password" id="password" placeholder="password" />
                        <InputGroupAddon addonType="append">
                            <Button color="success" style={{ borderRadius: 0 }}>
                                <Icon name="chevron-right" />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                <FormText>
                    <Link to="/signup" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                        Not a member? Create an Account!
                    </Link>
                </FormText>
                <FormText>
                    <Link to="/forgot" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                        Forgot your password?
                    </Link>
                </FormText>
                <FormText>
                    <Link to="/" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                        Return Home
                    </Link>
                </FormText>
            </AuthForm>
        );
    }

    onSubmit = e => {
        e.preventDefault();
        if (!this.state.loading) {
            this.setState({
                loading: true,
                errors: "",
            });
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            this.props.profile.Login(email, password, msg => {
                if (msg) {
                    this.setState({
                        loading: false,
                        errors: msg,
                    });
                } else {
                    this.setState({
                        loading: false,
                        done: true,
                        errors: "",
                    });
                }
            });
        }
    };
}

LoginPage.propTypes = {
    profile: ProfileType,
    isMobile: PropTypes.bool,
};

export default LoginPage;
