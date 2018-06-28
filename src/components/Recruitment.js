import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Input, Table } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate } from 'react-day-picker/moment';
// import { formatDate, parseDate } from 'react-day-picker/moment';
import { Link } from 'react-router-dom';

// generate and query password to table temp user and set timeout for it
// const ActivateUser = (cid) => {
//   console.log(cid);
// };

// constant function for change status button
const actionButtonController = (status, cid, onClickActivate) => {
  switch (status) {
    // edit link
    case 'Wait for Grading':
      return <Button as={Link} to="/grade_exam" fluid color="teal">Grade</Button>;
    case 'Pending':
      return <Button onClick={() => onClickActivate(cid)} fluid primary>Activate</Button>;
    case 'Complete':
      return <Button as={Link} to="/view_result" fluid primary positive>View Result</Button>;
    case 'In Progress':
      return <Button fluid disabled>Pending</Button>;
    default:
      return <Button fluid primary negative disabled>Error</Button>;
  }
};

// const Recruitment = ({ recruitments, onSearchChange, handleSort, sortKey, direction }) => (
const Recruitment = ({
  recruitments,
  onSearchChange,
  handleSort,
  sortKey,
  direction,
  onStartDateChange,
  onEndDateChange,
  startDate,
  endDate,
  onClickActivate }) => (
    <Segment.Group raised>
      <Segment className="horizontal segments">
        <Segment>
          {/* <Button onClick={onActivateUser} /> */}
          <Input icon="search" placeholder="Search recruitments.." onChange={onSearchChange} />
        </Segment>
        <Segment>
          <DayPickerInput
            placeholder="From"
            value={startDate}
            onDayChange={value => onStartDateChange(formatDate(value, 'YYYY-MM-DD'))}
            clickUnselectsDay
          />
        </Segment>
        <Segment>
          <DayPickerInput
            placeholder="To"
            value={endDate}
            onDayChange={value => onEndDateChange(formatDate(value, 'YYYY-MM-DD'))}
          />
        </Segment>
      </Segment>
      <Segment>
        <Table fixed striped selectable celled sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="one wide center aligned">#</Table.HeaderCell>
              <Table.HeaderCell className="two wide" sorted={sortKey === 'citizenId' ? direction : null} onClick={() => handleSort('citizenId')}>Citizen ID</Table.HeaderCell>
              <Table.HeaderCell className="two wide" sorted={sortKey === 'name' ? direction : null} onClick={() => handleSort('name')}>Name</Table.HeaderCell>
              <Table.HeaderCell className="two wide" sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Position</Table.HeaderCell>
              <Table.HeaderCell className="two wide" sorted={sortKey === 'appointment' ? direction : null} onClick={() => handleSort('appointment')}>Appointment</Table.HeaderCell>
              <Table.HeaderCell className="two wide" sorted={sortKey === 'status' ? direction : null} onClick={() => handleSort('status')}>Status</Table.HeaderCell>
              <Table.HeaderCell className="two wide" />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {recruitments.map((recruitment, i) => (
              <Table.Row key={recruitment.citizenId}>
                <Table.Cell className="one wide center aligned">{i + 1}</Table.Cell>
                <Table.Cell className="two wide">{recruitment.citizenId}</Table.Cell>
                <Table.Cell className="two wide">
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
                <Table.Cell className="two wide">
                  {actionButtonController(recruitment.status, recruitment.citizenId, onClickActivate)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </Segment.Group>
);

Recruitment.propTypes = {
  recruitments: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onClickActivate: PropTypes.func.isRequired,
};

export default Recruitment;
