import React from "react";
import { ListItemAvatar, ListItem, ListItemText, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";

function UserItem(props) {
    const { member, skills } = props;
    console.log(member);
    return (
        <ListItem>
           
            <ListItemText primary={member.bio}
                secondary={member.user_id} />
        </ListItem>
    );
}
UserItem.propTypes = {
    member: PropTypes.object,
    skills: PropTypes.array,
};

export default UserItem;