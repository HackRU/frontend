import React, { Component } from "react";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import { defaults, theme, navlinks } from "../../../Defaults";
import { Parallax } from "react-scroll-parallax";
import { Link } from "react-router-dom";
import { Icon } from "react-fa";
import Logo from "./Logo";
import { ProfileType } from "../../Profile";
import PropTypes from "prop-types";

/**
 * Home component for the landing page
 */
class Home extends Component {
    render() {
        let navigation = [];
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            if (navlinks[keys[i]].enabled && !navlinks[keys[i]].hideLink) {
                navigation.push(
                    <p className="lead"
                        key={keys[i]}><a href={navlinks[keys[i]].url}
                            className="theme-home-link"
                            style={{ color: theme.primary[0] + "ff", textDecoration: "none" }}>{keys[i]}</a></p>
                );
            }
        }
        let dashboardbtns = [];

        if (this.props.profile.isLoggedIn) {
            dashboardbtns.push(<p key={"p"}
                className="lead"><Link to="/dashboard"
                    className="theme-home-link"
                    style={{ color: theme.accent[1] + "ff", textDecoration: "none" }}>Dashboard</Link></p>);
            dashboardbtns.push(<p key={"o"}
                className="lead"><Link to="/logout"
                    className="theme-home-link"
                    style={{ color: theme.accent[1] + "ff", textDecoration: "none" }}>Logout</Link></p>);
        } else {
            dashboardbtns.push(<p key={"u"}
                className="lead"><Link to="/signup"
                    className="theme-home-link"
                    style={{ color: theme.accent[1] + "ff", textDecoration: "none" }}>Sign Up</Link></p>);
            dashboardbtns.push(<p key={"i"}
                className="lead"><Link to="/login"
                    className="theme-home-link"
                    style={{ color: theme.accent[1] + "ff", textDecoration: "none" }}>Login</Link></p>);
        }
        let livelink = [];
        livelink.push(<p key={"p"}
            className="lead"><Link to="/live"
                className="theme-home-link"
                style={{ color: theme.accent[0] + "ee", textDecoration: "none" }}>Live</Link></p>);

        let navContainer = (
            <div>
                {navigation}
                <hr style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", width: "100px" }} />
                {dashboardbtns}
                {defaults.dayof && 
                        <span>
                            <hr style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", width: "100px" }} />
                            {livelink}
                        </span>}
            </div>
        );
        let loggoutMsg = null;
        if (this.props.loggedout) {
            loggoutMsg = (<Alert style={{ border: "none", background: "rgba(0, 255, 0, 0.25)", color: "white" }}
                color="success"
                isOpen={this.props.loggedout}
                toggle={this.props.dismissAlert}>You are logged out</Alert>);
        }
        if (!this.props.isMobile) {
            return (
                <Container fluid
                    id="landing-section"
                    style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                    <Row style={{ minWidth: "100%", minHeight: "100vh" }}
                        className="d-flex align-items-center">
                        <Col xs={2}></Col>
                        <Col xs={8}
                            style={{ display: "block" }}>
                            {loggoutMsg}
                            <Logo noCircle
                                src="./assets/icons/hru-logo.svg" />
                            <h2 style={{ marginTop: 15 }}
                                className="display-4 theme-font">Hackathon at Rutgers University</h2>
                            <h2 className="lead theme-font"><Icon style={{ marginRight: 5 }}
                                name="map-marker" /> {defaults.locationText}</h2>
                            <h2 className="lead theme-font"><Icon style={{ marginRight: 5 }}
                                name="calendar" /> {defaults.dateText}</h2>
                        </Col>
                        <Col xs={2}
                            style={{ overflow: "hidden", paddingTop: 10, paddingBottom: 10 }}>
                            <Parallax offsetXMin={-100}
                                offsetXMax={100}>
                                {navContainer}
                            </Parallax>
                        </Col>
                        { defaults.volunteers.display &&

                                    <div className="skew-right"
                                        style={{ position: "absolute", bottom: -25, textAlign: "right", width: "100%", paddingRight: 5, fontSize: 12 }} >
                                        Want to help? Sign up to <a href={defaults.volunteers.vol_url}>volunteer</a> or <a href={defaults.volunteers.mentor_url}>mentor</a>!
                                    </div> }
                        <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, margin: "0 auto"}}>
                            <Button href="#about"
                                outline
                                style={{ border: "none", zIndex: 1 }} ><Icon name="chevron-down" /> More Information</Button>
                        </div>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container fluid
                    id="landing-section"
                    style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                    <Row style={{ minWidth: "100%", minHeight: "100vh" }}
                        className="d-flex align-items-center">
                        <Col style={{ display: "block", marginBottom: 20 }}>
                            {loggoutMsg}
                            <Logo noCircle
                                src="./assets/icons/hru-logo.svg" />
                            <h2 style={{ marginTop: -75 }}
                                className="display-4 theme-font">Hackathon at Rutgers University</h2>
                            <h2 className="lead theme-font"><Icon style={{ marginRight: 5 }}
                                name="map-marker" /> {defaults.locationText}</h2>
                            <h2 className="lead theme-font"><Icon style={{ marginRight: 5 }}
                                name="calendar" /> {defaults.dateText}</h2>
                            {navContainer}
                            { defaults.volunteers && <div>
                                    Want to help? Sign up to <a href={defaults.volunteers.vol_url}>volunteer</a> or <a href={defaults.volunteers.mentor_url}>mentor</a>!
                            </div>}
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

Home.propTypes = {
    profile: ProfileType,
    loggedout: PropTypes.bool,
    dismissAlert: PropTypes.bool,
    isMobile: PropTypes.bool,
};

export default Home;
