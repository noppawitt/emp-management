import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchTimesheetRequest } from '../../actions/timesheet';

const TimesheetPage = ({ timesheets }) => (
  <div>
    {timesheets.map(t => t)}
  </div>
);

TimesheetPage.propTypes = {
  timesheets: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheet.lists
});

const mapDispatchToProps = dispatch => ({
  fetchTimesheet: id => dispatch(fetchTimesheetRequest(id))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // const { fetchTimesheet } = this.props;
      // fetchTimesheet(1);
      console.log('mount');
    }
  })
);

export default enhance(TimesheetPage);
