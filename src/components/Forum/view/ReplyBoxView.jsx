import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";

import replyboxstyle from "../styles/ForumStyle.module.css";

const ReplyBoxView = (props) => {
    const {submission_action, submission_validator, display_err, err_msg} = props;
    const [text, setText] = React.useState("");
    return (
        <>
            <div className={`${replyboxstyle["reply-err-msg"]}`}>{err_msg}</div>
            <form className={`${replyboxstyle["reply-container"]}`} onSubmit={() => {
                if (submission_validator(text)) 
                    submission_action(text);
            }}>
                <label htmlFor="reply-box"><Typography variant="">Reply</Typography></label>
                <textarea className={`${replyboxstyle["reply-text-input"]} ${display_err ? replyboxstyle["reply-text-input-err"] : ""}`} onChange={(e) => setText(e.target.value)} value={text}/>
                <button className={`${replyboxstyle["button"]}`} type="submit">Reply</button>
            </form>
        </>
    );
};

ReplyBox.propTypes = {
    submission_validator : PropTypes.func.isRequired, //returns true or false dependent on validation results
    submission_action : PropTypes.func.isRequired, //what happens after passes validation
    display_err : PropTypes.bool,
    err_msg : PropTypes.string,
};

export default ReplyBoxView;