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
  checkProgressRequest,
  categoryChange,
} from '../../actions/takeExam';
import TakeExam from '../../components/TakeExam';
import Loader from '../../components/Loader';
// import { getVisibleExam } from '../../selectors/TakeExam';

const TakeExamPage = ({
  isFetching,
  examList,
  currentActivePage,
  onPageChange,
  activeCategory,
  pickedAnswer,
  answerList,
  onClickRadio,
  onClickCheckbox,
  onInputTextArea,
  onClickSave,
  onClickSubmit,
  exId,
  id,
  onClickCheckProgress,
  categoryList,
  onClickCategory, }) =>
  (
    isFetching ?
      <Loader /> :
      <TakeExam
        examList={examList}
        currentActivePage={currentActivePage}
        onPageChange={onPageChange}
        activeCategory={activeCategory}
        pickedAnswer={pickedAnswer}
        answerList={answerList}
        onClickRadio={onClickRadio}
        onClickCheckbox={onClickCheckbox}
        onInputTextArea={onInputTextArea}
        onClickSave={onClickSave}
        onClickSubmit={onClickSubmit}
        exId={exId}
        id={id}
        onClickCheckProgress={onClickCheckProgress}
        categoryList={categoryList}
        onClickCategory={onClickCategory}
      />
  );

TakeExamPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  examList: PropTypes.array.isRequired,
  currentActivePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  pickedAnswer: PropTypes.array.isRequired,
  answerList: PropTypes.array.isRequired,
  onClickRadio: PropTypes.func.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  onInputTextArea: PropTypes.func.isRequired,
  exId: PropTypes.number.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onClickCheckProgress: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.takeExam.isFetching,
  examList: state.takeExam.examList,
  currentActivePage: state.takeExam.currentActivePage,
  activeCategory: state.takeExam.activeCategory,
  subCategoryTitle: state.takeExam.subCategoryTitle,
  pickedAnswer: state.takeExam.pickedAnswer,
  answerList: state.takeExam.answerList,
  exId: state.takeExam.exId,
  id: state.examAuth.id,
  categoryList: state.takeExam.categoryList,
});

const mapDispatchToProps = dispatch => ({
  fetchTakeExam: id => dispatch(fetchTakeExamRequest(id)),
  onPageChange: value => dispatch(pageChange(value)),
  onClickRadio: (choice, currentActivePage, pickedAnswer, exId) => dispatch(onPickRadioAnswer(choice, currentActivePage, pickedAnswer, exId)),
  onClickCheckbox: (choice, currentActivePage, pickedAnswer, exId) => dispatch(onPickCheckboxAnswer(choice, currentActivePage, pickedAnswer, exId)),
  onInputTextArea: (text, currentActivePage, exId) => dispatch(onInputTextAreaAnswer(text, currentActivePage, exId)),
  onClickSave: (id, answerList) => dispatch(uploadAnswerListRequest(id, answerList)),
  // Submit is save and exit!
  onClickSubmit: (id, answerList) => compose(
    dispatch(uploadAnswerListRequest(id, answerList)),
    dispatch(),
    // dispatch(finishExam()),
  ),
  onClickCheckProgress: id => dispatch(checkProgressRequest(id)),
  onClickCategory: category => dispatch(categoryChange(category)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchTakeExam, id } = this.props;
      fetchTakeExam(id);
    }
  })
);

export default enhance(TakeExamPage);
