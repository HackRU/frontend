import React, { Component, Fragment } from "react";
import { Container, Grid } from "@material-ui/core";
import Home from "./Sections/Home";
import Freeze from "./Sections/Freeze";
import { defaults, navlinks } from "../../Defaults";
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
        let sectionClasses = "col-lg-10 offset-lg-1 col-xs-12 offset-xs-0 color-priority";
        let rows = [];
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            if (navlinks[keys[i]].enabled) {
                let url = navlinks[keys[i]].url.substring(1);
                let component = navlinks[keys[i]].component({ isMobile: this.props.isMobile });
                // Toggle the green skewed sections
                let className = "";
                if (i !== keys.length - 1) {
                    className = "bg-no-gradient skew-none";
                    if (i % 2 === 0) {
                        className = "bg-no-gradient skew-none";
                    }
                } else {
                    // The footer is a special type of human being...
                    sectionClasses = "col-lg-12 offset-lg-0 col-xs-12 offset-xs-0 color-priority";
                }
                let style = {};
                if (navlinks[keys[i]].fullHeight) {
                    style["minHeight"] = "100vh";
                }
                rows.push(
                    <ScrollableAnchor key={url} id={url}>
                        <div>
                            <Grid className="section" style={style}>
                                <Container
                                    fluid
                                    className={className}
                                    maxWidth={false}
                                    disableGutters={true}
                                >
                                    <div className={sectionClasses}>{component}</div>
                                </Container>
                            </Grid>
                        </div>
                    </ScrollableAnchor>
                );
            }
        }
        return (
            <Fragment>
                <MLHBadge />
                <Container
                    id="LandingPage"
                    className="section"
                    fluid
                    maxWidth={false}
                    disableGutters={true}
                    style={{}}
                >
                    <ScrollableAnchor id="home">
                        <div>
                            <Grid container className="section">
                                {!defaults.freeze ? (
                                    <Home
                                        isMobile={this.props.isMobile}
                                        profile={this.props.profile}
                                        loggedout={this.props.loggedout}
                                        dismissAlert={this.props.dismissAlert}
                                    />
                                ) : (
                                    <Freeze isMobile={this.props.isMobile} />
                                )}
                            </Grid>
                        </div>
                    </ScrollableAnchor>
                    {rows}
                </Container>
            </Fragment>
        );
    }
}

LandingPage.propTypes = {
    isMobile: PropTypes.bool,
    profile: ProfileType,
    loggedout: PropTypes.bool,
    dismissAlert: PropTypes.func,
};

export default LandingPage;
