import React from "react";
import PropTypes from "prop-types";
import ModalBackground from "./ModalBackground";
import PureModal from "./PureModal";

import modalstyles from "../styles/ModalStyle.module.css";

const ConfirmationModal = (props) => {
    const {onConfirm, onCancel} = props;
    return (
        <>
            <ModalBackground onClick={onCancel}/>
            <PureModal isPrompt={true}
                header={props.title ? props.title : ""}
                onClick={onCancel}
            >
                <div className={modalstyles["confirm-content-container"]}>
                    {
                        props.message && <div className={modalstyles["prompt-message"]}>{props.message}</div>
                    }
                    <div className={modalstyles["confirm-cancel-buttons"]}>
                        <button className={modalstyles["confirm"]}
                            onClick={onConfirm}>
                            <span>
                                Confirm
                            </span>
                        </button>
                        <button className={modalstyles["cancel"]}
                            onClick={onCancel}>
                            <span>
                                Cancel
                            </span>
                        </button>
                    </div>
                </div>
            </PureModal>
        </>
    );
};

ConfirmationModal.propTypes = {
    onConfirm : PropTypes.func.isRequired,
    onCancel : PropTypes.func.isRequired,
    message : PropTypes.string,
    title : PropTypes.string,
};

export default ConfirmationModal;