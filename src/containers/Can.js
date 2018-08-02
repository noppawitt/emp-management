import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchAccessControlRequest } from '../actions/accessControl';

const Can = ({ activity, can, conditions, isFetching, children }) => {
  if (isFetching || !can) return <div />;
  else if (can[activity] && conditions.every(c => c)) return children;
  return <div />;
};

Can.defaultProps = {
  isFetching: true,
  can: null,
  conditions: []
};

Can.propTypes = {
  activity: PropTypes.string.isRequired,
  can: PropTypes.object,
  conditions: PropTypes.array,
  isFetching: PropTypes.bool,
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
      const { fetchAccessControl, isFetching, fetched } = this.props;
      if (!isFetching && !fetched) fetchAccessControl();
    }
  })
);

export default enhance(Can);
