import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const taskOptions = [
  { key: 'development', value: 'Development', text: 'Development' },
  { key: 'testing', value: 'Testing', text: 'Testing' },
  { key: 'training', value: 'Traning', text: 'Traning' },
  { key: 'Meeting', value: 'Meeting', text: 'Meeting' }
];

const EditTimesheetForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="projectId" as={Form.Input} component={Input} label="Project" placeholder="Project" disabled={submitting} />
    <Form.Group widths="equal">
      <Field name="timeIn" as={Form.Input} component={Input} type="time" label="Time in" placeholder="Time in" disabled={submitting} />
      <Field name="timeOut" as={Form.Input} component={Input} type="time" label="Time out" placeholder="Time out" disabled={submitting} />
    </Form.Group>
    <Field name="task" as={Form.Select} component={Input} label="Task" placeholder="Task" options={taskOptions} disabled={submitting} />
    <Field name="description" as={Form.TextArea} component={Input} autoHeight label="Description" placeholder="Description" disabled={submitting} />
  </Form>
);

EditTimesheetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state, { date }) => ({
  initialValue: {
    userId: state.auth.id,
    date
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'editTimesheet',
    validate
  })
);

export default enhance(EditTimesheetForm);
