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
import { navlinks } from "../../Defaults";
/***************************************************************IMPORTS***************************************************************/

/*****************************************************************APP*****************************************************************/
/**
 * This is the first thing that users will see. It will include information about the upcoming hackathon, an about section, and other
 * things that need to be shown on the homepage
 */
class LandingPage extends Component {
    render() {
        let sectionStyle = {
            "minHeight": "100vh"
        }
        let rows = [];
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            let url = navlinks[keys[i]].url.substring(1);
            let component = navlinks[keys[i]].component;
            rows.push((
                <Row id={url} style={{ ...sectionStyle }}>
                    {component}
                </Row>
            ))
        }
        return (
            <Container id="LandingPage" fluid>
                <Navigation />
                <Row id="section" style={{ ...sectionStyle, background: "url(./assets/splash-bg-lowglow.png)", backgroundSize: "cover" }}>
                    <Home />
                </Row>
                {rows}
            </Container>
        );
    }
}
/*****************************************************************APP*****************************************************************/

/***************************************************************EXPORTS***************************************************************/
export default LandingPage;
/***************************************************************EXPORTS***************************************************************/