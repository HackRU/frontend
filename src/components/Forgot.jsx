import React, { useState } from "react";
// import { Container, Grid, createMuiTheme, ThemeProvider} from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import ColorButton from "../library/ColorButton";
// import WhiteTextField from "../library/WhiteTextField";
import PropTypes from "prop-types";
// import { theme } from "../Defaults";

/**
 * Forgot my password application for "/forgot"
 */
// const color_theme = createMuiTheme({

//     overrides: {
//         palette: {
//             primary: {
//                 main: theme.primary[1].trim(),
//             },
//             secondary: {
//                 main: theme.secondary[1].trim(),
//             },
//         },
//         MuiInputLabel: {
//             root: {
//                 color: "white",
//                 "&$focused": {
//                     color: "white"
//                 }
//             }
//         }
//     }
// });


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
            props.profile.Forgot(email)
                .then((msg) => {
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
    if (props.profile.isLoggedIn) {
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
            { done ?
                <div>
                    <Alert variant="filled"
                        size="small"
                        severity="success"
                        onClose={() => {setDone(false);}}>
                        Link Sent!
                    </Alert>
                    <br/>
                </div>
                :
                <div/>
            }
            <Container
                conponent="main"
                style={{
                    zIndex: 2,
                }}
                maxWidth={false}
                disableGutters={true}>
                <Grid container
                    spacing={2}>
                    <Grid item
                        xs={12}>
                        {/* <ThemeProvider theme={color_theme}>
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
                        </ThemeProvider> */}
                        <div>
                        Please reach out to rnd@hackru.org to reset password
                        </div>
                    </Grid>
                    <Grid item
                        xs={12}>
                        {/* <ThemeProvider theme={color_theme}>
                            <ColorButton
                                size = "small"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary">
                                Submit
                            </ColorButton>

                        </ThemeProvider> */}
                        <a href="mailto:rnd@hackru.org?subject=[HackRU Password Reset]"
                            target="_blank"
                            rel="noopener noreferrer">
                            <ColorButton
                                size = "small"
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Email Us
                            </ColorButton>
                        </a>
                    </Grid>
                    <Grid item
                        xs={12}>
                        <div>
                            <Link to="/"
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                Return Home
                            </Link>
                        </div>
                        <div>
                            <Link to="/login"
                                style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                                Log in
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
