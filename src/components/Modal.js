import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SUIModal, Button, Icon } from 'semantic-ui-react';

const Modal = ({ header, open, onOpen, onClose, onSaveClick, submitting, children }) => (
  <SUIModal
    dimmer="blurring"
    size="small"
    closeIcon
    trigger={<Icon
      name="edit"
      size="large"
      link
    />}
    open={open}
    onOpen={onOpen}
    onClose={onClose}
  >
    <SUIModal.Header>
      {header}
    </SUIModal.Header>
    <SUIModal.Content>
      {children}
    </SUIModal.Content>
    <SUIModal.Actions>
      <Button color="blue" loading={submitting} disabled={submitting} onClick={onSaveClick}>
        Save
      </Button>
    </SUIModal.Actions>
  </SUIModal>
);

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
