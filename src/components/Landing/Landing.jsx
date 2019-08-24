import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Home from "./Sections/Home";
import Freeze from "./Sections/Freeze";
import { ParallaxProvider } from "react-scroll-parallax";
import { defaults, navlinks, theme } from "../../Defaults";
import ScrollableAnchor from "react-scrollable-anchor";
import { ProfileType } from "../Profile";
import PropTypes from "prop-types";
import MLHBadge from "../../MLHBadge";

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
                let component = navlinks[keys[i]].component({ isMobile: this.props.isMobile });
                // Toggle the green skewed sections
                let className = "";
                if (i !== keys.length - 1) {
                    className = "bg-no-gradient skew-right";
                    if (i % 2 === 0) {
                        className = "bg-gradient-right skew-right";
                    }
                } else {
                    // The footer is a special type of human being...
                    sectionClasses = "col-lg-12 offset-lg-0 col-xs-12 offset-xs-0 color-priority";
                }
                let style = {};
                if (navlinks[keys[i]].fullHeight) {
                    style["minHeight"] = "100vh";
                }
                rows.push((
                    <ScrollableAnchor key={url}
                        id={url}>
                        <div>
                            <Row className="section"
                                style={style}>
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
            [<MLHBadge/>,
            <Container id="LandingPage"
                className="section"
                fluid
                style={{ backgroundColor: theme.secondary[1] }}>
                <ParallaxProvider>
                    <ScrollableAnchor id="home">
                        <div>
                            <Row className="section">
                                { !defaults.freeze ?
                                    <Home isMobile={this.props.isMobile}
                                        profile={this.props.profile}
                                        loggedout={this.props.loggedout}
                                        dismissAlert={this.props.dismissAlert} /> :
                                    <Freeze isMobile={this.props.isMobile} />}
                            </Row>
                        </div>
                    </ScrollableAnchor>
                    {rows}
                </ParallaxProvider>
            </Container>]
        );
    }
}

LandingPage.propTypes = {
    isMobile: PropTypes.bool,
    profile: ProfileType,
    loggedout: PropTypes.bool,
    dismissAlert: PropTypes.func
};

export default LandingPage;
