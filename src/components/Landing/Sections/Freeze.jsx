import React, { Component } from "react";
import { Container, Row, Button } from "reactstrap";
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
        return (
            <Container fluid id="landing-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                <Row style={{ minWidth: "100%", minHeight: "100vh" }} className="d-flex align-items-center">
                    <div style={{ display: "block", position: "absolute", top: window.innerHeight / 2, left: (window.innerWidth / 2) - this.state.subWidth }}>
                        <TextGrid ref="anime" text={"HACKRU WILL RETURN"} />
                        <div style={{ marginTop: 75 }}>
                            <Button outline color="light">Test</Button>
                        </div>
                    </div>
                </Row>
            </Container>
        );
    }
}
export default Freeze;