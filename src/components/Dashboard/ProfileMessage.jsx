import React from "react";
import { UncontrolledAlert } from "reactstrap";
/**
 * Renders an alert based on the message
 * @param {String} message The displayed message 
 */
const ProfileMessage = React.memo(({ message }) =>
    message &&
        <UncontrolledAlert color={message.color}
            className={`profile-alert profile-alert-${message.color}`}>
            {message.value}
        </UncontrolledAlert>
);
export default ProfileMessage;
