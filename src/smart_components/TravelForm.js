//TravelForm.js
import React from 'react';
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
    e.preventDefault();
    let mode = e.target.value;
    this.props.updateTravel(this.props.userManager, 'mode', mode);
  }

  toggleTravel = (e) => {
    e.preventDefault();
    this.props.toggleTravel(this.props.userManager);
  }

  updateDestination = (e) => {
    e.preventDefault();
    let address = e.target.value;
    this.props.updateTravel(this.props.userManager, 'formatted_address', address);
    this.props.readyTravel(false);
  }

  showTravelForm = (userStatus) => {
    
    let user = this.props.userManager.userInfo;
    if(userStatus === 'coming' && (!user.travelling_from || !user.travelling_from.estimate)) {
    
      //user has not yet applied for travel reimbursement
      return (
        <span>
          <br/>
          <input
            defaultChecked={user.travelling_from && user.travelling_from.is_real}
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
      );
    } 
  }

  getTravelInfo = () => {
    
    let user = this.props.userManager.userInfo;
    if(user.travelling_from && user.travelling_from.is_real && !user.travelling_from.estimate) {

      //user has not filed for a reimbursement estimate
      return (
        <div>
          <h4 className="font-weight-bold blue">
            {'Location of Origin (include City and State)'}
          </h4>
          <Autocomplete
            className="form-control mx-3"
            componentRestrictions={{country: 'us'}}
            onChange={this.updateDestination}
            onPlaceSelected={this.selectDestination}
            placeholder="Where are you travelling from?"
            type={['(cities)']}
            value={user.travelling_from && user.travelling_from.formatted_address}
          />
          <div>
            <h6 className="blue mt-3">
              {'Preferred mode of transport:'}
            </h6>
          </div>
          <input checked={user.travelling_from.mode === 'bus'}
            name="preferred-transport"
            onClick={this.selectMode}
            type="radio"
            value="bus"
          />
          <label>
            <p className="blue mr-1">
              {'Bus'}
            </p>
          </label>
          <input checked={user.travelling_from.mode === 'train'}
            name="preferred-transport"
            onClick={this.selectMode}
            type="radio"
            value="train"
          />
          <label>
            <p className="blue mr-1">
              {'Train'}
            </p>
          </label>
          <input checked={user.travelling_from.mode === 'car'}
            name="preferred-transport"
            onClick={this.selectMode}
            type="radio"
            value="car"
          />
          <label>
            <p className="blue mr-1">
              {'Car'}
            </p>
          </label>
          <button 
            className={'btn btn-primary UC custom-btn p-3 my-1' + (!this.props.userManager.travelReady && ' disabled')} 
            onClick={this.requestTravel}
            type="button"
          >
            {this.props.userManager.travelReady? 'Update Travel Information' : 'Please choose a location from the dropdown to change it.'}
          </button>
        </div>
      );
    }
  }

  getEstimate = () => {
    
    let user = this.props.userManager.userInfo;
    if(user.travelling_from && user.travelling_from.estimate) {

      let prompt = 'Estimated reimbursement: $' + user.travelling_from.estimate;

      return(
        //estimate already calculated
        <div>
          <h4 className="font-weight-bold blue">
            {prompt}
          </h4>
          {'Please be prepared to '}<strong>{'show us all receipts '}</strong>{'related to your reimbursement on the day of HackRU.  Please keep in mind you '}<strong>{'must submit a project to Devpost and demo on Sunday '}</strong>{'to receive your travel reimbursement in the form of an Amazon giftcard.'}
        </div>
      );
    }
  }

  render() {
    
    let toggleForm  = this.showTravelForm(this.props.userStatus);
    let reimbursementForm = this.getTravelInfo();
    let estimate = this.getEstimate();


    return (
      <div>
        {toggleForm}
        {reimbursementForm}
        {estimate}
      </div>
    );
  }
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
  userStatus: PropTypes.string.isRequired
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
    updateTravel: userActions.updateTravel
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps) (TravelForm);
