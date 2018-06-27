import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import DisplayField from '../forms/DisplayField';
// import { generatePasswordRequest } from '../../actions/recruitment';
import ExamModal from '../../components/ExamModal';

const ActiveUserModal = ({ onClose, onClick, submitting, passwordStatusObject }) => (
  <ExamModal
    header="Active Candidate User"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <DisplayField
      passwordStatusObject={passwordStatusObject}
    />
  </ExamModal>
);

ActiveUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  passwordStatusObject: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('someAction')(state),
  passwordStatusObject: state.recruitment.passwordStatusObject,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onClick: () => dispatch(submit('someAction')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveUserModal);
