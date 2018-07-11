import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';

const GradingExams = ({
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
  </Modal>
);

GradingExams.propTypes = {
  id: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  id: state.recruitment.id,
});

const mapDispatchToProps = dispatch => ({
  // edit save button function!
  onSave: () => dispatch(),
  onClose: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GradingExams);
