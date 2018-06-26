import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Grid, Dropdown, Input, Table } from 'semantic-ui-react';
import { compose, withState } from 'recompose';

const examCategoryOptions = (exams, subjectNoFilter, subjectFilter, subjectList) => {
  exams.forEach((element) => {
    subjectNoFilter.push(element.exCategory);
  });

  subjectFilter = [...new Set(subjectNoFilter)];

  subjectList.push({ text: 'all categories', value: 'all categories' });
  subjectFilter.forEach((element) => {
    subjectList.push({ text: element, value: element });
  });

  return subjectList;
};
examCategoryOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired,
  subjectFilter: PropTypes.array.isRequired,
  subjectList: PropTypes.array.isRequired
};

const examSubCategoryOptions = (exams, examCategory, subjectNoFilter, subjectFilter, subjectList) => {
  exams.forEach((element) => {
    if (element.exCategory.toLowerCase() === examCategory) {
      subjectNoFilter.push(element.exSubcategory);
    }
  });

  subjectFilter = [...new Set(subjectNoFilter)];

  subjectList.push({ text: 'all sub-categories', value: 'all sub-categories' });
  subjectFilter.forEach((element) => {
    subjectList.push({ text: element, value: element });
  });

  return subjectList;
};
examSubCategoryOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired,
  subjectFilter: PropTypes.array.isRequired,
  subjectList: PropTypes.array.isRequired,
  examCategory: PropTypes.string.isRequired
};

const renderQuestion = question => (
  <div dangerouslySetInnerHTML={{ __html: question }} />
);

const Exam = (({ onAddClick, onDeleteClick, onEditClick, onFilterChange, exams, examsFilter, disabled, setDisabled, category, setCategory }) => (
  <div>
    <Segment.Group raised>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Dropdown
              fluid
              selection
              options={examCategoryOptions(exams, [], [], [])}
              placeholder="-- Search Category --"
              onChange={(e, { value }) => {
                setDisabled(value === 'all categories' || value === '' || value === undefined);
                setCategory(value);
                onFilterChange('searchCategory', value);
              }}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown
              fluid
              selection
              placeholder="-- Search Sub-Category --"
              options={examSubCategoryOptions(exams, category, [], [], [])}
              disabled={disabled}
              onChange={(e, { value }) => {
                onFilterChange('searchSubCategory', value);
              }}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input icon="search" placeholder="Search question ..." onChange={(e, { value }) => onFilterChange('searchText', value)} />
          </Grid.Column>
          <Grid.Column width={5}>
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
              <Table.HeaderCell width={7}>Question</Table.HeaderCell>
              <Table.HeaderCell width={1}>Category</Table.HeaderCell>
              <Table.HeaderCell width={2}>Sub-Category</Table.HeaderCell>
              <Table.HeaderCell width={1}>Type</Table.HeaderCell>
              <Table.HeaderCell width={2}>Choice</Table.HeaderCell>
              <Table.HeaderCell width={2}>Answer</Table.HeaderCell>
              <Table.HeaderCell >&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{examsFilter.map(exam => (
            <Table.Row>
              <Table.Cell>
                <div>
                  {renderQuestion(exam.exQuestion)}
                </div>
              </Table.Cell>
              <Table.Cell>{exam.exCategory.charAt(0).toUpperCase().concat(exam.exCategory.slice(1))}</Table.Cell>
              <Table.Cell>{exam.exSubcategory.charAt(0).toUpperCase().concat(exam.exSubcategory.slice(1))}</Table.Cell>
              <Table.Cell>{exam.exType}</Table.Cell>
              <Table.Cell>{(exam.exChoice).map(choice => (
                <div>&#9679;{choice}</div>
              ))}
              </Table.Cell>
              <Table.Cell>{(exam.exAnswer).map(ans => (
                <div>&#9679;{ans}</div>
              ))}
              </Table.Cell>
              <Table.Cell textAlign="center" style={{ cursor: 'default' }}>
                <Button active circular icon="settings" color="blue" size="big" onClick={() => onEditClick(exams, exam)} style={{ cursor: 'pointer' }} />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button active circular icon="trash" color="red" size="big" onClick={() => onDeleteClick(exam.exId)} style={{ cursor: 'pointer' }} />
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
  examsFilter: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  setDisabled: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

const enhance = compose(withState('disabled', 'setDisabled', true), withState('category', 'setCategory', ''));

export default enhance(Exam);
