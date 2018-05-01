import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfileRequest } from '../../actions/profile';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Profile from '../../components/Profile';

class ProfilePage extends Component {
  componentDidMount() {
    const { id, fetchProfile } = this.props;
    fetchProfile(id);
  }

  render() {
    const { profile, onEditGeneralProfileClick } = this.props;
    return (
      <div>
        <Profile profile={profile} onEditGeneralProfileClick={onEditGeneralProfileClick} />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  id: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  onEditGeneralProfileClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  id: state.auth.id,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: id => dispatch(fetchProfileRequest(id)),
  onEditGeneralProfileClick: () => dispatch(openModal(modalNames.EDIT_GENERAL_PROFILE))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
