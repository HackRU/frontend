import React, { useEffect, useState } from "react";
import { CustomInput, FormGroup } from "reactstrap";
import { ProfileType } from "../../../Profile";
import { theme } from "../../../../Defaults";
import PropTypes from "prop-types";


const   VaccineUploader = (props) => {

    const [vaccineLabelText, setVaccineLabelText] = useState("Loading...");

    useEffect(() => {
        props.profile.DoesVaccineExist().then((success) => {
            props.checkVaccine(success ? "Vaccine Card found" : props.edit ? "Choose a file to upload" : "Nothing yet");
            setVaccineLabelText(
                success ? "Vaccine Card found" : props.edit ? "Choose a file to upload" : "Nothing yet"
            );
        });
    }, []);

    const onVaccineUpload = async (event) => {
        setVaccineLabelText("Uploading Vaccine Card...");
        // Make the upload request
        const res = await props.profile.UploadVaccine(event.target.files[0]);
        props.checkVaccine(res.ok ? "Vaccine uploaded successfully." : "Failed to upload Vaccine Card");
        setVaccineLabelText(res.ok ? "Vaccine Card uploaded successfully." : "Failed to upload Vaccine Card");
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
                        accept=".jpg, .pdf, .png"
                        id="vaccine"
                        onChange={onVaccineUpload}
                        type="file"
                        label={vaccineLabelText}
                    />
                ) : (
                    <p style={pStyle}>{vaccineLabelText}</p>
                )}
            </FormGroup>
        </div>
    );
};

VaccineUploader.propTypes = {
    edit: PropTypes.bool,
    profile: ProfileType,
    checkVaccine: PropTypes.func
};

export default VaccineUploader;
