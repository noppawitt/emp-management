import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Grid, Dropdown, Input, Table } from 'semantic-ui-react';

const examTypeOptions = (exams, subjectNoFilter) => {
  subjectNoFilter.push({ text: 'all subjects', value: 'all subjects' });

  exams.forEach((element) => {
    subjectNoFilter.push({ text: element.exType, value: element.exType });
  });

  return [...new Set(subjectNoFilter)];
};
examTypeOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired
};

const Exam = (({ onClick, exams }) => (
  <div>
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Dropdown fluid selection options={examTypeOptions(exams, [])} placeholder="-- Select Subject --" />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input icon="search" placeholder="Search question ..." />
          </Grid.Column>
          <Grid.Column width={9}>
            <Button icon labelPosition="left" floated="right" color="blue" onClick={onClick}>
              <Icon name="add" />
              Add new question
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Table striped selectable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Choice</Table.HeaderCell>
              <Table.HeaderCell>Answer</Table.HeaderCell>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{exams.map(exam => (
            <Table.Row>
              <Table.Cell>{(exam.exQuestion.split('<br />')).map(choice => (
                <div>{choice}</div>
              ))}
              </Table.Cell>
              <Table.Cell>{exam.exType}</Table.Cell>
              <Table.Cell>{(exam.exChoices).map(choice => (
                <div>{choice}</div>
              ))}
              </Table.Cell>
              <Table.Cell>{(exam.exAnswer).map(ans => (
                <div>{ans}</div>
              ))}
              </Table.Cell>
              <Table.Cell>WAIT !!!</Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
      </Segment>
    </Segment.Group>
  </div>
));

Exam.propTypes = {
  onClick: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired
};

export default Exam;
