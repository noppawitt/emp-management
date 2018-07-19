import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchAccessControlRequest } from '../actions/accessControl';

const Can = ({ activity, can, conditions, isFetching, children }) => {
  conditions.every(c=>console.log('Hi'))
  if (isFetching) return <div />;
  else if (can[activity] && conditions.every(c => c)) return children;
  return <div />;
};

Can.defaultProps = {
  conditions: []
};

Can.propTypes = {
  activity: PropTypes.string.isRequired,
  can: PropTypes.object.isRequired,
  conditions: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.accessControl.isFetching,
  fetched: state.accessControl.fetched,
  can: state.accessControl.can
});

const mapDispatchToProps = dispatch => ({
  fetchAccessControl: () => dispatch(fetchAccessControlRequest())
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchAccessControl, fetched } = this.props;
      if (!fetched) fetchAccessControl();
    }
  })
);

export default enhance(Can);
