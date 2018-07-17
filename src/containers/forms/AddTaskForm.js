import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Grid, Form, Segment, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { getFormInitialValues } from '../../selectors/timesheet';

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.dateBefore(values.startDate, values.endDate);
  errors.endDate = validator.dateAfter(values.endDate, values.startDate);
  if (values.timesheets.length) {
    console.log('not have timesheets');
  } else {
    const timeSheetArrayErrors = [];
    values.timesheets.forEach((task, taskIndex) => {
      const taskErrors = {}
      taskErrors.timeIn = validator.timeBefore(task.timeIn, task.timeOut);
      taskErrors.timeOut = validator.timeAfter(task.timeOut, task.timeIn);
      timeSheetArrayErrors[taskIndex] = taskErrors;
    });
  }
  return errors;
};

const isWeekend = day => moment(day).isoWeekday() === 6 || moment(day).isoWeekday() === 7;
const renderTasks = ({ fields }) => (
  <div>
    {fields.map((task, i) => (
      <Segment.Group key={`${fields.get(i).date}${fields.get(i).timeIn}${fields.get(i).timeOut}`} raised size="large">
        <Segment style={{ backgroundColor: isWeekend(fields.get(i).date) ? 'rgba(255, 0, 0, 0.7)' : 'rgba(53, 133, 224, 0.7)' }} inverted >
          <Grid >
            <Grid.Row>
              <Grid.Column width={8}>
                {fields.get(i).date}, {moment(fields.get(i).date).format('ddd')}
              </Grid.Column>
              <Grid.Column floated="right">
                <Icon link name="x" onClick={() => fields.remove(i)} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <Grid padded>
            <Grid.Row>
              <Grid.Column width={6}>
                <Form.Group widths="equal">
                  <Field name={`${task}.timeIn`} as={Form.Input} component={Input} label="Time in" type="time" />
                  <Field name={`${task}.timeOut`} as={Form.Input} component={Input} label="Time out" type="time" />
                </Form.Group>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                {fields.get(i).remark.map(remark => (<p style={{ color: 'red' }}>{remark}</p>)) }
              </Grid.Column>
            </Grid.Row>
            <Grid.Column width={16}>
              <Field name={`${task}.description`} as={Form.TextArea} component={Input} autoHeight label="Description" />
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    ))}
  </div>
);

renderTasks.propTypes = {
  fields: PropTypes.array.isRequired,
};

const AddTaskForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <FieldArray name="timesheets" component={renderTasks} />
    <Button loading={submitting} type="submit">Submit</Button>
  </Form>
);

AddTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  initialValues: {
    timesheets: getFormInitialValues(state)
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addTask',
    enableReinitialize: true,
    validate
  })
);

export default enhance(AddTaskForm);
