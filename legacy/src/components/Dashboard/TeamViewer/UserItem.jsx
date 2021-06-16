import React from "react";
import { ListItemAvatar, ListItem, ListItemText, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";

function UserItem(props) {
    const { member, skills } = props;
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar style={{ "width": "2.5em", "height": "2.5em" }}>
                    {member.user_id ? member.user_id.substring(0, 1).toUpperCase() : "-"}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.user_id}
                secondary={skills} />
        </ListItem>
    );
}
UserItem.propTypes = {
    member: PropTypes.object,
    skills: PropTypes.array,
};

export default UserItem;