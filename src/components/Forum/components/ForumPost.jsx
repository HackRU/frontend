import React from "react";
import PropTypes from "prop-types";
import { useCancellablePromise } from "../../../hooks/CancellablePromise";
import ForumPostView from "../view/ForumPostView";
import Comments from "./Comments";

import forumpoststyle from "../styles/ForumStyle.module.css";
import ReplyBoxView from "../view/ReplyBoxView";

const forumPostReducer = (state, action) => {
    switch(action.type) {
    default : return {
        ...action.payload,
    };
    }
};

const commentsReducer = (state, action) => {
    let _it = [];
    switch(action.type) {
    case "prepend" : 
        _it = [...state.comments];
        _it.unshift(action.payload.new_comment);
        return {
            ...state,
            comments : _it,
        };
    default : return {
        ...action.payload,
    };
    }
};

const errReducer = (state, action) => {
    switch(action.type) {
    default: return {
        ...action.payload,
    };
    }
};

const ForumPost = (props) => {
    const {post_uuid, profile} = props;
    const {cancellablePromise : loadForumUtil} = useCancellablePromise([post_uuid]);
    const {cancellablePromise : loadCommentsUtil} = useCancellablePromise([post_uuid]);
    const {cancellablePromise : postCommentUtil} = useCancellablePromise([post_uuid]);
    const [postState, dispatchPostState] = React.useReducer(forumPostReducer, {post_loaded : false, post_load_err: false, poster : "", title : "", content : ""});
    const [commentsState, dispatchCommentsState] = React.useReducer(commentsReducer, {comments_loaded : false, comments_loaded_err : false, comments : []});
    const [errState, dispatchErrState] = React.useReducer(errReducer, {err_msg : "", display_err : false});
    const [reply, setReply] = React.useState(false);

    const submission_validator = (text) => {
        const result = !!(text.trim().length);
        if (!result)
            dispatchErrState({type : "do", payload : {err_msg : "Must enter something", display_err : true}});
        else
            dispatchErrState({type : "do", payload : {display_err : false}});
        return result;
    };

    const submission_action = (text) => {
        postCommentUtil(profile.postComment(text, post_uuid), async (res) => {
            dispatchCommentsState({type : "prepend", payload : {new_comment : res}});
        // eslint-disable-next-line no-unused-vars
        }, async (err) => 
            dispatchErrState({type : "do", payload : {err_msg : "Something went wrong posting the comment", display_err : true}}));
    };

    React.useEffect(() => {
        //need to create Promise.js function to get forum post and comments
        loadForumUtil(profile.getForumPost(post_uuid), async (res) => {
            console.log(res);
            dispatchPostState({type : "do", payload : {post_loaded : true, post_load_err : false, poster : res.poster, title : res.title, content : res.content}});
        // eslint-disable-next-line no-unused-vars
        }, async (_err) => {
            dispatchPostState({type : "do", payload : {post_loaded : false, post_load_err : true, poster : "", title : "", content : ""}});
        });
        loadCommentsUtil(profile.getComments(post_uuid), async (res) => {
            dispatchCommentsState({type : "do", payload : {comments_loaded : true, comments_loaded_err : false, comments : res}});
        // eslint-disable-next-line no-unused-vars
        }, async (_err) => {
            dispatchCommentsState({type : "do", payload : {comments_loaded : false, comments_loaded_err : true, comments : []}});
        });
    }, [post_uuid]);
    return (
        <div className={forumpoststyle["forum-container"]}>
            {postState.post_loaded ?
                <>
                    <ForumPostView poster={postState.poster}
                        title={postState.title}
                        content={postState.content}/>     
                    {!reply && <div onClick={() => setReply(true)}>Comment</div>}
                    {reply && <ReplyBoxView
                        submission_action={submission_action}
                        submission_validator={submission_validator}
                        submission_cancel={() => setReply(false)}
                        display_err={errState.display_err}
                        err_msg={errState.err_msg}/>}
                </>
                :
                postState.post_load_err ?
                    <div></div>
                    :
                    <div></div>
            }
            {commentsState.comments_loaded ?
                <>
                    <div>Comments</div>
                    <Comments parent_class={"post"}
                        parent_uuid={post_uuid}
                        base_comments={commentsState.comments}
                        profile={profile}/>     
                </>
                :
                commentsState.comments_loaded_err ?
                    <div></div>
                    :
                    <div></div>
            }
        </div>
    );
};

ForumPost.propTypes = {
    post_uuid : PropTypes.string.isRequired,
    profile : PropTypes.shape({
        getComments : PropTypes.func,
        postComment : PropTypes.func,
        getForumPost : PropTypes.func,
    })
};

export default ForumPost;