import React from "react";
import { Button } from "reactstrap";
import { Icon } from "react-fa";
import PropTypes from "prop-types";

const GlowButton = ({ href, icon, text }) => (
    <Button
        onClick={(e) => { window.location = href; }}
        className="live-links"
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
