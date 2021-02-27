import React, { useState } from "react";
import { Container, Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import ColorButton from "../library/ColorButton";
import WhiteTextField from "../library/WhiteTextField";
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
        },
    },
});

  
const SignUpPage = (props) => {

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            setErrors("");
            let firstName = document.getElementById("first").value;
            let lastName = document.getElementById("last").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("conpassword").value;
            props.profile.SignUp(firstName, lastName, email, password, confirmPassword).then((msg) => {
                if (msg.error) {
                    setLoading(false);
                    setErrors(msg.error);
                } else {
                    setLoading(false);
                    setDone(true);
                    setErrors("");
                }
            });
        }
    };

    // Check if the user is already logged in
    if (props.profile.isLoggedIn || done) {
        return (<Redirect to="/profile" />);
    }

    return (

        <AuthForm
            errors={errors}
            label="Join us at HackRU!"
            loading={loading}
            isMobile={props.isMobile}
            onSubmit={onSubmit}
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
                                <WhiteTextField
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
                            <WhiteTextField
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
                            <WhiteTextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                size="small"
                            />
                        </Grid>
                        <Grid item 
                            xs={12}>
                            <WhiteTextField
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
                            <WhiteTextField
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
        </AuthForm>
    );

    
};

SignUpPage.propTypes = {
    profile: {
        isLoggedIn: PropTypes.bool,
        SignUp: PropTypes.func,
    },
    isMobile: PropTypes.bool,
    classes: PropTypes.object
};

export default SignUpPage;
