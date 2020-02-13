
import React, { Component } from "react";
import { theme } from "../../../Defaults";
import { Icon } from "react-fa";

/**
 * About component for the landing page
 */
class About extends Component {
    render() {
        return (
            <div style={{ backgroundColor: theme.secondary[1], color: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: 50 }}>
                <div style={{ position: "absolute", left: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.accent[0], width: 10 }}></div>
                <div style={{ position: "absolute", top: 30, right: 20, userSelect: "none", pointerEvents: "none", zIndex: 10, transform: "rotate(-175deg)" }}>
                    <img
                        alt="background"
                        src={"./assets/background/shape_green.svg"}
                        height={100} /> 
                </div>
                <h1 className="display-4 theme-font">About HackRU</h1>
                <div className="row mb-3" style={{ marginLeft: -50, marginRight: -50 }}>
                    <div style={{ color: "white", padding: 50, paddingBottom: 0 }} className="col-xs-12 col-sm-12">
                        <div style={{ position: "absolute", left: 190, height: 10, backgroundColor: theme.accent[0], width: "calc(100% - 190px)", marginTop: 25 }}></div>
                        <h2 className="display-6" style={{ display: "inline-block", marginBottom: 25, backgroundColor: theme.accent[1], padding: 10, marginLeft: -50, paddingLeft: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingRight: 25 }}><Icon name="question-circle" /> What?</h2>
                        <p style={{ display: "inline-block" }} className="lead">
                            HackRU is a 24-hour hackathon at Rutgers University. We welcome hundreds of students to join us in building awesome tech projects. Industry experts and mentors help foster an atmosphere of learning through tech-talks and one-on-one guidance. We encourage all students, no matter their experience level or educational background, to challenge themselves and expand their creative, technical, and collaboration skills at HackRU.
                        </p>
                    </div>
                    <div style={{ color: "white", padding: 50, paddingBottom: 0 }} className="col-xs-12 col-sm-12"> 
                        <div style={{ position: "absolute", left: 190, height: 10, backgroundColor: theme.accent[0], width: "calc(100% - 190px)" }}></div>
                        <h2 className="display-6" style={{ display: "inline-block", marginTop: -25,  marginBottom: 25, backgroundColor: theme.accent[1], padding: 10, marginLeft: -50, paddingLeft: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingRight: 25 }}><Icon name="calendar"/> When?</h2>
                        <p className="lead">HackRU is from April 18th-19th, 2020.</p>
                    </div>
                    <div style={{ color: "white", padding: 50, paddingBottom: 150, marginBottom: -67 }} className="col-xs-12 col-sm-12"> 
                        <div style={{ position: "absolute", left: 190, height: 10, backgroundColor: theme.accent[0], width: "calc(100% - 190px)" }}></div>
                        <h2 className="display-6" style={{ display: "inline-block", marginTop: -25, marginBottom: 25, backgroundColor: theme.accent[1], padding: 10, marginLeft: -50, paddingLeft: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingRight: 25 }}><Icon name="location-arrow"/> Where?</h2>
                        <p className="lead">Rutgers Athletic Center: 83 Rockafeller Rd, Piscataway, NJ 08854.</p>
                        <iframe title="about-map"
                            frameBorder={0}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.64570914643!2d-74.4436167864532!3d40.527321368007826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c799e4acd7af%3A0xc1b21b4e9a6fa334!2sRutgers%20Athletic%20Center!5e0!3m2!1sen!2sus!4v1581409011826!5m2!1sen!2sus"
                            width="100%"
                            style={{ minHeight: "300px", height: "100%", marginBottom: 20 }}></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;