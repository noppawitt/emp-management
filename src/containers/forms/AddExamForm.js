import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';

const examTypeOptions = [
  { key: 'English', value: 'English', text: 'English' },
  { key: 'Logic', value: 'Logic', text: 'Logic' },
  { key: 'Skill Proficiency', value: 'Skill Proficiency', text: 'Skill Proficiency' }
];
const answerTypeOptions = [
  { key: 'Write-Up', value: 'Write-Up', text: 'Write-Up' },
  { key: 'Choices', value: 'Choices', text: 'Choices' }
];
const numberOfChoices = [
  { key: 2, value: 2, text: 2 },
  { key: 3, value: 3, text: 3 },
  { key: 4, value: 4, text: 4 },
  { key: 5, value: 5, text: 5 },
];

const AddExamForm = ({ handleSubmit, submitting, answerType }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="examType"
      as={Form.Select}
      component={Input}
      label="Exam Type"
      placeholder="-- Exam Type --"
      options={examTypeOptions}
      disabled={submitting}
    />
    <Field name="question" as={Form.TextArea} component={Input} label="Question" placeholder="Neq Question ..." disabled={submitting} />
    <Field
      name="answerType"
      as={Form.Select}
      component={Input}
      label="Answer Type"
      placeholder="-- Answer Type --"
      options={answerTypeOptions}
      disabled={submitting}
    />
    {answerType === 'Choices' &&
      <Field
        name="numberOfChoices"
        as={Form.Select}
        component={Input}
        label="Number of choices"
        placeholder="-- Number of choices --"
        options={numberOfChoices}
        disabled={submitting}
      />
    }
  </Form>
);

AddExamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  answerType: PropTypes.string.isRequired
};

const selector = formValueSelector('addNewExam');

const mapStateToProps = state => ({
  answerType: selector(state, 'answerType')
});

const enhance = compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'addNewExam'
  })
);

export default enhance(AddExamForm);
