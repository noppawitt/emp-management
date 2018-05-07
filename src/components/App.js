import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import ModalContainer from '../containers/ModalContainer';

const App = ({ children }) => (
  <div>
    <Container>
      {children}
    </Container>
    <ModalContainer />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
