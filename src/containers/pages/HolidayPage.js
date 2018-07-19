import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Holiday from '../../components/Holiday';
import { fetchHolidayRequest } from '../../actions/holiday';
import Loader from '../../components/Loader';

const HolidayPage = ({ fetchHolidays, holidays, isFetching, year }) => (
  <div>
    {isFetching ? <Loader /> : <Holiday fetchHolidays={fetchHolidays} holidays={holidays} year={year} />}
  </div>
);

HolidayPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchHolidays: PropTypes.func.isRequired,
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
