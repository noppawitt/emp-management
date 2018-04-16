import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Icon, Modal, Image, Header, Form } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import image from '../images/cat.jpg';

// const left = {
//   float: 'left'
// };

const right = {
  float: 'right'
};

const displayInfo = infos => Object.keys(infos).map(key => (
  <tr>
    <td style={{ 'padding-right': '40px', 'padding-top': '5px' }}>{key}</td>
    <td>{infos[key]}</td>
  </tr>
));

const work = {
  position: 'Developer',
  department: 'IT',
  level: '1',
  contract: 'Full-time',
  startdate: '01-01-2018',
  probationdate: '01-01-2018',
  boss: 'Noppawit Thairungroj'
};

const education = {
  university: 'Chulalongkorn University',
  faculty: 'Engineering',
  major: 'Computer Engineering',
  gpa: '4.00',
  honor: 'First honor',
  graduatedate: '01-01-2018'
};

const certification = {
  toiec: '990'
};

const asset = {
  ownasset: 'Macbook Pro Mid 2017'
};

const Profile = ({ profile }) => (
  <div>
    <PageHeader icon="user" text="Profile" />
    <Grid centered>
      <Grid.Column width={12}>
        <Segment raised size="large" textAlign="center" loading={profile.isFetching}>
          <Header as="h3">
            <Modal dimmer="blurring" size="small" closeIcon trigger={<Icon name="edit" link style={right} />}>
              <Modal.Header>
                Edit profile
              </Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Form>
                    <Form.Field>
                      <label>First Name</label>
                      <input placeholder="First Name" />
                    </Form.Field>
                  </Form>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Header>
          <Image src={image} size="small" circular centered />
          <h2>{profile.firstName} {profile.lastName} ({profile.nickName})</h2>
          <h4>CitizenId: {profile.citizenId}</h4>
          <h4>Mobile: {profile.mobileNo}</h4>
          <h4>Email: {profile.email}</h4>
          <h4>Facebook: {profile.facebook}</h4>
          <h4>Line: {profile.lineId}</h4>
        </Segment>
        <Segment raised size="large">
          <Header as="h3" textAlign="left">
            Work
            <Icon name="edit" link style={right} />
          </Header>
          {displayInfo(work)}
        </Segment>
        <Segment raised size="large">
          <Header as="h3" textAlign="left">
            Education
            <Icon name="edit" link style={right} />
          </Header>
          {displayInfo(education)}
        </Segment>
        <Segment raised size="large">
          <Header as="h3" textAlign="left">
            Certification
            <Icon name="edit" link style={right} />
          </Header>
          {displayInfo(certification)}
        </Segment>
        <Segment raised size="large">
          <Header as="h3" textAlign="left">
            Asset
            <Icon name="edit" link style={right} />
          </Header>
          {displayInfo(asset)}
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profile;
