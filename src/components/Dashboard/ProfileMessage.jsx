import React from "react";
import { UncontrolledAlert } from 'reactstrap';
/**
 * Renders an alert based on the message
 * @param {String} message The displayed message 
 */
const ProfileMessage = ({ message }) => (
    message && <UncontrolledAlert
            color={message.success ? 'success' : 'danger'}
            style={{ background: "rgba(0, 255, 0, 0.25)", border: "none", color: "white" }} >
        { message.value }
    </UncontrolledAlert>
)
export default ProfileMessage