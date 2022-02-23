import React from "react";
import PropTypes from "prop-types";

import forumstyles from "../styles/ForumStyle.module.css";

const ForumPostView = (props) => {
    const {poster, title, content} = props;
    React.useEffect(() => {
        console.log(`${poster} - ${title} - ${content}`);
    }, []);
    return (
        <div className={`${forumstyles["forum-post-container"]}`}>
            <header className={`${forumstyles["forum-post-header"]}`}>
                <div className={`${forumstyles["profile-circle"]}`}>
                    {poster}
                </div>
                <div className={`${forumstyles["forum-post-title-text"]}`} variant="h5">
                    {title}
                </div>
            </header>
            <div className={`${forumstyles["forum-post-content"]}`}>
                <p>{content}</p>
            </div>
        </div>
    );
};

ForumPostView.propTypes = {
    poster : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    content : PropTypes.string.isRequired
}

export default ForumPostView;