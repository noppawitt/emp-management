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
const days = [
  { key: '1', text: '1', value: '1' },
  { key: '2', text: '2', value: '2' },
  { key: '3', text: '3', value: '3' },
  { key: '4', text: '4', value: '4' },
  { key: '5', text: '5', value: '5' },
  { key: '6', text: '6', value: '6' },
  { key: '7', text: '7', value: '7' },
  { key: '8', text: '8', value: '8' },
  { key: '9', text: '9', value: '9' },
  { key: '10', text: '10', value: '10' },
  { key: '11', text: '11', value: '11' },
  { key: '12', text: '12', value: '12' },
  { key: '13', text: '13', value: '13' },
  { key: '14', text: '14', value: '14' },
  { key: '15', text: '15', value: '15' },
  { key: '16', text: '16', value: '16' },
  { key: '17', text: '17', value: '17' },
  { key: '18', text: '18', value: '18' },
  { key: '19', text: '19', value: '19' },
  { key: '20', text: '20', value: '20' },
  { key: '21', text: '21', value: '21' },
  { key: '22', text: '22', value: '22' },
  { key: '23', text: '23', value: '23' },
  { key: '24', text: '24', value: '24' },
  { key: '25', text: '25', value: '25' },
  { key: '26', text: '26', value: '26' },
  { key: '27', text: '27', value: '27' },
  { key: '28', text: '28', value: '28' },
  { key: '29', text: '29', value: '29' },
  { key: '30', text: '30', value: '30' },
  { key: '31', text: '31', value: '31' },
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
                <Form.Select label="Start Date" placeholder="start" defaultValue={moment().format('D')} options={days} />
                <Form.Select label="End Date" placeholder="end" defaultValue={moment().format('D')} options={days} />
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
