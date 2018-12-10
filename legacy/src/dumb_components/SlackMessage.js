import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SlackMessage = ({ message: { date, text, time }}) => (
  <Fragment>
    <h5 className="content-title"> {text} </h5>
    <p className="content-desc mb-3">
      {`Posted on ${date} at ${time}`}
    </p>
  </Fragment>
);

SlackMessage.propTypes = {
  message: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired
};

export default SlackMessage;
