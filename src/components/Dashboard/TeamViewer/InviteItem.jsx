import React, { useState, useEffect } from "react";
import { ListItemSecondaryAction, IconButton, ListItemAvatar, ListItem, ListItemText, Avatar } from "@material-ui/core";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import LinkOffOutlinedIcon from "@material-ui/icons/LinkOffOutlined";
import PropTypes from "prop-types";

function InviteItem(props) {
    const { isOutgoing, invitedTeamId, originalTeam, profile, del } = props;
    const [invitedTeam, setInvitedTeam] = useState({});
    useEffect(() => {

        profile.getTeam(invitedTeamId).then((success) => {
            setInvitedTeam(success.response);
        });
    }, []);
    return (
        <ListItem
            style={{ padding: "1em" }}>
            <ListItemAvatar>
                <Avatar>
                    {invitedTeam.name ? invitedTeam.name.substring(0, 1) : ""}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={invitedTeam.name ? invitedTeam.name : ""}
                secondary={`${invitedTeam.members ? invitedTeam.members.length : ""}/4`}

            />
            <ListItemSecondaryAction>
                {
                    isOutgoing ?
                        <React.Fragment>
                            <IconButton edge="end"
                                aria-label="rescind"
                                style={{ color: "blue" }}
                                onClick={() => { profile.rescindInvite(originalTeam.team_id, invitedTeam.team_id); del(); }}
                            >
                                <LinkOffOutlinedIcon />
                            </IconButton>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <IconButton edge="end"
                                aria-label="accept"
                                style={{ color: "green" }}
                                onClick={() => { profile.confirmInvite(originalTeam.team_id, invitedTeam.team_id); del(); }}
                            >
                                <CheckCircleOutlineIcon />
                            </IconButton>
                            <IconButton edge="end"
                                aria-label="reject"
                                style={{ color: "red" }}
                                onClick={() => { profile.rejectInvite(originalTeam.team_id, invitedTeam.team_id); del(); }}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </React.Fragment>
                }
            </ListItemSecondaryAction>
        </ListItem>
    );
}
InviteItem.propTypes = {
    isOutgoing: PropTypes.bool,
    invitedTeamId: PropTypes.string,
    originalTeam: PropTypes.object,
    profile: PropTypes.object,
    del: PropTypes.func,
};

export default InviteItem;