import React from 'react';
import Proptypes from 'prop-types';
import { Segment, Table, Input } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate } from 'react-day-picker/moment';

const ViewResultOverall = ({
  eprList,
  handleSort,
  sortKey,
  direction,
  startDate,
  endDate,
  onSearchChange,
  onStartDateChange,
  onEndDateChange }) => (
    <Segment raised>
      <h2>Overall exam results</h2>
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
      <Table striped selectable celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="one wide center aligned">#</Table.HeaderCell>
            <Table.HeaderCell className="one wide" sorted={sortKey === 'category' ? direction : null} onClick={() => handleSort('category')}>Category</Table.HeaderCell>
            <Table.HeaderCell className="one wide" sorted={sortKey === 'subCategory' ? direction : null} onClick={() => handleSort('subCategory')}>Sub-Category</Table.HeaderCell>
            <Table.HeaderCell className="one wide" sorted={sortKey === 'type' ? direction : null} onClick={() => handleSort('type')}>Type</Table.HeaderCell>
            <Table.HeaderCell className="one wide" sorted={sortKey === 'requireNumber' ? direction : null} onClick={() => handleSort('requireNumber')}>Require Number</Table.HeaderCell>
            <Table.HeaderCell className="two wide" sorted={sortKey === 'date' ? direction : null} onClick={() => handleSort('date')}>Submitted Date<br />Graded Date</Table.HeaderCell>
            <Table.HeaderCell className="one wide" sorted={sortKey === 'points' ? direction : null} onClick={() => handleSort('points')}>Points</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {eprList.map((row, i) => (
            <Table.Row>
              <Table.Cell className="one wide center aligned">{i + 1}</Table.Cell>
              <Table.Cell className="one wide">{row.category}</Table.Cell>
              <Table.Cell className="one wide">{row.subCategory}</Table.Cell>
              <Table.Cell className="one wide">{row.type}</Table.Cell>
              <Table.Cell className="one wide">{row.requiredNumber}</Table.Cell>
              <Table.Cell className="two wide">{row.submitDate}<br />{row.gradeDate}</Table.Cell>
              <Table.Cell className="one wide">{row.points}</Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table>
    </Segment>
);

ViewResultOverall.propTypes = {
  eprList: Proptypes.array.isRequired,
  handleSort: Proptypes.func.isRequired,
  direction: Proptypes.string.isRequired,
  sortKey: Proptypes.string.isRequired,
  onSearchChange: Proptypes.func.isRequired,
  onStartDateChange: Proptypes.func.isRequired,
  onEndDateChange: Proptypes.func.isRequired,
  startDate: Proptypes.string.isRequired,
  endDate: Proptypes.string.isRequired,
};

export default ViewResultOverall;
