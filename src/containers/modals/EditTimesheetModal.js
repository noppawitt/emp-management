import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { openModal, closeModal } from '../../actions/modal';
import { updateTimesheetRequest, deleteTimesheetRequest } from '../../actions/timesheet';
import Modal from '../../components/Modal';
import EditTimesheetForm from '../forms/EditTimesheetForm';
import { handleReduxFormSubmit } from '../../utils/helper';
import * as modalNames from '../../constants/modalNames';

const EditTimesheetModal = ({ onClose, onSubmit, submitting, onClick, id, onDelete }) => (
  <Modal
    header="Edit timesheet"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
    deleted
    onDelete={() => onDelete(id)}
  >
    <EditTimesheetForm id={id} onSubmit={values => onSubmit(values)} />
  </Modal>
);

EditTimesheetModal.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editTimesheet')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, updateTimesheetRequest, values),
  onClick: () => dispatch(submit('editTimesheet')),
  onDelete: timesheetId => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete confirmation',
    description: 'Are you sure to delete this timesheet?',
    onConfirm: () => dispatch(deleteTimesheetRequest(timesheetId))
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTimesheetModal);
