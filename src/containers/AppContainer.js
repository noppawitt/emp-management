import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from '../components/App';
import NavBarContainer from './NavBarContainer';

const mapStateToProps = state => ({
  auth: state.auth
});

const AppContainer = ({ auth, children }) => (
  <div>
    {auth.isAuthenticated && <NavBarContainer username={auth.username} />}
    <App>
      {children}
    </App>
  </div>
);

AppContainer.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    id: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  children: PropTypes.element.isRequired
};

export default withRouter(connect(mapStateToProps)(AppContainer));
