import PropTypes from "prop-types";
import React from "react";

import modalstyles from "../styles/ModalStyle.module.css";
import GenericList from "./GenericList";
import PureSection from "./PureSection";
import TeamMemberList from "./TeamMemberList";

const TeamInfoPure = (props) => {
    const {teamInfo} = props;
    return (
        <div className={modalstyles["over-grid"]}>
            <div className={modalstyles["description-grid"]}>
                <PureSection sectionHeader={"Description"}>
                    <div>{ teamInfo.desc ? <>{teamInfo.desc}</> : <></> }</div>
                </PureSection>
            </div>
            <div className={modalstyles["members-skills-prizes-grid"]}>
                <div className={modalstyles["members-grid"]}>
                    <PureSection sectionHeader={"Members"}>
                        <TeamMemberList members={teamInfo.members}/>
                    </PureSection>
                </div>
                <div className={modalstyles["skills-prizes-grid"]}>
                    <PureSection sectionHeader={"Skills"}>
                        {
                            (teamInfo.skills && teamInfo.skills.length) ?
                                <GenericList entries={teamInfo.skills}/>
                                :
                                <div>No Skills Listed</div>
                        }
                    </PureSection>
                    <PureSection sectionHeader={"Prizes"}>
                        {
                            (teamInfo.prizes && teamInfo.prizes.length) ?
                                <GenericList entries={teamInfo.prizes}/>
                                :
                                <div>No Prizes Listed</div>
                        }
                    </PureSection>
                </div>
            </div>
        </div>
    );
};

TeamInfoPure.propTypes = {
    teamInfo : PropTypes.shape({
        members : PropTypes.arrayOf(PropTypes.shape({
            user_id : PropTypes.string.isRequired,
            seriousness : PropTypes.number.isRequired,
            bio : PropTypes.string.isRequired,
        })).isRequired,
        skills : PropTypes.arrayOf(PropTypes.string),
        prizes : PropTypes.arrayOf(PropTypes.string),
        desc : PropTypes.string,
    }).isRequired,
};

export default TeamInfoPure;