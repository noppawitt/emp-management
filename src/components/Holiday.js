import React from 'react';
import PropTypes from 'prop-types';
import { Table, Label, Form, Grid, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from './PageHeader';
import { getYearOptions } from '../utils/options';

const mNow = moment().format('MM');
const yNow = moment().format('YYYY');

const oneRow = (date, dateName) => (
  <Table.Row>
    <Table.Cell width={5}>
      {(moment(date).format('YYYY') === yNow) && (moment(date).format('MM') === mNow) &&
      <Grid stackable>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={8}>
            <Label ribbon color="yellow">This month</Label>
          </Grid.Column>
          <Grid.Column width={8}>
            <b>{date}</b>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      }
      {(moment(date).format('YYYY') !== yNow) || (moment(date).format('MM') !== mNow) &&
      <div>
        {date}
      </div>
      }
    </Table.Cell>
    <Table.Cell>
      <Grid stackable>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={10}>
            {dateName}
          </Grid.Column>
          <Grid.Column floated="right" width={6} >
            <Button animated="fade" style={{ borderStyle: 'solid', borderColor: '#FF0000', backgroundColor: 'white', borderWidth: '1px' }}>
              <Button.Content visible><font color="#FF0000" >Delete</font></Button.Content>
              <Button.Content hidden > <Icon color="red" name="x" /> </Button.Content>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Table.Cell>
  </Table.Row>
);
const Holiday = ({ fetchHolidays, holidays, year }) => (
  <div style={{ width: '60%', margin: 'auto' }}>
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
