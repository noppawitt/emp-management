import React from 'react';
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
  <div>
    <PageHeader text="New Task" icon="user" />
    <Segment raised >
      <Grid padded>
        <Grid.Row >
          <Grid.Column width={16}>
            <Form>
              <Form.Group widths="equal">
                <Form.Select fluid label="Project" options={Project} placeholder="Project" />
                <Form.Select fluid label="Task Name" options={Role} placeholder="Task" />
                <Form.Input fluid label="Start date" type="date" />
                <Form.Input fluid label="End date" type="date" />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Divider />
    {dates.map(date => Taskday(date))}
  </div>
);

export default AddTaskTimesheet;
