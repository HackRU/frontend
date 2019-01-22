import React, { Component } from "react";
import { Row } from "reactstrap";
import { Icon } from "react-fa";

/**
 * About component for the landing page
 */
class Footer extends Component {
    render() {
        return (
            <div>
                <Row>
                    <div className="footer bg-no-gradient" style={{zIndex: 15}}>
                        <Row style={{ marginRight: 0, textAlign: "center" }}>
                            <div className="text-center col-lg-4" style={{ padding: 0 }}>
                                <h6 className="align-middle mb-4">
                                    <a style={{color: "white" }} href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer">MLH's Code of Conduct</a>
                                </h6>
                            </div>
                            <div className="col-lg-4 text-center align-middle mb-4 my-2" style={{ padding: 0 }}>
                                <a href="mailto:info@hackru.org" className="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="envelope" /></a>
                                <a href="https://www.facebook.com/theHackRU/" className="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="facebook-square" /></a>
                                <a href="https://www.instagram.com/thehackru/" className="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="instagram" /></a>
                                <a href="https://medium.com/the-hackru" className="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="medium" /></a>
                                <a href="https://twitter.com/theHackRU" className="social-links" target="_blank" rel="noopener noreferrer"><Icon size="2x" name="twitter-square" /></a>
                            </div>
                            <div className="mb-5 mb-lg-0 text-center col-lg-4 mb-4 align-middle" style={{ padding: 0 }}>
                                <a href="https://mlh.io/" target="_blank" rel="noopener noreferrer">
                                    <img className="footer-logo" src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png" alt="MLH logo" />
                                </a>
                                <a href="http://usacs.rutgers.edu/" target="_blank" rel="noopener noreferrer">
                                    <img className="footer-logo" src="./assets/icons/usacs-logo.svg" alt="USACS logo" />
                                </a>
                            </div>
                        </Row>
                    </div>
                </Row>
            </div>
        )
    }
}
export default Footer;
