import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';

const validate = (values) => {
  const errors = {};
  errors.firstName = validator.required(values.firstName);
  errors.lastName = validator.required(values.lastName);
  errors.email = validator.email(values.email);
  return errors;
};

const EditGeneralProfileForm = () => (
  <Form>
    <Form.Group widths="equal">
      <Field name="firstName" component={Input} label="First name" placeholder="First name" />
      <Field name="lastName" component={Input} label="Last name" placeholder="Last name" />
    </Form.Group>
    <Field name="nickName" component={Input} label="Nick name" placeholder="Nick name" />
    <Field name="citizenId" component={Input} label="Citizen ID" placeholder="Citizen ID" />
    <Field name="mobileNo" component={Input} label="Mobile No." placeholder="Mobile No." />
    <Field name="email" component={Input} label="Email" placeholder="Email" />
    <Field name="facebook" component={Input} label="Facebook" placeholder="Facebook" />
    <Field name="lineId" component={Input} label="Line ID" placeholder="Line ID" />
  </Form>
);

export default reduxForm({
  form: 'editGeneralProfile',
  validate
})(EditGeneralProfileForm);
