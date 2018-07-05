import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchTakeExamRequest,
  pageChange,
  onPickRadioAnswer,
  onPickCheckboxAnswer,
  onInputTextAreaAnswer,
  uploadAnswerListRequest,
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
  onInputTextArea,
  onClickSave,
  onClickSubmit,
  exId,
  id, }) =>
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
        onInputTextArea={onInputTextArea}
        onClickSave={onClickSave}
        onClickSubmit={onClickSubmit}
        exId={exId}
        id={id}
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
  onInputTextArea: PropTypes.func.isRequired,
  exId: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
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
  id: state.takeExam.id,
});

const mapDispatchToProps = dispatch => ({
  // fetchTakeExam: id => dispatch(fetchTakeExamRequest(id)),
  fetchTakeExam: () => dispatch(fetchTakeExamRequest('1234567890191')),
  onPageChange: value => dispatch(pageChange(value)),
  // this three-'on'-function below this is called
  // when there is input for each exam type
  // we always save buffer everytimesanswer change
  // instead of old one that only save on page save
  // to reduce complexity in pageChange's reducer
  onClickRadio: (choice, currentActivePage, pickedAnswer, exId) => dispatch(onPickRadioAnswer(choice, currentActivePage, pickedAnswer, exId)),
  onClickCheckbox: (choice, currentActivePage, pickedAnswer, exId) => dispatch(onPickCheckboxAnswer(choice, currentActivePage, pickedAnswer, exId)),
  onInputTextArea: (text, currentActivePage, exId) => dispatch(onInputTextAreaAnswer(text, currentActivePage, exId)),
  onClickSave: (id, categoryTitle, answerList) => dispatch(uploadAnswerListRequest(id, categoryTitle, answerList)),
  // Submit is save and exit!
  onClickSubmit: (id, categoryTitle, answerList) => compose(
    dispatch(uploadAnswerListRequest(id, categoryTitle, answerList)),
    dispatch(),
    // dispatch(finishExam()),
  ),
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
