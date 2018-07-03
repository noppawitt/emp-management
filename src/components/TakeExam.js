import React from 'react';
import PropTypes from 'prop-types';
// import Modal from '../../components/modal';
import { Segment, Grid, Container } from 'semantic-ui-react';

const questionRenderer = item => (
  <div dangerouslySetInnerHTML={{ __html: item.exQuestion }} />
);

const TakeExam = ({
  examList, }) =>
  (
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={12}>
            <h1>Category Name</h1>
            <h3>Sub Category Name</h3>
          </Grid.Column>
          <Grid.Column width={2}>
            <Container textAlign="right"><h2>Timer</h2></Container>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        {examList && examList.map(row => (
          <Segment>
            ID: {row.exId}<br />
            Category: {row.exCategory}<br />
            Sub-Category: {row.exSubcategory}<br />
            Exam Type: {row.exType}<br />
            Question: {questionRenderer(row.exQuestion)}<br />
            {row.exType === 'Choices' && <div>Choice: {row.exChoice}</div>}<br />
            {row.exType === 'Choices' && <div>Choice: {row.answer}</div>}<br />
          </Segment>
        ))}
        {!examList && (
          <h1>Fetch fail somewhere!</h1>
        )}
      </Segment>
    </Segment.Group>
  );

TakeExam.propTypes = {
  examList: PropTypes.array.isRequired,
};

export default TakeExam;
