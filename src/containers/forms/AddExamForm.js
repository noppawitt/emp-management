import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { Form, Header, Icon, Button } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';

const validate = (values) => {
  const errors = {};
  errors.examType = validator.required(values.examType);
  errors.question = validator.required(values.question);
  errors.answerType = validator.required(values.answerType);

  return errors;
};

const answerTypeOptions = [
  { key: 'Write-Up', value: 'Write-Up', text: 'Write-Up' },
  { key: 'Choices', value: 'Choices', text: 'Choices' }
];

const examTypeOptions = (exams, subjectNoFilter) => {
  exams.forEach((element) => {
    subjectNoFilter.push(element.exType);
  });

  return [...new Set(subjectNoFilter)];
};
examTypeOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired
};

const renderChoices = ({ fields, submitting, placeHold }) => (
  <div>
    <Header as="h5">Choices</Header>
    {fields.map((choice, index) => {
      placeHold = (('Choice ').concat((index + 1))).concat(' ...');
      return (
        <div>
          <Form.Group>
            <Field name={`${choice}.data`} as={Form.Input} component={Input} placeholder={placeHold} disabled={submitting} />
            <Field name={`${choice}.answer`} as={Form.Checkbox} component={Input} label="Correct Answer" disabled={submitting} />
            <Icon fitted name="ban" color="red" size="large" onClick={() => fields.remove(index)} />
          </Form.Group>
          <sbr />
        </div>
      );
    })}
    <Button type="button" icon labelPosition="left" onClick={() => fields.push({ data: '', answer: false })} basic color="teal" disabled={submitting}>
      <Icon name="add" />
      NEW CHOICE
    </Button>
  </div>
);
renderChoices.propTypes = {
  fields: Field.isRequired,
  submitting: PropTypes.bool.isRequired,
  placeHold: PropTypes.string.isRequired
};

const AddExamForm = ({ handleSubmit, submitting, answerType, exams }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="examType" as={Form.Input} component={Input} list="exam_type" label="Exam Type" placeholder="e.g. English" disabled={submitting} required />
    <datalist id="exam_type">
      {
        (examTypeOptions(exams, [])).map(type => (<option value={type} />))
      }
    </datalist>
    <Field name="question" as={Form.TextArea} component={Input} autoHeight label="Question" placeholder="New Question ..." disabled={submitting} required />
    <Field name="answerType" as={Form.Select} component={Input} label="Answer Type" placeholder="-- Answer Type --" options={answerTypeOptions} disabled={submitting} required />
    {answerType === 'Choices' && <FieldArray name="choices" component={renderChoices} />}
  </Form>
);

AddExamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  answerType: PropTypes.string.isRequired,
  exams: PropTypes.array.isRequired
};

const selector = formValueSelector('addExam');

const mapStateToProps = state => ({
  answerType: selector(state, 'answerType'),
  numberOfChoices: selector(state, 'numberOfChoices')
});

const enhance = compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'addExam',
    initialValues: {
      choices: [{ data: '', answer: false }, { data: '', answer: false }]
    },
    validate
  })
);

export default enhance(AddExamForm);
