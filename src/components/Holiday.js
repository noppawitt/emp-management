import React from 'react';
import PropTypes from 'prop-types';
import { Table, Label, Form } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from './PageHeader';
import { getYearOptions } from '../utils/options';

const mNow = moment().format('MM');
const yNow = moment().format('YYYY');

const oneRow = (date, dateName) => (
  <Table.Row>
    <Table.Cell width={5}>
      {(moment(date).format('YYYY') === yNow) && (moment(date).format('MM') === mNow) &&
      <Label ribbon color="yellow">This month</Label>
      }
      {date}
    </Table.Cell>
    <Table.Cell>{dateName}</Table.Cell>
  </Table.Row>
);
const Holiday = ({ fetchHolidays, holidays, year }) => (
  <div>
    <PageHeader text="Holiday" icon="calendar" />
    <Form.Select placeholder={year} defaultValue={year} options={getYearOptions()} onChange={(e, { value }) => fetchHolidays(value)} />
    <Table striped celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell><font size="4">Date</font></Table.HeaderCell>
          <Table.HeaderCell><font size="4">Holiday Name</font></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {holidays.map(day => oneRow(day.date, day.dateName))}
      </Table.Body>
    </Table>
  </div>
);

Holiday.propTypes = {
  fetchHolidays: PropTypes.func.isRequired,
  holidays: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired
};
export default Holiday;
