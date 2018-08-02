import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchLeaveAllRequest, updateLeaveRequest, changeLeavePage, sortLeave } from '../../actions/leave';
import LeaveApproval from '../../components/LeaveApproval';
import Loader from '../../components/Loader';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import { getTotalPages, getVisibleLeaves } from '../../selectors/leave';

const LeaveApprovalPage = ({
  isFetching,
  leaves,
  onAcceptClick,
  onRejectClick,
  currentPage,
  totalPages,
  handlePageChange,
  sortKey,
  direction,
  sortByKey
}) => {
  const handleSort = (key) => {
    if (sortKey !== key) {
      sortByKey(key, 'ascending');
    }
    else {
      sortByKey(key, direction === 'ascending' ? 'descending' : 'ascending');
    }
  };
  return (
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
          sortKey={sortKey}
          direction={direction}
          handleSort={handleSort}
        />}
    </div>
  );
};

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
  handlePageChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  sortByKey: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.leave.isFetching,
  leaves: getVisibleLeaves(state),
  currentPage: state.leave.currentPage,
  totalPages: getTotalPages(state),
  sortKey: state.leave.sortKey,
  direction: state.leave.direction
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
  handlePageChange: (e, { activePage }) => dispatch(changeLeavePage(activePage)),
  sortByKey: (key, direction) => dispatch(sortLeave(key, direction))
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
