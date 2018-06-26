import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { createTimesheetRequest } from '../../actions/timesheet';
import Modal from '../../components/Modal';
import AddTimesheetForm from '../forms/AddTimesheetForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const AddTimesheetModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add timesheet"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddTimesheetForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddTimesheetModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addTimesheet')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createTimesheetRequest, values),
  onClick: () => dispatch(submit('addTimesheet'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTimesheetModal);
