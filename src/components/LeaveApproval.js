import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Table, Grid, Pagination } from 'semantic-ui-react';
import PageHeader from './PageHeader';

const LeaveApproval = ({
  leaves,
  onAcceptClick,
  onRejectClick,
  currentPage,
  totalPages,
  handlePageChange,
  sortKey,
  direction,
  handleSort
}) => (
  <div>
    <PageHeader text="Leave Approval" icon="calendar check outline" />
    <Grid>
      <Grid.Row>
        <Segment.Group raised>
          <Segment>
            <Table fixed striped sortable selectable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell sorted={sortKey === 'name' ? direction : null} onClick={() => handleSort('name')}>Name</Table.HeaderCell>
                  <Table.HeaderCell sorted={sortKey === 'leaveType' ? direction : null} onClick={() => handleSort('leaveType')}>Leave type</Table.HeaderCell>
                  <Table.HeaderCell sorted={sortKey === 'leaveFrom' ? direction : null} onClick={() => handleSort('leaveFrom')}>From</Table.HeaderCell>
                  <Table.HeaderCell sorted={sortKey === 'leaveTo' ? direction : null} onClick={() => handleSort('leaveTo')}>To</Table.HeaderCell>
                  <Table.HeaderCell sorted={sortKey === 'purpose' ? direction : null} onClick={() => handleSort('purpose')}>Purpose</Table.HeaderCell>
                  <Table.HeaderCell sorted={sortKey === 'total' ? direction : null} onClick={() => handleSort('total')}>Total</Table.HeaderCell>
                  <Table.HeaderCell colSpan="2" />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {leaves.map(leave => (
                  <Table.Row key={`${leave.code}${leave.leaveFrom}${leave.leaveTo}${leave.leaveDate}`}>
                    <Table.Cell>{`${leave.userId} ${leave.name}`}</Table.Cell>
                    <Table.Cell>{leave.leaveType}</Table.Cell>
                    <Table.Cell>{leave.leaveFrom}</Table.Cell>
                    <Table.Cell>{leave.leaveTo}</Table.Cell>
                    <Table.Cell>{leave.purpose}</Table.Cell>
                    <Table.Cell>{leave.total}</Table.Cell>
                    <Table.Cell colSpan="2">
                      <Button color="green" onClick={() => onAcceptClick(leave)}>
                        Approve
                      </Button>
                      <Button color="red" onClick={() => onRejectClick(leave)}>
                        Reject
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="7">
                    <Pagination activePage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Segment>
        </Segment.Group>
      </Grid.Row>
    </Grid>
  </div>
);

LeaveApproval.propTypes = {
  leaves: PropTypes.array.isRequired,
  onAcceptClick: PropTypes.func.isRequired,
  onRejectClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired
};

export default LeaveApproval;
