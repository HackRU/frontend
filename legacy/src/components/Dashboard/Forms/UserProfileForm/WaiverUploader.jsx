import React, { useEffect, useState } from "react";
import { CustomInput, FormGroup } from "reactstrap";
import { ProfileType } from "../../../Profile";
import { theme } from "../../../../Defaults";
import PropTypes from "prop-types";


const WaiverUploader = (props) => {

    const [waiverLabelText, setWaiverLabelText] = useState("Loading...");

    useEffect(() => {
        props.profile.DoesWaiverExist().then((success) => {
            props.checkWaiver(success ? "Waiver found" : props.edit ? "Choose a file to upload" : "Nothing yet");
            setWaiverLabelText(
                success ? "Waiver found" : props.edit ? "Choose a file to upload" : "Nothing yet"
            );
        });
    }, []);

    const onWaiverUpload = async (event) => {
        setWaiverLabelText("Uploading waiver...");
        // Make the upload request
        const res = await props.profile.UploadWaiver(event.target.files[0]);
        props.checkWaiver(res.ok ? "Waiver uploaded successfully." : "Failed to upload waiver");
        setWaiverLabelText(res.ok ? "Waiver uploaded successfully." : "Failed to upload waiver");
    };
    const pStyle = {
        color: theme.disabled[0] + "70",
        padding: 5,
        height: 35,
    };

    return (
        <div>
            
            <FormGroup>
                {props.edit ? (
                    <CustomInput
                        accept=".pdf"
                        id="waiver"
                        onChange={onWaiverUpload}
                        type="file"
                        label={waiverLabelText}
                    />
                ) : (
                    <p style={pStyle}>{waiverLabelText}</p>
                )}
            </FormGroup>
        </div>
    );
};

WaiverUploader.propTypes = {
    edit: PropTypes.bool,
    profile: ProfileType,
    checkWaiver: PropTypes.func
};

export default WaiverUploader;
