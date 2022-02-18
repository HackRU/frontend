import React from "react";
import PropTypes from "prop-types";
import { useCancellablePromise } from "../../../hooks/CancellablePromise";
import ForumPostView from "../view/ForumPostView";
import Comments from "./Comments";

const forumPostReducer = (state, action) => {
    switch(action.type) {
    default : return {
        ...action.payload,
    };
    }
};

const commentsReducer = (state, action) => {
    switch(action.type) {
    default : return {
        ...action.payload,
    };
    }
};

const ForumPost = (props) => {
    const {post_uuid, profile} = props;
    const {cancellablePromise : loadForumUtil} = useCancellablePromise([post_uuid]);
    const {cancellablePromise : loadCommentsUtil} = useCancellablePromise([post_uuid]);
    const [postState, dispatchPostState] = React.useReducer(forumPostReducer, {post_loaded : false, post_load_err: false, poster : "", header : "", content : ""});
    const [commentsState, dispatchCommentsState] = React.useReducer(commentsReducer, {comments_loaded : false, comments_loaded_err : false, comments : []});
    React.useEffect(() => {
        //need to create Promise.js function to get forum post and comments
        loadForumUtil(profile.getForumPost(post_uuid), async (res) => {
            dispatchPostState({type : "do", payload : {post_loaded : true, post_load_err : false, poster : res.poster, header : res.header, content : res.content}});
        // eslint-disable-next-line no-unused-vars
        }, async (_err) => {
            dispatchPostState({type : "do", payload : {post_loaded : false, post_load_err : true, poster : "", header : "", content : ""}});
        });
        loadCommentsUtil(profile.getComments(post_uuid), async (res) => {
            dispatchCommentsState({type : "do", payload : {comments_loaded : true, comments_loaded_err : false, comments : res}});
        // eslint-disable-next-line no-unused-vars
        }, async (_err) => {
            dispatchCommentsState({type : "do", payload : {comments_loaded : false, comments_loaded_err : true, comments : []}});
        });
    }, [post_uuid]);
    return (
        <div>
            {postState.post_loaded ?
                <ForumPostView poster={postState.poster}
                    header={postState.header}
                    content={postState.content}/>     
                :
                postState.post_load_err ?
                    <div></div>
                    :
                    <div></div>
            }
            {commentsState.comments_loaded ?
                <Comments parent_class={"post"}
                    parent_uuid={post_uuid}
                    base_comments={commentsState.comments}
                    profile={profile}/>     
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