import React from 'react';
import { Table, Label, Form } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from './PageHeader';
import { getYearOptions } from '../utils/options';

const now = new Date();
const mNow = moment(now).format('MM');
const yNow = moment(now).format('YYYY');
const test = [{ date: '2018-06-18', dateName: 'fortest' }, { date: '2018-07-18', dateName: 'fortest1' }];

const oneRow = (date, dateName) => (
  <Table.Row>
    <Table.Cell>
      {(moment(date).format('YYYY') === yNow) && (moment(date).format('MM') === mNow) &&
      <Label ribbon color="yellow">This month</Label>
      }
      {date}
    </Table.Cell>
    <Table.Cell>{dateName}</Table.Cell>
  </Table.Row>
);
const Holiday = () => (
  <div>
    <PageHeader text="Holiday" icon="calendar" />
    <Form.Select placeholder={yNow} defaultValue={yNow} options={getYearOptions()} />
    <Table striped celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell><font size="4">Date</font></Table.HeaderCell>
          <Table.HeaderCell><font size="4">Holiday Name</font></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {test.map(day => oneRow(day.date, day.dateName))}
      </Table.Body>
    </Table>
  </div>
);

export default Holiday;
