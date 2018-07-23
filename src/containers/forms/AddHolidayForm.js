import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';

const validate = (values) => {
  const errors = {};
  errors.date = validator.required(values.date);
  errors.holidayName = validator.required(values.holidayName);
  return errors;
};

const AddMemberForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="date" as={Form.Input} component={Input} type="date" label="Date" placeholder="Date" disabled={submitting} validate={validator.date} />
      <Field name="dateName" as={Form.Input} component={Input} label="Date Name" placeholder="Date Name" disabled={submitting} />
    </Form.Group>
  </Form>
);

AddMemberForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const enhance = compose(reduxForm({
  form: 'addHoliday',
  validate
}));

export default enhance(AddMemberForm);
