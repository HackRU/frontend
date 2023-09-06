import React, { useState } from "react";
import { Container, Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AuthForm from "../library/AuthForm";
import ColorButton from "../library/ColorButton";
import WhiteTextField from "../library/WhiteTextField";
import PropTypes from "prop-types";

import Card from "./_Landing/global_components/CardAbout";
import { theme } from "../Defaults";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";




const ContactPage = (props) => {
    return (
        <div className="pt-20 grid sm-about:grid-cols-1 lg-about:grid-cols-2 xl-about:grid-cols-2 max-w-[120rem] relative">
            <div className='sm-about:order-1 lg-about:order-1'>
                <Card >
                    <div style={{}}>
                        <h1 className="glow text-6xl text-text font-bold">
                            Contact Us
                        </h1>
                        <p className="textStyle text-text">
                            <b>Questions</b>? Email info@hackru.org or message us on our social media pages! <br></br>
                            Interested in <b>sponsoring</b>? Please email sponsorship@hackru.org
                        </p>
                    </div>
                </Card>
            </div>
            <div className='sm-about:order-1 lg-about:order-1'
            >
                <Card >
                    <div style={{}}>
                        <h1 className="glow text-6xl text-text font-bold">
                            Our Platforms
                        </h1>
                        <p className="textStyle text-text">
                            <a href="https://www.facebook.com/theHackRU/"
                                className="social-links inline-block"
                                target="_blank"
                                rel="noopener noreferrer"><FaFacebookF size="1.5em" />
                            </a> theHackRU<br></br>
                            <a href="https://www.instagram.com/thehackru/"
                                className="social-links"
                                target="_blank"
                                style={{ display: "inline-block", marginRight: "1vh" }}
                                rel="noopener noreferrer"><FaInstagram size="1.5em" />
                            </a> @thehackru<br></br>
                            <a href="https://twitter.com/theHackRU"
                                className="social-links"
                                target="_blank"
                                style={{ display: "inline-block", marginRight: "" }}
                                rel="noopener noreferrer"><FaTwitter size="1.5em" />
                            </a> theHackRU<br></br>
                            Linktree:
                            <a className="text-subtitles  font-semibold"
                                href="https://linktr.ee/thehackru">linktr.ee/thehackru</a>
                        </p>
                    </div>
                </Card>
            </div>
            <div className='sm-about:order-1 lg-about:order-1'
            >
                <Card>
                    <div style={{}}>
                        <h1 className="glow text-6xl text-text font-bold">
                            Interested in Organizing HackRU?
                        </h1>
                        <p className="textStyle text-text">
                            Organizer Applications are open a few times a year. Follow us on social media of subscribe to our neewsletter to be the first to know!
                            HackRu also hold General Interest Meetings every semester.
                            <br></br>
                            Our Teams:
                            <ul className="list-disc list-inside">
                                <li>Logistics</li>
                                <li>Finance</li>
                                <li>RnD</li>
                                <li>Marketing</li>
                                <li>Design</li>
                                <li>Day-Of</li>
                            </ul>

                        </p>
                    </div>
                </Card>
            </div>
            <div className='sm-about:order-1 lg-about:order-1'
            >
                <h1 className="glow text-6xl text-text font-bold">
                    Open Applications
                </h1>
                <Card >
                    <div style={{}}>

                        <p className="textStyle text-text">
                            HackRU is a <b>24-hour hackathon</b> at Rutgers University. We welcome
                            <b> hundreds of students</b> to join us in building <b>awesome tech projects.
                                Industry experts</b> and <b>mentors</b> help foster an atmosphere of <b>learning </b>
                            through <b>tech-talks</b> and <b>one-on-one guidance</b>. We encourage <b>all
                                students</b>, no matter their experience level or educational
                            background, to <b>challenge themselves</b> and expand their creative,
                            technical, and collaboration skills <b>at HackRU</b>.
                        </p>
                    </div>
                </Card>
            </div>
        </div>


    );


};

ContactPage.propTypes = {
    profile: {
        isLoggedIn: PropTypes.bool,
        SignUp: PropTypes.func,
    },
    isMobile: PropTypes.bool,
    classes: PropTypes.object
};

export default ContactPage;
