import React from 'react';
import PropTypes from 'prop-types';
import NavBarContainer from '../containers/NavBarContainer';

const App = ({ auth, children }) => (
  <div>
    {auth.isAuthenticated && <NavBarContainer />}
    {children}
  </div>
);

App.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    id: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  children: PropTypes.element.isRequired
};

export default App;
