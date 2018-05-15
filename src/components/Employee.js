import React from 'react';
import { Card, Icon, Grid, Image, Item, Label, Row, Container, Segment} from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';

const ImageExampleCircular = () => (
  <Image src={image} size="medium" circular />
);

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
      <Grid>
        <Grid.Row >
          <Grid columns={2} textAlign="left" >
            <Grid.Row >
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
            </Grid.Row>

            <Grid.Row>
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
            </Grid.Row>

            <Grid.Row >
              <Grid.Column width={7} >
                <Segment raised>
                  <Item.Group>
                    {items()}
                  </Item.Group>
                </Segment>
              </Grid.Column >
            </Grid.Row>
          </Grid>
        </Grid.Row >
      </Grid>
      {/* <Card image={ImageExampleCircular()} header="Elliot Baker" meta="Friend' description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat." /> */}
      {/* {ImageExampleCircular()} */}
      {/* <Item.Group>
        {items()}
      </Item.Group> */}
    </div>
  </div>
);


export default Employee;
