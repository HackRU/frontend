import React, { Component } from "react";
import { CustomInput, FormGroup } from "reactstrap";
import { ProfileType } from "../../../Profile";
import PropTypes from "prop-types";

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
        labelText: "Loading...",
    };

    constructor(props) {
        console.log(props);
        super(props);
        props.profile.DoesResumeExist().then(success => {
            this.setState({
                labelText: success ?
                    "Resume found" :
                    (this.props.edit ?
                        "Choose a file to upload" :
                        "Nothing yet")
            });
        });
    }

    /**
     * OnChange event handler
     * @param {Event} event OnChange event handler event object
     */
    uploadHandler = async (event) => {
        this.setState({ labelText: "Uploading resume..." });
        // Make the upload request
        const res = await this.props.profile.UploadResume(event.target.files[0]);
        this.setState({
            labelText: res.ok ? "Resume uploaded successfully." : "Failed to upload resume"
        });
    }
    /**
     * React render method
     */
    render = () => (
        <div>
            <h4> Upload a Resume </h4>
            <FormGroup>
                {this.props.edit ? <CustomInput accept=".pdf"
                    id="resume"
                    onChange={this.uploadHandler}
                    type="file"
                    label={this.state.labelText} /> : <p>{this.state.labelText}</p>}
            </FormGroup>
        </div>
    )
}

ResumeUploader.propTypes = {
    edit: PropTypes.bool,
    profile: ProfileType,
};

export default ResumeUploader;
