import React from "react";
import { Alert, Container, Col, Form } from "reactstrap";
import { RingLoader } from "react-spinners";
import { theme } from "../Defaults.js";
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
    <Container
        fluid
        style={{ width: "100%", minHeight: "100vh", textAlign: "center" }}
        className="d-flex align-items-center">
        { isMobile ? null : <Col /> }
        <Col
            xs={isMobile ? 12 : 3}
            style={{ display: "block", zIndex: 3, backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "50%", backgroundColor: theme.accent[0], width: 10 }}></div>
            <div style={{ position: "absolute", left: 0, top: "50%", height: "30%", backgroundColor: theme.primary[1], width: 10 }}></div>
            <div style={{ position: "absolute", left: 0, top: "80%", height: "20%", backgroundColor: theme.primary[0], width: 10 }}></div>
            <div style={{ padding: 30 }}>
                <h1 className="display-4 theme-font">{ title }</h1>
                <p className="lead">{loading ? label: ""}</p>
                <Form onSubmit={onSubmit}>
                    {renderErrors(errors)}
                    <div>
                        {loading ? renderSpinner(): children}
                    </div>
                </Form>
            </div>
        </Col>
        { isMobile ? null : <Col /> }
    </Container>
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
        <RingLoader color={theme.primary[0]} />
    </div>
);

const renderErrors = (errors) => (
    errors !== ""
        ? (<Alert
            style={{ background: "rgba(255, 0, 0, 0.25)", border: "none", color: "white" }}
            color="danger">
            {errors}
        </Alert>)
        : null
);

export default AuthForm;
