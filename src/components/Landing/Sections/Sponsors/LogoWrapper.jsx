import React, { Component } from "react";
import SponsorContainer from "./SponsorContainer.jsx";
import PropTypes from "prop-types";
import { BarLoader } from "react-spinners";
/**
 * Sponsors component for the landing page
 */
class LogoWrapper extends Component {
    state = {
        loading: "Our latest sponsorship information is loading",
        logos: null,
    }
    constructor(props) {
        super(props);
        fetch(props.endpoint, {
            method: "GET", 
            mode: "cors"
        }).then(response => response.json()).then(data => {
            this.setState({
                logos: data
            });
        });
    }
    render() {
        let renderList = [];
        if (this.state.logos) {
            let SponsorDeclaration = this.state.logos.sections;
            for (let i = 0; i < SponsorDeclaration.length; i++) {
                if (SponsorDeclaration[i]["enabled"]) {
                    renderList.push(
                        <SponsorContainer key={i}
                            showName={false}
                            isMobile={this.props.isMobile}
                            baseURL={this.props.baseURL}
                            declaration={SponsorDeclaration[i]}/>
                    );
                }
            }
        }
        if (renderList.length > 0) {
            return (
                <div>
                    <div style={{ backgroundColor: "white", color: "black", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                        <h1 className="display-4 theme-font"
                            style={{ padding: 50 }}>{this.props.title}</h1>
                        {renderList}
                    </div>
                </div>
            );
        } else if (!this.state.logos) {
            return (
                <div>
                    <h1 className="display-4 theme-font mb-3">{this.props.title}</h1>
                    <h4> {this.state.loading} </h4>
                    <BarLoader color="rgba(0, 0, 0, 0.25)" />               
                </div>
            );
        } else {
            return (
                <div>
                    <div style={{ backgroundColor: "white", color: "black", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                        <h1 className="display-4 theme-font"
                            style={{ padding: 50, paddingBottom: 0 }}>{this.props.title}</h1>
                        <p className="lead theme-font"
                            style={{ padding: 50 }}>To be announced, check again later!</p>
                    </div>     
                </div>
            );
        }  
    }
}

LogoWrapper.propTypes = {
    isMobile: PropTypes.bool,
    endpoint: PropTypes.string,
    baseURL: PropTypes.string,
    title: PropTypes.string
};

export default LogoWrapper;
