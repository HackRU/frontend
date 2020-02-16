import React from "react";
import LogoWrapper from "./LogoWrapper";
import { defaults } from "../../../../Defaults.js";
import PropTypes from "prop-types";
const Sponsors = ({ isMobile }) => (
    <LogoWrapper isMobile={isMobile}
        title="Sponsors"
        endpoint={defaults.sponsorshipLogos + "sponsors.json"}
        baseURL={defaults.sponsorshipLogos} />
);

Sponsors.propTypes = {
    isMobile: PropTypes.bool,
};

export default Sponsors;