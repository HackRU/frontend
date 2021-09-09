import { Typography } from "@material-ui/core";
import { CancelPresentation } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState, useReducer, useCallback } from "react";
import { useCancellablePromise } from "../../../../hooks/CancellablePromise/CancellablePromise";
import TeamLoading from "../../TeamLoading";
import GenericList from "./GenericList";
import TeamMemberList from "./TeamMemberList";

import modalstyles from "./styles/ModalStyle.module.css";

const teamInfoReducer = (state, action) => {
    switch (action.type) {
    default: return {
        ...action.payload,
    };
    }
};

const initialState = {};

const TeamInfoModal = (props) => {
    const { teamName, teamId, onClose, profile } = props;
    const {cancellablePromise : fetchTeamInfo } = useCancellablePromise([teamName]);
    const [isLoading, setLoading] = useState(true);
    const [teamInfoState, dispatchTeamInfo] = useReducer(teamInfoReducer, initialState);

    const handleTeamInfoRequest = useCallback(async (resp) => {
        dispatchTeamInfo({ type : "do", payload: resp.response });
        setLoading(false);
    }, []);
    
    useEffect(() => {
        fetchTeamInfo(profile.getTeam(teamId), handleTeamInfoRequest, async (resp) => { console.log(resp); });
    }, [teamName]);

    return (<>
        <ModalBackground onClose={onClose}/>
        <div className={modalstyles["modal-container"]}>
            <header className={modalstyles["header"]}>
                <span>
                    <Typography className={modalstyles["inline-title"]}
                        variant="h5">
                        {teamName}:
                    </Typography>
                    <Typography className={modalstyles["inline-title"]}
                        variant="h6">
                        {teamId}
                    </Typography>
                </span>
                <span>
                    <button onClick={onClose}>
                        <CancelPresentation/>
                    </button>
                </span>
            </header>
            {
                isLoading ?
                    <TeamLoading text={"Loading team info..."}/>
                    :
                    <div className={modalstyles["content-container"]}>
                        <div>
                            <div>
                                <Typography variant="h5">
                                    Members
                                </Typography>
                            </div>
                            <TeamMemberList members={teamInfoState.members}/>
                        </div>
                        {
                            teamInfoState.skills ? 
                                <GenericList header={"Skills"}
                                    entries={teamInfoState.skills}/>
                                :
                                <></>
                        }
                        {
                            teamInfoState.prizes ?
                                <GenericList header={"Prizes"}
                                    entries={teamInfoState.prizes}/>
                                :
                                <></>
                        }
                    </div>
            }
        </div>
    </>);
};

const ModalBackground = (props) => {
    const {onClose} = props;

    return (
        <div className={modalstyles["backdrop"]} 
            onClick={onClose}/>
    );
};

ModalBackground.propTypes = {
    onClose : PropTypes.func,
};

TeamInfoModal.propTypes = {
    teamName : PropTypes.string,
    teamId : PropTypes.string,
    profile : PropTypes.shape({
        getTeam: PropTypes.func,
    }),
    onClose : PropTypes.func,
};

export default TeamInfoModal;