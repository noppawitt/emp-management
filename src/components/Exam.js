import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Grid } from 'semantic-ui-react';
import { Switch, Route, Link } from 'react-router-dom';

const HeadExam = (({ subject }) => {
  if (subject === 'english') {
    return [
      <Link to="/exam/english/"><Button primary>ENGLISH</Button></Link>,
      <Link to="/exam/logic/"><Button secondary>LOGIC</Button></Link>,
      <Link to="/exam/skill/"><Button secondary>SKILL</Button></Link>
    ];
  }
  else if (subject === 'logic') {
    return [
      <Link to="/exam/english/"><Button secondary>ENGLISH</Button></Link>,
      <Link to="/exam/logic/"><Button primary>LOGIC</Button></Link>,
      <Link to="/exam/skill/"><Button secondary>SKILL</Button></Link>
    ];
  }
  return [
    <Link to="/exam/english/"><Button secondary>ENGLISH</Button></Link>,
    <Link to="/exam/logic/"><Button secondary>LOGIC</Button></Link>,
    <Link to="/exam/skill/"><Button primary>SKILL</Button></Link>
  ];
});
HeadExam.propTypes = {
  subject: PropTypes.string.isRequired
};

const Exam = (({ onClick /* , exams */ }) => (
  <div>
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={6}>
            <Switch>
              <Route exact path="/exam/english/" render={() => <HeadExam subject="english" />} />
              <Route exact path="/exam/logic/" render={() => <HeadExam subject="logic" />} />
              <Route exact path="/exam/skill/" render={() => <HeadExam subject="skill" />} />
              <Route render={() => <HeadExam subject="english" />} />
            </Switch>
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
