import React, { Component } from "react";
import SponsorDeclaration from "./sponsors.json";
import SponsorContainer from "./SponsorContainer.jsx";
/**
 * Sponsors component for the landing page
 */
class Sponsors extends Component {
    render() {
        let renderList = [];
        for (let i = 0; i < SponsorDeclaration["sections"].length; i++) {
            if (SponsorDeclaration["sections"][i]["enabled"]) {
                renderList.push(
                    <SponsorContainer key={i} isMobile={this.props.isMobile} declaration={SponsorDeclaration["sections"][i]} />
                );
            }
        }
        return (
            <div>
                <h1 className="display-4 theme-font mb-3">Sponsors</h1>
                <hr />
                {renderList}
            </div>
        )
    }
}

export default Sponsors;
