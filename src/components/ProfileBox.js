import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Header, Icon, List } from 'semantic-ui-react';

const ProfileBox = ({ title, icon, lists, onEditClick }) => (
  <Segment raised padded size="large">
    <Grid>
      <Grid.Column only="large screen" computer={3}>
        <Icon name={icon} size="huge" />
      </Grid.Column>
      <Grid.Column computer={8} mobile={14}>
        <Header size="large">{title}</Header>
        <Grid columns={2}>
          <Grid.Column>
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
                <List.Item key={l.key}>{l.value ? l.value : '-'}</List.Item>
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
  title: PropTypes.string,
  icon: PropTypes.string,
  lists: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired
};

ProfileBox.defaultProps = {
  title: null,
  icon: null,
};

export default ProfileBox;
