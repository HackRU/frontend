import React from "react";
import PropTypes from "prop-types";
import modalstyles from "../styles/ModalStyle.module.css";
import { Typography } from "@material-ui/core";
import { CancelPresentation } from "@material-ui/icons";

const PureModal = (props) => {
    const { header, subHeader, children, onClick } = props;
    return (
        <div className={modalstyles["modal-container"]}>
            <header className={modalstyles["header"]}>
                <span className={modalstyles["header-title"]}>
                    <Typography className={modalstyles["main-header"]}
                        variant="h5">
                        {header}
                    </Typography>
                    <Typography className={modalstyles["sub-header"]}
                        variant="h7">
                        {subHeader}
                    </Typography>
                </span>
                <span className={modalstyles["button"]}>
                    <button onClick={onClick}>
                        <CancelPresentation/>
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
    subHeader : PropTypes.string.isRequired,
    children : PropTypes.node.isRequired,
    onClick : PropTypes.func.isRequired,
};

export default PureModal;