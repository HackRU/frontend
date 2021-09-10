import React from "react";
import PropTypes from "prop-types";
import modalstyles from "../styles/ModalStyle.module.css";

const ModalBackground = (props) => {
    const {onClick} = props;
    return (
        <div className={modalstyles["backdrop"]}
            onClick={onClick}/>
    );
};

ModalBackground.propTypes = {
    onClick : PropTypes.func.isRequired,
};

export default ModalBackground;