import React from 'react';
import PropTypes from 'prop-types';
// import Modal from '../../components/modal';
import { Segment, Grid, Container, Pagination, Icon, Form, Radio, Checkbox } from 'semantic-ui-react';

const questionRenderer = question => (
  <div dangerouslySetInnerHTML={{ __html: question }} />
);

const TakeExam = ({
  examList,
  currentActivePage,
  onPageChange,
  categoryTitle,
  subCategoryTitle,
  pickedAnswer,
  onClickRadio,
  onClickCheckbox, }) =>
  (
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={12}>
            <h1>{categoryTitle} : {subCategoryTitle}</h1>
          </Grid.Column>
          <Grid.Column width={2}>
            <h2>{currentActivePage}</h2>
          </Grid.Column>
          <Grid.Column width={2}>
            <Container textAlign="right"><h2>Timer</h2></Container>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        {examList && examList.map(row => (
          row.exId === currentActivePage ?
            <Form>
              <h1>Question {currentActivePage}</h1>{questionRenderer(row.exQuestion)}<br />
              Choice: {row.exType === 'Choices' && row.exChoice.map((answer) => {
                console.log(row.exAnswer.length, row.exAnswer.length === 1);
                return row.exAnswer.length === 1 ?
                  <Form.Field>
                    <p>
                      <Radio
                        label={answer}
                        value={answer}
                        checked={pickedAnswer.includes(answer)}
                        onClick={(e, { value }) => onClickRadio(value)}
                      />
                    </p>
                  </Form.Field> :
                  <Form.Field>
                    <p>
                      <Checkbox
                        label={answer}
                        value={answer}
                        checked={pickedAnswer.includes(answer)}
                        onClick={(e, { value }) => onClickCheckbox(value)}
                      />
                    </p>
                  </Form.Field>;
              })}
            </Form> : ''
        ))}
        {!examList && (
          <h1>Fetch fail somewhere!</h1>
        )}
      </Segment>
      <Segment>
        <Pagination
          onPageChange={(e, { activePage }) => onPageChange(activePage)}
          floated="right"
          defaultActivePage={1}
          showFirstAndLastNav="true"
          showPreviousAndNextNav="true"
          showEllipsis="false"
          ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
          firstItem={{ content: <Icon name="angle double left" />, icon: true }}
          lastItem={{ content: <Icon name="angle double right" />, icon: true }}
          prevItem={{ content: <Icon name="angle left" />, icon: true }}
          nextItem={{ content: <Icon name="angle right" />, icon: true }}
          // edit this after this
          totalPages={1 < 0 ? parseInt(examList.length / 10, 10) + ((examList.length % 3 !== 0) ? 1 : 0) : 4}
        />
      </Segment>
    </Segment.Group>
  );

TakeExam.propTypes = {
  examList: PropTypes.array.isRequired,
  currentActivePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  categoryTitle: PropTypes.string.isRequired,
  subCategoryTitle: PropTypes.string.isRequired,
  pickedAnswer: PropTypes.array.isRequired,
  onClickRadio: PropTypes.func.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
};

export default TakeExam;
