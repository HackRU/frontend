import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Label } from 'reactstrap';
import { theme } from "../../Defaults";
import { Creatable } from "react-select";
// NOTE: This dependency requires a script tag in index.html!
import Autocomplete from 'react-google-autocomplete';

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

class TravelForm extends Component {
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

    isValid = () => !this.state.is_real || (this.state.addr_ready && this.state.formatted_addr && this.state.mode)

    render() {
        const mobile = this.props.mobile;
        const { is_real, formatted_addr, mode } = this.state;
        const valid = this.isValid()
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
                        <label className="custom-control-label" for="request-travel">I request travel reimbursement</label>
                    </div>
                </FormGroup>
                {is_real && <FormGroup row>
                    <Col xs={(mobile) ? 12 : 6}>
                        <Label>Travelling From</Label>
                        <div className="forcestyle">
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
                            If you request travel reimbursement, please be prepared to <strong>show us all receipts </strong> related to your reimbursement on the day of HackRU.  Please keep in mind you <strong> must submit a project to Devpost and demo on Sunday </strong> to receive your travel reimbursement.
                        </p>
                    </Col>
                </FormGroup>}
                <div style={{ width: "100%" }} align="right">
                    <Button
                        className={!valid && 'disabled'}
                        disabled={!valid}
                        style={{ backgroundColor: valid ? theme.primary[0] : theme.disabled[0] }}
                        type="submit" >Update</Button>
                </div>
            </Form>
        )
    }
}

export default TravelForm
