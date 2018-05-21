import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Icon, List } from 'semantic-ui-react';

const ProfileBox = ({ lists, onEditClick }) => (
  <Segment raised padded size="large">
    <Grid>
      <Grid.Column computer={15} mobile={14}>
        <Grid columns={2}>
          <Grid.Column computer={4} >
            <List>
              {lists.map(l => (
                <List.Item key={l.key}>
                  <List.Header>
                    {l.title}
                  </List.Header>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              {lists.map(l => (
                <List.Item key={l.key}>{l.value || '-'}</List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid>
      </Grid.Column>
      <Grid.Column floated="right" computer={1} mobile={2}>
        <Icon name="edit" link size="large" onClick={onEditClick} />
      </Grid.Column>
    </Grid>
  </Segment>
);

ProfileBox.propTypes = {
  lists: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired
};

export default ProfileBox;
