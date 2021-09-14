import PropTypes from "prop-types";
import React from "react";

import modalstyles from "../styles/ModalStyle.module.css";

const TeamMemberCard = (props) => {
    const {user_id, bio} = props.member;
    return (
        <li className={modalstyles["entry-card"]}>
            <div className={modalstyles["teamcard-title"]}>
                <span>
                    <div>{bio}</div>
                    <div>{user_id}</div>
                </span>
            </div>
        </li>
    );
};

TeamMemberCard.propTypes = {
    member : PropTypes.shape({
        user_id : PropTypes.string.isRequired,
        seriousness: PropTypes.number,
        bio: PropTypes.string.isRequired,
    }).isRequired,
};

export default TeamMemberCard;