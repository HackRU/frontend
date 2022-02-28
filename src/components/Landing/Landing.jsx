import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import { theme } from "../../Defaults";
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
        let rows = [];
        let keys = Object.keys(navlinks);
        for (let i = 0; i < keys.length; i++) {
            if (navlinks[keys[i]].enabled) {
                let url = navlinks[keys[i]].url.substring(1);
                let component = navlinks[keys[i]].component({ isMobile: this.props.isMobile });
                if (i !== keys.length - 1) {
                    rows.push((
                        <ScrollableAnchor key={url}
                            id={url}>
                            <Grid item
                                lg={10}
                                xs={12}>                                
                                {component}
                            </Grid>
                        </ScrollableAnchor>
                    ));
                } else {
                    rows.push((
                        <ScrollableAnchor key={url}
                            id={url}>
                            <Grid item
                                lg={12}
                                xs={12}>
                                {component}
                            </Grid>
                        </ScrollableAnchor>
                    ));
                }

            }
        }
        return (
            <Fragment>
                <MLHBadge/>
                <Grid container spacing={5} justify="space-around" justifyContent="center" alignItems="center" style={{ backgroundColor: theme.dark[0] }}>
                    <ScrollableAnchor id="home">
                        <Grid container
                            className="section">
                            { !defaults.freeze ?
                                <Home isMobile={this.props.isMobile}
                                    profile={this.props.profile}
                                    loggedout={this.props.loggedout}
                                    dismissAlert={this.props.dismissAlert} /> :
                                <Freeze isMobile={this.props.isMobile} />}
                        </Grid>
                    </ScrollableAnchor>
                    {rows}
                </Grid>
            </Fragment>
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
