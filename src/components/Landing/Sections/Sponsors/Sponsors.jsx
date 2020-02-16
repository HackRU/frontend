import React, { Component } from "react";
import { defaults, theme } from "../../../../Defaults.js";
import SponsorContainer from "./SponsorContainer.jsx";
import PropTypes from "prop-types";
import { BarLoader } from "react-spinners";

// import SponsorDeclaration from defaults.sponsorshipLogos;
/**
 * Sponsors component for the landing page
 */
class Sponsors extends Component {


    state = {
        loading: "Our lastest sponsorship information is loading",
        sponsorslogos: null,
        partnerLogos: null
    }

    UNSAFE_componentWillMount() {
        fetch(defaults.sponsorshipLogos + "sponsors.json",
            {
                method: "GET", 
                mode: "cors"
            }
        ).then(response => response.json())
            .then(data =>
                this.setState({
                    sponsorslogos: data
                })   
            );
    }

    render() {
        let renderList = [];
        if (this.state.sponsorslogos) {
            let SponsorDeclaration = this.state.sponsorslogos.sections;
            for (let i = 0; i < SponsorDeclaration.length; i++) {
                if (SponsorDeclaration[i]["enabled"]) {
                    renderList.push(
                        <SponsorContainer key={i}
                            showName={false}
                            isMobile={this.props.isMobile}
                            baseURL={defaults.sponsorshipLogos}
                            declaration={SponsorDeclaration[i]}/>
                    );
                }
            }
        }
        
        if (renderList.length > 0) {
            return (
                <div>
                    <div style={{ backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                        <div style={{ position: "absolute", right: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.secondary[1], width: 10 }}></div>
                        <h1 className="display-4 theme-font" style={{ padding: 50 }}>Sponsors</h1>
                        {renderList}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h1 className="display-4 theme-font mb-3">Sponsors</h1>
                    <h4> {this.state.loading} </h4>
                    <BarLoader color="rgba(0, 0, 0, 0.25)" />               
                </div>
            );
        }       
    }
}

Sponsors.propTypes = {
    isMobile: PropTypes.bool,
};

export default Sponsors;
