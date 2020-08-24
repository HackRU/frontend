import React, { Component } from "react";
// import { Input, InputGroup, InputGroupAddon, FormGroup, Button, FormText } from "reactstrap";
import { Container, Grid, TextField, Button, withStyles, createMuiTheme, ThemeProvider} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import { ProfileType } from "./Profile";
import PropTypes from "prop-types";
/**
 * Login application for "/login"
 */

const theme = createMuiTheme({
    
    overrides: {
        pallate: {
            primary: "white",
            secondary: "green"
        },
        MuiInputLabel: { 
            root: { 
                color: "white",
                "&$focused": { 
                    color: "white"
                }
            },
            input: {
                color: "white"
            }
        }
    }
});

const CssTextField = withStyles({
    root: {
        "& labl.Mui-focused": {
            color: "white",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white",
                color: "white",
            },
            "&:hover fieldset": {
                borderColor: "white",
            },
            "&.Mui-focused fieldset": {
                borderColor: "white",
            },
        },
        "& .MuiInputBase-root.Mui-disabled": {
            color: "white"
        },
        "& .MuiFormLabel-root.Mui-disabled": {
            color: "white"
        },
    },
})(TextField);

const ColorButton = withStyles(() => ({
    root: {
        color: "white",
        backgroundColor: "#4fab5f",
        "&:hover": {
            backgroundColor: "#4fab5f",
        },
    },
}))(Button);

class LoginPage extends Component {
    UNSAFE_componentWillMount() {
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
            label="Welcome to HackRU!"
            loading={this.state.loading}
            isMobile={this.props.isMobile}
            onSubmit={this.onSubmit}
            title="Log In"
        >

            <Container
                conponent="main" 
                maxWidth={false}
                disableGutters={true}>
                <form noValidate>
                    <Grid container 
                        spacing={2}>
                        <Grid item 
                            xs={12}>
                            <ThemeProvider theme={theme}>
                                <CssTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                    id="email"
                                    label="email"
                                    name="email"
                                    autoComplete="email"
                                    size="small"
                                />
                            </ThemeProvider>
                        </Grid>
                        <Grid item 
                            xs={12}>
                            <CssTextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                size="small"
                            />
                        </Grid>
                        <Grid item 
                            xs={12}>
                            <ThemeProvider>
                                <ColorButton
                                    size = "small"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary">    
                                    Log In
                                </ColorButton>
                            </ThemeProvider>
                        </Grid>
                        <Grid item 
                            xs={12}>
                            <div>
                                <Link to="/signup"
                                    style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                Not a member? Create an Account!
                                </Link>
                            </div>
                            <div>
                                <Link to="/forgot"
                                    style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                Forgot your password?
                                </Link>
                            </div>
                            <div>
                                <Link to="/"
                                    style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                Return Home
                                </Link>
                            </div>

                        </Grid>
                    </Grid>
                </form>
            </Container>
        </AuthForm>;
    }

    onSubmit = (e) => {
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
    }
}

LoginPage.propTypes = {
    profile: ProfileType,
    isMobile: PropTypes.bool,
};

export default LoginPage;
