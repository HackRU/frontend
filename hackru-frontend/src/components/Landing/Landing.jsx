/**
 * @author Shivan Modha
 * @description The website homepage, which will be the first thing that new users see
 * @version 0.0.1
 * Created 12/09/18
 */
/***************************************************************IMPORTS***************************************************************/
import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Navigation from "./Navigation";
import Home from "./Sections/Home";
import HomePOC from "./Sections/HomePOC";
import Aliens from "./Aliens";
import { defaults, navlinks } from "../../Defaults";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * This is the first thing that users will see. It will include information about the upcoming hackathon, an about section, and other
 * things that need to be shown on the homepage
 */
class LandingPage extends Component {
    render() {
        let sectionStyle = {
            minHeight: "100vh",
        }
        let rows = [];
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            let url = navlinks[keys[i]].url.substring(1);
            let component = navlinks[keys[i]].component;
            rows.push((
                <Row key={url} id={url} style={{ ...sectionStyle }}>
                    {component}
                </Row>
            ))
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
                <Container id="LandingPage" fluid style={{ ...sectionStyle, backgroundColor: "#354a5f" }}>
                    <div style={{ position: "fixed", zIndex: 1, width: "100%", height: "100%", left: 0, top: 0, opacity: 0.5 }}>
                        <Aliens />
                        test
                    </div>
                    <div style={{ position: "fixed", zIndex: 2, width: "100%", height: "100%", left: 0, top: 0, background: "url(./assets/background.png)", backgroundSize: "cover", opacity: 0.5 }}>

                    </div>
                    <Row id="section" style={{ ...sectionStyle }}>
                        <HomePOC />
                    </Row>
                    {rows}
                </Container>
            );
        }
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default LandingPage;
/***************************************************************EXPORTS***************************************************************/