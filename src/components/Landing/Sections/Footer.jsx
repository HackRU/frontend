import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Icon } from "react-fa";
import { useTheme } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

/**
 * About component for the landing page
 */
function Footer() {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
    const codeOfConduct = (
        <h6 className="mb-4">
            <a
                href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                target="_blank"
                rel="noopener noreferrer">MLH's Code of Conduct</a>
        </h6>
    )

    return (
        <div style={{marginLeft: -15, marginRight: -15 }}>
            <Grid>
                <div className="footer bg-gradient-right"
                    style={{ zIndex: 15, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", padding: "10px"}}>
                    <Grid 
                        container 
                        alignItems="center"
                        justify="space-evenly"
                        direction="row" 
                        style={{ marginRight: 0, textAlign: "center" }}>
                        <Grid item lg>
                            {matchesSM ? codeOfConduct : ""}
                        </Grid>
                        <Grid item lg>
                            <a href="mailto:info@hackru.org"
                                className="social-links"
                                target="_blank"
                                rel="noopener noreferrer"><Icon size={matchesSM ? "4x": "2x"}
                                    name="envelope" /></a>
                            <a href="https://www.facebook.com/theHackRU/"
                                className="social-links"
                                target="_blank"
                                rel="noopener noreferrer"><Icon size={matchesSM ? "4x": "2x"}
                                    name="facebook-square" /></a>
                            <a href="https://www.instagram.com/thehackru/"
                                className="social-links"
                                target="_blank"
                                rel="noopener noreferrer"><Icon size={matchesSM ? "4x": "2x"}
                                    name="instagram" /></a>
                            <a href="https://medium.com/the-hackru"
                                className="social-links"
                                target="_blank"
                                rel="noopener noreferrer"><Icon size={matchesSM ? "4x": "2x"}
                                    name="medium" /></a>
                            <a href="https://twitter.com/theHackRU"
                                className="social-links"
                                target="_blank"
                                rel="noopener noreferrer"><Icon size={matchesSM ? "4x": "2x"}
                                    name="twitter-square" /></a>

                        </Grid>
                        <Grid item lg>
                            {matchesSM ? "" : codeOfConduct}

                            <a href="https://mlh.io/"
                                target="_blank"
                                rel="noopener noreferrer">
                                <img className="footer-logo"
                                    src="https://static.mlh.io/brand-assets/logo/official/mlh-logo-white.png"
                                    alt="MLH logo" />
                            </a>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </div>
    );
    
}
export default Footer;
