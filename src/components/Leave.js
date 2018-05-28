import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Table, Menu } from 'semantic-ui-react';

const Leave = ({ leaves }) => (
  <Segment.Group raised>
    <Segment>
      <Button icon floated="right">
        <Icon name="add" />
      </Button>
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
            <Table.Row key={leave.id} style={{ cursor: 'pointer' }}>
              <Table.Cell>{leave.leaveType}</Table.Cell>
              <Table.Cell>{leave.leaveFrom}</Table.Cell>
              <Table.Cell>{leave.leaveTo}</Table.Cell>
              <Table.Cell>{leave.purpose}</Table.Cell>
              <Table.Cell>{leave.total}</Table.Cell>
              <Table.Cell>{leave.status}</Table.Cell>
              <Table.Cell>Cancel</Table.Cell>
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
);

Leave.propTypes = {
  leaves: PropTypes.array.isRequired
};

export default Leave;
