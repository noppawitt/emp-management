import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';

const Input = ({ label, placeholder, input, meta, ...rest }) => (
  <Form.Field {...rest} error={meta.error && meta.touched}>
    <label>{label}</label>
    <input {...input} type="text" placeholder={placeholder} />
    {meta.touched && meta.error &&
    <Label basic color="red" pointing >{meta.error}</Label>}
  </Form.Field>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default Input;
