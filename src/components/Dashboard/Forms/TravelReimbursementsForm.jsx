import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Label, Input, Collapse } from "reactstrap";
import { theme } from "../../../Defaults";
import { Creatable } from "react-select";
import Autocomplete from "react-google-autocomplete";
import ReactDependentScript from "react-dependent-script";
import { MAP_KEY } from "../../../secrets.js";
import PropTypes from "prop-types";

// The form on the dashboard to collect travel information
// It takes three props:
// 'travelling_from', the initial state of the travel form
// 'onSubmit', the callback to handle submitting the form
// 'mobile', if the travel form is on mobile

const MODE_LABELS = {
    "bus": "Bus",
    "train": "Train",
    "car": "Car",
    "plane": "Plane",
};

const label_obj = (mode) => ({
    value: mode,
    label: MODE_LABELS[mode] || mode,
});

const TravelReimbursementsForm = ({ travelling_from, onSubmit }) => {
    // If no travel object is provided, initialize all fields to falsey values
    const travel_state = travelling_from || {
        is_real: false,
        formatted_addr: null,
        mode: null,
        addr_ready: false,
        miles: 0,
    };
    const [is_real, setIsReal] = useState(travel_state.is_real);
    const [mode, setMode] = useState(travel_state.mode);
    const [addr_ready, setAddrReady] = useState(travel_state.addr_ready);
    const [formatted_addr, setFormattedAddr] = useState(travel_state.formatted_addr);
    const [miles, setMiles] = useState(travel_state.miles);

    let valid = true;
    let message = "";
    if(is_real) {
        switch(mode) {
        case "car":
            valid = addr_ready && formatted_addr && miles;
            message = <p>
                At least <strong>3</strong> people must be in the same vehicle for car reimbursement. Only <strong>one</strong> person should submit for reimbursements.
            </p>;
            break;
        case "bus":
        case "train":
            valid = addr_ready && formatted_addr;
            message = <p>
                You <strong>MUST</strong> submit receipts for both directions of travel.
            </p>;
            break;
        case "plane":
            valid = false;
            message = <p>
                Sorry, but we are unable to reimburse flights. If you have another way of getting here, please try that!
            </p>;
            break;
        case "":
            valid = false;
            break;
        default:
            valid = false;
            message = <p>
                Please reach out to <a href="mailto:travel@hackru.org">travel@hackru.org</a> to
                tell us how you plan to travel here, and we'll get back to you ASAP!
            </p>;
            break;
        }
    }

    return (
        <Form>
            <FormGroup>
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="request-travel"
                        checked={is_real}
                        onChange={() => setIsReal(!is_real)}
                    />
                    <label className="custom-control-label"
                        htmlFor="request-travel">I request travel reimbursements</label>
                </div>
            </FormGroup>
            <Collapse isOpen={is_real}>
                <FormGroup row>
                    <Col xs={12}>
                        <Label for="mode">Method of Travel</Label>
                        <div className="forcestyle">
                            <Creatable
                                id="mode"
                                value={label_obj(mode)}
                                onChange={e => setMode(e.value)}
                                options={[
                                    label_obj("bus"),
                                    label_obj("car"),
                                    label_obj("plane"),
                                    label_obj("train")
                                ]}
                                required
                            />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <Label>Travelling From</Label>
                        <div className="forcestyle">
                            <ReactDependentScript
                                loadingComponent={<Input disabled
                                    required
                                    placeholder="Where are you travelling from? (Loading...)" />}
                                scripts={["https://maps.googleapis.com/maps/api/js?key=" + MAP_KEY + "&libraries=places"]}>
                                <Autocomplete
                                    className="form-control"
                                    onChange={e => setFormattedAddr(e.target.value)}
                                    onPlaceSelected={e => {
                                        setFormattedAddr(e.formatted_address);
                                        setAddrReady(true);
                                    }}
                                    placeholder="Where are you travelling from?"
                                    required
                                    type={["(cities)"]}
                                    value={formatted_addr || ""}
                                />
                            </ReactDependentScript>
                        </div>
                    </Col>
                    { mode === "car" && <Col xs={12}>
                        <Label for="miles">How many miles will you be travelling (round trip)?</Label>
                        <Input id="miles"
                            type="number"
                            placeholder="0"
                            value={miles}
                            onChange={e => setMiles(e.target.value)}
                            validate={{
                                required: { value: true, errorMessage: "Invalid mileage" },
                                min: { value: 0, errorMessage: "Mileage must be non-negative" } }} />
                    </Col> }
                    <Col xs={12}
                        style={{ marginTop: "1em" }}>
                        {message}
                        <p>
                            If you request travel reimbursement, please be prepared to <strong>show us all receipts </strong> related to your reimbursement on the day of HackRU. Please keep in mind you <strong> must submit a project to Devpost and demo on Sunday </strong> to receive your travel reimbursement.
                        </p>
                    </Col>
                </FormGroup>
            </Collapse>
            {valid && <div style={{ width: "100%", marginBottom: 0 }}
                align="right">
                <Button
                    onClick={() => {
                        onSubmit({
                            is_real,
                            mode,
                            addr_ready,
                            formatted_addr,
                        });
                    }}
                    style={{ backgroundColor: theme.primary[0] }}
                    type="submit" >Update</Button>
            </div>}
        </Form>
    );
};

TravelReimbursementsForm.propTypes = {
    travelling_from: PropTypes.string,
    onSubmit: PropTypes.func,
};


export default TravelReimbursementsForm;
