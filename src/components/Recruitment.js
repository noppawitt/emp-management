import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, /* Menu, Icon, */ Input, Table, Grid } from 'semantic-ui-react';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

// constant function for change status button
const actionButtonController = (status) => {
  switch (status) {
    case 'Pending':
      return <Button primary>Start</Button>;
    case 'Complete':
      return <Button primary>View Result</Button>;
    case 'In Progress':
      return <Button primary disabled>Pending</Button>;
    default:
      return <Button primary disabled>Error</Button>;
  }
};

// const Recruitment = ({ recruitments, onSearchChange, sortKey, direction, handleSort }) => (
const Recruitment = ({ recruitments, onSearchChange, sortKey, direction, handleSort }) => (
  <Segment.Group raised>
    <Segment>
      <Grid>
        <Grid.Column width={3}>
          <Input icon="search" placeholder="Search recruitments.." onChange={onSearchChange} />
        </Grid.Column>
        <Grid.Column width={5}>
          <DateRangePicker
            startDate={moment()} // momentPropTypes.momentObj or null,
            startDateId="start_date_id" // PropTypes.string.isRequired,
            endDate={moment()} // momentPropTypes.momentObj or null,
            endDateId="end_date_id" // PropTypes.string.isRequired,
            onDatesChange={() => { alert('focused!'); }} // PropTypes.func.isRequired,
            focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={() => { }} // PropTypes.func.isRequired,
          />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Table striped selectable celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell one wide className="center aligned">#</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'citizenId' ? direction : null} onClick={() => handleSort('citizenId')} two wide>Citizen ID</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'name' ? direction : null} onClick={() => handleSort('name')} two wide>Name</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')} two wide>Position</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'appointment' ? direction : null} onClick={() => handleSort('appointment')} two wide>Appointment</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'status' ? direction : null} onClick={() => handleSort('status')} two wide>Status</Table.HeaderCell>
            <Table.HeaderCell two wide />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {recruitments.map((recruitment, i) => (
            <Table.Row key={recruitment.citizenId}>
              <Table.Cell one wide className="center aligned">{i + 1}</Table.Cell>
              <Table.Cell two wide>{recruitment.citizenId}</Table.Cell>
              <Table.Cell two wide>
                {recruitment.firstName} {recruitment.lastName}<br />
                {recruitment.firstNameTh !== '' ? <div>{recruitment.firstNameTh} {recruitment.lastNameTh}<br /></div> : ''}
              </Table.Cell>
              <Table.Cell two wide>
                {(recruitment.position).map(eachPosition => (
                  <div>{eachPosition}<br /></div>
                ))}
              </Table.Cell>
              <Table.Cell two wide>{recruitment.appointment}</Table.Cell>
              <Table.Cell two wide>{recruitment.status}</Table.Cell>
              <Table.Cell two wide>
                {actionButtonController(recruitment.status)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  </Segment.Group>
);

Recruitment.defaultProps = {
  recruitments: []
};

Recruitment.propTypes = {
  recruitments: PropTypes.array,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired
};

export default Recruitment;
