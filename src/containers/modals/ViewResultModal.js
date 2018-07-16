import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as SUIModal } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';
import ResultForm from '../forms/ResultForm';

const ViewResultModal = ({ id, appointment, onClose, }) => (
  <SUIModal
    dimmer="blurring"
    size="fullscreen"
    closeIcon
    open
    onClose={onClose}
  >
    <SUIModal.Header>
      Exam result of ID: {id} (on {appointment})
    </SUIModal.Header>
    <SUIModal.Content scrolling>
      <ResultForm id={id} />
    </SUIModal.Content>
  </SUIModal>
);

ViewResultModal.propTypes = {
  id: PropTypes.string.isRequired,
  appointment: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewResultModal);
