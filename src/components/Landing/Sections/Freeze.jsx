import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { TextGrid } from "../../AnimatedGrid";
class Freeze extends Component {
    render() {
        return (
            <Container fluid id="landing-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                <Row style={{ minWidth: "100%", minHeight: "100vh" }} className="d-flex align-items-center">
                    <div style={{ display: "block", position: "absolute", top: window.innerHeight / 2, left: (window.innerWidth / 2) - 325 }}>
                        <TextGrid text={"HACKRU WILL RETURN"} />
                    </div>
                </Row>
            </Container>
        )
    }
}
export default Freeze;