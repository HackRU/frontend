import React from "react";
import PropTypes from "prop-types";
import { useCancellablePromise } from "../../../../hooks/CancellablePromise";
import PostPreviewView from "../../../Forum/view/PostPreviewView";
import ForumPostListView from "../../../Forum/view/ForumPostListView";

import teampostsstyle from "./TeamPosts.module.css";

const openForumPost = (post_uuid) => {
    window.open(`/post/${post_uuid}`, "_blank").focus();
};

const errReducer = (_state, action) => {
    switch(action.type) {
    default : return {
        ...action.payload,
    };
    }
};

const postsReducer = (_state, action) => {
    switch(action.type) {
    case "error" : return {
        posts : [],
        display_err : true,
        is_loading : false,
    };
    case "success" : return {
        posts : action.payload.posts,
        display_err : false,
        is_loading : false,
    };
    default : return {
        ...action.payload,
    };
    }
};


const TeamPosts = (props) => {
    const {profile} = props;
    const {cancellablePromise : postForumPostUtil} = useCancellablePromise([]);
    const {cancellablePromise : myForumPostsUtil} = useCancellablePromise([]);
    const {cancellablePromise : allForumPostsUtil} = useCancellablePromise([]);
    const [errState, dispatchErrState] = React.useReducer(errReducer, {display_err : false, err_msg : ""});
    const [myPostsState, dispatchMyPosts] = React.useReducer(postsReducer, {posts: [], display_err : false, is_loading : true});
    const [allPostsState, dispatchAllPosts] = React.useReducer(postsReducer, {posts : [], display_err : false, is_loading : true});

    const submission_validator = (title, text) => {
        const result = !!(title.trim().length) && !!(text.trim().length);
        if (!result)
            dispatchErrState({type : "do", payload : {err_msg : "Must not have empty inputs to either fields", display_err : true}});
        else
            dispatchErrState({type : "do", payload : {display_err : false}});
        return result;
    };

    const submission_action = (title, text) => {
        postForumPostUtil(profile.postForumPost(title, text), async (post_uuid) => {
            openForumPost(post_uuid);
        }, async (err) => {
            dispatchErrState({type : "do", payload : {err_msg : err.err_msg, display_err : true}});
        });
    };

    React.useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        myForumPostsUtil(profile.getMyForumPosts(), async (posts) => dispatchMyPosts({type : "success", payload : {posts : posts}}), async (_err) => dispatchMyPosts({type : "error", payload : {}}));
        // eslint-disable-next-line no-unused-vars
        allForumPostsUtil(profile.getAllForumPosts(), async (posts) => dispatchAllPosts({type : "success", payload : {posts : posts}}), async (_err) => dispatchAllPosts({type : "error", payload : {}}));
    }, []);

    return (
        <div className={teampostsstyle["container"]}>
            <div className={teampostsstyle["my-forum-posts"]}>
                <header>My Forum Posts</header>
                {!myPostsState.is_loading && !myPostsState.display_err ?
                    <ForumPostListView posts_list={myPostsState.posts}
                        post_click_action={openForumPost}/>
                    :
                    myPostsState.display_err ?
                        <div>Error</div>
                        :
                        <div>Loading</div>
                }
            </div>
            <div className={teampostsstyle["all-forum-posts"]}>
                <header>All Forum Posts</header>
                {!allPostsState.is_loading && !allPostsState.display_err ?
                    <ForumPostListView posts_list={allPostsState.posts}
                        post_click_action={openForumPost}/>
                    :
                    allPostsState.display_err ?
                        <div>Error</div>
                        :
                        <div>Loading</div>
                }
            </div>
            <div className={teampostsstyle["post-preview"]}>
                <header>New Forum Post</header>
                <PostPreviewView submission_action={submission_action}
                    submission_validator={submission_validator}
                    display_err={errState.display_err}
                    err_msg={errState.err_msg}/>
            </div>
        </div>
    );
};

TeamPosts.propTypes = {
    profile : PropTypes.shape({
        postForumPost : PropTypes.func,
        getMyForumPosts : PropTypes.func, //get your forum posts
        getAllForumPosts : PropTypes.func,
    }),
};

export default TeamPosts;