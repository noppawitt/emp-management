import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchExamRequest } from '../../actions/exam';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Exam from '../../components/Exam';
import Loader from '../../components/Loader';

const ExamPage = ({ isFetching, onClick, exams }) => (
  <div>
    {isFetching ? <Loader /> : <Exam onClick={onClick} exams={exams} />}
  </div>
);

ExamPage.defaultProps = {
  isFetching: true
};

ExamPage.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.exam.isFetching,
  exams: state.exam.lists
});
const mapDispatchToProps = dispatch => ({
  fetchExam: () => dispatch(fetchExamRequest()),
  onClick: () => dispatch(openModal(modalNames.ADD_NEW_EXAM))
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

