import React, { Component } from "react";
import { CustomInput, FormGroup } from "reactstrap";
import { defaults } from "../../../../Defaults";
/**
 * A file picker widget that lets a user upload a resume to the S3 bucket
 * If the user has a resume, they may upload one again, but the widget will indicate they don't need to
 * The S3 bucket is configured to allow public writes, so no credentials are needed to perform the PUT query
 */
class ResumeUploader extends Component {
    /**
     * Set the initial state
     */
    state = {
        labelText: this.props.edit ? "Choose a PDF to upload." : "Nothing yet"
    }
    /**
     * Make a request to S3
     * @param {Object} params Fetch parameters
     * @return Success status
     */
    makeRequest = (params) => (
        // Use the userEmail as the S3 key for the upload
        fetch(defaults.rest.resumes + '/' + encodeURI(this.props.userEmail) + '.pdf', params)
            .then(response => response.ok) // Was the response not an error?
            .catch(error => false) // If there were any exceptions, we did not succeed
    )
    /**
     * OnChange event handler
     * @param {Event} event OnChange event handler event object
     */
    uploadHandler = (event) => {
        this.setState({ labelText: 'Uploading resume...' })
        // Upload the resume to S3
        this.makeRequest({
            method: 'PUT',
            body: event.target.files[0] // Use the file from the filepicker
        }).then(success => this.setState({
            labelText: success ? 'Resume uploaded successfully.' : 'Failed to upload resume'
        }))
    }
    /**
     * Set the original state
     */
    componentDidMount() {
        // Check if the user has already uploaded a resume and update the label accordingly
        this.makeRequest({
            method: 'HEAD'
        }).then(success => success && this.setState({ labelText: 'Resume found.' }))
    }
    /**
     * React render method
     */
    render = () => (
        <div>
            <h4> Upload a Resume </h4>
            <FormGroup>
                {this.props.edit ? <CustomInput accept=".pdf" id="resume" onChange={this.uploadHandler} type="file" label={this.state.labelText} /> : <p style={this.props.regStyle}>{this.state.labelText}</p>}
            </FormGroup>
        </div>
    )
}
export default ResumeUploader