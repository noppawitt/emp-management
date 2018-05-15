import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import EditWorkProfileForm from '../forms/EditWorkProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditWorkProfileModal = ({ masterTable, onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Edit work profile"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <EditWorkProfileForm masterTable={masterTable} onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditWorkProfileModal.propTypes = {
  masterTable: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  masterTable: state.masterTable,
  submitting: isSubmitting('editWorkProfile')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 'editWorkProfile'),
  onClick: () => dispatch(submit('editWorkProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkProfileModal);
