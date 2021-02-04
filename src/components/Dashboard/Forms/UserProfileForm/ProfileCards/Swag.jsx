import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Label, Input, Collapse } from "reactstrap";
import Autocomplete from "react-google-autocomplete";
import ReactDependentScript from "react-dependent-script";
import { MAP_KEY } from "../../../../../secrets.js";
import PropTypes from "prop-types";
import { ProfileType } from "../../../../Profile";
import { theme } from "../../../../../Defaults";
import { Icon } from "react-fa";
import { PulseLoader } from "react-spinners";

// The form on the dashboard to collect travel information
// It takes three props:
// 'travelling_from', the initial state of the travel form
// 'onSubmit', the callback to handle submitting the form
// 'mobile', if the travel form is on mobile


const Swag = (props) => {
    // If no travel object is provided, initialize all fields to falsey values
    const [edit, setEdit] = useState(props.user.registration_status === "unregistered");
    const [want, setWant] = useState(false);
    const [loading, setLoading] = useState(false);
    const [swag_addr, setSwag] = useState("");

    const submitUser = async () => {
        setLoading(true);

        let update_user = {};
        update_user.swag = {accepting_swag: want, swag_address: swag_addr};

        let update_promise = new Promise((resolve) => {
            props.profile.Set(update_user, (err) => {resolve(err);} );
        });

        await update_promise;

        setLoading(false);
        setEdit(false);
    };

    useEffect(() => {
        try {
            setWant(props.user.swag.accepting_swag);
        } catch (err) {
            setWant(false);
        }
        
        try {
            setSwag(props.user.swag.swag_address);
        } catch {
            setSwag("");
        }
    // eslint-disable-next-line
    }, []);
    

    let set_user = JSON.parse(JSON.stringify(props.user));
    if (edit) {
        return (
            
            <div>
                <FormGroup>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="request-swag"
                            checked={want}
                            onChange={() => setWant(!want)}
                        />
                        <label className="custom-control-label"
                            htmlFor="request-swag">I would like to receive swag though the mail.</label>
                    </div>
                </FormGroup>
                <Collapse isOpen={want}>
                    <FormGroup row>
                        <Col xs={12}>
                            <Label>Mailing Address</Label>
                            <div className="forcestyle">
                                <ReactDependentScript
                                    loadingComponent={<Input disabled
                                        required
                                        placeholder="Mailing Address? (Loading...)" />}
                                    scripts={["https://maps.googleapis.com/maps/api/js?key=" + MAP_KEY + "&libraries=places"]}>
                                    <Autocomplete
                                        className="form-control"
                                        onChange={(e) => {setSwag(e.target.value);}}
                                        onPlaceSelected={(e) => {setSwag(e.formatted_address);}}
                                        required
                                        types={["address"]}
                                        value={swag_addr || ""}
                                    />
                                </ReactDependentScript>
                            </div>
                        </Col>
                    </FormGroup>
                </Collapse>
                <p>Note: Swag will only be given to those who provide a valid address and explicitly check the box!</p>
                <div style={{ width: "100%", marginTop: 20 }}
                    align="right">
                    <Button color="success"
                        onClick={() => {
                            // console.log(set_user);
                            submitUser(set_user);
                        }}
                        className="pill-btn"
                        type="button"> { loading ?  <PulseLoader color={theme.accent[0]} /> : "Update" } </Button>
                </div>                
            </div>
        );
    } else {
        let pStyle = {
            color: theme.disabled[0], padding: 5, minHeight: 35
        };
        // console.log(want);
        return (
            <div>
                <h4>
                    HackRU Swag
                    <Button color="primary"
                        className="pill-btn"
                        style={{ position: "absolute", right: 40 }}
                        onClick={() => { setEdit( true ); }} ><Icon name="edit" /></Button>
                </h4>
                <FormGroup row>
                    
                    <p style={{ ...pStyle, height: "100%" }}>
                        {want ? "I would like to receive swag through the mail." : "I would not like to receive swag."}</p>
                </FormGroup>
            </div>
           
        );
       
    }
    
};

Swag.propTypes = {
    user: {
        registration_status: PropTypes.string,
    },
    profile: ProfileType,
};


export default Swag;
