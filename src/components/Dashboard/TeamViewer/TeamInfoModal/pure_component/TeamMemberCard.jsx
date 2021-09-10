import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import modalstyles from "./styles/ModalStyle.module.css";

const TeamMemberCard = (props) => {
    const {user_id, seriousness, bio} = props.member;
    return (
        <li className={modalstyles["entry-card"]}>
            <div className={modalstyles["teamcard-title"]}>
                <span><Avatar>{user_id.length === 0 ? "" : user_id.substring(0, 1)}</Avatar>{user_id}</span>
                <span>Seriousness : {seriousness}</span>
            </div>
            <div className={modalstyles["teamcard-bio"]}>
                Bio: {bio}
            </div>
        </li>
    );
};

TeamMemberCard.propTypes = {
    member : PropTypes.shape({
        user_id : PropTypes.string.isRequired,
        seriousness: PropTypes.number.isRequired,
        bio: PropTypes.string.isRequired,
    }).isRequired,
};

export default TeamMemberCard;