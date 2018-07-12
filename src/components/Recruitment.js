import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Input, Table } from 'semantic-ui-react';
import { formatDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const actionButtonController = (status, id, onClickActivate, onClickGrade, onClickViewResult, isToday) => {
  switch (status) {
    case 'Wait for Grading':
      return <Button onClick={() => onClickGrade(id)} fluid color="teal">Grade</Button>;
    case 'Pending':
      return <Button onClick={() => onClickActivate(id)} disabled={!isToday} fluid primary>Activate</Button>;
    case 'Complete':
      return <Button onClick={() => onClickViewResult(id)} fluid primary positive>View Result</Button>;
    case 'In Progress':
      return <Button fluid disabled>Pending</Button>;
    default:
      return <Button fluid negative disabled>Error</Button>;
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
  onClickActivate,
  onClickGrade,
  onClickViewResult,
  today, }) => (
    <Segment.Group raised>
      <Segment className="horizontal segments">
        <Segment>
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
                  {actionButtonController(recruitment.status, recruitment.citizenId, onClickActivate, onClickGrade, onClickViewResult, recruitment.appointment === today)}
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
  onClickGrade: PropTypes.func.isRequired,
  onClickViewResult: PropTypes.func.isRequired,
  today: PropTypes.string.isRequired,
};

export default Recruitment;
