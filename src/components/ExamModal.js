import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SUIModal, Button } from 'semantic-ui-react';

const ExamModal = ({ header, buttonName, onClick, onClose, children, submitting }) => (
  <SUIModal
    dimmer="blurring"
    size="small"
    closeIcon
    open
    onClose={onClose}
  >
    <SUIModal.Header>
      {header}
    </SUIModal.Header>
    <SUIModal.Content>
      {children}
    </SUIModal.Content>
    <SUIModal.Actions>
      <Button loading={submitting} disable={submitting} onClick={onClick}>{buttonName}</Button>
    </SUIModal.Actions>
  </SUIModal>
);

ExamModal.defaultProps = {
  buttonName: 'OK',
  submitting: false,
};

ExamModal.propTypes = {
  buttonName: PropTypes.string,
  header: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  submitting: PropTypes.bool,
};

export default ExamModal;
