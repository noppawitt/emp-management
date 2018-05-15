import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import defaultProfileImage from '../images/profile.jpg';

const Employee = () => (
  <div>
    <PageHeader icon="users" text="Employee" />
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
  </div>
);

export default Employee;
