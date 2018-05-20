import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';

const AssetProfileBox = ({ assetsProfile, onEditClick, onAddClick }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            <Icon name="laptop" />
            <Header.Content>
              Asset
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column floated="right" computer={1} mobile={2}>
          <Icon name="add" link size="large" onClick={onAddClick} />
        </Grid.Column>
      </Grid>
    </Segment>
    {assetsProfile.map(p => (<ProfileBox
      key={p.id}
      lists={[
        { key: 'name', title: 'Name', value: p.name },
        { key: 'serialNumber', title: 'Serial No.', value: p.description },
        { key: 'status', title: 'Status', value: p.status },
        { key: 'description', title: 'Description', value: p.description },
      ]}
      onEditClick={() => onEditClick(p.id)}
    />))}
  </Segment.Group>
);

AssetProfileBox.propTypes = {
  assetsProfile: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onEditClick: id => dispatch(openModal(modalNames.EDIT_EDUCATION_PROFILE, { id })),
  onAddClick: id => dispatch(openModal(modalNames.ADD_EDUCATION_PROFILE, { id }))
});

export default connect(null, mapDispatchToProps)(AssetProfileBox);
