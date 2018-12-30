import React from 'react';
import { CustomInput, FormGroup } from 'reactstrap';
import { defaults } from '../../Defaults'

// A file picker widget that lets a user upload a resume to the S3 bucket
// If the user has a resume, they may upload one again, but the widget will indicate they don't need to
// The S3 bucket is configured to allow public writes, so no credentials are needed to perform the PUT query

const ResumeUploader = ({ hasResume, userEmail }) => (
    <div>
        <h4> Upload a Resume </h4>
        <FormGroup>
            <CustomInput
                accept=".pdf"
                id="resume"
                onChange={(evt) => upload(evt, userEmail)}
                type="file"
            />
            <label className="custom-file-label" htmlFor="resume">
                {
                    hasResume ?
                        'Resume uploaded.' :
                        'Choose a PDF.'
                }
            </label>
        </FormGroup>
    </div>
)

// Use the userEmail as the S3 key for the upload
function upload(event, userEmail) {
    // Convert the file data to a buffer, which can be used as a PUT parameter
    fetch(defaults.rest.resumes + '/' + encodeURI(userEmail), {
        method: 'PUT',
        body: event.target.files[0]
    })
}

export default ResumeUploader
