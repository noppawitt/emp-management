import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import AddEmployeeForm from '../forms/AddEmployeeForm';

const AddEmployeeModal = ({ onClose, onClick }) => (
  <Modal
    header="Add new employee"
    onClose={onClose}
    onClick={onClick}
    submitting={false}
  >
    <AddEmployeeForm />
  </Modal>
);

AddEmployeeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onClick: () => dispatch(submit('addEmployee'))
});

export default connect(null, mapDispatchToProps)(AddEmployeeModal);
