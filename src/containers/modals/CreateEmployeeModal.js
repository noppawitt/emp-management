import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import CreateEmployeeForm from '../forms/CreateEmployeeForm';

const CreateEmployeeModal = ({ onClose, onClick }) => (
  <Modal
    header="Add new employee"
    onClose={onClose}
    onClick={onClick}
    submitting={false}
  >
    <CreateEmployeeForm />
  </Modal>
);

CreateEmployeeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onClick: () => dispatch(submit('createEmployee'))
});

export default connect(null, mapDispatchToProps)(CreateEmployeeModal);
