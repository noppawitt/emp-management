import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';

const ViewResultModal = ({
  id,
  onSave,
  onClose,
}) => (
  <Modal
    header={'View Result :'.concat(id)}
    buttonName="OK"
    onSave={onSave}
    onClose={onClose}
    id={id}
  >
    Hello, {id}!
  </Modal>
);

ViewResultModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  // edit save button function!
  onSave: () => dispatch(),
  onClose: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewResultModal);
