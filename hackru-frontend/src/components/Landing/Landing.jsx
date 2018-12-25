/**
 * @author Shivan Modha
 * @description The website homepage, which will be the first thing that new users see
 * @version 0.0.1
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Footer from "./Sections/Footer"
import Home from "./Sections/Home";
import FlyingLogo from "./FlyingLogo";
import { ParallaxProvider } from "react-scroll-parallax";
import { navlinks, theme } from "../../Defaults";
import ScrollableAnchor from "react-scrollable-anchor";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * This is the first thing that users will see. It will include information about the upcoming hackathon, an about section, and other
 * things that need to be shown on the homepage
 */
class LandingPage extends Component {
    render() {
        let sectionClasses = "col-lg-10 offset-lg-1 col-xs-12 offset-xs-0 skew-left color-priority";
        let rows = [];
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            if (navlinks[keys[i]].enabled) {
                let url = navlinks[keys[i]].url.substring(1);
                let component = navlinks[keys[i]].component;
                // Toggle the green skewed sections
                let className = "bg-no-gradient skew-right";
                if (i % 2 === 0) {
                    className = "bg-gradient-right skew-right";
                }
                rows.push((
                    <ScrollableAnchor key={url} id={url}>
                        <div>
                            <Row className="section">
                                <div className={className} >
                                    <div className={sectionClasses}>
                                        {component}
                                    </div>
                                </div>
                            </Row>
                        </div>
                    </ScrollableAnchor>
                ));
            }
        }
        return (
            <Container id="LandingPage" className="section" fluid style={{ backgroundColor: theme.secondary[1] }}>
                <ParallaxProvider>
                    <div style={{ position: "fixed", zIndex: 1, width: "100%", height: "100%", left: 0, top: 0, opacity: 0.5 }}>
                        <FlyingLogo url={"./assets/icons/hru-alien-noplat-white.png"} />
                    </div>
                    <div style={{ position: "fixed", zIndex: 2, width: "100%", height: "100%", left: 0, top: 0, background: "url(./assets/background.png)", backgroundSize: "cover", opacity: 0.5 }}></div>
                    <ScrollableAnchor id="home">
                        <div>
                            <Row className="section">
                                <Home />
                            </Row>
                        </div>
                    </ScrollableAnchor>
                    {rows}
                </ParallaxProvider>
                <div>
                    <Footer />
                </div>
            </Container>
        );
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default LandingPage;
/***************************************************************EXPORTS***************************************************************/