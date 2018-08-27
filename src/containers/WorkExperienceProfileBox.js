import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Segment, Header, Icon } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { deleteProfileRequest } from '../actions/profile';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';

const WorkExperienceProfileBox = ({ workExperienceProfile, onAddClick, onDeleteClick }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            <Icon name="history" />
            <Header.Content>
              Work Experience
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column floated="right" computer={1} mobile={2}>
          <Icon name="add" link size="large" onClick={onAddClick} />
        </Grid.Column>
      </Grid>
    </Segment>
    {workExperienceProfile.map(p => (<ProfileBox
      title="Work"
      icon="suitcase"
      lists={[
        { key: 'company', title: 'Company', value: p.company },
        { key: 'position', title: 'Position', value: p.position },
        { key: 'duration', title: 'Duration', value: p.duration },
        { key: 'description', title: 'Description', value: p.description }
      ]}
      deleted
      onDeleteClick={() => onDeleteClick(p.id)}
    />))}
  </Segment.Group>
);

WorkExperienceProfileBox.defaultProps = {
  workExperienceProfile: null
};

WorkExperienceProfileBox.propTypes = {
  workExperienceProfile: PropTypes.object,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  can: state.accessControl.can
});

const mapDispatchToProps = dispatch => ({
  onAddClick: () => dispatch(openModal(modalNames.ADD_WORK_EXPERIENCE_PROFILE)),
  onDeleteClick: profileId => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete work experience profile ?',
    onConfirm: () => dispatch(deleteProfileRequest('workExperiences', profileId))
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperienceProfileBox);
