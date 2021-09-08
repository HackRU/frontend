import React from "react";
import PropTypes from "prop-types";
import TeamMemberCard from "./TeamMemberCard";

import modalstyles from "./styles/ModalStyle.module.css";

const TeamMemberList = (props) => {
    const {members} = props;
    return(
        <ul className={modalstyles["entry-list"]}>
            {
                members.map((member) => <TeamMemberCard key={member.user_id}
                    member={member}/>)
            }
        </ul>
    );
};

TeamMemberList.propTypes = {
    members : PropTypes.arrayOf(PropTypes.shape({
        user_id : PropTypes.string,
        seriousness : PropTypes.number,
        bio : PropTypes.string,
    }))
};

export default TeamMemberList;