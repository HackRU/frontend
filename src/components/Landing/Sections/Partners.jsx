import React, { Component } from "react";
import { defaults } from "../../../Defaults.js";
import SponsorContainer from "./Sponsors/SponsorContainer.jsx";

/**
 * Sponsors component for the landing page
 */
class Sponsors extends Component {


    state = {
        loading: "Our lastest partners list is loading ...",
        partnerLogos: null
    }

    componentWillMount() {
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
        )
    }

    render() {
        let renderList = [];

        if (this.state.partnerLogos) {
            console.log("THE INTERESTING")
            // console.log(this.state.partnerLogos)

            let SponsorDeclaration = this.state.partnerLogos.sections;
            console.log(SponsorDeclaration);
            for (let i = 0; i < SponsorDeclaration.length; i++) {
                console.log(i);
                if (SponsorDeclaration[i]["enabled"]) {
                    renderList.push(
                        <SponsorContainer key={i} showName={false} baseURL={defaults.partnerLogos} isMobile={this.props.isMobile} declaration={SponsorDeclaration[i]} />
                    );
                }
            }
            
            return (
                <div >
                    <h1 className="display-4 theme-font mb-3">Partners</h1>
                    <hr />
                    <div className="sponsorship-background">
                    {renderList}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="display-4 theme-font mb-3">Partners</h1>
                    <h4> {this.state.loading} </h4>
                    {/* <Loading text={this.state.loading} /> */}
                </div>
            )
        }
        
        
    }
}

export default Sponsors;
