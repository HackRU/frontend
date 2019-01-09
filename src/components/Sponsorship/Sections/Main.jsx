import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { defaults, sponsorshipLinks } from "../../../Defaults";
import { Parallax } from "react-scroll-parallax";
import { Icon } from "react-fa";
import LogoAnim from "./LogoAnim";

class Main extends Component {
    render() {
        let navSponsorship = [];
        let keys = Object.keys(sponsorshipLinks);
        for (let i = 0; i < keys.length; i++) {
            if (sponsorshipLinks[keys[i]].enabled && !sponsorshipLinks[keys[i]].hideLink) {
                navSponsorship.push(
                    <p className="lead" key={keys[i]}><a href={sponsorshipLinks[keys[i]].url} className="theme-home-link" style={{ textDecoration: "none" }}>{keys[i]}</a></p>
                )
            }
        }
        let navContainer = (
            <div>
                {navSponsorship}
                <hr style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", width: "100px" }} />
            </div>
        );

        if (!this.props.isMobile) {
            return (
                <Container fluid id="landing-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                    <Row style={{ minWidth: "100%", minHeight: "100vh" }} className="d-flex align-items-center">
                        <Col xs={2}></Col>
                        <Col xs={8} style={{ display: "block" }}>
                        <Row className="align-items-center" style={{paddingLeft: 110}}>
                            <LogoAnim src="./assets/icons/assetsSVG/whitegriffinasset.svg" />
                            <img width="300" src="./assets/icons/hru-logo-small-green.png" alt="logo"></img>
                            <LogoAnim src="./assets/icons/assetsSVG/whitegriffinassetleft.svg" />
                        </Row>
                            <h2 style={{ marginTop: 15 }} className="display-4 theme-font">Sponsor HackRU Spring 2019</h2>
                            <h2 className="lead theme-font"><Icon style={{ marginRight: 5 }} name="map-marker" /> {defaults.locationText}</h2>
                            <h2 className="lead theme-font"><Icon style={{ marginRight: 5 }} name="calendar" /> {defaults.dateText}</h2>
                        </Col>
                        <Col xs={2} style={{ overflow: "hidden", paddingTop: 10, paddingBottom: 10 }}>
                            <Parallax offsetXMin={-100} offsetXMax={100}>
                                {navContainer}
                            </Parallax>
                        </Col>
                        <div style={{ position: "absolute", bottom: 10, textAlign: "center", width: "100%", paddingBottom: 20 }}>
                            <Button href="#about" outline style={{ border: "none"}} ><Icon name="chevron-down" /> Explore</Button>
                        </div>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container fluid id="landing-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                    <Row style={{ minWidth: "100%", minHeight: "100vh" }} className="d-flex align-items-center">
                        <Col style={{ display: "block" }}>
                            <Row className="align-items-center" style={{paddingLeft: 80}}>
                                <LogoAnim src="./assets/icons/assetsSVG/whitegriffinasset.svg" />
                                <img width="300" src="./assets/icons/hru-logo-small-green.png" alt="logo"></img>
                                <LogoAnim src="./assets/icons/assetsSVG/whitegriffinassetleft.svg" />
                            </Row>
                            <h2 style={{ marginTop: -75 }} className="display-4 theme-font">Sponsor HackRU Spring 2019</h2>
                            <h2 className="lead theme-font"><Icon style={{ marginRight: 5 }} name="map-marker" /> {defaults.locationText}</h2>
                            <h2 className="lead theme-font"><Icon style={{ marginRight: 5 }} name="calendar" /> {defaults.dateText}</h2>
                            {navContainer}
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default Main;
