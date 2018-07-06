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
  categoryList,
  onClickCategory, }) =>
  (
    <div>
      <br />
      <Segment.Group raised>
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item name="Category 1 : TEST" active={1 > 0} />
              {categoryList && categoryList.map(category => (
                <Menu.Item name={category.category} active={activeCategory === category.category} onClick={() => onClickCategory(category.category)} />
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
              {examList && examList.map((row, i) => (
                i === currentActivePage - 1 ?
                  <Form>
                    <h1>Question {currentActivePage} of {examList.length}</h1>{questionRenderer(row.exQuestion)}<br />
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
              <Button color="green" icon labelPosition="left" onClick={() => onClickCheckProgress(id, activeCategory)}>
                <Icon name="search" />
                Check
              </Button>
              <Button primary icon labelPosition="left" onClick={() => onClickSave(id, activeCategory, answerList)}>
                <Icon name="save" />
                Save
              </Button>
              <Button secondary icon labelPosition="left" onClick={() => onClickSubmit(id, activeCategory, answerList)}>
                <Icon name="send" />
                Submit
              </Button>
              <Pagination
                onPageChange={(e, { activePage }) => onPageChange(activePage)}
                floated="right"
                defaultActivePage={1}
                boundaryRange={1}
                siblingRange={0}
                ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={examList.length}
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
  categoryList: PropTypes.array.isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

export default TakeExam;
