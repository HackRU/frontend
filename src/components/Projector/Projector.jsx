import React from "react";
import { Container, Row, Col } from "reactstrap";
import Announcements from "../Live/Announcements";
import { theme } from "../../Defaults.js";
import Countdown from "./Countdown";
import Schedule from "../Live/Schedule";
import PropTypes from "prop-types";

const Projector = () => (
    <Container fluid
        style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }}
        className="d-flex align-items-center">
        <div style={{ zIndex: 3, color: "white", width: "100%", padding: 50 }}
            align="center">
            <Container fluid>
                <div style={{ width: "100%", textAlign: "left", marginBottom: 0, paddingTop: 35 }}>
                    <Row style={{ marginBottom: 125 }}>
                        <Col xs={4}>
                            <h1 className="display-4">HackRU Ends in</h1>
                            <Col md={9}
                                xs={12}>
                                <Countdown />
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="display-4">Announcements</h1>
                            <Announcements hide />
                        </Col>
                        <Col>
                            <h1 className="display-4">Up Next</h1>
                            <Schedule hide />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="display-4 mb-4">Helpful Links</h1>
                            <ProjectorLink
                                label="Devpost"
                                target="https://hackru-f19.devpost.com/" />
                            <ProjectorLink
                                label="HelpQ"
                                target="https://help.hackru.org" />
                            <ProjectorLink
                                label="Slack Signup"
                                target="https://tinyurl.com/hackru-f19" />
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </Container>
);

const ProjectorLink = ({ label, target }) => (
    <h1> {label}: <a href={target}>{target}</a> </h1>
);

ProjectorLink.propTypes = {
    label: PropTypes.string,
    target: PropTypes.string,
};

export default Projector;
