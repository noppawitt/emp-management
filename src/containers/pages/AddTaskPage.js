import React from 'react';
<<<<<<< HEAD
import { Grid, Form, Divider, Segment, Icon } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from '../../components/PageHeader';

const Project = [
  { key: 'T', text: 'TestSCB24x7', value: 'male' },
  { key: 'M', text: 'Minihrm', value: 'male' },
  { key: 'N', text: 'nonProject', value: 'male' }
];

const Role = [
  { key: 'D', text: 'Dev', value: 'male' },
  { key: 'Te', text: 'Testing', value: 'male' },
  { key: 'Tr', text: 'Training', value: 'male' },
  { key: 'M', text: 'Meeting', value: 'male' }
];

const dates = ['2018-06-01', '2018-06-02'];
const isWeekend = day => moment(day).isoWeekday() === 6 || moment(day).isoWeekday() === 7;

const Taskday = date => (
  <Segment.Group raised size="large" >
    <Segment style={{ backgroundColor: isWeekend(date) ? 'rgba(255,0,0, 0.7)' : 'rgba(53,133,224, 0.7)' }} inverted >
      <Grid >
        <Grid.Row>
          <Grid.Column width={8}>
            {date}, {moment(date).format('ddd')}
          </Grid.Column>
          <Grid.Column floated="right">
            <Icon name="x" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input fluid label="Start Time" type="time" />
                <Form.Input fluid label="End Time" type="time" />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Form style={{ width: '100%' }}>
          <Form.TextArea fluid style={{ height: '100px' }} label="Description" placeholder="Description" />
        </Form>
      </Grid>
    </Segment>
  </Segment.Group>
);

const AddTaskTimesheet = () => (
=======
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Grid, Form, Divider, Segment } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from '../../components/PageHeader';
import AddTaskForm from '../forms/AddTaskForm';
import { taskOptions, getRangeOptions } from '../../utils/options';
import { updateInput, createTimesheetRequest } from '../../actions/timesheet';
import { handleReduxFormSubmit } from '../../utils/helper';
import { projectsToOptions } from '../../selectors/project';
import { fetchProjectRequest } from '../../actions/project';

const AddTaskPage = ({ month, startDay, endDay, change, submit, projectOptions }) => (
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
  <div>
    <PageHeader text="New Task" icon="user" />
    <Segment raised >
      <Grid padded>
        <Grid.Row >
          <Grid.Column width={16}>
            <Form>
              <Form.Group widths="equal">
<<<<<<< HEAD
                <Form.Select fluid label="Project" options={Project} placeholder="Project" />
                <Form.Select fluid label="Task Name" options={Role} placeholder="Task" />
                <Form.Input fluid label="Start date" type="date" />
                <Form.Input fluid label="End date" type="date" />
=======
                <Form.Select fluid label="Project" placeholder="Project" options={projectOptions} onChange={(e, { value }) => change('projectId', value)} />
                <Form.Select fluid label="Task Name" placeholder="Task" options={taskOptions} onChange={(e, { value }) => change('task', value)} />
                <Form.Select label="Start Date" placeholder="start" defaultValue={startDay} options={getRangeOptions(1, endDay)} onChange={(e, { value }) => change('startDay', value)} />
                <Form.Select label="End Date" placeholder="end" defaultValue={endDay} options={getRangeOptions(startDay, moment(month, 'MM').daysInMonth())} onChange={(e, { value }) => change('endDay', value)} />
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Divider />
<<<<<<< HEAD
    {dates.map(date => Taskday(date))}
  </div>
);

export default AddTaskTimesheet;
=======
    <AddTaskForm onSubmit={submit} />
  </div>
);

AddTaskPage.propTypes = {
  month: PropTypes.string.isRequired,
  startDay: PropTypes.number.isRequired,
  endDay: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  projectOptions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  month: state.timesheet.month,
  startDay: state.timesheet.startDay,
  endDay: state.timesheet.endDay,
  projectOptions: projectsToOptions(state)
});

const mapDispatchToProps = dispatch => ({
  change: (key, value) => dispatch(updateInput(key, value)),
  fetchProject: () => dispatch(fetchProjectRequest()),
  submit: values => handleReduxFormSubmit(dispatch, createTimesheetRequest, values, true)
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchProject } = this.props;
      fetchProject();
    }
  })
);

export default enhance(AddTaskPage);
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
