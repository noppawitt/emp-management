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
const numberOfChoicesOptions = [
  { key: 2, value: 2, text: 2 },
  { key: 3, value: 3, text: 3 },
  { key: 4, value: 4, text: 4 },
  { key: 5, value: 5, text: 5 },
];

const AddExamForm = ({ handleSubmit, submitting, answerType, numberOfChoices }) => (
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
    <Field name="question" as={Form.TextArea} component={Input} label="Question" placeholder="New Question ..." disabled={submitting} />
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
        options={numberOfChoicesOptions}
        disabled={submitting}
      />
    }
    {(answerType === 'Choices' && numberOfChoices >= 2) ? (
      <div>
        <Form.Group widths="equal" className="inline-field">
          <Field name="choice1" as={Form.Input} component={Input} placeholder="Choice 1 ..." disabled={submitting} />
          <Field name="ans1" as={Form.Checkbox} component={Input} label="Correct Answer" disabled={submitting} />
        </Form.Group>
        <Form.Group widths="equal">
          <Field name="choice2" as={Form.Input} component={Input} placeholder="Choice 2 ..." disabled={submitting} />
          <Field name="ans2" as={Form.Checkbox} component={Input} label="Correct Answer" disabled={submitting} />
        </Form.Group>
      </div>)
      : <div />
    }
    {(answerType === 'Choices' && numberOfChoices >= 3) ?
      <Form.Group widths="equal">
        <Field name="choice3" as={Form.Input} component={Input} placeholder="Choice 3 ..." disabled={submitting} />
        <Field name="ans3" as={Form.Checkbox} component={Input} label="Correct Answer" disabled={submitting} />
      </Form.Group>
      : <div />
    }
    {(answerType === 'Choices' && numberOfChoices >= 4) ?
      <Form.Group widths="equal">
        <Field name="choice4" as={Form.Input} component={Input} placeholder="Choice 4 ..." disabled={submitting} />
        <Field name="ans4" as={Form.Checkbox} component={Input} label="Correct Answer" disabled={submitting} />
      </Form.Group>
      : <div />
    }
    {(answerType === 'Choices' && numberOfChoices >= 5) ?
      <Form.Group widths="equal">
        <Field name="choice5" as={Form.Input} component={Input} placeholder="Choice 5 ..." disabled={submitting} />
        <Field name="ans5" as={Form.Checkbox} component={Input} label="Correct Answer" disabled={submitting} />
      </Form.Group>
      : <div />
    }
  </Form>
);

AddExamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  answerType: PropTypes.string.isRequired,
  numberOfChoices: PropTypes.number.isRequired
};

const selector = formValueSelector('addNewExam');

const mapStateToProps = state => ({
  answerType: selector(state, 'answerType'),
  numberOfChoices: selector(state, 'numberOfChoices')
});

const enhance = compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'addNewExam'
  })
);

export default enhance(AddExamForm);
