import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Grid } from 'semantic-ui-react';

const Exam = (({ onClick }) => (
  <div>
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={6}>
            test
          </Grid.Column>
          <Grid.Column width={10}>
            <Button icon labelPosition="left" floated="right" color="green" onClick={onClick}>
              <Icon name="add" />
              Add new question
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  </div>
));

Exam.propTypes = {
  onClick: PropTypes.func.isRequired,
  // exams: PropTypes.array.isRequired
};

export default Exam;
