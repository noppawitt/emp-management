import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import { createProjectRequest } from '../../actions/project';
import Modal from '../../components/Modal';
import { handleReduxFormSubmit } from '../../utils/helper';

const EditProjectModal = ({ onClose, submitting, onClick }) => (
  <Modal
    header="Add project"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
  >
    <div>
      gg
    </div>
  </Modal>
);

EditProjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editProject')(state)
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: values => handleReduxFormSubmit(dispatch, createProjectRequest, values),
  onClick: () => dispatch(submit('editProject'))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectModal);
