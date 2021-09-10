import React from "react";
import PropTypes from "prop-types";

import modalstyles from "./styles/ModalStyle.module.css";

const GenericList = (props) => {
    const {entries} = props;
    return(
        <ul className={modalstyles["entry-list"]}>
            {
                entries && entries.map((entry) => 
                    <li key={entry}>{entry}</li>
                )
            }
        </ul>
    );
};

GenericList.propTypes = {
    entries : PropTypes.arrayOf(PropTypes.string),
};

export default GenericList;