//TravelForm.js
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from 'action_creators/UserActions';
import Autocomplete from 'react-google-autocomplete';

class TravelForm extends React.Component {

  constructor(props) {
    super(props);
    this.selectDestination = this.selectDestination.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.toggleTravel = this.toggleTravel.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
    this.showTravelForm = this.showTravelForm.bind(this);
    this.getTravelInfo = this.getTravelInfo.bind(this);
    this.getEstimate = this.getEstimate.bind(this);
  }


  selectDestination = (place) => {
    this.props.finalizeTravel(this.props.userManager, place);
  }

  selectMode = (e) => {
    let mode = e.target.value;
    this.props.updateTravel(this.props.userManager, 'mode', mode);
  }

  toggleTravel = (e) => {
    //e.preventDefault();
    this.props.toggleTravel(this.props.userManager);
  }

  requestTravel = (e) => {
    this.props.sendTravelInfo(this.props.userManager);
  }

  updateDestination = (e) => {
    e.preventDefault();
    let address = e.target.value;
    this.props.updateTravel(this.props.userManager, 'formatted_address', address);
    this.props.readyTravel(false);
  }

  showTravelForm = (travelling_from) => ( 
    travelling_from && (
      <span>
        <br/>
        <input
          defaultChecked={travelling_from && travelling_from.is_real}
          id="toggle-travel-stuff"
          onClick={this.toggleTravel}
          type="checkbox"
        />
        <label htmlFor="toggle-travel-stuff">
          <h5 className="blue">
            {'I request travel reimbursement'}
          </h5>
        </label>
      </span>
    )
  )

  renderTransportOption = (travelling_from, value, label) => (
    <Fragment>
      <input
        checked={travelling_from.mode === value}
        onClick={this.selectMode}
        type="radio"
        value={value}
      />
      <label>
        <p className="blue mr-1">
          { label }
        </p>
      </label>
    </Fragment>
  )

  getTravelInfo = (travelling_from) => (
    travelling_from && travelling_from.is_real && (
      <div>
        <h4 className="font-weight-bold blue">
          {'Location of Origin (City and State)'}
        </h4>
        <Autocomplete
          className="form-control mx-3"
          componentRestrictions={{country: 'us'}}
          onChange={this.updateDestination}
          onPlaceSelected={this.selectDestination}
          placeholder="Where are you travelling from?"
          type={['(cities)']}
          value={travelling_from.formatted_address}
        />
        <div>
          <h6 className="blue mt-3">
            {'Preferred mode of transport:'}
          </h6>
        </div>
        { this.renderTransportOption(travelling_from, 'bus', 'Bus') }
        { this.renderTransportOption(travelling_from, 'train', 'Train') }
        { this.renderTransportOption(travelling_from, 'car', 'Car') }
        <button 
          className={'btn btn-primary UC custom-btn p-3 my-1' + (!this.props.userManager.travelReady && ' disabled')} 
          onClick={this.requestTravel}
          type="button"
        >
          {this.props.userManager.travelReady ? 'Update Travel Information' : 'Please choose a location from the dropdown to change it.'}
        </button>
      </div>
    )
  )

  getEstimate = (travelling_from) => (
    travelling_from && (
      <Fragment>
        <br />
        {'Please be prepared to '}<strong>{'show us all receipts '}</strong>{'related to your reimbursement on the day of HackRU.  Please keep in mind you '}<strong>{'must submit a project to Devpost and demo on Sunday '}</strong>{'to receive your travel reimbursement in the form of an Amazon giftcard.'}
      </Fragment>
    )
  )

  render = () => (
    <div>
      { this.showTravelForm(this.props.userManager.userInfo.travelling_from) }
      { this.getTravelInfo(this.props.userManager.userInfo.travelling_from) }
      { this.getEstimate(this.props.userManager.userInfo.travelling_from) }
    </div>
  )
}

TravelForm.propTypes = {
  userManager: PropTypes.shape({
    userInfoEmail: PropTypes.string,
    token: PropTypes.token,
    hasResume: PropTypes.bool,
    userInfo: PropTypes.object,
    travelReady: PropTypes.bool,
    flash: PropTypes.string,
    upperFlash: PropTypes.string
  }).isRequired,
  finalizeTravel: PropTypes.func.isRequired,
  readyTravel: PropTypes.func.isRequired,
  toggleTravel: PropTypes.func.isRequired,
  updateTravel: PropTypes.func.isRequired,
  sendTravelInfo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    userManager: state.userManager
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    finalizeTravel: userActions.finalizeTravel,
    readyTravel: userActions.readyTravel,
    toggleTravel: userActions.toggleTravel,
    updateTravel: userActions.updateTravel,
    sendTravelInfo: userActions.sendTravelInfo,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (TravelForm);
