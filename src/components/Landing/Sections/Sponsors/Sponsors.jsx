import React, { Component } from "react";
import SponsorDeclaration from "./sponsors.json";
import { theme } from "../../../../Defaults.js";
/**
 * Sponsors component for the landing page
 */
class Sponsors extends Component {
    componentWillMount() {
        console.log(this.props)
        let renderList = [];
        for (let i = 0; i < SponsorDeclaration["sections"].length; i++) {
            if (SponsorDeclaration["sections"][i]["enabled"]) {
                let root = SponsorDeclaration["sections"][i]["root"];
                let sponsorList = SponsorDeclaration["sections"][i]["children"];
                renderList.push(
                    <div>
                        <p style={{ fontSize: 35, color: theme[SponsorDeclaration["sections"][i]["color"]] }}>
                            {SponsorDeclaration["sections"][i]["name"]}
                        </p>
                    </div>
                );
            }
        }
        this.setState({
            renderMem: renderList
        });
    }
    render() {
        return (
            <div>
                <h1 className="display-4 theme-font mb-3">Sponsors</h1>
                <hr />
                {this.state.renderMem}
            </div>
        )
    }
}

export default Sponsors;
