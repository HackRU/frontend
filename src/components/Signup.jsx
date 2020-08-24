import React, { Component } from "react";
// import { Col, Input, InputGroup, InputGroupAddon, FormGroup, FormText } from "reactstrap";
import { Container, Grid, TextField, Button, withStyles, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import PropTypes from "prop-types";

/**
 * Signup application for "/signup"
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


// const styles = theme => ({    
//     form: {
//         width: "100%",
//         marginTop: theme.spacing(3),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
//     multilineColor:{
//         color: "white !important"
//     },
// });
 


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

  
class SignUpPage extends Component {

    UNSAFE_componentWillMount() {
        this.setState({
            loading: false,
            done: false,
            errors: ""
        });
    }s

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
            <Container 
                conponent="main" 
                maxWidth={false}
                disableGutters={true}>
                <form noValidate>
                    <Grid container 
                        spacing={2}>
                        <Grid item 
                            xs={6}>
                            <ThemeProvider theme={theme}>
                                <CssTextField
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="first"
                                    label="first"
                                    autoFocus
                                    size="small"
                                />
                            </ThemeProvider>
                            
                        </Grid>
                        <Grid item 
                            xs={6}>
                            <CssTextField
                                name="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                id="last"
                                label="last"
                                size="small"
                            />
                        </Grid>
                        <Grid item 
                            xs={12}>
                            <CssTextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                name="email"
                                autoComplete="email"
                                size="small"
                            />
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
                            <CssTextField
                                variant="outlined"
                                required
                                fullWidth
                                name="conpassword"
                                label="confirm password"
                                type="password"
                                id="conpassword"
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
                                    
                                    Sign Up
                                </ColorButton>

                            </ThemeProvider>

                            
                        </Grid>
                        <Grid item 
                            xs={12}>
                            <div>
                                <Link to="/login"
                                    style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                    Already a member? Login!
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
            let firstName = document.getElementById("first").value;
            let lastName = document.getElementById("last").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("conpassword").value;
            // console.log(firstName, lastName, email, password, confirmPassword);
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
    classes: PropTypes.object
};

export default SignUpPage;
