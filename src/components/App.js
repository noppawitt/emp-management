import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const App = ({ children }) => (
  <Container>
    {children}
  </Container>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
