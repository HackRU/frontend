import React, { Component } from 'react';
import { CustomInput, FormGroup } from 'reactstrap';
import { defaults } from '../../Defaults'

// A file picker widget that lets a user upload a resume to the S3 bucket
// If the user has a resume, they may upload one again, but the widget will indicate they don't need to
// The S3 bucket is configured to allow public writes, so no credentials are needed to perform the PUT query

class ResumeUploader extends Component {
    state = {
        labelText: 'Choose a PDF to upload.'
    }

    // Make a request to S3 and return if it succeeded or failed
    makeRequest = (params) => (
        // Use the userEmail as the S3 key for the upload
        fetch(defaults.rest.resumes + '/' + encodeURI(this.props.userEmail) + '.pdf', params)
            .then(response => response.ok) // Was the response not an error?
            .catch(error => false) // If there were any exceptions, we did not succeed
    )

    uploadHandler = (event) => {
        this.setState({ labelText: 'Uploading resume...' })
        // Upload the resume to S3
        this.makeRequest({
            method: 'PUT',
            // Use the file from the filepicker
            body: event.target.files[0]
        })
            .then(success => this.setState({
                labelText: success ? 'Resume uploaded successfully.' : 'Failed to upload resume'
            }))
    }

    componentDidMount() {
        // Check if the user has already uploaded a resume and update the label accordingly
        this.makeRequest({
            method: 'HEAD'
        })
            .then(success => success && this.setState({ labelText: 'Resume found.' }))
    }

    render = () => (
        <div>
            <h4> Upload a Resume </h4>
            <FormGroup>
                <CustomInput
                    accept=".pdf"
                    id="resume"
                    onChange={this.uploadHandler}
                    type="file"
                    label={this.state.labelText}
                />
            </FormGroup>
        </div>
    )
}

export default ResumeUploader
