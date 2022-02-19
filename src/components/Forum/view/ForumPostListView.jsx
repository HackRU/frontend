import React from "react";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";

import forumpostliststyle from "../styles/ForumStyle.module.css";

const ForumPostListView = (props) => {
    const {posts_list, post_click_action} = props;
    return (
        <div className={`${forumpostliststyle["posts-master-container"]}`}>
            <div className={`${forumpostliststyle["posts-list-container"]}`}>
                <ul>
                    {posts_list.map((p) => 
                        <li>
                            <header onClick={() => post_click_action(p.uuid)}>
                                <span>{p.title}</span> <span>- by {p.poster}</span>
                            </header>
                        </li>
                    )}
                </ul> 
            </div>
        </div>
    );
};

ForumPostListView.propTypes = {
    posts_list : PropTypes.arrayOf(PropTypes.shape({
        poster : PropTypes.string.isRequired,
        title : PropTypes.string.isRequired,
        uuid : PropTypes.string.isRequired, //passed into the onclick action
    })).isRequired,
    post_click_action : PropTypes.func.isRequired, //accepts uuid as argument
};

export default ForumPostListView;