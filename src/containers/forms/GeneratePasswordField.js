import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const GeneratePasswordField = () => (
  <div />
);

GeneratePasswordField.propTypes = {
  // things
};

const mapStateToProps = state => ({
  // something
});

const mapDispatchToProps = dispatch => ({
  // another thing
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance (GeneratePasswordField);
