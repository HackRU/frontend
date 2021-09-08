import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

import modalstyles from "./styles/ModalStyle.module.css";

const GenericList = (props) => {
    const {header, entries} = props;
    return(
        <div>
            <div>
                <Typography variant="h5">
                    {header}
                </Typography>
            </div>
            <ul className={modalstyles["entry-list"]}>
                {
                    entries.map((entry) => 
                        <li key={entry}>{entry}</li>
                    )
                }
            </ul>
        </div>
    );
};

GenericList.propTypes = {
    header : PropTypes.string,
    entries : PropTypes.arrayOf(PropTypes.string),
};

export default GenericList;