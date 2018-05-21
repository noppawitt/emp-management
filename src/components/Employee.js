import React from 'react';
<<<<<<< HEAD
import { Grid, Item, Segment } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';

const items = () => (
  <Item>
    <Item.Image size="small" src={image} />
    <Item.Content >
      <Item.Header ><br /><br />Phatchara Chokdurong [J]</Item.Header>
      <Item.Description > Tel. 088-498-1908</Item.Description>
      <Item.Description > Email : j_pcr@hotmail.com</Item.Description>
    </Item.Content>
  </Item>
);
const Employee = () => (
  <div>
    <PageHeader icon="users" text="Employee" />
    <div>
      <Grid columns={2} textAlign="left" >
        <Grid.Column width={7} >
          <Segment raised>
            <Item.Group>
              {items()}
            </Item.Group>
          </Segment>
        </Grid.Column >
        <Grid.Column width={7} >
          <Segment raised>
            <Item.Group>
              {items()}
            </Item.Group>
          </Segment>
        </Grid.Column >
        <Grid.Column width={7} >
          <Segment raised>
            <Item.Group>
              {items()}
            </Item.Group>
          </Segment>
        </Grid.Column >
        <Grid.Column width={7} >
          <Segment raised>
            <Item.Group>
              {items()}
            </Item.Group>
          </Segment>
        </Grid.Column >
        <Grid.Column width={7} >
          <Segment raised>
            <Item.Group>
              {items()}
            </Item.Group>
          </Segment>
        </Grid.Column >
      </Grid>
    </div>
=======
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
>>>>>>> c7cbf2c00f80d12862c134f00c736aaa11b2012b
  </div>
);

Employee.propTypes = {
  employees: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Employee;
