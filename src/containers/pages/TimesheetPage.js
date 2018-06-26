import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchTimesheetRequest } from '../../actions/timesheet';
import { openModal } from '../../actions/modal';
import Timesheet from '../../components/Timesheet';
import Loader from '../../components/Loader';
import { fillTimesheetsToFullMonth } from '../../selectors/timesheet';
import * as modalNames from '../../constants/modalNames';

const TimesheetPage = ({ isFetching, timesheets, onAddClick, onEditClick }) => (
  <div>
    {isFetching ? <Loader /> : <Timesheet timesheets={timesheets} onAddClick={onAddClick} onEditClick={onEditClick} /> }
  </div>
);

TimesheetPage.defaultProps = {
  isFetching: true
};

TimesheetPage.propTypes = {
  isFetching: PropTypes.bool,
  timesheets: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.timesheet.isFetching,
  timesheets: fillTimesheetsToFullMonth(state),
  userId: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  fetchTimesheet: id => dispatch(fetchTimesheetRequest(id)),
  onAddClick: date => dispatch(openModal(modalNames.ADD_TIMESHEET, { date })),
  onEditClick: date => dispatch(openModal(modalNames.EDIT_TIMESHEET, { date }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchTimesheet, userId } = this.props;
      fetchTimesheet(userId);
    }
  })
);

export default enhance(TimesheetPage);
