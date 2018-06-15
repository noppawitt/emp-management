import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import AddExamForm from '../forms/AddExamForm';

const AddExamModal = ({ onClose, onClick }) => (
  <Modal
    header="Add new question"
    onClose={onClose}
    onClick={onClick}
    submitting={false}
  >
    <AddExamForm />
  </Modal>
);

AddExamModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onClick: () => dispatch(submit('addExam'))
});

export default connect(null, mapDispatchToProps)(AddExamModal);
