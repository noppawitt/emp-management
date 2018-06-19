import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { addExamRequest } from '../../actions/exam';
import Modal from '../../components/Modal';
import AddExamForm from '../forms/AddExamForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddExamModal = ({ onClose, onSubmit, onClick, submitting }) => (
  <Modal
    header="Add new question"
    buttonName="ADD"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddExamForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddExamModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addExam')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, addExamRequest, values, 'addExam'),
  onClick: () => dispatch(submit('addExam'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExamModal);
