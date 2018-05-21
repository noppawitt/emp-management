import React from 'react';
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
  </div>
);


export default Employee;
