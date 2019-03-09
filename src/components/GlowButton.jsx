import React from 'react';
import { Button } from "reactstrap";
import { Icon } from "react-fa";

const GlowButton = ({ href, icon, text }) => (
    <Button href={href} className="live-links" size="lg" color="info" outline>
        <Icon size="2x" name={icon} />
        <br/>
        { text }
    </Button>
)

export default GlowButton
