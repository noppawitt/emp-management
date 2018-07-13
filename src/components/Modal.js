import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SUIModal, Button } from 'semantic-ui-react';

<<<<<<< HEAD
const Modal = ({ header, buttonName, onClose, onClick, submitting, children, confirm, size, disable }) => (
=======
const Modal = ({ header, buttonName, onClose, onClick, submitting, children, confirm, deleted, onDelete }) => (
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
  <SUIModal
    dimmer="blurring"
    size={size}
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
<<<<<<< HEAD
      <Button color="blue" loading={submitting} disabled={submitting|| disable} onClick={onClick}>{buttonName}</Button>
=======
      {deleted && <Button floated="left" color="red" disabled={submitting} onClick={onDelete}>Delete</Button>}
      <Button color="blue" loading={submitting} disabled={submitting} onClick={onClick}>{buttonName}</Button>
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
      {confirm && <Button loading={submitting} disabled={submitting} onClick={onClose}>No</Button>}
    </SUIModal.Actions>
  </SUIModal>
);

Modal.defaultProps = {
  buttonName: 'Save',
  disable: false,
  confirm: false,
<<<<<<< HEAD
  size: 'small'
=======
  deleted: false,
  onDelete: undefined
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
<<<<<<< HEAD
  confirm: PropTypes.bool
=======
  confirm: PropTypes.bool,
  deleted: PropTypes.bool,
  onDelete: PropTypes.func
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
};

export default Modal;
