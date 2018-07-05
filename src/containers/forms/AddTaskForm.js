import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Grid, Form, Segment, Icon } from 'semantic-ui-react';
import moment from 'moment';
import Input from '../../components/Input';
import { getFormInitialValues } from '../../selectors/timesheet';

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
                  <Field name={`${task}.timeIn`} as={Form.Input} component={Input} label="Time in" placeholder="Time in" type="time" />
                  <Field name={`${task}.timeOut`} as={Form.Input} component={Input} label="Time out" placeholder="Time out" type="time" />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Column width={16}>
              <Field name={`${task}.description`} as={Form.TextArea} component={Input} autoHeight label="Description" placeholder="Description" />
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    ))}
  </div>
);

renderTasks.propTypes = {
  fields: PropTypes.array.isRequired
};

const AddTaskForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <FieldArray name="timesheets" component={renderTasks} />
  </Form>
);

AddTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
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
    enableReinitialize: true
  })
);

export default enhance(AddTaskForm);
