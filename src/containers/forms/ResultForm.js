import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import Loader from '../../components/Loader';

const ResultForm = ({
  isFetching,
}) => (
  isFetching ?
    <Loader /> :
    <Segment.Group>
      <Segment>
        {'Hello, this is inside \'result form\''}
      </Segment>
    </Segment.Group>
);

ResultForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = () => ({
  // isFetching: state.recruitment.isModalFetching,
});

export default connect(mapStateToProps)(ResultForm);
