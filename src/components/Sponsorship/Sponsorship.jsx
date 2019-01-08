import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Main from "./Sections/Main";
import { ParallaxProvider } from "react-scroll-parallax";
import { sponsorshipLinks, theme } from "../../Defaults";
import ScrollableAnchor from "react-scrollable-anchor";

class SponsorshipPage extends Component {
    render() {
        let sectionClasses = "col-lg-10 offset-lg-1 col-xs-12 offset-xs-0 skew-left color-priority";
        let rows = [];
        let keys = Object.keys(sponsorshipLinks);
        for (let i = 0; i < keys.length; i++) {
            if (sponsorshipLinks[keys[i]].enabled) {
                let url = sponsorshipLinks[keys[i]].url.substring(1);
                let component = sponsorshipLinks[keys[i]].component({ isMobile: this.props.isMobile });
                // Toggle the green skewed sections
                let className = ""
                if (i !== keys.length - 1) {
                    className = "bg-no-gradient skew-right";
                    if (i % 2 === 0) {
                        className = "bg-gradient-right skew-right";
                    }
                } else {
                    sectionClasses = "col-lg-12 offset-lg-0 col-xs-12 offset-xs-0 color-priority";
                }
                let style = {};
                if (sponsorshipLinks[keys[i]].fullHeight) {
                    style["minHeight"] = "100vh";
                }
                rows.push((
                    <ScrollableAnchor key={url} id={url}>
                        <div>
                            <Row className="section" style={style}>
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
            <Container id="SponsorshipPage" className="section" fluid style={{ backgroundColor: theme.secondary[1] }}>
                <ParallaxProvider>
                    <ScrollableAnchor id="main">
                        <div>
                            <Row className="section">
                                <Main isMobile={this.props.isMobile}/>
                            </Row>
                        </div>
                    </ScrollableAnchor>
                    {rows}
                </ParallaxProvider>
            </Container>
        );
    }
}

export default SponsorshipPage;
