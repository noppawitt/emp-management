import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../../components/Input';

const FirstPage = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="firstName" component={Input} as={Form.Input} label="First name" placeholder="First name" />
      <Field name="lastName" component={Input} as={Form.Input} label="Last name" placeholder="Last name" />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="firstNameTh" component={Input} as={Form.Input} label="ชื่อ" placeholder="ชื่อ" />
      <Field name="lastNameTh" component={Input} as={Form.Input} label="นามสกุล" placeholder="นามสกุล" />
    </Form.Group>
    <Field name="nickName" component={Input} as={Form.Input} label="Nick name" placeholder="Nick name" />
    <Field name="birthday" component={Input} as={Form.Input} type="date" label="Birth date" placeholder="Birth date" />
    <Field name="citizenId" component={Input} as={Form.Input} label="Citizen ID" placeholder="Citizen ID" />
    <Field name="mobileNumber" component={Input} as={Form.Input} label="Mobile No." placeholder="Mobile No." />
    <Field name="email" component={Input} as={Form.Input} label="Email" placeholder="Email" />
    <Field name="facebookId" component={Input} as={Form.Input} label="Facebook" placeholder="Facebook" />
    <Field name="lineId" component={Input} as={Form.Input} label="Line ID" placeholder="Line ID" />
    <Field name="address" component={Input} as={Form.Input} label="Address" placeholder="Address" />
  </Form>
);

FirstPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'createEmployee',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(FirstPage);
