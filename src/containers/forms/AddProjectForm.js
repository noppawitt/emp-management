import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { paymentTypeOptions, workingDayOptions } from '../../utils/options';

const validate = (values) => {
  const errors = {};
  errors.name = validator.required(values.name);
  errors.quotationId = validator.required(values.quotationId);
  errors.customer = validator.required(values.customer);
  errors.purchasedOrder = validator.required(values.purchasedOrder);
  errors.amount = validator.required(values.amount);
  errors.startDate = validator.dateBefore(values.startDate, values.endDate);
  errors.endDate = validator.dateAfter(values.endDate, values.startDate);
  errors.paymentType = validator.required(values.paymentType);
  return errors;
};

const AddProjectForm = ({ handleSubmit, submitting, setWorkingDay, paymentType }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field
        name="id"
        as={Form.Input}
        component={Input}
        label="Project No."
        placeholder="Project No."
        disabled={submitting}
        validate={[validator.required, validator.maxLength20]}
      />
      <Field
        name="name"
        as={Form.Input}
        component={Input}
        label="Name"
        placeholder="Name"
        disabled={submitting}
        validate={validator.maxLength50}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name="quotationId"
        as={Form.Input}
        component={Input}
        label="Quotation No."
        placeholder="Quotation No."
        disabled={submitting}
        validate={validator.maxLength25}
      />
      <Field
        name="customer"
        as={Form.Input}
        component={Input}
        label="Customer"
        placeholder="Customer"
        disabled={submitting}
        validate={validator.maxLength30}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name="purchasedOrder"
        as={Form.Input}
        component={Input}
        label="PO No."
        placeholder="PO No."
        disabled={submitting}
        validate={validator.maxLength25}
      />
      <Field
        name="amount"
        as={Form.Input}
        component={Input}
        label="Amount"
        placeholder="Amount"
        disabled={submitting}
        validate={[validator.maxLength14, validator.check2Decimal]}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Field
        name="startDate"
        as={Form.Input}
        component={Input}
        label="From"
        placeholder="From"
        type="date"
        disabled={submitting}
        validate={[validator.required, validator.date]}
      />
      <Field
        name="endDate"
        as={Form.Input}
        component={Input}
        label="To"
        placeholder="To"
        type="date"
        disabled={submitting}
        validate={[validator.required, validator.date]}
      />
    </Form.Group>
    <Field
      name="paymentType"
      as={Form.Select}
      component={Input}
      label="Payment type"
      placeholder="Payment type"
      options={paymentTypeOptions}
      onChange={(e, newValue) => setWorkingDay(newValue === 'Man-month' ? 22 : null)}
      disabled={submitting}
    />
    {paymentType === 'Man-month' &&
    <Field
      name="workingDay"
      as={Form.Select}
      component={Input}
      label="Working day"
      placeholder="Working day"
      options={workingDayOptions}
      disabled={submitting}
      validate={validator.required}
    />}
    <Field
      name="description"
      as={Form.TextArea}
      component={Input}
      autoHeight
      label="Description"
      placeholder="Description"
      disabled={submitting}
      validate={validator.maxLength100}
    />
  </Form>
);

AddProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  setWorkingDay: PropTypes.func.isRequired,
  paymentType: PropTypes.string.isRequired
};

const selector = formValueSelector('addProject');

const mapStateToProps = state => ({
  paymentType: selector(state, 'paymentType')
});

const mapDispatchToProps = dispatch => ({
  setWorkingDay: value => dispatch(change('addProject', 'workingDay', value))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'addProject',
    initialValues: {
      from: null,
      to: null,
      description: null
    },
    validate
  })
);

export default enhance(AddProjectForm);
