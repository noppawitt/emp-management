import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import * as modalNames from '../../constants/modalNames';
import { openModal, closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import EditGeneralProfileForm from '../forms/EditGeneralProfileForm';

const EditGeneralProfileModal = ({ modalName, onOpen, onClose, onSubmit, onSaveClick }) => (
  <Modal
    header="Edit general profile"
    open={modalName === modalNames.EDIT_GENERAL_PROFILE}
    onOpen={onOpen}
    onClose={onClose}
    onSaveClick={onSaveClick}
  >
    <EditGeneralProfileForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditGeneralProfileModal.propTypes = {
  modalName: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name
});

const mapDispatchToProps = dispatch => ({
  onOpen: () => dispatch(openModal(modalNames.EDIT_GENERAL_PROFILE)),
  onClose: () => dispatch(closeModal()),
  onSubmit: values => dispatch(updateProfileRequest(1, values)),
  onSaveClick: () => dispatch(submit('editGeneralProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneralProfileModal);
