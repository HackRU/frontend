import React, { useEffect, useState } from "react";
import { CustomInput, FormGroup } from "reactstrap";
import { ProfileType } from "../../../Profile";
import { theme } from "../../../../Defaults";
import PropTypes from "prop-types";
const WaiverUploader = React.memo(({ edit, profile }) => {
    const [waiverLabelText, setWaiverLabelText] = useState("Loading...");

    useEffect(() => {
        profile.DoesWaiverExist().then((success) => {
            setWaiverLabelText(
                success ? "Waiver found" : edit ? "Choose a file to upload" : "Nothing yet"
            );
        });
    });

    const onWaiverUpload = async (event) => {
        setWaiverLabelText("Uploading waiver...");
        // Make the upload request
        const res = await profile.UploadWaiver(event.target.files[0]);
        setWaiverLabelText(res.ok ? "Waiver uploaded successfully." : "Failed to upload waiver");
    };
    const pStyle = {
        color: theme.disabled[0] + "70",
        padding: 5,
        height: 35,
    };

    return (
        <div>
            <h4>
                Upload{" "}
                <a
                    style={{ color: "black", textDecoration: "underline" }}
                    href="/resources/waiver.pdf"
                >
                    Waiver
                </a>
            </h4>
            <FormGroup>
                {edit ? (
                    <CustomInput
                        accept=".pdf"
                        id="resume"
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
});

WaiverUploader.propTypes = {
    edit: PropTypes.bool,
    profile: ProfileType,
};

export default WaiverUploader;
