import React from "react";
import PropTypes from "prop-types";

const TeamPosts = (props) => {
    const {profile} = props;
    
};

TeamPosts.propTypes = {
    profile : PropTypes.shape({
        postForumPost : PropTypes.func,
        getForumPosts : PropTypes.func, //get forum posts by poster
        getAllForumPosts : PropTypes.func,
    }),
};

export default TeamPosts;