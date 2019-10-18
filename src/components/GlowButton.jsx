import React from "react";
import { Button } from "reactstrap";
import { Icon } from "react-fa";
import PropTypes from "prop-types";

const GlowButton = ({ href, icon, text }) => (
    <Button
        onClick={() => { window.location = href; }}
        className="live-links"
        style={{ color: "white" }}
        size="lg"
        outline>
        <Icon size="2x"
            name={icon} />
        <br/>
        { text }
    </Button>
);

GlowButton.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
};

export default GlowButton;
