import React from 'react';
<<<<<<< HEAD
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
=======
import { Card, Image } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import defaultProfileImage from '../images/profile.jpg';
>>>>>>> 14d11850e817e274dcff16b44b40cf124bcb79e8

const Employee = () => (
  <div>
    <PageHeader icon="users" text="Employee" />
<<<<<<< HEAD
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
=======
    <Card.Group centered>
      <Card>
        <Image circular size="small" src={defaultProfileImage} />
        <Card.Content>
          <Card.Header>Phatchara Chokdurong</Card.Header>
          <Card.Meta>E-mail: j_pcr@hotmail.com</Card.Meta>
          <Card.Meta>Line: lnwjay</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Image src={defaultProfileImage} />
        <Card.Content>
          <Card.Header>Phatchara Chokdurong</Card.Header>
          <Card.Meta>E-mail: j_pcr@hotmail.com</Card.Meta>
          <Card.Meta>Line: lnwjay</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Image src={defaultProfileImage} />
        <Card.Content>
          <Card.Header>Phatchara Chokdurong</Card.Header>
          <Card.Meta>E-mail: j_pcr@hotmail.com</Card.Meta>
          <Card.Meta>Line: lnwjay</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Image src={defaultProfileImage} />
        <Card.Content>
          <Card.Header>Phatchara Chokdurong</Card.Header>
          <Card.Meta>E-mail: j_pcr@hotmail.com</Card.Meta>
          <Card.Meta>Line: lnwjay</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Image src={defaultProfileImage} />
        <Card.Content>
          <Card.Header>Phatchara Chokdurong</Card.Header>
          <Card.Meta>E-mail: j_pcr@hotmail.com</Card.Meta>
          <Card.Meta>Line: lnwjay</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Image src={defaultProfileImage} />
        <Card.Content>
          <Card.Header>Phatchara Chokdurong</Card.Header>
          <Card.Meta>E-mail: j_pcr@hotmail.com</Card.Meta>
          <Card.Meta>Line: lnwjay</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Image src={defaultProfileImage} />
        <Card.Content>
          <Card.Header>Phatchara Chokdurong</Card.Header>
          <Card.Meta>E-mail: j_pcr@hotmail.com</Card.Meta>
          <Card.Meta>Line: lnwjay</Card.Meta>
        </Card.Content>
      </Card>
    </Card.Group>
>>>>>>> 14d11850e817e274dcff16b44b40cf124bcb79e8
  </div>
);


export default Employee;
