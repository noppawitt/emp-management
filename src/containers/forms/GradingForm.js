import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Menu,
  Form,
  Radio,
  Checkbox,
  Pagination,
  Icon,
  TextArea,
} from 'semantic-ui-react';
import Loader from '../../components/Loader';
import { pageChange } from '../../actions/takeExam';

const questionRenderer = (question, subcategory) => (
  <div>
    <div dangerouslySetInnerHTML={{ __thml: question }} />
    <strong>(Topic: {subcategory.slice(0, 1).toUpperCase().concat(subcategory.slice(1))})</strong>
  </div>
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

const showAnswerCheckRadio = (exId, pickedAnswer, answer) => {
  for (let i = 0; i < pickedAnswer.length; i += 1) {
    if (pickedAnswer[i].question === exId && pickedAnswer[i].answer.includes(answer)) {
      return true;
    }
  }
  return false;
};

const showAnswerText = (exId, pickedAnswer) => {
  for (let i = 0; i < pickedAnswer.length; i += 1) {
    if (pickedAnswer[i].question === exId) {
      return pickedAnswer[i].answer[0];
    }
  }
  return undefined;
};

const GradingForm = ({
  id,
  isFetching,
  examList,
  currentActivePage,
  onPageChange,
  activeCategory,
  onClickCategory, }) => (
    isFetching ?
      <Loader /> :
      <Segment.Group>
        <Segment raised style={{ width: '95%', margin: 'auto' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
                <Menu fluid vertical tabular>
                  <Menu.Item header name="Category menu" />
                  {examList && examList.map(item => (
                    <Menu.Item
                      name={item[0]}
                      active={activeCategory === item[0]}
                      onClick={() => { onClickCategory(item[0]); pageChange(1); }}
                    />
                  ))}
                </Menu>
              </Grid.Column>
              <Grid.Column width={10}>
                <h1>
                  Question {currentActivePage} from {filterExam(examList, activeCategory).length}
                </h1>
                <h2>
                  Applicant ID: {id}
                </h2>
              </Grid.Column>
              {filterExam(examList, activeCategory).length > 0
                && filterExam(examList, activeCategory).map((row, i) => (
                  i === currentActivePage - 1 ?
                    <Form>
                      <br />
                      {questionRenderer(row.exQuestion, row.exSubcategory)}
                      <br />
                      {row.exType === 'Choices'
                        && row.exChoice.map((answer, j) => (
                          row.exAnswerLength === 1 ?
                            <Form.Field>
                              <p>
                                <Radio
                                  label={(j + 1).toString().concat('. ').concat(answer)}
                                  value={answer}
                                  checked={showAnswerCheckRadio(row.exId, row.cdAnswer, answer)}
                                />
                              </p>
                            </Form.Field> :
                            <Form.Field>
                              <p>
                                <Checkbox
                                  label={(j + 1).toString().concat('. ').concat(answer)}
                                  value={answer}
                                  checked={showAnswerCheckRadio(row.exId, row.cdAnswer, answer)}
                                />
                              </p>
                            </Form.Field>
                        ))}
                      {row.exType !== 'Choices' &&
                        <Form.Field>
                          <TextArea
                            value={showAnswerText(row.exId, answerList)}
                            placeholder="No answer.."
                          />
                        </Form.Field>
                      }
                    </Form> : ''
                ))}
              {!examList && <h1>Fetch fail somewhere!</h1>}
            </Grid.Row>
            <Grid.Row>
              <Grid.Column with={15}>
                <Pagination
                  floated="right"
                  onPageChange={(e, activePage) => onPageChange(activePage)}
                  activePage={currentActivePage}
                  boundaryRange={1}
                  siblingRange={1}
                  ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                  firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                  lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                  prevItem={{ content: <Icon name="angle left" />, icon: true }}
                  nextItem={{ content: <Icon name="angle right" />, icon: true }}
                  totalPages={categoryLengthCalculate(examList, activeCategory)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
  );

GradingForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  examList: PropTypes.array.isRequired,
  currentActivePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
  // isFetching: state.recruitment.isModalFetching,
});

export default connect(mapStateToProps)(GradingForm);
