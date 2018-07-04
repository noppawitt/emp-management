import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchTakeExamRequest,
  pageChange,
  saveAnswerList,
  onPickRadioAnswer,
  onPickCheckboxAnswer,
} from '../../actions/takeExam';
import TakeExam from '../../components/TakeExam';
import Loader from '../../components/Loader';
// import { getVisibleExam } from '../../selectors/TakeExam';

const TakeExamPage = ({
  isFetching,
  examList,
  currentActivePage,
  onPageChange,
  categoryTitle,
  subCategoryTitle,
  pickedAnswer,
  answerList,
  onClickRadio,
  onClickCheckbox,
  exId, }) =>
  (
    isFetching ?
      <Loader /> :
      <TakeExam
        examList={examList}
        currentActivePage={currentActivePage}
        onPageChange={onPageChange}
        categoryTitle={categoryTitle}
        subCategoryTitle={subCategoryTitle}
        pickedAnswer={pickedAnswer}
        answerList={answerList}
        onClickRadio={onClickRadio}
        onClickCheckbox={onClickCheckbox}
        exId={exId}
      />
  );

TakeExamPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  examList: PropTypes.array.isRequired,
  currentActivePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  categoryTitle: PropTypes.string.isRequired,
  subCategoryTitle: PropTypes.string.isRequired,
  pickedAnswer: PropTypes.array.isRequired,
  answerList: PropTypes.array.isRequired,
  onClickRadio: PropTypes.func.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  exId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.takeExam.isFetching,
  examList: state.takeExam.examList,
  currentActivePage: state.takeExam.currentActivePage,
  categoryTitle: state.takeExam.categoryTitle,
  subCategoryTitle: state.takeExam.subCategoryTitle,
  pickedAnswer: state.takeExam.pickedAnswer,
  answerList: state.takeExam.answerList,
  exId: state.takeExam.exId,
});

const mapDispatchToProps = dispatch => ({
  // fetchTakeExam: id => dispatch(fetchTakeExamRequest(id)),
  fetchTakeExam: () => dispatch(fetchTakeExamRequest('1234567890191')),
  onPageChange: (value, answerList) => compose(
    dispatch(saveAnswerList(answerList)),
    dispatch(pageChange(value)),
  ),
  onClickRadio: choice => dispatch(onPickRadioAnswer(choice)),
  onClickCheckbox: choice => dispatch(onPickCheckboxAnswer(choice)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchTakeExam } = this.props;
      fetchTakeExam();
    }
  })
);

export default enhance(TakeExamPage);
