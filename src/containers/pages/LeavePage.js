import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchLeaveRequest, updateLeaveRequest } from '../../actions/leave';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Leave from '../../components/Leave';
import Loader from '../../components/Loader';

const LeavePage = ({ isFetching, leaves, onAddClick, onCancelClick }) => (
  <div>
    {isFetching ? <Loader /> : <Leave leaves={leaves} onAddClick={onAddClick} onCancelClick={onCancelClick} />}
  </div>
);

LeavePage.defaultProps = {
  isFetching: true
};

LeavePage.propTypes = {
  isFetching: PropTypes.bool,
  leaves: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.leave.isFetching,
  leaves: state.leave.lists
});

const mapDispatchToProps = dispatch => ({
  fetchLeave: () => dispatch(fetchLeaveRequest()),
  onAddClick: () => dispatch(openModal(modalNames.CREATE_LEAVE_REQUEST)),
  onCancelClick: () => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Cancel confirmation',
    description: 'Are you sure to cancel this leave request ?',
    onConfirm: () => dispatch(updateLeaveRequest())
  }))
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
