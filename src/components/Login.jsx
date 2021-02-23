import React, { useState } from "react";
import { Container, Grid, createMuiTheme, ThemeProvider} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import ColorButton from "../library/ColorButton";
import WhiteTextField from "../library/WhiteTextField";
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
        },
    },
});


const LoginPage = (props) => {

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            setErrors("");
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let msg = await props.profile.Login(email, password);
            if (msg.error) {
                setLoading(false);
                setErrors(msg.error);
            } else {
                setLoading(false);
                setDone(true);
                setErrors("");
            }
        }
    };
    
    // Check if the user is already logged in
    if (props.profile.isLoggedIn || done) {
        return (<Redirect to="/dashboard" />);
    }

    return (
        
        
        <AuthForm
            errors={errors}
            label="Welcome to HackRU!"
            loading={loading}
            isMobile={props.isMobile}
            onSubmit={onSubmit}
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
                                <WhiteTextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                    id="email"
                                    label="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    size="small"
                                />
                            </ThemeProvider>
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
        </AuthForm>
    );

    
};

LoginPage.propTypes = {
    profile: ProfileType,
    isMobile: PropTypes.bool,
};

export default LoginPage;
