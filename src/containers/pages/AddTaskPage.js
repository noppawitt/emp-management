import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Form, Divider, Segment } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from '../../components/PageHeader';
import AddTaskForm from '../forms/AddTaskForm';
import { taskOptions, getRangeOptions } from '../../utils/options';
import { updateInput } from '../../actions/timesheet';

const options = [
  { key: 1, value: 1, text: 1 }
];

const AddTaskPage = ({ month, startDay, endDay, change }) => (
  <div>
    <PageHeader text="New Task" icon="user" />
    <Segment raised >
      <Grid padded>
        <Grid.Row >
          <Grid.Column width={16}>
            <Form>
              <Form.Group widths="equal">
                <Form.Select fluid label="Project" placeholder="Project" options={options} />
                <Form.Select fluid label="Task Name" placeholder="Task" options={taskOptions} />
                <Form.Select label="Start Date" placeholder="start" defaultValue={startDay} options={getRangeOptions(1, endDay)} onChange={(e, { value }) => change('startDay', value)} />
                <Form.Select label="End Date" placeholder="end" defaultValue={endDay} options={getRangeOptions(startDay, moment(month, 'MM').daysInMonth())} onChange={(e, { value }) => change('endDay', value)} />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Divider />
    <AddTaskForm />
  </div>
);

AddTaskPage.propTypes = {
  month: PropTypes.string.isRequired,
  startDay: PropTypes.number.isRequired,
  endDay: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  month: state.timesheet.month,
  startDay: state.timesheet.startDay,
  endDay: state.timesheet.endDay
});

const mapDispatchToProps = dispatch => ({
  change: (key, value) => dispatch(updateInput(key, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskPage);
