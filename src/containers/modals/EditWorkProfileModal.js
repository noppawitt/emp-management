import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import * as modalNames from '../../constants/modalNames';
import { openModal, closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import EditWorkProfileForm from '../forms/EditWorkProfileForm';

const EditWorkProfileModal = ({ modalName, masterTable, onOpen, onClose, onSubmit, onSaveClick }) => (
  <Modal
    header="Edit work profile"
    open={modalName === modalNames.EDIT_WORK_PROFILE}
    onOpen={onOpen}
    onClose={onClose}
    onSaveClick={onSaveClick}
  >
    <EditWorkProfileForm masterTable={masterTable} onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditWorkProfileModal.propTypes = {
  modalName: PropTypes.string.isRequired,
  masterTable: PropTypes.array.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  masterTable: state.masterTable.table
});

const mapDispatchToProps = dispatch => ({
  onOpen: () => dispatch(openModal(modalNames.EDIT_WORK_PROFILE)),
  onClose: () => dispatch(closeModal()),
  onSubmit: values => dispatch(updateProfileRequest(1, 'work', values)),
  onSaveClick: () => dispatch(submit('editWorkProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkProfileModal);
