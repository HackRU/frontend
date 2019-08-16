import React, { Component } from "react";
import { defaults } from "../../../../Defaults.js";
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

    componentWillMount() {
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
        fetch(defaults.partnerLogos + "partners.json",
            {
                method: "GET", 
                mode: "cors"
            }
        ).then(response => response.json())
            .then(data =>
                this.setState({
                    partnerLogos: data
                })   
            );
        
    }

    render() {
        let renderList = [];
        let partnerList = [];
        
        if (this.state.sponsorslogos) {
            let SponsorDeclaration = this.state.sponsorslogos.sections;
            console.log(this.state.sponsorslogos);
            for (let i = 0; i < SponsorDeclaration.length; i++) {
                if (SponsorDeclaration[i]["enabled"]) {
                    renderList.push(
                        <SponsorContainer key={i}
                            showName={false}
                            isMobile={this.props.isMobile}
                            baseURL={defaults.sponsorshipLogos}
                            declaration={SponsorDeclaration[i]} />
                    );
                }
            }
        }
        
        
        if (this.state.partnerLogos) {

            let PartnerDeclaration = this.state.partnerLogos.sections;
            console.log(PartnerDeclaration);
            for (let i = 0; i < PartnerDeclaration.length; i++) {
                console.log(i);
                if (PartnerDeclaration[i]["enabled"]) {
                    partnerList.push(
                        <SponsorContainer key={i}
                            showName={false}
                            baseURL={defaults.partnerLogos}
                            isMobile={this.props.isMobile}
                            declaration={PartnerDeclaration[i]} />
                    );
                }
            }
        }


        
        if (renderList.length > 0 && partnerList.length > 0) {
            return (
                <div >
                    <h1 className="display-4 theme-font mb-3">Sponsors</h1>
                    <hr />
                    <div className="sponsorship-background">
                        {renderList}
                    </div>
                    <h4 style={{textAlign: "center"}}> Interested in sponsoring?  Contact us at <a href="mailto:sponsorship@hackru.org"> sponsorship@hackru.org</a>.</h4>
                     
                    <h1 className="display-4 theme-font mt-3 mb-3">Partners</h1>
                    <hr />
                    <div className="sponsorship-background">
                        {partnerList}
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
