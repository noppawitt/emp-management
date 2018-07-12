import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Loader from '../../components/Loader';

const GradingForm = ({
  isFetching,
}) => (
  isFetching ?
    <Loader /> :
    <Segment.Group>
      <Segment>
        {'Hello, this is inside \'grading form\''}
      </Segment>
    </Segment.Group>
);

GradingForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  // isFetching: state.recruitment.isModalFetching,
});

export default connect(mapStateToProps)(GradingForm);
