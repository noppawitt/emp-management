import React from 'react';
import PropTypes from 'prop-types';
// import Modal from '../../components/modal';
import {
  Segment,
  Grid,
  Container,
  Pagination,
  Icon,
  Form,
  Radio,
  Checkbox,
  Button,
  TextArea,
  Header,
  Menu,
} from 'semantic-ui-react';

const questionRenderer = question => (
  <div dangerouslySetInnerHTML={{ __html: question }} />
);

const categoryLengthCalculate = (examList, activeCategory) => {
  let pageNumber = 0;
  for (let i = 0; i < examList.length; i += 1) {
    pageNumber += (examList[i].exCategory === activeCategory) ? 1 : 0;
  }
  return pageNumber;
};

const filterExam = (examList, activeCategory) => {
  const filter = [];
  for (let i = 0; i < examList.length; i += 1) {
    if (examList[i].exCategory === activeCategory) {
      filter.push(examList[i]);
    }
  }
  return filter;
};

const TakeExam = ({
  examList,
  currentActivePage,
  onPageChange,
  activeCategory,
  pickedAnswer,
  answerList,
  onClickRadio,
  onClickCheckbox,
  onInputTextArea,
  onClickSave,
  onClickSubmit,
  exId,
  id,
  onClickCheckProgress,
  onClickCategory,
  categoryList, }) =>
  (
    <div>
      <br />
      <Segment.Group raised>
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item name="Category Menu" />
              {categoryList && categoryList.map(category => (
                <Menu.Item
                  name={category[0]}
                  active={activeCategory === category[0]}
                  onClick={() => { console.log(category[0]); onClickCategory(category[0]); }}
                />
              ))}
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
            <Segment>
              <Grid>
                <Grid.Column width={14}>
                  <Header as="h1">Category : {activeCategory.charAt(0).toUpperCase().concat(activeCategory.slice(1))}</Header>
                </Grid.Column>
                <Grid.Column width={2}>
                  <Container textAlign="right"><Header as="h1">Timer</Header></Container>
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment>
              {filterExam(examList, activeCategory).length > 0 && filterExam(examList, activeCategory).map((row, i) => (
                i === currentActivePage - 1 ?
                  <Form>
                    <h1>Question {currentActivePage} of {filterExam(examList, activeCategory).length}</h1>{questionRenderer(row.exQuestion)}<br />
                    {row.exType === 'Choices' && row.exChoice.map(answer => (
                      row.exAnswerLength === 1 ?
                        <Form.Field>
                          <p>
                            <Radio
                              label={answer}
                              value={answer}
                              checked={pickedAnswer.includes(answer)}
                              onClick={(e, { value }) => {
                                onClickRadio(value, currentActivePage, pickedAnswer, exId);
                              }}
                            />
                          </p>
                        </Form.Field> :
                        <Form.Field>
                          <p>
                            <Checkbox
                              label={answer}
                              value={answer}
                              checked={pickedAnswer.includes(answer)}
                              onClick={(e, { value }) => {
                                onClickCheckbox(value, currentActivePage, pickedAnswer, exId);
                              }}
                            />
                          </p>
                        </Form.Field>
                    ))}
                    {row.exType !== 'Choices' &&
                      <Form.Field>
                        <TextArea
                          value={pickedAnswer[0]}
                          placeholder="Type the answer here.."
                          onInput={(e, { value }) => {
                            onInputTextArea(value, currentActivePage, exId);
                          }}
                        />
                      </Form.Field>
                    }
                  </Form> : ''
              ))}
              {!examList && (
                <h1>Fetch fail somewhere!</h1>
              )}
            </Segment>
            <Segment>
              <Button
                icon
                labelPosition="left"
                color="green"
                onClick={() => onClickCheckProgress(id)}
              >
                <Icon name="search" />
                Check
              </Button>
              <Button
                icon
                labelPosition="left"
                primary
                onClick={() => onClickSave(id, answerList)}
              >
                <Icon name="save" />
                Save
              </Button>
              <Button
                icon
                labelPosition="left"
                secondary
                onClick={() => onClickSubmit(id, answerList)}
              >
                <Icon name="send" />
                Submit
              </Button>
              <Pagination
                onPageChange={(e, { activePage }) => onPageChange(activePage)}
                floated="right"
                defaultActivePage={1}
                activePage={currentActivePage}
                boundaryRange={1}
                siblingRange={0}
                ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={categoryLengthCalculate(examList, activeCategory)}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    </div>
  );

TakeExam.propTypes = {
  examList: PropTypes.array.isRequired,
  currentActivePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  pickedAnswer: PropTypes.array.isRequired,
  answerList: PropTypes.array.isRequired,
  onClickRadio: PropTypes.func.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  onInputTextArea: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  exId: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onClickCheckProgress: PropTypes.func.isRequired,
  onClickCategory: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
};

export default TakeExam;
