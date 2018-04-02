import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthenticatedComponent = ({ auth, ...props }) => (
    auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
  );
  const mapStateToProps = state => ({
    auth: state.auth
  });
  AuthenticatedComponent.propTypes = {
    auth: PropTypes.shape({
      isFetching: PropTypes.bool,
      isAuthenticated: PropTypes.bool,
      id: PropTypes.number,
      username: PropTypes.string,
    }).isRequired
  };
  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default withAuth;
