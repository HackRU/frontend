import React, { useState } from "react";
import { Container, Grid, createMuiTheme, ThemeProvider} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import ColorButton from "../library/ColorButton";
import WhiteTextField from "../library/WhiteTextField";
import PropTypes from "prop-types";

/**
 * Forgot my password application for "/forgot"
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
            }
        }
    }
});


const ForgotPage = (props) => {

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            setErrors("");
            let email = document.getElementById("email").value;
            props.profile.Forgot(email, (msg) => {
                if (msg) {
                    setLoading(false);
                    setErrors(msg);
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
        return (<Redirect to="/dashboard" />);
    }


    return (
        
        <AuthForm
            errors={errors}
            label="A link is being sent to your email"
            loading={loading}
            isMobile={props.isMobile}
            onSubmit={onSubmit}
            title="Forgot Password"
        >
            <Container
                conponent="main" 
                maxWidth={false}
                disableGutters={true}>
                <Grid container 
                    spacing={2}>
                    <Grid item 
                        xs={12}>
                        <ThemeProvider theme={theme}>
                            <WhiteTextField
                                variant="outlined"
                                autofocus
                                required
                                fullWidth
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
                        <ThemeProvider>
                            <ColorButton
                                size = "small"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Submit
                            </ColorButton>

                        </ThemeProvider>
                    </Grid>
                    <Grid item 
                        xs={12}>
                        <div>
                            <Link to="/"
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                Return Home
                            </Link>
                        </div>
                    </Grid>
                </Grid>
               
            </Container>

        </AuthForm>
    );

    
};

ForgotPage.propTypes = {
    profile: {
        isLoggedIn: PropTypes.bool,
        Forgot: PropTypes.func,
    },
    isMobile: PropTypes.bool,
};

export default ForgotPage;
