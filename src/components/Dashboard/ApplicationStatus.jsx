import React, { Fragment } from "react";
/**
 * Turn the 'registration_status' from LCS into something user-friendly
 * @param {String} status Render the status of the users application
 */
const ApplicationStatus = ({ status }) => (
    <Fragment>
        <div style={{ width: "100%", textAlign: "left" }}>
            <p className="lead">Application Status</p>
        </div>
        {
            // For now, registered == pending
            status === 'registered' ? (
                <div>
                    <h1>Pending</h1>
                </div>
            ) : (
                <div>
                    <h1>Incomplete</h1>
                    <p>Please fill out the user profile to complete your application</p>
                </div>
            )
        }
    </Fragment>
)

export default ApplicationStatus;
