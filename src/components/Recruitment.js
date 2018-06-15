import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Table, Menu, Grid, Select } from 'semantic-ui-react';

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
for (let y = 2018; y <= 2028; y += 1) {
  years.push({ key: y, value: y, text: y });
}

const Recruitment = (/*{ recruitment }*/) => (
// const Recruitment = ({ recruitment }) => (
  <Segment.Group raised>
    <Segment>
      <Grid>
        <Grid.Column width={3}>
          <Select placeholder="Year" option={years} />
        </Grid.Column>
        <Grid.Column width={3}>
          <Select placeholder="Month" option={months} />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>HC-header-cell-1</Table.HeaderCell>
            <Table.HeaderCell>HC-header-cell-2</Table.HeaderCell>
            <Table.HeaderCell>HC-header-cell-3</Table.HeaderCell>
            <Table.HeaderCell>HC-header-cell-4</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* {recruitment.map(recruitments => (
            <Table.Row key={recruitments.id}>
              <Table.Cell>{recruitments.value1}</Table.Cell>
              <Table.Cell>{recruitments.value2}</Table.Cell>
              <Table.Cell>{recruitments.value3}</Table.Cell>
              <Table.Cell>{recruitments.value4}</Table.Cell>
            </Table.Row>
          ))} */}
          <Table.Row>
            <Table.Cell>HC-row-1-cell-1</Table.Cell>
            <Table.Cell>HC-row-1-cell-2</Table.Cell>
            <Table.Cell>HC-row-1-cell-3</Table.Cell>
            <Table.Cell>HC-row-1-cell-4</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>HC-row-2-cell-1</Table.Cell>
            <Table.Cell>HC-row-2-cell-2</Table.Cell>
            <Table.Cell>HC-row-2-cell-3</Table.Cell>
            <Table.Cell>HC-row-2-cell-4</Table.Cell>
          </Table.Row>
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
        </Table.Body>
      </Table>
    </Segment>
    <Segment>
      <Button>HardCode</Button>
    </Segment>
  </Segment.Group>
);

Recruitment.propTypes = {
  recruitments: PropTypes.array.isRequired
};

export default Recruitment;
