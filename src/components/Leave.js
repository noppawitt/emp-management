import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Table, Menu, Grid, Select } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import ProgressBar from './ProgressBar';
import { getMonthOptions, getYearOptions } from  '../utils/options';

const Leave = ({ leaves, leaveHistory, onAddClick, onCancelClick, userId, fetchLeave, year, month }) => (
  <div>
    <PageHeader text="Leave Request" icon="envelope" />
    <Grid>
      <Grid.Row>
        <Grid.Column width={2} />
        <Grid.Column width={4}>
          <Segment style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
            <ProgressBar percent={leaveHistory.annualLeaveRemain} max={120} type="Annual" />
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
            <ProgressBar percent={leaveHistory.personalLeaveRemain} max={48} type="Personal" />
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
            <ProgressBar percent={leaveHistory.sickLeaveRemain} max={240} type="Sick" />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Segment.Group raised>
          <Segment>
            <Grid>
              <Grid.Column width={3}>
                <Select placeholder="Year" defaultValue={year} options={getYearOptions()} onChange={(e, { value }) => fetchLeave(userId, value, month)} />
              </Grid.Column>
              <Grid.Column width={3}>
                <Select placeholder="Month" defaultValue={month} options={getMonthOptions()} onChange={(e, { value }) => fetchLeave(userId, year, value)} />
              </Grid.Column>
              <Grid.Column width={10}>
                <Button icon labelPosition="left" floated="right" onClick={onAddClick} color="blue" >
                  <Icon name="add" />
                  Create New Leave Request
                </Button>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Table fixed striped selectable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Leave type</Table.HeaderCell>
                  <Table.HeaderCell>From</Table.HeaderCell>
                  <Table.HeaderCell>To</Table.HeaderCell>
                  <Table.HeaderCell>Purpose</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {leaves.map(leave => (
                  <Table.Row key={`${leave.leaveFrom}${leave.leaveTo}`}>
                    <Table.Cell>{leave.leaveType}</Table.Cell>
                    <Table.Cell>{leave.leaveFrom}</Table.Cell>
                    <Table.Cell>{leave.leaveTo}</Table.Cell>
                    <Table.Cell>{leave.purpose}</Table.Cell>
                    <Table.Cell>{leave.total}</Table.Cell>
                    <Table.Cell>{leave.status}</Table.Cell>
                    <Table.Cell> {leave.status !== 'Approve' &&
                      <Button animated="fade" style={{ borderStyle: 'solid', borderColor: '#FF0000', backgroundColor: 'white', borderWidth: '1px' }} onClick={() => onCancelClick(userId, leave)}>
                        <Button.Content visible><font color="#FF0000" >Cancel</font></Button.Content>
                        <Button.Content hidden > <Icon color="red" name="x" /> </Button.Content>
                      </Button> }
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="7">
                    <Menu floated="right" pagination>
                      <Menu.Item as="a" icon>
                        <Icon name="chevron left" />
                      </Menu.Item>
                      <Menu.Item as="a">1</Menu.Item>
                      <Menu.Item as="a">2</Menu.Item>
                      <Menu.Item as="a">3</Menu.Item>
                      <Menu.Item as="a">4</Menu.Item>
                      <Menu.Item as="a" icon>
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>
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

Leave.propTypes = {
  leaves: PropTypes.array.isRequired,
  leaveHistory: PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  fetchLeave: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired
};

export default Leave;
