import React from "react";
import LogoWrapper from "./LogoWrapper";
import { defaults } from "../../../../Defaults.js";

const Partners = ({ isMobile }) => (
    <LogoWrapper isMobile={isMobile} title="Partners" endpoint={defaults.partnerLogos + "partners.json"} baseURL={defaults.partnerLogos} />
);

export default Partners;