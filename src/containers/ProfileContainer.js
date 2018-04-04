import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProfileRequest } from '../actions/profile';
import Profile from '../components/Profile';

class ProfileContainer extends Component {
  componentDidMount() {
    const { id, fetchProfile } = this.props;
    fetchProfile(id);
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <Profile profile={profile} />
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  id: PropTypes.number.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  id: state.auth.id,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: id => dispatch(fetchProfileRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
