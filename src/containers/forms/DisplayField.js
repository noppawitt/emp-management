import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Segment } from 'semantic-ui-react';

const DisplayField = ({ passwordStatusObject }) => (
  <Segment>
    {passwordStatusObject && Object.keys(passwordStatusObject).map(key => (
      <div>{passwordStatusObject[key]}</div>
    ))}
  </Segment>
);

DisplayField.propTypes = {
  passwordStatusObject: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  passwordStatusObject: state.recruitment.passwordStatusObject,
});

const mapDispatchToProps = () => ({
  // another thing
});

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(DisplayField);
