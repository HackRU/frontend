import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { theme } from "../../Defaults.js";
import { Link } from "react-router-dom";
import Map from "./Map.jsx";
import Links from "./Links.jsx";
class Live extends Component {
    render() {
        return (
            <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                <div style={{ zIndex: 3, color: "white", width: "100%" }} align="center">
                    <Container>
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0, paddingTop: 35 }}>
                            <Row>
                                <Col md={9} xs={12}>
                                    <h1 className="display-4 theme-font">HackRU Live</h1>
                                    <div style={{ display: "inline-block", marginRight: 20 }}>
                                        <p className="lead">
                                            <Link to="/" className="theme-home-link" style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>
                                                Home
                                            </Link>
                                        </p>
                                    </div>
                                    { this.props.profile.isLoggedIn ?
                                        [<div key={0} style={{ display: "inline-block", marginRight: 20 }}>
                                            <p className="lead">
                                                <Link to="/dashboard" className="theme-home-link" style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>
                                                    Dashboard
                                                </Link>
                                            </p>
                                        </div>,
                                        <div key={1} style={{ display: "inline-block", marginRight: 20 }}>
                                            <p className="lead">
                                                <Link to="/logout" className="theme-home-link" style={{ color: theme.accent[0] + "ff", textDecoration: "none" }}>
                                                    Logout
                                                </Link>
                                            </p>
                                        </div>] :
                                        [<div key={0} style={{ display: "inline-block", marginRight: 20 }}>
                                            <p className="lead">
                                                <Link to="/login" className="theme-home-link" style={{ color: theme.accent[0] + "ff", textDecoration: "none" }}>
                                                    Login
                                                </Link>
                                            </p>
                                        </div>] }
                                </Col>
                                <Col style={{ textAlign: "center" }} md={3} xs={12}>
                                    <img width="250"  style={{ marginTop: 0 }} alt="logo" src="./assets/icons/hru-logo-green.svg" />
                                </Col>
                            </Row>
                        </div>
                        <Links />
                        <div style={{ marginBottom: 10 }}>
                            <div style={{ width: "100%", textAlign: "left" }}>
                                <p className="lead">Announcements</p>
                            </div>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <div style={{ width: "100%", textAlign: "left" }}>
                                <p className="lead">Schedule</p>
                            </div>
                        </div>
                        <Map />
                    </Container>
                </div>
            </Container>
        );
    }
}
export default Live;