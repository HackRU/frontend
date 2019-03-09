import React from 'react';
import { Container, Row, Col } from "reactstrap";
import Announcements from '../Live/Announcements';
import { theme } from "../../Defaults.js";
import Countdown from './Countdown';

const Projector = () => (
    <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
        <div style={{ zIndex: 3, color: "white", width: "100%" }} align="center">
            <Row>
                <Col xs={6}>
                    <Announcements />
                </Col>
                <Col xs={6}>
                    <h1> Hacking Time Remaining </h1>
                    <h1>
                        <Countdown />
                    </h1>
                </Col>
            </Row>
        </div>
    </Container>
)

export default Projector
