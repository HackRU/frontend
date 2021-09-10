import PropTypes from "prop-types";
import React, { useEffect, useState, useReducer, useCallback } from "react";
import { useCancellablePromise } from "../../../../hooks/CancellablePromise/CancellablePromise";
import TeamLoading from "../../TeamLoading";
import PureModal from "./pure_component/PureModal";
import ModalBackground from "./pure_component/ModalBackground";
import TeamInfoPure from "./pure_component/TeamInfoPure";

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

    return (
        <>
            <ModalBackground onClick={onClose}/>
            <PureModal header={teamName} 
                onClick={onClose}>
                <>
                    {
                        isLoading ?
                            <TeamLoading text={"Loading team info..."}/>
                            :
                            <>
                                <TeamInfoPure teamInfo={teamInfoState}/>
                            </>
                    }
                </>
            </PureModal>
        </>
    );
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