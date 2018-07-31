import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';
import AddHolidayForm from '../forms/AddHolidayForm';
import { createHolidayRequest } from '../../actions/holiday';

const AddHolidayModal = ({ onClose, onSubmit, submitting, onClick }) => (
  <Modal
    header="Add Holiday"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <AddHolidayForm onSubmit={values => onSubmit(values)} />
  </Modal>
);

AddHolidayModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('addHoliday')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createHolidayRequest, values),
  onClick: () => dispatch(submit('addHoliday'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddHolidayModal);
