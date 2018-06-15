import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';

const AddExamForm = ({ handleSubmit, submitting, }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="firstName" as={Form.Input} component={Input} label="WTF WTF WTF" placeholder="First name" disabled={submitting} />
      <Field name="lastName" as={Form.Input} component={Input} label="Last name" placeholder="Last name" disabled={submitting} />
    </Form.Group>
    <Field name="email" as={Form.Input} component={Input} label="E-mail" placeholder="E-mail" disabled={submitting} />
    <Field name="citizenId" as={Form.Input} component={Input} label="citizenId" placeholder="citizenId" disabled={submitting} />
  </Form>
);

AddExamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const enhance = compose(
  connect(null, null),
  reduxForm({
    form: 'addNewExam'
  })
);

export default enhance(AddExamForm);
