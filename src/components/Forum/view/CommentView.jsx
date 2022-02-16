import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";

import commentstyles from "../styles/ForumStyle.module.css";

const CommentView = (props) => {
    const {poster, poster_profile_action, content} = props;
    return (
        <div className={`${commentstyles["comment-container"]}`}>
            <header className={`${commentstyles["comment-header"]}`}>
                <div className={`${commentstyles["profile-circle"]}`} onClick={poster_profile_action}>
                    <Typography className={`${commentstyles["profile-circle-text"]}`} variant="subtitle1">
                        {poster}
                    </Typography>
                </div>
            </header>
            <p className={`${commentstyles["comment-content"]}`}>
                {content}
            </p>
        </div>
    );
}

CommentView.propTypes = {
    poster : PropTypes.string.isRequired,
    poster_profile_action : PropTypes.func.isRequired,
    content : PropTypes.string.isRequired,
};

export default CommentView;