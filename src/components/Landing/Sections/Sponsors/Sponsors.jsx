import React, { Component } from "react";
import { defaults, theme } from "../../../../Defaults.js";
import CarouselContainer from "./CarouselContainer.jsx";
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
            console.log(this.state.sponsorslogos.sections);
            for (let i = 0; i < SponsorDeclaration.length; i++) {
                if (SponsorDeclaration[i]["enabled"]) {
                    renderList.push(
                        <CarouselContainer key={i}
                            showName={false}
                            isMobile={this.props.isMobile}
                            baseURL={defaults.sponsorshipLogos}
                            declaration={SponsorDeclaration[i]}/>
                    );
                }
            }
        }
        
        
        if (this.state.partnerLogos) {

            let PartnerDeclaration = this.state.partnerLogos.sections;
            //console.log(PartnerDeclaration);
            for (let i = 0; i < PartnerDeclaration.length; i++) {
                //console.log(i);
                if (PartnerDeclaration[i]["enabled"]) {
                    partnerList.push(
                        <CarouselContainer key={i}
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
                <div style={{ backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50 }}>
                    <div style={{ position: "absolute", right: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.accent[0], width: 10 }}></div>
                    <h1 className="display-4 theme-font">Sponsors</h1>
                    <div className="row mb-3" style={{ marginLeft: -50, marginRight: -50 }}>
                        <div style={{ color: "white", padding: 50, paddingBottom: 0 }} className="col-xs-12 col-sm-12">
                            {renderList}
                        </div>
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
