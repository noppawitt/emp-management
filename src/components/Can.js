import React from 'react';
import PropTypes from 'prop-types';

const Can = ({ can, children }) => (
  <div>
    {can && children}
  </div>
);

Can.propTypes = {
  can: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
};

export default Can;
