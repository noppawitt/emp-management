import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Menu, Segment, Image } from 'semantic-ui-react';
import Header from './Header';
import image from '../images/image.png';

const Profile = ({ profile }) => (
  <div>
    <Header icon="user" text="Profile" />
    <Grid>
      <Grid.Column width={4}>
        <Menu fluid vertical tabular>
          <Menu.Item name="General" />
          <Menu.Item name="Work" />
          <Menu.Item name="Education" />
          <Menu.Item name="Assets" />
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={12}>
        <Image src={image} size="medium" centered />
        <Segment>
          Name: {profile.name}
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profile;
