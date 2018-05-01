import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const App = ({ children }) => (
  <div>
    <Container>
      {children}
    </Container>
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
