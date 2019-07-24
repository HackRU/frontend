import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { theme } from "../../Defaults.js";
import { Link } from "react-router-dom";
import Map from "./Map.jsx";
import Links from "./Links.jsx";
import Schedule from "./Schedule.jsx";
import Announcements from "./Announcements.jsx";
import { ProfileType } from "../../Profile";

class Live extends Component {
    render() {
        return (
            <Container fluid
                style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }}
                className="d-flex align-items-center">
                <div style={{ zIndex: 3, color: "white", width: "100%" }}
                    align="center">
                    <Container>
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0, paddingTop: 35 }}>
                            <Row>
                                <Col md={9}
                                    xs={12}>
                                    <h1 className="display-4 theme-font">HackRU Live</h1>
                                    <div style={{ display: "inline-block", marginRight: 20 }}>
                                        <p className="lead">
                                            <Link to="/"
                                                className="theme-home-link"
                                                style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>
                                                Home
                                            </Link>
                                        </p>
                                    </div>
                                    { this.props.profile.isLoggedIn ?
                                        [<div key={0}
                                            style={{ display: "inline-block", marginRight: 20 }}>
                                            <p className="lead">
                                                <Link to="/dashboard"
                                                    className="theme-home-link"
                                                    style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>
                                                    Dashboard
                                                </Link>
                                            </p>
                                        </div>,
                                        <div key={1}
                                            style={{ display: "inline-block", marginRight: 20 }}>
                                            <p className="lead">
                                                <Link to="/logout"
                                                    className="theme-home-link"
                                                    style={{ color: theme.accent[0] + "ff", textDecoration: "none" }}>
                                                    Logout
                                                </Link>
                                            </p>
                                        </div>] :
                                        [<div key={0}
                                            style={{ display: "inline-block", marginRight: 20 }}>
                                            <p className="lead">
                                                <Link to="/login"
                                                    className="theme-home-link"
                                                    style={{ color: theme.accent[0] + "ff", textDecoration: "none" }}>
                                                    Login
                                                </Link>
                                            </p>
                                        </div>] }
                                </Col>
                                <Col style={{ textAlign: "center" }}
                                    md={3}
                                    xs={12}>
                                    <img width="250"
                                        style={{ marginTop: 0 }}
                                        alt="logo"
                                        src="./assets/icons/hru-logo-green.svg" />
                                </Col>
                            </Row>
                        </div>
                        <hr  style={{ background: "rgba(255, 255, 255, 0.25)" }}/>
                        <Links />
                        <hr  style={{ background: "rgba(255, 255, 255, 0.25)" }}/>
                        <Announcements />
                        <hr style={{ background: "rgba(255, 255, 255, 0.25)" }} />
                        <Schedule />
                        <hr style={{ background: "rgba(255, 255, 255, 0.25)" }} />
                        <Map />
                    </Container>
                </div>
            </Container>
        );
    }
}

Live.propTypes = {
    profile: ProfileType,
};

export default Live;
