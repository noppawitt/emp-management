import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as SUIModal } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';
import GradingForm from '../forms/GradingForm';
import {
  modalPageChange,
  modalCategoryChange,
  onInputModalComment,
  onScoreModalChange,
  onFullScoreModalChange,
} from '../../actions/recruitment';

const GradingExamsModal = ({
  isModalFetching,
  gradingId,
  onPageChange,
  onClickModalCategory,
  onInputCommentTextArea,
  onScoreChange,
  onFullScoreChange,
}) => (
  <SUIModal
    dimmer="blurring"
    size="fullscreen"
    open
    header={'Grading Exams :'.concat(gradingId)}
    gradingId={gradingId}
  >
    <SUIModal.Content>
      <GradingForm
        isFetching={isModalFetching}
        gradingId={gradingId}
        onPageChange={onPageChange}
        onClickModalCategory={onClickModalCategory}
        onInputCommentTextArea={onInputCommentTextArea}
        onScoreChange={onScoreChange}
        onFullScoreChange={onFullScoreChange}
      />
    </SUIModal.Content>
  </SUIModal>
);

GradingExamsModal.propTypes = {
  isModalFetching: PropTypes.bool.isRequired,
  gradingId: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onClickModalCategory: PropTypes.func.isRequired,
  onInputCommentTextArea: PropTypes.func.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onFullScoreChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  isModalFetching: state.recruitment.isModalFetching,
  gradingId: state.recruitment.gradingId,
});

const mapDispatchToProps = dispatch => ({
  // edit save button function!
  onPageChange: value => dispatch(modalPageChange(value)),
  onClickModalCategory: category => dispatch(modalCategoryChange(category)),
  onInputCommentTextArea: (text, currentActiveModalPage, exId) => dispatch(onInputModalComment(text, currentActiveModalPage, exId)),
  onScoreChange: (e, exId) => dispatch(onScoreModalChange(e.target.value, exId)),
  onFullScoreChange: (e, exId) => dispatch(onFullScoreModalChange(e.target.value, exId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GradingExamsModal);
