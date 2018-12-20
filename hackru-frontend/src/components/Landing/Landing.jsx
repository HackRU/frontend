/**
 * @author Shivan Modha
 * @description The website homepage, which will be the first thing that new users see
 * @version 0.0.1
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./Navigation";
import Home from "./Sections/Home";
import HomePOC from "./Sections/HomePOC";
import Aliens from "./Aliens";
import { ParallaxProvider } from "react-scroll-parallax";
import { defaults, navlinks, theme } from "../../Defaults";
import ScrollableAnchor from "react-scrollable-anchor";
import { Icon } from "react-fa";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * This is the first thing that users will see. It will include information about the upcoming hackathon, an about section, and other
 * things that need to be shown on the homepage
 */
class LandingPage extends Component {
    render() {
        let sectionStyle = {
            //minHeight: "100vh",
        }
        let sectionClasses = "col-lg-8 offset-lg-2 col-xs-12 offset-xs-0 skew-left color-priority";

        let rows = [];
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            if (navlinks[keys[i]].enabled) {
                let url = navlinks[keys[i]].url.substring(1);
                let component = navlinks[keys[i]].component;
                if (i % 2 === 0) {
                    rows.push((
                        <ScrollableAnchor key={url} id={url}>
                            <div>
                                <Row style={{ ...sectionStyle }}> 
                                    <div className="bg-gradient-right skew-right" >
                                        <div className={sectionClasses}>
                                            {component}
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </ScrollableAnchor>
                    ));
                } else {
                    rows.push((
                        <ScrollableAnchor key={url} id={url}>
                            <Row style={{ ...sectionStyle }}> 
                                <div className="bg-no-gradient skew-right" >
                                    <div className={sectionClasses}>
                                        {component}
                                    </div>
                                </div>
                            </Row> 
                        </ScrollableAnchor>
                    ));
                } 
            }
        }
        if (!defaults.poc) {
            return (
                <Container id="LandingPage" fluid>
                    <Navigation />
                    <Row id="section" style={{ ...sectionStyle, background: "url(./assets/splash-bg-lowglow.png)", backgroundSize: "cover" }}>   
                        <Home />   
                    </Row>
                    {rows}
                </Container>
            );
        } else {
            return (
                <Container id="LandingPage" fluid style={{ ...sectionStyle, backgroundColor: theme.secondary[1] }}>
                    <ParallaxProvider>
                    <div style={{ position: "fixed", zIndex: 1, width: "100%", height: "100%", left: 0, top: 0, opacity: 0.5 }}>
                        <Aliens />
                    </div>
                    <div style={{ position: "fixed", zIndex: 2, width: "100%", height: "100%", left: 0, top: 0, background: "url(./assets/background.png)", backgroundSize: "cover", opacity: 0.5 }}>

                    </div>
                    <ScrollableAnchor id="home">
                        <div>
                            <Row id="section" style={{ ...sectionStyle }}>
                                <HomePOC />
                            </Row>
                        </div>
                    </ScrollableAnchor>
                    {rows}
                    </ParallaxProvider>
                    <div>
                        <Row style={{ height: 250, overflowY: "hidden", marginTop: -100 }}>
                            <div className="bg-gradient-right skew-right" style={{ marginTop: 100, padding: 0, left: 0, zIndex: "15", height: "100%", width: "100%" }}>
                                <div className="skew-left" style={{ padding: 85, textAlign: "center" }}>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                <a href="https://mlh.io/" target="_blank" rel="noopener noreferrer">
                                                    <img style={{ width: 150, marginTop: -25 }} src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-black.svg" alt="MLH logo" />
                                                </a>
                                                <a href="http://usacs.rutgers.edu/" target="_blank" rel="noopener noreferrer">
                                                    <img style={{ width: 100, marginTop: -40, marginLeft: 25 }} src="./assets/icons/usacs-logo-black.svg" alt="MLH logo" />
                                                </a>
                                            </Col>
                                            <Col>
                                                <a style={{ color: "white", marginLeft: 10, marginRight: 10 }} href="mailto:info@hackru.org" class="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="envelope" /></a>
                                                <a style={{ color: "white", marginLeft: 10, marginRight: 10 }} href="https://www.facebook.com/theHackRU/" class="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="facebook-square" /></a>
                                                <a style={{ color: "white", marginLeft: 10, marginRight: 10 }} href="https://www.instagram.com/thehackru/" class="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="instagram" /></a>
                                                <a style={{ color: "white", marginLeft: 10, marginRight: 10 }} href="https://medium.com/the-hackru" class="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="medium" /></a>
                                                <a style={{ color: "white", marginLeft: 10, marginRight: 10 }} href="https://twitter.com/theHackRU" class="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="twitter-square" /></a>
                                            </Col>
                                            <Col>
                                                <a style={{ color: "white" }} href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer">MLH's Code of Conduct</a>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </Row>
                    </div>
                </Container>
            );
        }
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default LandingPage;
/***************************************************************EXPORTS***************************************************************/