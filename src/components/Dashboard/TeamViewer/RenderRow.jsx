import React from "react";
import { ListItemSecondaryAction, IconButton, ListItemAvatar, ListItem, ListItemText, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import GroupAdd from "@material-ui/icons/GroupAdd";

function RenderRow(props) {
    const { invitingTeam, originalTeamId } = props;
    return (
        <ListItem alignItems="flex-start" 
            style={{ padding: "1em", cursor: "pointer" }}>
            <ListItemAvatar>
                <Avatar>{invitingTeam.name ? invitingTeam.name.substring(0, 1) : ""}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={invitingTeam.name ? invitingTeam.name : ""}
                secondary={`Size: ${invitingTeam.members ? invitingTeam.members.length : ""}/4  ;  Desc: ${invitingTeam.desc}`}
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    aria-label="add"
                    onClick={() => props.profile.inviteTeam(originalTeamId, invitingTeam.team_id)}
                >
                    <GroupAdd />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
RenderRow.propTypes = {
    invitingTeam: PropTypes.object,
    originalTeamId: PropTypes.string,
    profile: PropTypes.object,
    invited: PropTypes.bool,
};

export default RenderRow;