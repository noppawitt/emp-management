import React from 'react';
import propTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

const Notification = ({ message, error }) => (
  <Segment inverted={error} color={error ? 'red' : 'white'} tertiary={error} style={{ left: '80%', position: 'fixed', top: '85%', zIndex: 1000 }}>
    <p>{message}</p>
  </Segment>
);

Notification.defaultProps = {
  error: false
};

Notification.propTypes = {
  message: propTypes.string.isRequired,
  error: propTypes.bool
};

export default Notification;
