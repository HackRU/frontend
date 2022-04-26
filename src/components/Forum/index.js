import React from "react";
import {default as _ForumPost} from "./components/ForumPost";

const ForumPost = (props) => {
    const {match, profile} = props;
    const post_uuid = match.params.post_uuid;
    return (
        <_ForumPost post_uuid={post_uuid} profile={profile}/>
    );
}

export default ForumPost;