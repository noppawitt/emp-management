import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { updateTimesheetRequest } from '../../actions/timesheet';
import Modal from '../../components/Modal';
import EditTimesheetForm from '../forms/EditTimesheetForm';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditTimesheetModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Edit timesheet"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <EditTimesheetForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditTimesheetModal.propTypes = {
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
  onSubmit: values => handleReduxFormSubmit(dispatch, updateTimesheetRequest, values),
  onClick: () => dispatch(submit('addTimesheet'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTimesheetModal);
