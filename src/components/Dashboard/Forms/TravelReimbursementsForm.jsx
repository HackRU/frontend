import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label, Input, Collapse } from 'reactstrap';
import { theme } from "../../../Defaults";
import { Creatable } from "react-select";
import Autocomplete from 'react-google-autocomplete';
import ReactDependentScript from 'react-dependent-script';
import { MAP_KEY } from '../../../secrets.js';

// The form on the dashboard to collect travel information
// It takes three props:
// 'travelling_from', the initial state of the travel form
// 'onSubmit', the callback to handle submitting the form
// 'mobile', if the travel form is on mobile

const MODE_LABELS = {
    'bus': 'Bus',
    'train': 'Train',
    'car': 'Car',
    'plane': 'Plane',
}

const label_obj = (mode) => ({
    value: mode,
    label: MODE_LABELS[mode],
})

class TravelReimbursementsForm extends Component {
    constructor(props) {
        super(props)
        // If no travel object is provided, initialize all fields to falsey values
        this.state = props.travelling_from || {
            is_real: false,
            formatted_addr: null,
            mode: null,
            addr_ready: false,
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state)
    }

    render() {
        const mobile = this.props.mobile;
        const { is_real, formatted_addr, mode } = this.state;
        let valid = !this.state.is_real || (this.state.addr_ready && this.state.formatted_addr && this.state.mode)
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="request-travel"
                            checked={is_real}
                            onChange={(e) => this.setState({ is_real: !is_real })}
                        />
                        <label className="custom-control-label" htmlFor="request-travel">I request travel reimbursements</label>
                    </div>
                </FormGroup>
                <Collapse isOpen={this.state.is_real}>
                    <FormGroup row>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label>Travelling From</Label>
                            <div className="forcestyle">
                                <ReactDependentScript
                                    loadingComponent={<Input disabled required placeholder="Where are you travelling from? (Loading...)" />} scripts={["https://maps.googleapis.com/maps/api/js?key=" + MAP_KEY + "&libraries=places"]}>
                                    <Autocomplete
                                        className="form-control"
                                        onChange={(place) => this.setState({ formatted_addr: place.target.value })}
                                        onPlaceSelected={(place) => (
                                            this.setState({
                                                formatted_addr: place.formatted_address,
                                                addr_ready: true
                                            })
                                        )}
                                        placeholder="Where are you travelling from?"
                                        required
                                        type={['(cities)']}
                                        value={formatted_addr || ''}
                                    />
                                </ReactDependentScript>
                            </div>
                        </Col>
                        <Col xs={(mobile) ? 12 : 6}>
                            <Label for="mode">Method of Travel</Label>
                            <div className="forcestyle">
                                <Creatable
                                    id="mode"
                                    value={label_obj(mode)}
                                    onChange={(e) => this.setState({ mode: e.value })}
                                    options={[
                                        label_obj('bus'),
                                        label_obj('car'),
                                        label_obj('plane'),
                                        label_obj('train')
                                    ]}
                                    required
                                />
                            </div>
                        </Col>
                        <Col xs={12} style={{ marginTop: '1em' }}>
                            <p>
                                If you request travel reimbursement, please be prepared to <strong>show us all receipts </strong> related to your reimbursement on the day of HackRU. Please keep in mind you <strong> must submit a project to Devpost and demo on Sunday </strong> to receive your travel reimbursement.
                            </p>
                        </Col>
                    </FormGroup>
                </Collapse>
                <div style={{ width: "100%" }} align="right">
                    <Button className={valid ? '' : 'disabled'} disabled={!valid} style={{ backgroundColor: valid ? theme.primary[0] : theme.disabled[0] }} type="submit" >Update</Button>
                </div>
            </Form>
        )
    }
}
export default TravelReimbursementsForm