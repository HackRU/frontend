import React, { Component } from "react";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    FormGroup,
    Button,
    FormText,
} from "reactstrap";
import { Icon } from "react-fa";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import PropTypes from "prop-types";

/**
 * Forgot my password application for "/forgot"
 */
class ForgotPage extends Component {
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
                label="A link has been sent to your email"
                loading={this.state.loading}
                isMobile={this.props.isMobile}
                onSubmit={this.onSubmit}
                title="Forgot Password"
            >
                <FormGroup row>
                    <InputGroup>
                        <Input
                            required
                            type="email"
                            id="email"
                            placeholder="email"
                        />
                        <InputGroupAddon addonType="append">
                            <Button color="success" style={{ borderRadius: 0 }}>
                                <Icon name="chevron-right" />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
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
            this.props.profile.Forgot(email, msg => {
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

ForgotPage.propTypes = {
    profile: {
        isLoggedIn: PropTypes.bool,
        Forgot: PropTypes.func,
    },
    isMobile: PropTypes.bool,
};

export default ForgotPage;
