import React, { Component } from "react";
// import { Input, InputGroup, InputGroupAddon, FormGroup, Button, FormText } from "reactstrap";
import { Container, Grid, TextField, Button, withStyles, createMuiTheme, ThemeProvider} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
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
            },
            input: {
                color: "white"
            }
        }
    }
});

const ColorButton = withStyles(() => ({
    root: {
        color: "white",
        backgroundColor: "#4fab5f",
        "&:hover": {
            backgroundColor: "#4fab5f",
        },
    },
}))(Button);

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

class ForgotPage extends Component {
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
            label="A link has been sent to your email"
            loading={this.state.loading}
            isMobile={this.props.isMobile}
            onSubmit={this.onSubmit}
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
                            <CssTextField
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
            this.props.profile.Forgot(email, (msg) => {
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

ForgotPage.propTypes = {
    profile: {
        isLoggedIn: PropTypes.bool,
        Forgot: PropTypes.func,
    },
    isMobile: PropTypes.bool,
};

export default ForgotPage;
