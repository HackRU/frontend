import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Announcements from "../Live/Announcements";
import { theme } from "../../Defaults.js";
import Countdown from "./Countdown";
import Schedule from "../Live/Schedule";

class Projector extends Component {
    render() {
        return (
            <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                <div style={{ zIndex: 3, color: "white", width: "100%", padding: 50 }} align="center">
                    <Container fluid>
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0, paddingTop: 35 }}>
                            <Row style={{ marginBottom: 125 }}>
                                <Col xs={4}>
                                    <h1 className="display-4">HackRU Ends in</h1>
                                    <Col md={9} xs={12}>
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
                                    <h1>Devpost: <a href="https://hackru-s19.devpost.com/">https://hackru-s19.devpost.com/</a></h1>
                                    <h1>HelpQ (Request Mentor): <a href="https://hackru-helpq.herokuapp.com/">https://hackru-helpq.herokuapp.com/</a></h1>
                                    <h1>Slack Signup: <a href="http://bit.ly/hackru-s19">http://bit.ly/hackru-s19</a></h1>
                                
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </Container>
        );
    }
}

export default Projector
