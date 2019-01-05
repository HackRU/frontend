import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

// Takes a prop message, and if message is non-null renders an alert
const ProfileMessage = ({ message }) => (
    message && <UncontrolledAlert
        color={message.success ? 'success' : 'danger'}
        style={{ background: "rgba(0, 255, 0, 0.25)", border: "none", color: "white" }}
    >
        { message.value }
    </UncontrolledAlert>
)

export default ProfileMessage
