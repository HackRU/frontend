import React from "react";
import { Alert } from "reactstrap";
import { Grid } from "@material-ui/core";
import { RingLoader } from "react-spinners";
import PropTypes from "prop-types";

/*
The basic form that authorization pages (sign up, log in, forgot password) use

Props:
- children: the body of the form itself
- errors: a list of possible errors when communicating with the backend
- label: indicate what the user should do
- loading: if the form is in a loading state, and should show a spinner
- isMobile: adjust the column widths for a mobile display
- onSubmit: the actual function of the form
- title: the form title
*/
const AuthForm = ({ children, errors, label, loading, isMobile, onSubmit, title }) => (
    <Grid
        container
        justify="center"
        alignItems="center"
        style={{ width: "100%", minHeight: "100vh", textAlign: "center" }}
        className="d-flex align-items-center ">
        { isMobile ? null : <Grid /> }
        <Grid
            item
            xs={isMobile ? 10 : 3}
            className = "transparent-black-background"
            style={{ display: "block", zIndex: 3, borderRadius: "18px", color: "white",  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
            <div style={{ padding: 30 }}>
                <h1 className="display-4 theme-font">{ title }</h1>
                <p className="lead">{loading ? label: ""}</p>
                <form onSubmit={onSubmit}>
                    {renderErrors(errors)}
                    <div>
                        {loading ? renderSpinner(): children}
                    </div>
                </form>
            </div>
        </Grid>
        { isMobile ? null : <Grid /> }
    </Grid>
);

AuthForm.propTypes = {
    children: PropTypes.node,
    errors: PropTypes.array,
    label: PropTypes.string,
    loading: PropTypes.bool,
    isMobile: PropTypes.bool,
    onSubmit: PropTypes.func,
    title: PropTypes.string,
};

const renderSpinner = () => (
    <div style={{ display: "block", width: "100%" }}
        align="center">
        <RingLoader color="#1583d2"/>
    </div>
);

const renderErrors = (errors) => (
    errors !== ""
        ? (<Alert
            style={{ background: "#1583d2", border: "none", color: "white" }}
            color="danger">
            {errors}
        </Alert>)
        : null
);

export default AuthForm;
