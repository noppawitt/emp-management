import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SUIModal, Button, Input, Select } from 'semantic-ui-react';

const passwordOptions = [
  { key: 'day', text: 'Day', value: 1 },
  { key: 'month', text: 'Month', value: 30 },
  { key: 'year', text: 'Year', value: 365 },
];
const ExamModal = ({
  header,
  onClickActivate,
  onClose,
  children,
  isFetching,
  passwordObject,
  onLifetimesValueChange,
  onLifetimesUnitChange,
  lifetimesValue,
  lifetimesUnit }) =>
  (
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
        <Input placeholder="Password lifetimes" action>
          <input onChange={onLifetimesValueChange} />
          <Select compact options={passwordOptions} defaultValue={1} onChange={(e, { value }) => onLifetimesUnitChange(value)} />
        </Input>
        <Button primary loading={isFetching} disable={isFetching} onClick={() => onClickActivate(passwordObject.userId, lifetimesValue * lifetimesUnit)}>Activate</Button>
        <Button secondary loading={isFetching} disable={isFetching} onClick={onClose}>Close</Button>
      </SUIModal.Actions>
    </SUIModal>
  );

ExamModal.propTypes = {
  header: PropTypes.string.isRequired,
  onClickActivate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isFetching: PropTypes.bool.isRequired,
  passwordObject: PropTypes.object.isRequired,
  onLifetimesValueChange: PropTypes.func.isRequired,
  onLifetimesUnitChange: PropTypes.func.isRequired,
  lifetimesValue: PropTypes.string.isRequired,
  lifetimesUnit: PropTypes.string.isRequired,
};

export default ExamModal;
