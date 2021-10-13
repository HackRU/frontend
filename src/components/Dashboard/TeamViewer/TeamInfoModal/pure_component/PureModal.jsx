import React from "react";
import PropTypes from "prop-types";
import modalstyles from "../styles/ModalStyle.module.css";
import { Typography } from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";

const PureModal = (props) => {
    const { header, children, onClick } = props;
    return (
        <div className={`${modalstyles["master-container"]} ${ props.isPrompt ? modalstyles["prompt-container"] : modalstyles["modal-container"]}`}>
            <header className={modalstyles["header"]}>
                <span className={modalstyles["header-title"]}>
                    <Typography className={modalstyles["main-header"]}
                        variant="h5">
                        {header}
                    </Typography>
                    {
                        props.subHeader && 
                        <Typography className={modalstyles["sub-header"]}
                            variant="subtitle1">
                            {props.subHeader}
                        </Typography>
                    }
                </span>
                <span className={modalstyles["button"]}>
                    <button onClick={onClick}>
                        <HighlightOff/>
                    </button>
                </span>
            </header>
            <div className={modalstyles["content-container"]}>
                {children}
            </div>
        </div>
    );
};

PureModal.propTypes = {
    header : PropTypes.string.isRequired,
    subHeader : PropTypes.string,
    children : PropTypes.node.isRequired,
    onClick : PropTypes.func.isRequired,
    isPrompt : PropTypes.bool,
};

export default PureModal;