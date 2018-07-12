import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import GradingForm from '../forms/GradingForm';

const GradingExamsModal = ({
  id,
  onSave,
  onClose,
}) => (
  <Modal
    header={'Grading Exams :'.concat(id)}
    buttonName="Save"
    onSave={onSave}
    onClose={onClose}
    id={id}
  >
    Hello, {id}!
    <GradingForm
      isFetching={false}
    />
  </Modal>
);

GradingExamsModal.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(GradingExamsModal);
