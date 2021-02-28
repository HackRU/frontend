import React from "react";
import { UncontrolledAlert } from "reactstrap";
import PropTypes from "prop-types";
/**
 * Renders an alert based on the message
 * @param {String} message The displayed message 
 */
const ProfileMessage = ({ message }) => (
    message &&
        <UncontrolledAlert color={message.color}
            className={`profile-alert profile-alert-${message.color}`}>
            {message.value}
        </UncontrolledAlert>
);
ProfileMessage.propTypes = {
    message: PropTypes.object,
};
export default ProfileMessage;