import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const PureSection = (props) => {
    const {sectionHeader, children} = props;
    return (
        <>
            <div>
                <div>
                    <Typography variant="h5">
                        {sectionHeader}
                    </Typography>
                </div>
                {children}
            </div>
        </>
    );
};

PureSection.propTypes = {
    sectionHeader : PropTypes.string.isRequired,
    children : PropTypes.node.isRequired,
};

export default PureSection;