import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";

import postpreviewstyles from "../styles/ForumStyle.module.css";

const PostPreviewView = (props) => {
    const {submission_action, submission_validator, display_err, err_msg} = props;
    const [content, setContent] = React.useState("");
    const [title, setTitle] = React.useState("");
    return (
        <>
            <>
                {display_err && <div className={`${postpreviewstyles["reply-err-msg"]}`}>{err_msg}</div>}
            </>
            <form className={`${postpreviewstyles["reply-container"]}`} onSubmit={() => {
                if (submission_validator(title, text))
                    submission_action(title, text)
            }}>
                <label htmlFor="title"><Typography variant="">Title</Typography></label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <label htmlFor="content"><Typography variant="">Content</Typography></label>
                <textarea className={`${postpreviewstyles["reply-text-input"]} ${display_err ? postpreviewstyles["reply-text-input-err"] : ""}`} onChange={(e) => setContent(content)}></textarea>
                <button className={`${postpreviewstyles["button"]}`} type="submit">Post</button>
            </form>
        </>
    )
};

PostPreviewView.propTypes = {
    submission_validator : PropTypes.func.isRequired, //a two input validator
    submission_action : PropTypes.func.isRequired, //what happens after passes validation, should already have closure on the submission poster, has title and text as input
    display_err : PropTypes.bool,
    err_msg : PropTypes.string,
};

export default PostPreviewView;