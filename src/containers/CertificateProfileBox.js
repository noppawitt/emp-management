import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';

const CertificateProfileBox = ({ certificatesProfile, onEditClick, onAddClick }) => (
  <Segment.Group raised size="large">
    <Segment padded>
      <Grid>
        <Grid.Column>
          <Header as="h2">
            <Icon name="certificate" />
            <Header.Content>
              Certificate
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column floated="right" computer={1} mobile={2}>
          <Icon name="add" link size="large" onClick={onAddClick} />
        </Grid.Column>
      </Grid>
    </Segment>
    {certificatesProfile.map(p => (<ProfileBox
      key={p.id}
      lists={[
        { key: 'name', title: 'Name', value: p.name },
        { key: 'institute', title: 'Institute', value: p.institute },
        { key: 'score', title: 'Score', value: p.score },
        { key: 'description', title: 'Description', value: p.description },
      ]}
      onEditClick={() => onEditClick(p.id)}
    />))}
  </Segment.Group>
);

CertificateProfileBox.propTypes = {
  certificatesProfile: PropTypes.array.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onEditClick: id => dispatch(openModal(modalNames.EDIT_EDUCATION_PROFILE, { id })),
  onAddClick: () => dispatch(openModal(modalNames.ADD_CERTIFICATE_PROFILE))
});

export default connect(null, mapDispatchToProps)(CertificateProfileBox);
