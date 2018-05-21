import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const AddProjectForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="id" as={Form.Input} component={Input} label="Project No." placeholder="Project No." disabled={submitting} />
      <Field name="name" as={Form.Input} component={Input} label="Name" placeholder="Name" disabled={submitting} />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="quitationId" as={Form.Input} component={Input} label="Quotation No." placeholder="Quotation No." disabled={submitting} />
      <Field name="customer" as={Form.Input} component={Input} label="Customer" placeholder="Customer" disabled={submitting} />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="purchasedOrder" as={Form.Input} component={Input} label="Purchesed order No." placeholder="Purchesed order No." disabled={submitting} />
      <Field name="amount" as={Form.Input} component={Input} label="amount" placeholder="amount" disabled={submitting} />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="from" as={Form.Input} component={Input} label="From" placeholder="From" disabled={submitting} />
      <Field name="to" as={Form.Input} component={Input} label="To" placeholder="To" disabled={submitting} />
    </Form.Group>
    <Field name="description" as={Form.TextArea} component={Input} label="Description" placeholder="Description" disabled={submitting} autoHeight />
  </Form>
);

AddProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const enhance = compose(reduxForm({
  form: 'addProject',
  initialValues: {
    from: null,
    to: null,
    description: null
  },
  validate
}));

export default enhance(AddProjectForm);
