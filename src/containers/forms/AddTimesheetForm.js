import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import { fetchProjectRequest } from '../../actions/project';
import { projectsToOptions } from '../../selectors/project';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { taskOptions } from '../../utils/options';

const validate = (values) => {
  const errors = {};
  errors.projectId = validator.required(values.projectId);
  errors.timeIn = validator.required(values.timeIn);
  errors.timeIn = validator.timeBefore(values.timeIn, values.timeOut);
  errors.timeOut = validator.required(values.timeOut);
  errors.timeOut = validator.timeAfter(values.timeOut, values.timeIn);
  errors.task = validator.required(values.task);
  return errors;
};

const AddTimesheetForm = ({ handleSubmit, submitting, projects }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="projectId" as={Form.Dropdown} component={Input} search selection label="Project" placeholder="Project" options={projects} disabled={submitting} />
    <Form.Group widths="equal">
      <Field name="timeIn" as={Form.Input} component={Input} type="time" label="Time in" placeholder="Time in" disabled={submitting} />
      <Field name="timeOut" as={Form.Input} component={Input} type="time" label="Time out" placeholder="Time out" disabled={submitting} />
    </Form.Group>
    <Field name="task" as={Form.Select} component={Input} label="Task" placeholder="Task" options={taskOptions} disabled={submitting} />
    <Field name="description" as={Form.TextArea} component={Input} autoHeight label="Description" placeholder="Description" disabled={submitting} />
  </Form>
);

AddTimesheetForm.defaultProps = {
  projects: []
};

AddTimesheetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  projects: PropTypes.array
};

const mapStateToProps = (state, { date }) => ({
  initialValues: {
    userId: state.auth.id,
    date,
    timeIn: '09:00:00',
    timeOut: '18:00:00'
  },
  projects: projectsToOptions(state)
});

const mapDispatchToProps = dispatch => ({
  fetchProject: () => dispatch(fetchProjectRequest())
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchProject } = this.props;
      fetchProject();
    }
  }),
  reduxForm({
    form: 'addTimesheet',
    validate
  })
);

export default enhance(AddTimesheetForm);
