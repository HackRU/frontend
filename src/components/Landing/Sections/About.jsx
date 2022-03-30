import React, { Component } from "react";
import PropTypes from "prop-types";
import Clapboard from "./Clapboard";
import DefaultAbout from "./DefaultAbout";

// About section
// Clapboard used for larger devices only (due to small font size)
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }
    render() {
        return (
            <div
                style={{
                    width: "90%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                }}
            >
                {!this.props.isMobile ? <Clapboard /> : <DefaultAbout />}
            </div>
        );
    }
}

About.propTypes = {
    isMobile: PropTypes.bool,
};

export default About;
