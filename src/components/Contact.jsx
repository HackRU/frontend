import React, { Component } from "react";
import Navbar from "./_Landing/sections/hero/Navbar";

import PropTypes from "prop-types";

import Card from "./_Landing/global_components/CardAbout";
import { defaults } from "../Defaults";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

class ContactPage extends Component {
    render() {
        let Applications = [];
        let keys = defaults.openApplications;
        for (let i = 0; i < keys.length; i++) {
            Applications.push((
                <a href={keys[i]["applicationURL"]}>
                    <Card >

                        <h2 className="glow text-5xl text-text">
                            {keys[i]["applicationTitle"]}
                        </h2>


                    </Card>
                </a>
            ));
        }

        return (
            <div>
                <Navbar isContactPage={true} />
                <div className="pt-32 grid sm-about:grid-cols-1 lg-about:grid-cols-2 xl-about:grid-cols-2 max-w-[120rem] relative h-fit min-h-screen">

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

                                </p>
                                <ul className="list-disc list-inside textStyle text-text">
                                    <li>Logistics</li>
                                    <li>Finance</li>
                                    <li>RnD</li>
                                    <li>Marketing</li>
                                    <li>Design</li>
                                    <li>Day-Of</li>
                                </ul>
                            </div>
                        </Card>
                    </div>
                    <div className='sm-about:order-1 lg-about:order-1'
                    >
                        <h1 className="glow text-6xl text-text font-bold">
                            Open Applications
                        </h1>
                        {Applications}
                    </div>
                </div>
            </div>
        );
    }

}

ContactPage.propTypes = {
    profile: {
        isLoggedIn: PropTypes.bool,
        SignUp: PropTypes.func,
    },
    isMobile: PropTypes.bool,
    classes: PropTypes.object
};

export default ContactPage;
