import React from "react";
import PropTypes from "prop-types";

import { useCancellablePromise } from "../../../hooks/CancellablePromise";
import {GET, POST} from "../endpoints";
import CommentView from "../view/CommentView";

const base_offset = 0.5;

const Comments = (props) => {
    const {parent_class, parent_uuid, level, base_comments} = props;
    return (
        <ul style={{marginLeft : `${base_offset + base_offset*level} rem`}}>
            {base_comments.map((c) => 
                <li>
                    <CommentView poster={c.poster} content={c.content} poster_profile_action={() => {
                    window.open(`/user/${c.poster}`, "_blank").focus();
                    }}/>
                </li>)
            }
        </ul>
    );
};

Comments.propTypes = {
    parent_uuid : PropTypes.string.isRequired, //the id of the parent
    parent_class : PropTypes.oneOf(["post, comment"]).isRequired,
    level : PropTypes.number.isRequired, //level 0 is highest level comment, increasing levels means lower level comments and determines offset from left border
    base_comments : PropTypes.arrayOf(PropTypes.shape({
        poster : PropTypes.string.isRequired,
        content : PropTypes.string.isRequired,
        uuid : PropTypes.string.isRequired,
    })).isRequired,
};

export default Comments;