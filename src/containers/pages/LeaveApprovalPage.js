import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchLeaveAllRequest, updateLeaveRequest } from '../../actions/leave';
import LeaveApproval from '../../components/LeaveApproval';
import Loader from '../../components/Loader';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

const LeaveApprovalPage = ({ isFetching, leaves, onAcceptClick, onRejectClick }) => (
  <div>
    {isFetching ?
      <Loader /> :
      <LeaveApproval
        leaves={leaves}
        onAcceptClick={onAcceptClick}
        onRejectClick={onRejectClick}
      />}
  </div>
);

LeaveApprovalPage.defaultProps = {
  isFetching: true
};

LeaveApprovalPage.propTypes = {
  isFetching: PropTypes.bool,
  onAcceptClick: PropTypes.func.isRequired,
  onRejectClick: PropTypes.func.isRequired,
  leaves: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.leave.isFetching,
  leaves: state.leave.lists
});

const mapDispatchToProps = dispatch => ({
  fetchLeave: () => dispatch(fetchLeaveAllRequest()),
  onAcceptClick: leave => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Approve Confirmation',
    description: 'Are you sure to approve this leave request ?',
    onConfirm: () => dispatch(updateLeaveRequest(null, { ...leave, status: 'Reject' }))
  })),
  onRejectClick: leave => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Reject Confirmation',
    description: 'Are you sure to reject this leave request ?',
    onConfirm: () => dispatch(updateLeaveRequest(null, { ...leave, status: 'Reject' }))
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

export default enhance(LeaveApprovalPage);
