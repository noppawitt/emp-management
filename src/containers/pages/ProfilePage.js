import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchProfileRequest } from '../../actions/profile';
import { fetchMasterTableRequest } from '../../actions/masterTable';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Profile from '../../components/Profile';

const ProfilePage = ({ profile, onEditGeneralProfileClick }) => (
  <Profile profile={profile} onEditGeneralProfileClick={onEditGeneralProfileClick} />
);

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  onEditGeneralProfileClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  id: state.auth.id,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: id => dispatch(fetchProfileRequest(id)),
  onEditGeneralProfileClick: () => dispatch(openModal(modalNames.EDIT_GENERAL_PROFILE)),
  fetchMasterTable: () => dispatch(fetchMasterTableRequest())
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { id, fetchProfile, fetchMasterTable } = this.props;
      fetchProfile(id);
      fetchMasterTable();
    }
  })
);

export default enhance(ProfilePage);
