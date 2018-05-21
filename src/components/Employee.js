import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Item, Segment, Input } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';

const items = employee => (
  <Grid.Column width={7}>
    <Segment raised>
      <Item.Group>
        <Item>
          <Item.Image size="small" src={image} />
          <Item.Content>
            <Item.Header ><br /><br />{`${employee.firstName || '-'} ${employee.lastName || '-'} (${employee.nickName || '-'})`}</Item.Header>
            <Item.Description>{`Mobile No.: ${employee.mobileNumber || '-'}`}</Item.Description>
            <Item.Description>{`E-mail: ${employee.email || '-'}`}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  </Grid.Column>
);

const Employee = ({ employees, onChange }) => (
  <div>
    <PageHeader icon="users" text="Employee" />
    <Input placeholder="Search..." onChange={onChange} />
    <Grid columns={2} textAlign="left">
      {employees.map(employee => items(employee))}
    </Grid>
  </div>
);

Employee.propTypes = {
  employees: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Employee;
