import React from "react";
import { ListItemSecondaryAction, IconButton, ListItemAvatar, ListItem, ListItemText, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import GroupAdd from "@material-ui/icons/GroupAdd";


function RenderRow(props) {

    const { invitingTeam, originalTeamId } = props;

    async function handleClick() {
        await props.profile.inviteTeam(originalTeamId, invitingTeam.team_id);
        props.onInvite(props.index);
    }

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
                    disabled={invitingTeam.invited}
                    color="primary"
                    edge="end"
                    aria-label="add"
                    onClick={handleClick}
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
    onInvite: PropTypes.func,
    index: PropTypes.number,
};

export default RenderRow;