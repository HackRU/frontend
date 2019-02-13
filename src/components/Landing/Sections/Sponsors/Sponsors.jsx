import React, { Component } from "react";
import { defaults } from "../../../../Defaults.js";
import SponsorContainer from "./SponsorContainer.jsx";
// import SponsorDeclaration from defaults.sponsorshipLogos;
/**
 * Sponsors component for the landing page
 */
class Sponsors extends Component {


    state = {
        loading: "Our lastest sponsors list is loading ...",
        sponsorslogos: null
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
        )
    }

    render() {
        let renderList = [];

        if (this.state.sponsorslogos) {


            let SponsorDeclaration = this.state.sponsorslogos.sections;
            console.log(this.state.sponsorslogos);
                for (let i = 0; i < SponsorDeclaration.length; i++) {
                    if (SponsorDeclaration[i]["enabled"]) {
                        renderList.push(
                            <SponsorContainer key={i} showName={false} isMobile={this.props.isMobile} baseURL={defaults.sponsorshipLogos} declaration={SponsorDeclaration[i]} />
                        );
                    }
                }
            
            return (
                <div >
                    <h1 className="display-4 theme-font mb-3">Sponsors</h1>
                    <hr />
                    <div className="sponsorship-background">
                    {renderList}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="display-4 theme-font mb-3">Sponsors</h1>
                    <h4> {this.state.loading} </h4>
                    {/* <Loading text={this.state.loading} /> */}
                </div>
            )
        }
        
        
    }
}

export default Sponsors;
