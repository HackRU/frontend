import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class SlackMessage extends Component {
  render = () => (
    <Fragment>
      <h5 className="content-title"> {this.props.contents} </h5>
      <p className="content-desc mb-3">
        {`Posted on ${this.props.date} at ${this.props.time}`}
      </p>
    </Fragment>
  )
}

SlackMessage.propTypes = {
  contents: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
};

export default SlackMessage;
