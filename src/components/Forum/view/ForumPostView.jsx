import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";

import forumstyles from "../styles/ForumStyle.module.css";

const ForumPostView = (props) => {
    const {poster, header, content} = props;
    return (
        <div className={`${forumstyles["forum-post-container"]}`}>
            <header className={`${forumstyles["forum-post-header"]}`}>
                <div className={`${forumstyles["profile-circle"]}`}>
                    <Typography className={`${forumstyles["profile-circle-text"]}`} variant="subtitle1">
                        {poster}
                    </Typography>
                </div>
                <Typography className={`${forumstyles["forum-post-header-text"]}`} variant="h5">
                    {header}
                </Typography>
            </header>
            <p className={`${forumstyles["forum-post-content"]}`}>
                {content}
            </p>
        </div>
    );
};

ForumPostView.propTypes = {
    poster : PropTypes.string.isRequired,
    header : PropTypes.string.isRequired,
    content : PropTypes.string.isRequired
}

export default ForumPostView;