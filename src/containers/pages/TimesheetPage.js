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

const TimesheetPage = ({ isFetching, fetchTimesheet, timesheets, userId, year, month, onAddClick, onEditClick }) => (
  <div>
    {isFetching ? <Loader /> : <Timesheet timesheets={timesheets} fetchTimesheet={fetchTimesheet} userId={userId} year={year} month={month} onAddClick={onAddClick} onEditClick={onEditClick} /> }
  </div>
);

TimesheetPage.defaultProps = {
  isFetching: true
};

TimesheetPage.propTypes = {
  isFetching: PropTypes.bool,
  timesheets: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  fetchTimesheet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.timesheet.isFetching,
  timesheets: fillTimesheetsToFullMonth(state),
  userId: state.auth.id,
  year: state.timesheet.year,
  month: state.timesheet.month
});

const mapDispatchToProps = dispatch => ({
  fetchTimesheet: (userId, year, month) => dispatch(fetchTimesheetRequest(userId, year, month)),
  onAddClick: date => dispatch(openModal(modalNames.ADD_TIMESHEET, { date })),
  onEditClick: id => dispatch(openModal(modalNames.EDIT_TIMESHEET, { id }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchTimesheet, userId, year, month } = this.props;
      fetchTimesheet(userId, year, month);
    }
  })
);

export default enhance(TimesheetPage);
