import React from 'react';
// import PropTypes from 'prop-types';
import { Segment, /* Button, */ Icon, Table, Menu, Grid, Select } from 'semantic-ui-react';

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

const rowsPerPageList = [
  { key: 0, value: 0, text: 'All' },
  { key: 1, value: 10, text: '10' },
  { key: 2, value: 20, text: '20' },
  { key: 3, value: 50, text: '50' },
  { key: 4, value: 100, text: '100' },
];

// hardcord for loop test
const tests = [
  {
    name: 'ชื่อ นามสกุล',
    position: [
      'ตำแหน่ง1',
      'ตำแหน่ง2'
    ]
  },
  {
    name: 'Adam Levine',
    position: [
      'mid',
      'feed',
      'support',
      'tank',
      'gank',
      'core',
      'nuke'
    ]
  },
  {
    name: 'narathip threetantipakorn',
    position: [
      'noob'
    ]
  },
];

const pageNumber = 1;

// const changeRowsPerPage = (newRowsPerPage) => {
//   this.setState({
//     rowPerPage: newRowsPerPage
//   });
// };

const Recruitment = (/* { recruitment } */) => (
  // const Recruitment = ({ recruitment }) => (
  <Segment.Group raised>
    <Segment>
      <Grid>
        <Grid.Column width={3}>
          <Select placeholder="Year" options={years} />
        </Grid.Column>
        <Grid.Column width={3}>
          <Select placeholder="Month" options={months} />
        </Grid.Column>
        <Grid.Column floated="right" width={3}>
          <Select className="fluid" placeholder="Rows per page" options={rowsPerPageList} /* onChange={changeRowsPerPage} */ />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Table className="selectable celled">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="one wide center aligned">#</Table.HeaderCell>
            <Table.HeaderCell className="four wide">Name</Table.HeaderCell>
            <Table.HeaderCell className="five wide">Position</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {/* for loop here */}
        <Table.Body>
          {tests.map((test, i) => (
            <Table.Row key={test.name}>
              {/* {console.log('>>>> ', this.state)} */}
              <Table.Cell className="one wide center aligned">{i + 1 /* + ((pageNumber - 1) * this.state.rowPerPage) */}</Table.Cell>
              <Table.Cell className="four wide">{test.name}</Table.Cell>
              <Table.Cell className="five wide">
                {(test.position).map(eachPosition => (
                  <div>{eachPosition}<br /></div>
                ))}
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
                <Menu.Item as="a" className="active">1</Menu.Item>
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

// Recruitment.propTypes = {
//   recruitments: PropTypes.array.isRequired
// };

export default Recruitment;
