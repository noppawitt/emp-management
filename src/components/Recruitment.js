import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, /* Menu, Icon, */ Table, Grid, Select } from 'semantic-ui-react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const months = [
  { key: 0, value: 0, text: 'All' },
  { key: 1, value: 1, text: 'January' },
  { key: 2, value: 2, text: 'Fabuary' },
  { key: 3, value: 3, text: 'March' },
  { key: 4, value: 4, text: 'April' },
  { key: 5, value: 5, text: 'May' },
  { key: 6, value: 6, text: 'June' },
  { key: 7, value: 7, text: 'July' },
  { key: 8, value: 8, text: 'August' },
  { key: 9, value: 9, text: 'September' },
  { key: 10, value: 10, text: 'October' },
  { key: 11, value: 11, text: 'Novemver' },
  { key: 12, value: 12, text: 'December' },
];

const years = [{ key: 0, value: 0, text: 'All' }];
// declare rangeYear for modify-able in the future
const rangeYear = 5;
const currentYear = new Date().getFullYear();
for (let y = currentYear; y <= currentYear + rangeYear; y += 1) {
  years.push({ key: y, value: y, text: y });
}

// hgihgig
const test = (status) => {
  switch (status) {
    case 'Pending':
      return <Button className="primary">Start</Button>;
    case 'Complete':
      return <Button className="primary">View Result</Button>;
    case 'In Progress':
      return <Button className="primary disabled">Start</Button>;
    default:
      return <Button className="primary disabled">Error</Button>;
  }
};

// const Recruitment = ({ recruitments, onYearChange, onMonthChange }) => {
const Recruitment = ({ recruitments }) => (
  <Segment.Group raised>
    <Segment>
      <Grid>
        <Grid.Column width={3}>
          <Select placeholder="Year" options={years} /* onYearChange={yearChange} */ />
        </Grid.Column>
        <Grid.Column width={3}>
          <Select placeholder="Month" options={months} /* onMonthChange={monthChange} */ />
        </Grid.Column>
        <Grid.Column width={5}>
          {/* <DateRangePicker small showClearDates /* onDateChange={onDateChange} */ /> */}
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Table className="striped selectable celled">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="one wide center aligned">#</Table.HeaderCell>
            <Table.HeaderCell className="three wide">Name</Table.HeaderCell>
            <Table.HeaderCell className="two wide">Position</Table.HeaderCell>
            <Table.HeaderCell className="two wide">Appointment</Table.HeaderCell>
            <Table.HeaderCell className="two wide">Status</Table.HeaderCell>
            <Table.HeaderCell className="three wide" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {recruitments.map((recruitment, i) => (
            <Table.Row key={recruitment.userId}>
              <Table.Cell className="one wide center aligned">{i + 1}</Table.Cell>
              <Table.Cell className="three wide">
                {recruitment.firstName} {recruitment.lastName}<br />
                {recruitment.firstNameTh !== '' ? <div>{recruitment.firstNameTh} {recruitment.lastNameTh}<br /></div> : ''}
              </Table.Cell>
              <Table.Cell className="two wide">
                {(recruitment.position).map(eachPosition => (
                  <div>{eachPosition}<br /></div>
                ))}
              </Table.Cell>
              <Table.Cell className="two wide">{recruitment.appointment}</Table.Cell>
              <Table.Cell className="two wide">{recruitment.status}</Table.Cell>
              <Table.Cell className="three wide center aligned">
                {test(recruitment.status)}
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
  recruitments: PropTypes.array
};

export default Recruitment;
