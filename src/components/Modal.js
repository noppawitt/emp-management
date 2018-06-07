import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SUIModal, Button } from 'semantic-ui-react';

const Modal = ({ header, buttonName, onClose, onClick, submitting, children, confirm, deleted, onDelete, isDeleting }) => (
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
      {deleted && <Button inverted color="red" floated="left" loading={isDeleting} onClick={onDelete}>Delete</Button>}
      <Button color="blue" loading={submitting || isDeleting} disabled={submitting} onClick={onClick}>{buttonName}</Button>
      {confirm && <Button loading={submitting} disabled={submitting} onClick={onClose}>No</Button>}
    </SUIModal.Actions>
  </SUIModal>
);

Modal.defaultProps = {
  buttonName: 'Save',
  confirm: false,
  deleted: false,
  onDelete: () => {},
  isDeleting: false
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  confirm: PropTypes.bool,
  deleted: PropTypes.bool,
  onDelete: PropTypes.func,
  isDeleting: PropTypes.bool
};

export default Modal;
