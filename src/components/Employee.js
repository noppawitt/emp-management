import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Item, Segment, Input, Button, Icon, Select } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import history from '../history';
import { masterTableToOptions } from '../utils/helper';

const items = employee => (
  <Grid.Column width={8}>
    <Segment raised style={{ cursor: 'pointer' }} onClick={() => history.push(`/profile/${employee.id}`)}>
      <Item.Group>
        <Item>
          <Item.Image size="small" src={employee.picture} />
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

const Employee = ({ employees, onChange, onClick, departments, onDepartmentChange, filter, departmentId }) => (
  <div>
    <PageHeader icon="users" text="Employee" />
    <Segment.Group>
      <Segment>
        <Input icon="search" placeholder="Search employees..." defaultValue={filter} onChange={onChange} />
        <Select placeholder="Department" defaultValue={departmentId} options={[{ key: 'all', value: 0, text: 'All' }, ...masterTableToOptions(departments)]} onChange={onDepartmentChange} />
        <Button icon labelPosition="left" color="blue" floated="right" onClick={onClick}>
          <Icon name="add user" />
          Add new employee
        </Button>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={16}>
            <Grid columns={2}>
              {employees.map(employee => items(employee))}
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  </div>
);

Employee.propTypes = {
  employees: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  onDepartmentChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  departmentId: PropTypes.number.isRequired
};

export default Employee;
