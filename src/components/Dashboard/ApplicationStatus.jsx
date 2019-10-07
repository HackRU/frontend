import React from "react";
import { Button } from "reactstrap";
import { theme } from "../../Defaults";
import PropTypes from "prop-types";

/**
 * Turn the 'registration_status' from LCS into something user-friendly
 * @param {String} status Render the status of the users application
 */
const ApplicationStatus = ({ status, onComing, onNotComing, travelling_from }) => (
    <div style={{ marginBottom: 10 }}>
        <div style={{ width: "100%", textAlign: "left" }}>
            <p className="lead">Application Status</p>
        </div>
        { applicationBody(status, onComing, onNotComing, travelling_from) }
    </div>
);

ApplicationStatus.propTypes = {
    status: PropTypes.string,
    onComing: PropTypes.func,
    onNotComing: PropTypes.func,
    travelling_from: PropTypes.object,
};

const applicationBody = (status, onComing, onNotComing, travelling_from) => {
    switch(status) {
    case "registered":
        return (<div>
            <h1>Pending</h1>
        </div>);
    case "rejected":
        return (<div>
            <h1> Rejected </h1>
            <p> Your application has not been accepted. Unfortunately, we are not able to offer you a spot at HackRU. </p>
        </div>);
    case "confirmation":
        return (<div>
            <h1> Accepted </h1>
            <p> { "You've been accepted to HackRU!" } </p>
            <Reimbursement travelling_from={travelling_from} />
            <AcceptButton onAccept={onComing} />
            <DeclineButton onDecline={onNotComing} />
        </div>);
    case "coming":
        return (<div>
            <h1> Coming </h1>
            <p> { "You're coming! We're excited to see you there." } </p>
            <Reimbursement travelling_from={travelling_from} />
            <AcceptButton disabled />
            <DeclineButton onDecline={onNotComing} />
        </div>);
    case "not-coming":
        return (<div>
            <h1> Not Coming </h1>
            <p> { "You're not coming. Sorry to see you go!" } </p>
            <AcceptButton onAccept={onComing} />
            <DeclineButton disabled />
        </div>);
    case "confirmed":
        return (<div>
            <h1> Confirmed </h1>
            <p>
                { "You're all set! Feel free to email " }
                <a href="mailto:info@hackru.org">info@hackru.org</a> with any questions. </p>
            <Reimbursement travelling_from={travelling_from} />
        </div>);
    case "waitlist":
        return (<div>
            <h1> Delayed Entry </h1>
            <p> Your application has been placed on the delayed entry list. If there is space on the day of the event, you may check in. </p>
        </div>);
    // TODO: Before day-of, add checked_in
    default:
        return (<div>
            <h1>Incomplete</h1>
            <p>Please fill out the user profile to complete your application</p>
        </div>);
    }
};

const AcceptButton = ({ onAccept, disabled }) => (
    <Button
        disabled={disabled}
        onClick={(e) => !disabled && onAccept(e)}
        style={{ backgroundColor: disabled ? theme.disabled[0] : theme.primary[0], color: disabled ? theme.disabled[1] : theme.primary[1] }}
    >
        Coming
    </Button>
);

AcceptButton.propTypes = {
    onAccept: PropTypes.func,
    disabled: PropTypes.bool,
};

const DeclineButton = ({ onDecline, disabled }) => (
    <Button
        disabled={disabled}
        onClick={(e) => !disabled && onDecline(e)}
        style={{ backgroundColor: disabled ? theme.disabled[0] : theme.accent[0], marginLeft: 10 }}
    >
        Not Coming
    </Button>
);

DeclineButton.propTypes = {
    onDecline: PropTypes.func,
    disabled: PropTypes.bool,
};

const Reimbursement = ({ travelling_from }) => (
    (travelling_from && travelling_from.reimbursement) ? 
        (<p> You are eligible for up to <strong>${ (travelling_from && travelling_from.reimbursement) ? (travelling_from.reimbursement.toFixed(2)) : (0)}</strong> in travel reimbursements.
            { travelling_from.mode === "car" ?
                " You must be travelling with at least 3 people in your car to be reimbursed!" :
                " Remember, you'll need to show receipts for reimbursement!" }
            <br /><br />
            Please note that reimbursement will be given in the form of Amazon giftcards, and you will only be granted reimbursement as a hacker <strong>if you submit a hack to DevPost and demonstrate your hack.</strong>
            <br />
            If you are a mentor, you will only be reimbursed if you fulfill all the hours you registered for.
        </p>):
        (<p> You are not eligible to receive any travel reimbursement</p>)
);

Reimbursement.propTypes = {
    travelling_from: PropTypes.object,
};

export default ApplicationStatus;
