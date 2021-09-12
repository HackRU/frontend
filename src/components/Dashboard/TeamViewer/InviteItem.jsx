import React, { useState, useEffect, useRef } from "react";
import { ListItemSecondaryAction, IconButton, ListItemAvatar, ListItem, ListItemText, Avatar } from "@material-ui/core";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import LinkOffOutlinedIcon from "@material-ui/icons/LinkOffOutlined";
import PropTypes from "prop-types";
import TeamInfoModal from "./TeamInfoModal";
import ConfirmationModal from "./TeamInfoModal/pure_component/ConfirmationModal";
import { useCancellablePromise } from "../../../hooks/CancellablePromise/CancellablePromise";

function InviteItem(props) {
    const { isOutgoing, invitedTeamId, originalTeam, profile, del } = props;
    const [invitedTeam, setInvitedTeam] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const {cancellablePromise} = useCancellablePromise([invitedTeamId]);

    const fun = useRef(() => {});
    const [msg, setMsg] = useState("");

    useEffect(() => {
        profile.getTeam(invitedTeamId).then((success) => {
            setInvitedTeam(success.response);
        });
    }, []);
    return (
        <>
            {
                showModal && <TeamInfoModal teamName={invitedTeam.name}
                    teamId={invitedTeam.team_id}
                    profile={profile}
                    onClose={() => setShowModal(false)}/>
            }
            {
                showConfirmation && <ConfirmationModal 
                    message={msg}
                    onCancel={() => setShowConfirmation(false)}
                    onConfirm={
                        () => {
                            const p = fun.current(originalTeam.team_id, invitedTeam.team_id);
                            cancellablePromise(p, async () => { del(); setShowConfirmation(false);}, async () => { setShowConfirmation(false);});
                        }
                    }
                />
            }
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
                    onClick={() => setShowModal(true)}
                />
                <ListItemSecondaryAction>
                    {
                        isOutgoing ?
                            <React.Fragment>
                                <IconButton edge="end"
                                    aria-label="rescind"
                                    style={{ color: "blue" }}
                                    onClick={() => { 
                                        setMsg(`Do you want to rescind invite for ${invitedTeam.name}?`);
                                        fun.current = (ori_id, invi_id) => profile.rescindInvite(ori_id, invi_id);
                                        setShowConfirmation(true);
                                    }}
                                >
                                    <LinkOffOutlinedIcon />
                                </IconButton>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <IconButton edge="end"
                                    aria-label="accept"
                                    style={{ color: "green" }}
                                    onClick={() => { 
                                        setMsg(`Do you want to confirm invite from ${invitedTeam.name}?`);
                                        fun.current = (ori_id, invi_id) => profile.confirmInvite(ori_id, invi_id);
                                        setShowConfirmation(true);
                                    }}
                                >
                                    <CheckCircleOutlineIcon />
                                </IconButton>
                                <IconButton edge="end"
                                    aria-label="reject"
                                    style={{ color: "red" }}
                                    onClick={() => { 
                                        setMsg(`Do you want to reject invite from ${invitedTeam.name}?`);
                                        fun.current = (ori_id, invi_id) => profile.rejectInvite(ori_id, invi_id);
                                        setShowConfirmation(true);
                                    }}
                                >
                                    <HighlightOffIcon />
                                </IconButton>
                            </React.Fragment>
                    }
                </ListItemSecondaryAction>
            </ListItem>
        </>
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