import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import * as modalNames from '../../constants/modalNames';
import { openModal, closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import EditGeneralProfileForm from '../forms/EditGeneralProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditGeneralProfileModal = ({ modalName, onOpen, onClose, onSubmit, onSaveClick, submitting }) => (
  <Modal
    header="Edit general profile"
    open={modalName === modalNames.EDIT_GENERAL_PROFILE}
    onOpen={onOpen}
    onClose={onClose}
    onSaveClick={onSaveClick}
    submitting={submitting}
  >
    <EditGeneralProfileForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditGeneralProfileModal.propTypes = {
  modalName: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editGeneralProfile')(state)
});

const mapDispatchToProps = dispatch => ({
  onOpen: () => dispatch(openModal(modalNames.EDIT_GENERAL_PROFILE)),
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 1, 'general'),
  onSaveClick: () => dispatch(submit('editGeneralProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGeneralProfileModal);
