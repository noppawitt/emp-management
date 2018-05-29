import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchLeaveRequest } from '../../actions/leave';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Leave from '../../components/Leave';
import Loader from '../../components/Loader';

const LeavePage = ({ isFetching, leaves, onAddClick }) => (
  <div>
    {isFetching ? <Loader /> : <Leave leaves={leaves} onAddClick={onAddClick} />}
  </div>
);

LeavePage.defaultProps = {
  isFetching: true
};

LeavePage.propTypes = {
  isFetching: PropTypes.bool,
  leaves: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.leave.isFetching,
  leaves: state.leave.lists
});

const mapDispatchToProps = dispatch => ({
  fetchLeave: () => dispatch(fetchLeaveRequest()),
  onAddClick: () => dispatch(openModal(modalNames.CREATE_LEAVE_REQUEST))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchLeave } = this.props;
      fetchLeave();
    }
  })
);

export default enhance(LeavePage);
