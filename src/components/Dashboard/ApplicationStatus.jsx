import React from "react";
import { Button } from "reactstrap";
import { theme } from "../../Defaults";

/**
 * Turn the 'registration_status' from LCS into something user-friendly
 * @param {String} status Render the status of the users application
 */
const ApplicationStatus = ({ status, onComing, onNotComing, reimbursement }) => (
    <div style={{ marginBottom: 10 }}>
        <div style={{ width: "100%", textAlign: "left" }}>
            <p className="lead">Application Status</p>
        </div>
        { applicationBody(status, onComing, onNotComing, reimbursement) }
    </div>
)

const applicationBody = (status, onComing, onNotComing, reimbursement) => {
    switch(status) {
        case 'registered':
            return (<div>
                <h1>Pending</h1>
            </div>)
        case 'rejected':
            return (<div>
                <h1> Rejected </h1>
                <p> Your application has not been accepted. Unfortunately, we are not able to offer you a spot at HackRU. </p>
            </div>)
        case 'confirmation':
            return (<div>
                <h1> Accepted </h1>
                <p> You've been accepted to HackRU! </p>
                <Reimbursement reimbursement={reimbursement} />
                <AcceptButton onAccept={onComing} />
                <DeclineButton onDecline={onNotComing} />
            </div>)
        case 'coming':
            return (<div>
                <h1> Coming </h1>
                <p> You're coming! We're excited to see you there. </p>
                <Reimbursement reimbursement={reimbursement} />
                <AcceptButton disabled />
                <DeclineButton onDecline={onNotComing} />
            </div>)
        case 'not-coming':
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
                <Reimbursement reimbursement={reimbursement} />
            </div>)
        case 'waitlist':
            return (<div>
                <h1> Waitlisted </h1>
                <p> Your application has been waitlisted. If there is space on the day of the event, you may check in. </p>
            </div>)
        // TODO: Before day-of, add checked_in
        default:
            return (<div>
                <h1>Incomplete</h1>
                <p>Please fill out the user profile to complete your application</p>
            </div>)
    }
}

const AcceptButton = ({ onAccept, disabled }) => (
    <Button
        disabled={disabled}
        onClick={(e) => !disabled && onAccept(e)}
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

const Reimbursement = ({ reimbursement }) => (
    reimbursement ? <p>
        Your estimated reimbursement value is <strong>${reimbursement.toFixed(2)}.  </strong>   Due to a high number of applicants this semester, we cannot provide your exact travel reimbursement quantity at this time. Displayed here is the minimum amount of reimbursement you are approved for. On the day of, you might qualify for more based on the overall availability of funds (without exceeding the amount you spend or 59 dollars).
        <br /><br />
        Please note that reimbursement will be given in the form of Amazon giftcards, and you will only be granted reimbursement <strong>if you submit a hack to DevPost and demonstrate your hack.</strong>
    </p> : <p> You are not eligible to receive any travel reimbursement </p>
)

export default ApplicationStatus;
