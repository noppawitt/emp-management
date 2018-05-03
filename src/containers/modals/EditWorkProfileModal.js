import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import * as modalNames from '../../constants/modalNames';
import { openModal, closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import EditWorkProfileForm from '../forms/EditWorkProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditWorkProfileModal = ({ modalName, masterTable, onOpen, onClose, onSubmit, submitting, onSaveClick }) => (
  <Modal
    header="Edit work profile"
    open={modalName === modalNames.EDIT_WORK_PROFILE}
    onOpen={onOpen}
    onClose={onClose}
    onSaveClick={onSaveClick}
    submitting={submitting}
  >
    <EditWorkProfileForm masterTable={masterTable} onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditWorkProfileModal.propTypes = {
  modalName: PropTypes.string.isRequired,
  masterTable: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  masterTable: state.masterTable,
  submitting: isSubmitting('editWorkProfile')(state)
});

const mapDispatchToProps = dispatch => ({
  onOpen: () => dispatch(openModal(modalNames.EDIT_WORK_PROFILE)),
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 1, 'work'),
  onSaveClick: () => dispatch(submit('editWorkProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkProfileModal);
