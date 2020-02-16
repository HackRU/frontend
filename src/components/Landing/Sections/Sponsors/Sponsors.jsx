import React from "react";
import LogoWrapper from "./LogoWrapper";
import { defaults } from "../../../../Defaults.js";

const Sponsors = ({ isMobile }) => (
    <LogoWrapper isMobile={isMobile} title="Sponsors" endpoint={defaults.sponsorshipLogos + "sponsors.json"} baseURL={defaults.sponsorshipLogos} />
);

export default Sponsors;