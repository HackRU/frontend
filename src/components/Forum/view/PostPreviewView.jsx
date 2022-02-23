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
            <form className={`${postpreviewstyles["reply-container"]}`} onSubmit={(e) => {
                e.preventDefault();
                if (submission_validator(title, content))
                    submission_action(title, content)
                else
                    !content.trim().length && setContent("");
                    !title.trim().length && setTitle("");
            }}>
                <label htmlFor="title"><Typography variant="">Title</Typography></label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={postpreviewstyles["title-input"]}></input>
                <label htmlFor="content"><Typography variant="">Content</Typography></label>
                <textarea className={`${postpreviewstyles["reply-text-input"]} ${display_err ? postpreviewstyles["reply-text-input-err"] : ""}`} onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                <div className={`${postpreviewstyles["button"]}`}>
                    <button className={`${postpreviewstyles["confirm"]}`} type="submit">Post</button>
                </div>
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