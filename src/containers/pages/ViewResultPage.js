import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import ViewResult from '../../components/ViewResult';
import Loader from '../../components/Loader';
import {
  fetchExamResultRequest,
  filterViewResult,
  changeActiveItemRequest,
  filterStartDateViewResult,
  filterEndDateViewResult,
} from '../../actions/viewResult';
// this is just mock up data for 'epr' (: exam position required)
// don't forget to make it real after present!
const eprList = [
  {
    key: 0,
    category: 'Logic',
    subCategory: 'Fundamental',
    type: 'choices',
    requiredNumber: 5,
    points: '29/30',
    submitDate: '2018-06-23',
    gradeDate: '2018-06-26',
  },
  {
    key: 1,
    category: 'Logic',
    subCategory: 'Supplementary',
    type: 'choices',
    requiredNumber: 10,
    points: '29/30',
    submitDate: '2018-06-23',
    gradeDate: '2018-06-24',
  },
  {
    key: 2,
    category: 'Security',
    subCategory: 'Fundamental',
    type: 'choices',
    requiredNumber: 5,
    points: '29/30',
    submitDate: '2018-06-23',
    gradeDate: '2018-06-25',
  },
  {
    key: 3,
    category: 'Security',
    subCategory: 'Supplementary',
    type: 'choices',
    requiredNumber: 5,
    points: '29/30',
    submitDate: '2018-06-23',
    gradeDate: '2018-06-23',
  },
];

const ViewResultPage = ({
  isFetching,
  results,
  activeItem,
  changeActiveItem,
  onSearchChange,
  sortByKey,
  sortKey,
  direction,
  onStartDateChange,
  onEndDateChange,
  startDate,
  endDate }) => (
    <div>
      {!isFetching ?
        <Loader /> :
        <ViewResult
          results={results}
          activeItem={activeItem}
          changeActiveItem={changeActiveItem}
          eprList={eprList}
          onSearchChange={onSearchChange}
          sortByKey={sortByKey}
          sortKey={sortKey}
          direction={direction}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          startDate={startDate}
          endDate={endDate}
        />
      }
    </div>
);

ViewResultPage.propTypes = {
  activeItem: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
  changeActiveItem: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortByKey: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  activeItem: state.viewResult.activeItem,
  isFetching: state.viewResult.isFetching,
  results: state.viewResult.results,
  direction: state.viewResult.direction,
  sortKey: state.viewResult.sortKey,
  startDate: state.viewResult.startDate,
  endDate: state.viewResult.endDate,
});

const mapDispatchToProps = dispatch => ({
  fetchExamResult: cid => dispatch(fetchExamResultRequest(cid)),
  changeActiveItem: item => dispatch(changeActiveItemRequest(item)),
  onSearchChange: e => dispatch(filterViewResult(e.target.value)),
  onStartDateChange: date => dispatch(filterStartDateViewResult(date)),
  onEndDateChange: date => dispatch(filterEndDateViewResult(date)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // const { fetchExamResult } = this.props;
      // fetchExamResult();
    }
  })
);

export default enhance(ViewResultPage);
