import React from 'react';
// import PropTypes from 'prop-types';
// import Modal from '../../components/modal';
import { Segment, /* Input, Button */ } from 'semantic-ui-react';
import NavBarContainer from '../containers/NavBarContainer';

const TakeExam = () => (
  <div>
    <NavBarContainer />
    <Segment.Group>
      <Segment>
        <div>Hello World!</div>
      </Segment>
      <Segment />
    </Segment.Group>
  </div>
);

export default TakeExam;
