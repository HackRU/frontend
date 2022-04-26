import React from "react";
import PropTypes from "prop-types";

import { useCancellablePromise } from "../../../hooks/CancellablePromise";
import CommentView from "../view/CommentView";
import ReplyBoxView from "../view/ReplyBoxView";

const base_offset = 0.5;

const Comments = (props) => {
    const {parent_class, parent_uuid, base_comments, profile} = props;
    return (
        <ul style={{marginLeft : `${base_offset} rem`}}>
            {base_comments.map((c) => <CommentRow comment={c}
                parent_class={parent_class}
                profile={profile}/>)}
        </ul>
    );
};

const errReducer = (state, action) => {
    switch(action.type) {
    default: return {
        ...action.payload,
    };
    }
};

const CommentRow = (props) => {
    const {comment, parent_class, profile} = props;
    const [reply, setReply] = React.useState(false);
    const {cancellablePromise} = useCancellablePromise([comment.uuid]);
    const [subcomments, setSubComments] = React.useState(comment.subcomments && comment.subcomments.length ? comment.subcomments : []);

    const [errState, dispatchErrState] = React.useReducer(errReducer, {err_msg : "", display_err : false});

    const submission_validator = parent_class !== "post" ? () => {} : (text) => {
        const result = !!(text.trim().length);
        if (!result) 
            dispatchErrState({type : "do", payload: {err_msg : "Must enter something", display_err : true}});
        else
            dispatchErrState({type : "do", payload : {display_err : false}});
        return result;
    };

    //need to modify Profile.js to include method to hit the backend for post request
    const submission_action = parent_class !== "post" ? () => {} : (text) => {
        cancellablePromise(profile.postSubComment(text, comment.uuid), async (res) => {
            console.log(res);
            setSubComments(it => {
                const _it = [...it];
                _it.unshift(res);
                return _it;
            });
        }, async (err) => {
            dispatchErrState({type : "do", payload : {err_msg : err.err_msg, display_err : true}});
        });
    };

    return (
        <li>
            <CommentView poster={comment.poster}
                content={comment.content}/>
            {parent_class === "post" && !reply && <div onClick={() => setReply(true)}>Reply</div>}
            {reply && <ReplyBoxView 
                submission_action={submission_action}
                submission_validator={submission_validator}
                submission_cancel={() => setReply(false)}
                display_err={errState.display_err}
                err_msg={errState.err_msg}
            />}
            {!!subcomments.length && <Comments parent_class={"comment"}
                parent_uuid={comment.uuid}
                base_comments={subcomments}
                profile={profile}/>}
        </li>
    );
};

CommentRow.propTypes = {
    parent_class : PropTypes.oneOf(["post", "comment"]).isRequired,
    comment : PropTypes.shape({
        poster : PropTypes.string.isRequired,
        content : PropTypes.string.isRequired,
        uuid : PropTypes.string.isRequired,
        subcomments : PropTypes.any,
    }).isRequired,
    profile : PropTypes.shape({
        postSubComment : PropTypes.func,
        getSubComments : PropTypes.func,
    })
};

Comments.propTypes = {
    parent_uuid : PropTypes.string.isRequired, //the id of the parent
    parent_class : PropTypes.oneOf(["post, comment"]).isRequired,
    base_comments : PropTypes.arrayOf(PropTypes.shape({
        poster : PropTypes.string.isRequired,
        content : PropTypes.string.isRequired,
        uuid : PropTypes.string.isRequired,
        subcomments : PropTypes.any,
    })).isRequired,
    profile : PropTypes.shape({
        postSubComment : PropTypes.func,
        getSubComments : PropTypes.func,
    })
};

export default Comments;