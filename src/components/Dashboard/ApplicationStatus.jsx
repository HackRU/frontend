import React, { Fragment } from "react";
import { Button } from "reactstrap";
import { theme } from "../../Defaults";

/**
 * Turn the 'registration_status' from LCS into something user-friendly
 * @param {String} status Render the status of the users application
 */
const ApplicationStatus = ({ status, onComing, onNotComing }) => (
    <Fragment>
        <div style={{ width: "100%", textAlign: "left" }}>
            <p className="lead">Application Status</p>
        </div>
        { applicationBody(status, onComing, onNotComing) }
    </Fragment>
)

const applicationBody = (status, onComing, onNotComing) => {
    switch(status) {
        case 'registered':
            return (<div>
                <h1>Pending</h1>
            </div>)
        case 'rejected':
            return (<div>
                <h1> Rejected </h1>
                <p> We're sorry, but your application to attend HackRU has been rejected. </p>
            </div>)
        case 'confirmation':
            return (<div>
                <h1> Accepted </h1>
                <p> You've been accepted to HackRU! </p>
                <AcceptButton onAccept={onComing} />
                <DeclineButton onDecline={onNotComing} />
            </div>)
        case 'coming':
            return (<div>
            <h1> Coming </h1>
            <p> You're coming! We're excited to see you there. </p>
            <AcceptButton disabled />
            <DeclineButton onDecline={onNotComing} />
        </div>)
        case 'not_coming':
            return (<div>
                <h1> Not Coming </h1>
                <p> You're not coming. Sorry to see you go! </p>
                <AcceptButton onAccept={onComing} />
                <DeclineButton disabled />
            </div>)
        case 'confirmed':
            return (<div>
                <h1> Confirmed </h1>
                <p> You're all set! Feel free to email <a href="mailto:info@hackru.org">info@hackru.org</a> with any questions. </p>
            </div>)
        case 'waitlist':
            return (<div>
                <h1> Waitlisted </h1>
                <p> Your application has been waitlisted. On the day of the event, once waitlist check in opens, if there is space remaining you may check in. You are not guaranteed a spot. </p>
            </div>)
        // TODO: Before day-of, add checked_in
        default:
            return (<div>
                <h1>Incomplete</h1>
                <p>Please fill out the user profile to complete your application</p>
            </div>)
    }
}

const AcceptButton = ({ onComing, disabled }) => (
    <Button
        disabled={disabled}
        onClick={(e) => !disabled && onComing(e)}
        style={{ backgroundColor: disabled ? theme.disabled[0] : theme.primary[0] }}
    >
        Coming
    </Button>
)

const DeclineButton = ({ onDecline, disabled }) => (
    <Button
        disabled={disabled}
        onClick={(e) => !disabled && onDecline(e)}
        style={{ backgroundColor: disabled ? theme.disabled[0] : theme.accent[0], marginLeft: 10 }}
    >
        Not Coming
    </Button>
)

export default ApplicationStatus;
