import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Grid, Dropdown, Input, Table } from 'semantic-ui-react';

const examTypeOptions = (exams, subjectNoFilter, subjectFilter, subjectList) => {
  exams.forEach((element) => {
    subjectNoFilter.push(element.exCategory);
  });

  subjectFilter = [...new Set(subjectNoFilter)];

  subjectList.push({ text: 'all subjects', value: 'all subjects' });
  subjectFilter.forEach((element) => {
    subjectList.push({ text: element, value: element });
  });

  return subjectList;
};
examTypeOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired,
  subjectFilter: PropTypes.array.isRequired,
  subjectList: PropTypes.array.isRequired
};

const Exam = (({ onAddClick, onDeleteClick, onEditClick, onFilterChange, exams, examsFilter }) => (
  <div>
    <Segment.Group raised>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Dropdown fluid selection options={examTypeOptions(exams, [], [], [])} placeholder="-- Search Subject --" onChange={(e, { value }) => onFilterChange('searchType', value)} />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input icon="search" placeholder="Search question ..." onChange={(e, { value }) => onFilterChange('searchText', value)} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Button icon labelPosition="left" floated="right" color="blue" onClick={onAddClick}>
              <Icon name="add" />
              Add new question
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Table striped selectable celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Choice</Table.HeaderCell>
              <Table.HeaderCell>Answer</Table.HeaderCell>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{examsFilter.map(exam => (
            <Table.Row>
              <Table.Cell>{(exam.exQuestion.split('<br />')).map(choice => (
                <div>{choice}</div>
              ))}
              </Table.Cell>
              <Table.Cell>{exam.exCategory.charAt(0).toUpperCase().concat(exam.exCategory.slice(1))}</Table.Cell>
              <Table.Cell>{exam.exType}</Table.Cell>
              <Table.Cell>{(exam.exChoice).map(choice => (
                <div>{choice}</div>
              ))}
              </Table.Cell>
              <Table.Cell>{(exam.exAnswer).map(ans => (
                <div>{ans}</div>
              ))}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button active circular icon="settings" color="blue" size="big" onClick={() => onEditClick(exams, exam)} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button active circular icon="trash" color="red" size="big" onClick={() => onDeleteClick(exam.exId)} />
              </Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
      </Segment>
    </Segment.Group>
  </div>
));

Exam.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired,
  examsFilter: PropTypes.array.isRequired
};

export default Exam;
