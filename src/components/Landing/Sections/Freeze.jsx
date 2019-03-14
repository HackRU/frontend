import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
class Freeze extends Component {
    render() {
        return (
            <Container fluid id="landing-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                <Row style={{ minWidth: "100%", minHeight: "100vh" }} className="d-flex align-items-center">
                    <Col xs={2}></Col>
                    <Col xs={8} style={{ display: "block" }}>
                        
                    </Col>
                    <Col xs={2}></Col>
                </Row>
            </Container>
        )
    }
}
export default Freeze;