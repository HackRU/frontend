import React, { Fragment } from "react";
import { Container, Grid } from "@material-ui/core";
import Home from "./Home";
// import Freeze from "./Sections/Freeze";
import { defaults, navlinks } from "../../../Defaults";
import ScrollableAnchor from "react-scrollable-anchor";
// import { ProfileType } from "../Profile";
import PropTypes from "prop-types";
// import MLHBadge from "../../MLHBadge";
import { CoreModule } from "@hackru/frontend-core";

/**
 * This is the first thing that users will see. It will include information about the upcoming hackathon, an about section, and other
 * things that need to be shown on the homepage
 */
const Landing = CoreModule(({ children }) => {
    let sectionClasses = "col-lg-10 offset-lg-1 col-xs-12 offset-xs-0 color-priority";
    let rows = [];
    // let comps = props.children;
    // for (let i = 1; i < comps.length; i++) {
    //     let current = comps[i];
    //     if (current.enabled) {
    //         let url = current.url.substring(1);
    //         // Toggle the green skewed sections
    //         let className = "";
    //         if (i !== comps.length - 1) {
    //             className = "bg-no-gradient skew-none";
    //             if (i % 2 === 0) {
    //                 className = "bg-no-gradient skew-none";
    //             }
    //         } else {
    //             // The footer is a special type of human being...
    //             sectionClasses = "col-lg-12 offset-lg-0 col-xs-12 offset-xs-0 color-priority";
    //         }
    //         let style = {};
    //         if (current.fullHeight) {
    //             style["minHeight"] = "100vh";
    //         }
    //         rows.push(
    //             <ScrollableAnchor key={url} id={url}>
    //                 <div>
    //                     <Grid className="section" style={style}>
    //                         <Container
    //                             fluid
    //                             className={className}
    //                             maxWidth={false}
    //                             disableGutters={true}
    //                         >
    //                             <div className={sectionClasses}>{current}</div>
    //                         </Container>
    //                     </Grid>
    //                 </div>
    //             </ScrollableAnchor>
    //         );
    //     }
    // }
    return (
        <Fragment>
            {/* <MLHBadge /> */}
            <Container
                id="LandingPage"
                className="section"
                fluid
                maxWidth={false}
                disableGutters={true}
                style={{}}
            >
                {children}
            </Container>
        </Fragment>
    );
}, []);

Landing.propTypes = {
    isMobile: PropTypes.bool,
    // profile: ProfileType,
    loggedout: PropTypes.bool,
    dismissAlert: PropTypes.func,
};

export default Landing;
