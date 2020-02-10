import React, { Component } from "react";
import { Container, Row, Col, Button, Alert } from "reactstrap";
import { defaults, theme } from "../../../Defaults";
import { Icon } from "react-fa";
import Logo from "./Logo";
import { ProfileType } from "../../Profile";
import PropTypes from "prop-types";

/**
 * Home component for the landing page
 */
class Home extends Component {
    render() {
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
                    style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none", backgroundColor: theme.secondary[1] }}>
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
                        { defaults.volunteers.display &&
                                    <div className="skew-right"
                                        style={{ position: "absolute", bottom: -25, textAlign: "right", width: "100%", paddingRight: 5, fontSize: 12 }} >
                                            
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
                            {/* {navContainer} */}
                            { defaults.volunteers.display && <div>
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
    dismissAlert: PropTypes.func,
    isMobile: PropTypes.bool,
};

export default Home;
