import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Holiday from '../../components/Holiday';
import { fetchHolidayRequest, deleteHolidayRequest } from '../../actions/holiday';
import Loader from '../../components/Loader';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

const HolidayPage = ({ fetchHolidays, onDeleteHolidayClick, holidays, isFetching, year }) => (
  <div>
    {isFetching ? <Loader /> : <Holiday fetchHolidays={fetchHolidays} holidays={holidays} year={year} onDeleteHolidayClick={onDeleteHolidayClick} />}
  </div>
);

HolidayPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchHolidays: PropTypes.func.isRequired,
  onDeleteHolidayClick: PropTypes.func.isRequired,
  holidays: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.holiday.isFetching,
  holidays: state.holiday.lists,
  year: state.holiday.year
});

const mapDispatchToProps = dispatch => ({
  fetchHolidays: year => dispatch(fetchHolidayRequest(year)),
  onDeleteHolidayClick: (holidayId, year) => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this holiday?',
    onConfirm: () => dispatch(deleteHolidayRequest(holidayId, year))
  }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { year, fetchHolidays } = this.props;
      fetchHolidays(year);
    }
  })
);

export default enhance(HolidayPage);
