import React from "react";
import LogoWrapper from "./LogoWrapper";
import { defaults } from "../../../../Defaults.js";
import PropTypes from "prop-types";

const Partners = ({ isMobile }) => (
    <LogoWrapper isMobile={isMobile}
        title="Partners"
        endpoint={defaults.partnerLogos + "partners.json"}
        baseURL={defaults.partnerLogos} />
);
Partners.propTypes = {
    isMobile: PropTypes.bool,
};


export default Partners;