import React, { useState } from "react";
import { CustomInput, FormGroup } from "reactstrap";
import { ProfileType } from "../../../Profile";
import { theme } from "../../../../Defaults";
import PropTypes from "prop-types";

const ResumeUploader = ({ edit, profile }) => {
    const [labelText, setLabelText] = useState("Loading...");

    profile.DoesResumeExist().then(success => {
        setLabelText(success ?
            "Resume found" :
            (edit ?
                "Choose a file to upload" :
                "Nothing yet")
        );
    });

    const onUpload = async (event) => {
        setLabelText("Uploading resume...");
        // Make the upload request
        const res = await profile.UploadResume(event.target.files[0]);
        setLabelText(res.ok ? "Resume uploaded successfully." : "Failed to upload resume");
    };
    const pStyle = {
        color: theme.disabled[0] + "70", padding: 5, height: 35
    };

    return <div>
        <h4> Upload a Resume </h4>
        <FormGroup>
            {edit ? <CustomInput accept=".pdf"
                id="resume"
                onChange={onUpload}
                type="file"
                label={labelText} /> : <p style={pStyle}>{labelText}</p>}
        </FormGroup>
    </div>;
};

ResumeUploader.propTypes = {
    edit: PropTypes.bool,
    profile: ProfileType,
};

export default ResumeUploader;
