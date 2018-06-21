import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchTimesheetRequest } from '../../actions/timesheet';
import Timesheet from '../../components/Timesheet';
import Loader from '../../components/Loader';
import { fillTimesheetsToFullMonth } from '../../selectors/timesheet';

const TimesheetPage = ({ isFetching, timesheets }) => (
  <div>
    {isFetching ? <Loader /> : <Timesheet timesheets={timesheets} /> }
  </div>
);

TimesheetPage.defaultProps = {
  isFetching: true
};

TimesheetPage.propTypes = {
  isFetching: PropTypes.bool,
  timesheets: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.timesheet.isFetching,
  timesheets: fillTimesheetsToFullMonth(state),
  userId: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  fetchTimesheet: id => dispatch(fetchTimesheetRequest(id))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchTimesheet, id } = this.props;
      fetchTimesheet(id);
    }
  })
);

export default enhance(TimesheetPage);
