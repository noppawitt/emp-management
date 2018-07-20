import React from 'react';
import { Segment, Grid, Select, Button, Icon, Table, Menu } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import { getMonthOptions, getYearOptions } from '../utils/options';

const ManageLeave = () => (
  <div>
    <PageHeader text="Manage Leave" icon="envelope open" />
    <Segment.Group raised>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Select placeholder="Year" defaultValue="2018" options={getYearOptions()} />
          </Grid.Column>
          <Grid.Column width={3}>
            <Select placeholder="Month" defaultValue="07" options={getMonthOptions()} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Button icon labelPosition="left" floated="right" color="blue" >
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
              <Table.HeaderCell>Employee</Table.HeaderCell>
              <Table.HeaderCell>Leave type</Table.HeaderCell>
              <Table.HeaderCell>From</Table.HeaderCell>
              <Table.HeaderCell>To</Table.HeaderCell>
              <Table.HeaderCell>Purpose</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {/* {leaves.map(leave => (
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
            ))} */}
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
  </div>
);

export default ManageLeave;
