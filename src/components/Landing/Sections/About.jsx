
import React from "react";
import { theme } from "../../../Defaults";
import { Icon } from "react-fa";
import Card from "../../Card";

function About() {
    return (
        <Card backgroundColor={theme.secondary[1]}
            sideBar={theme.accent[0]}>
            <div style={{ position: "absolute", top: 30, right: 20, userSelect: "none", pointerEvents: "none", zIndex: 10, transform: "rotate(-175deg)" }}>
                <img
                    alt="background"
                    src={"./assets/background/shape_green.svg"}
                    height={100} />
            </div>
            <h1 className="display-4 theme-font">About HackRU</h1>
            <div className="row mb-3"
                style={{ marginLeft: -50, marginRight: -50 }}>
                <div style={{ color: "white", padding: 50, paddingBottom: 0 }}
                    className="col-xs-12 col-sm-12">
                    <div style={{ position: "absolute", left: 190, height: 10, backgroundColor: theme.accent[0], width: "calc(100% - 190px)", marginTop: 25 }}></div>
                    <h2 className="display-6"
                        style={{ display: "inline-block", marginBottom: 25, backgroundColor: theme.accent[1], padding: 10, marginLeft: -50, paddingLeft: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingRight: 25 }}><Icon name="question-circle" /> What?</h2>
                    <p style={{ display: "inline-block" }}
                        className="lead">
                        HackRU is a 24-hour hackathon at Rutgers University. We welcome hundreds of students to join us in building awesome tech projects. Industry experts and mentors help foster an atmosphere of learning through tech-talks and one-on-one guidance. We encourage all students, no matter their experience level or educational background, to challenge themselves and expand their creative, technical, and collaboration skills at HackRU.
                    </p>
                </div>
                <div style={{ color: "white", padding: 50, paddingBottom: 0 }}
                    className="col-xs-12 col-sm-12">
                    <div style={{ position: "absolute", left: 190, height: 10, backgroundColor: theme.accent[0], width: "calc(100% - 190px)" }}></div>
                    <h2 className="display-6"
                        style={{ display: "inline-block", marginTop: -25, marginBottom: 25, backgroundColor: theme.accent[1], padding: 10, marginLeft: -50, paddingLeft: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingRight: 25 }}><Icon name="calendar" /> When?</h2>
                    <p className="lead">HackRU is from November 7th-8th, 2020.</p>
                </div>
                <div style={{ color: "white", padding: 50 }}
                    className="col-xs-12 col-sm-12">
                    <div style={{ position: "absolute", left: 190, height: 10, backgroundColor: theme.accent[0], width: "calc(100% - 190px)" }}></div>
                    <h2 className="display-6"
                        style={{ display: "inline-block", marginTop: -25, marginBottom: 25, backgroundColor: theme.accent[1], padding: 10, marginLeft: -50, paddingLeft: 50, borderTopRightRadius: 25, borderBottomRightRadius: 25, paddingRight: 25 }}><Icon name="location-arrow" /> Where?</h2>
                    <p className="lead">Your own home! HackRU is virtual for Fall 2020!</p>
                    {/* <iframe title="about-map"
                        frameBorder={0}
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3033.7706684548116!2d-74.4528017!3d40.502454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c6555ac2d7f7%3A0x8820e7c83ea74250!2sCollege%20Avenue%20Student%20Center!5e0!3m2!1sen!2sus!4v1581870536811!5m2!1sen!2sus"
                        width="100%"
                        style={{ minHeight: "300px" }}></iframe> */}
                </div>
            </div>
        </Card>
    );

}


export default About;