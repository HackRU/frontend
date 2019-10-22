import React, { Component } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import { TextGrid } from "../../AnimatedGrid";

class Freeze extends Component {
    constructor() {
        super();
        this._event_onResize = this._event_onResize.bind(this);
        window.addEventListener("resize", this._event_onResize);
    }
    _event_onResize() {
        if (this.refs.anime) {
            console.log(this.refs.anime.refs.grid.width);
            this.setState({
                subWidth: (this.refs.anime.refs.grid.width / 2) + 75
            });
        }
    }
    componentWillMount() {
        this.setState({
            subWidth: 325
        });
    }
    componentDidMount() {
        this._event_onResize();
    }
    render() {
        let leftPos = (window.innerWidth / 2) - this.state.subWidth + 10;
        return (
            <Container fluid
                id="landing-section"
                style={{ zIndex: 3,  width: "100%", minHeight: "100vh", userSelect: "none" }}>
                <Row style={{ minWidth: "100%", minHeight: "100vh", textAlign: "right" }} >
                    <div style={{ display: "block", position: "absolute", width: window.innerWidth - (2 * leftPos), top: window.innerHeight / 2, left: leftPos}}>
                        <TextGrid ref="anime"
                            text={"HACKRU WILL RETURN"} />
                        <br/>
                        <br/>
                        <i><h4>for Spring 2020</h4></i>
                        <br/>
                        <Row style={{ marginLeft: 8, width: "100%", backgroundColor: "rgba(0, 0, 0, 0.01)", padding: 10, textAlign: "center" }}>
                            <Col xs={6}>
                                <i><p style={{ marginBottom: 3, color: "rgba(255, 255, 255, 0.5)" }}>Stay in the know!</p></i>
                                <a href="https://hackru1.typeform.com/to/OEtQEO"><Button color="light" style={{ border: "none" }} outline>Join Mailing List</Button></a>
                            </Col>
                            <Col xs={6}>
                                <i><p style={{ marginBottom: 3, color: "rgba(255, 255, 255, 0.5)" }}>Past Submissions</p></i>
                                <a href="https://hackru-s19.devpost.com"><Button color="light" style={{ border: "none" }} outline>Spring 2019</Button></a>
                                <a href="https://hackru-f19.devpost.com"><Button color="light" style={{ border: "none" }} outline>Fall 2019</Button></a>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Container>
        );
    }
}
export default Freeze;
