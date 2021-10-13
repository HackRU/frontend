import React from "react";
import { ListItemSecondaryAction, IconButton, ListItemAvatar, ListItem, ListItemText, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import GroupAdd from "@material-ui/icons/GroupAdd";
import TeamInfoModal from "./TeamInfoModal";


function RenderRow(props) {

    const { invitingTeam, originalTeamId } = props;

    const [showModal, setShowModal] = React.useState(false);

    async function handleClick() {
        await props.profile.inviteTeam(originalTeamId, invitingTeam.team_id);
        props.onInvite(props.index);
    }

    return (
        <>
            {
                showModal && <TeamInfoModal teamName={invitingTeam.name ? invitingTeam.name : ""} 
                    teamId={invitingTeam.team_id}
                    profile={props.profile}
                    onClose={() => setShowModal(false)}
                />
            }
            <ListItem alignItems="flex-start" 
                style={{ padding: "1em", cursor: "pointer" }}>
                <ListItemAvatar>
                    <Avatar>{invitingTeam.name ? invitingTeam.name.substring(0, 1) : ""}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={invitingTeam.name ? invitingTeam.name : ""}
                    secondary={`Size: ${invitingTeam.members ? invitingTeam.members.length : ""}/4  ;  Desc: ${invitingTeam.desc}`}
                    onClick={() => setShowModal(true)}
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
        </>
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