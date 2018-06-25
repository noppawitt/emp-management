import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
// import GeneratePasswordField from '../forms/GeneratePasswordField';
// import { generatePasswordRequest } from '../../actions/recruitment';
import ExamModal from '../../components/ExamModal';

const GeneratePasswordModal = ({ onClose, onClick, submitting }) => (
  <ExamModal
    header="Test: Generate Password"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <generatePasswordField />
  </ExamModal>
);

GeneratePasswordModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('someAction')(state),
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onClink: () => dispatch(submit('someAction')),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneratePasswordModal);
