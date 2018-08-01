import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchLeaveAllRequest, updateLeaveRequest, changeLeavePage } from '../../actions/leave';
import LeaveApproval from '../../components/LeaveApproval';
import Loader from '../../components/Loader';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import { getTotalPages, getVisibleLeaves } from '../../selectors/leave';

const LeaveApprovalPage = ({ isFetching, leaves, onAcceptClick, onRejectClick, currentPage, totalPages, handlePageChange }) => (
  <div>
    {isFetching ?
      <Loader /> :
      <LeaveApproval
        leaves={leaves}
        onAcceptClick={onAcceptClick}
        onRejectClick={onRejectClick}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
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
  leaves: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.leave.isFetching,
  leaves: getVisibleLeaves(state),
  currentPage: state.leave.currentPage,
  totalPages: getTotalPages(state)
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
  })),
  handlePageChange: (e, { activePage }) => dispatch(changeLeavePage(activePage))
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
