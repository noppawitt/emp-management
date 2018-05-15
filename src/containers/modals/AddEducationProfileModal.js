import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest } from '../../actions/profile';
import Modal from '../../components/Modal';
import AddEducationProfileForm from '../forms/AddEducationProfileForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddEducationProfileModal = ({ id, masterTable, onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add education profile"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddEducationProfileForm id={id} masterTable={masterTable} onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddEducationProfileModal.propTypes = {
  id: PropTypes.number.isRequired,
  masterTable: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  masterTable: state.masterTable,
  submitting: isSubmitting('addEducationProfile')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateProfileRequest, values, 'addEducationProfile'),
  onClick: () => dispatch(submit('addEducationProfile'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEducationProfileModal);
