import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Button, Modal as SUIModal } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';
import GradingForm from '../forms/GradingForm';
import {
  modalPageChange
} from '../../actions/recruitment';

const GradingExamsModal = ({
  gradingId,
  onSave,
  onClose,
  onPageChange,
}) => (
  <SUIModal
    dimmer="blurring"
    size="fullscreen"
    open
    header={'Grading Exams :'.concat(gradingId)}
    buttonName="Save"
    onSave={onSave}
    onClose={onClose}
    gradingId={gradingId}
  >
    <SUIModal.Content>
      <h2>
        Applicant ID: {gradingId}
      </h2>
      <GradingForm
        isFetching={false}
        onPageChange={onPageChange}
      />
      <Segment>
        <Button primary>Test</Button>
        <Button secondary>Test</Button>
        <Button positive>Test</Button>
        <Button negative>Test</Button>
      </Segment>
    </SUIModal.Content>
  </SUIModal>
);

GradingExamsModal.propTypes = {
  gradingId: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  gradingId: state.recruitment.gradingId,
});

const mapDispatchToProps = dispatch => ({
  // edit save button function!
  onPageChange: value => dispatch(modalPageChange(value)),
  onSave: () => dispatch(),
  onClose: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GradingExamsModal);
