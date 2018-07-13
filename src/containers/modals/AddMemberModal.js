import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
<<<<<<< HEAD
import { createProjectRequest } from '../../actions/project';
=======
import { createMemberRequest } from '../../actions/projectDetail';
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
import Modal from '../../components/Modal';
import AddMemberForm from '../forms/AddMemberForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddMemberModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add member"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddMemberForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddMemberModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addMember')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
<<<<<<< HEAD
  onSubmit: values => handleReduxFormSubmit(dispatch, createProjectRequest, values),
=======
  onSubmit: values => handleReduxFormSubmit(dispatch, createMemberRequest, values),
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
  onClick: () => dispatch(submit('addMember'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberModal);
