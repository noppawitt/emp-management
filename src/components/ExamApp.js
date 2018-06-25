import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import ExamNavBarContainer from '../containers/ExamNavBarContainer';
import ModalContainer from '../containers/ModalContainer';

const ExamApp = ({ children }) => (
  <div>
    <ExamNavBarContainer />
    <Container>
      {children}
    </Container>
    <ModalContainer />
  </div>
);

ExamApp.propTypes = {
  children: PropTypes.element.isRequired
};

export default ExamApp;
