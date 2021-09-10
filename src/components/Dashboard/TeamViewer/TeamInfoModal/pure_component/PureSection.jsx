import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import modalstyles from "../styles/ModalStyle.module.css";

const PureSection = (props) => {
    const {sectionHeader, children} = props;
    return (
        <>
            <div className={modalstyles["tile"]}>
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