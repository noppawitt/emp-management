import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchRecruitmentRequest,
  sortRecruitment,
  filterRecruitment,
  filterStartDateRecruitment,
  filterEndDateRecruitment,
} from '../../actions/recruitment';
import Recruitment from '../../components/Recruitment';
import Loader from '../../components/Loader';
import { getVisibleRecruitment } from '../../selectors/recruitment';

const RecruitmentPage = ({
  isFetching,
  recruitments,
  onSearchChange,
  sortByKey,
  sortKey,
  direction,
  onStartDateChange,
  onEndDateChange,
  startDate,
  endDate }) => {
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
        <Recruitment
          recruitments={recruitments}
          onSearchChange={onSearchChange}
          handleSort={handleSort}
          sortKey={sortKey}
          direction={direction}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          startDate={startDate}
          endDate={endDate}
        />}
    </div>
  );
};

RecruitmentPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  recruitments: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortByKey: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  // isDateFilterChange: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.recruitment.isFetching,
  recruitments: getVisibleRecruitment(state),
  direction: state.recruitment.direction,
  sortKey: state.recruitment.sortKey,
  startDate: state.startDate,
  endDate: state.endDate,
  // isDateFilterChange: state.isDateFilterChange,
});

const mapDispatchToProps = dispatch => ({
  fetchRecruitment: () => dispatch(fetchRecruitmentRequest()),
  sortByKey: (key, direction) => dispatch(sortRecruitment(key, direction)),
  onSearchChange: e => dispatch(filterRecruitment(e.target.value)),
  // moment use .format({some time format})
  // instead of .target.value to get value of time
  onStartDateChange: date => dispatch(filterStartDateRecruitment(date)),
  onEndDateChange: date => dispatch(filterEndDateRecruitment(date)),
  // add 'Start evaluate' function
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchRecruitment } = this.props;
      fetchRecruitment();
    }
  })
);

export default enhance(RecruitmentPage);
