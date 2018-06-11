import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest, deleteProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import EditEducationProfileForm from '../forms/EditEducationProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditEducationProfileModal = ({ id, onClose, onSubmit, submitting, onClick, onDelete, isDeleting }) => (
  <Modal
    header="Edit education profile"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
    deleted
    onDelete={() => onDelete(id)}
    isDeleting={isDeleting}
  >
    <EditEducationProfileForm id={id} onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditEducationProfileModal.defaultProps = {
  isDeleting: false
};

EditEducationProfileModal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editEducationProfile')(state),
  isDeleting: state.profile.isDeleting
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 'editEducationProfile'),
  onClick: () => dispatch(submit('editEducationProfile')),
  onDelete: profileId => dispatch(deleteProfileRequest('education', profileId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEducationProfileModal);
