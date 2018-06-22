import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import ExamSideBarContainer from '../containers/ExamSideBarContainer';
import ModalContainer from '../containers/ModalContainer';

const ExamApp = ({ children }) => (
  <div>
    <br />
    <ExamSideBarContainer />
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
