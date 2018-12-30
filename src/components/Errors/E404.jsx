import React, { Component } from 'react';
import { Container, Col } from "reactstrap";
import { theme } from "../../Defaults";
import { Link } from "react-router-dom";
class E404 extends Component {
    render() {
        return (
            <Container fluid style={{ width: "100%", height: "100vh", textAlign: "center", backgroundColor: theme.secondary[1] }} className="d-flex align-items-center">
                <Col />
                <Col xs={4} style={{ display: "block", zIndex: 3, color: "white", background: "rgba(255, 0, 0, 0.15)" }}>
                    <div style={{ padding: 30 }}>
                        <h1 className="display-1 theme-font">¯\_(ツ)_/¯, this page doesn't exist</h1>
                        <Link to="/" style={{ color: "white" }}><p className="lead">Click here to go back to land!</p></Link>
                    </div>
                </Col>
                <Col />
            </Container>
        );
    }
}

export default E404;
