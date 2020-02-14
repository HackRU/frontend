import React, { Component } from "react";
import { defaults, theme } from "../../../../Defaults.js";
import SponsorContainer from "./SponsorContainer.jsx";
import PropTypes from "prop-types";
import { BarLoader } from "react-spinners";

// import SponsorDeclaration from defaults.sponsorshipLogos;
/**
 * Partners component for the landing page
 */
class Partners extends Component {


    state = {
        loading: "Our lastest sponsorship information is loading",
        sponsorslogos: null,
        partnerLogos: null
    }

    UNSAFE_componentWillMount() {
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
        let partnerList = [];
        if (this.state.partnerLogos) {

            let PartnerDeclaration = this.state.partnerLogos.sections;
            //console.log(PartnerDeclaration);
            for (let i = 0; i < PartnerDeclaration.length; i++) {
                //console.log(i);
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


        
        if (partnerList.length > 0) {
            return (
                <div>
                    <div style={{ backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50 }}>
                        <div style={{ position: "absolute", right: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.accent[1], width: 10 }}></div>
                        <h1 className="display-4 theme-font">Partners</h1>
                    </div>
                    {partnerList}
                </div>
            );
        } else {
            return (
                <div>
                    <h1 className="display-4 theme-font mb-3">Partners</h1>
                    <h4> {this.state.loading} </h4>
                    <BarLoader color="rgba(0, 0, 0, 0.25)" />               
                </div>
            );
        }       
    }
}

Partners.propTypes = {
    isMobile: PropTypes.bool,
};

export default Partners;
