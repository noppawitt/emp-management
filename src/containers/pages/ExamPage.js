import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchExamRequest, filterExams } from '../../actions/exam';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Exam from '../../components/Exam';
import Loader from '../../components/Loader';
import { getVisibleExams } from '../../selectors/exam';

const ExamPage = ({ isFetching, onClick, onFilterChange, exams, examsFilter }) => (
  <div>
    {isFetching ? <Loader /> : <Exam onClick={() => onClick(exams)} onFilterChange={onFilterChange} exams={exams} examsFilter={examsFilter} />}
  </div>
);

ExamPage.defaultProps = {
  isFetching: true
};

ExamPage.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired,
  examsFilter: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.exam.isFetching,
  exams: state.exam.lists,
  examsFilter: getVisibleExams(state)
});
const mapDispatchToProps = dispatch => ({
  fetchExam: () => dispatch(fetchExamRequest()),
  onFilterChange: (key, value) => dispatch(filterExams(key, value)),
  onClick: exams => dispatch(openModal(modalNames.ADD_NEW_EXAM, { exams }))
});
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchExam } = this.props;
      fetchExam();
    }
  })
);
export default enhance(ExamPage);

