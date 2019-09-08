import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { defaults, theme } from "../../../Defaults";
import { sponsorshipLinks } from "../SponsorshipConfig";
import { Parallax } from "react-scroll-parallax";
import { Icon } from "react-fa";

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
            </div>
        );

        if (!this.props.isMobile) {
            return (
                <Container fluid id="sponsorship-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                    <Row style={{ minWidth: "100%", minHeight: "100vh" }} className="d-flex align-items-center">
                        <Col xs={2}></Col>
                        <Col xs={8} style={{ display: "block" }}>
                            <h2 style={{ marginTop: 20, color: theme.primary[0] }} className="display-1">Sponsor HackRU</h2>
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
                <Container fluid id="sponsorship-section" style={{ zIndex: 3, width: "100%", minHeight: "100vh", textAlign: "center", userSelect: "none" }}>
                    <Row style={{ minWidth: "100%", minHeight: "100h" }} className="d-flex align-items-center">
                        <Col style={{ display: "block" }}>
                        <div className="row" style={{display:"flex"}}>
                            <div style={{flex: 33.33}}><img width="300" src="./assets/icons/hru-logo-small-green.png" alt="logo"></img></div>
                        </div>
                            <h2 style={{ marginTop: -10 }} className="display-5 theme-font">Sponsor HackRU Spring 2019</h2>
                            <h2 style={{ marginTop: 25 }} className="lead theme-font"><Icon style={{ marginRight: 5 }} name="map-marker" /> {defaults.locationText}</h2>
                            <h2 style={{ marginTop: 5, marginBottom: 25 }} className="lead theme-font"><Icon style={{ marginRight: 5 }} name="calendar" /> {defaults.dateText}</h2>
                            <hr style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", width: "100px" }} />
                            {navContainer}
                            <hr style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", width: "100px" }} />
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default Main;
