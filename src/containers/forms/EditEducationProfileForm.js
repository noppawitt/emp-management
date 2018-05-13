import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { masterTableToOptions } from '../../utils/helper';

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const EditEducationProfileForm = ({ masterTable, handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="universityId" as={Form.Select} component={Input} label="University" placeholder="University" options={masterTableToOptions(masterTable.universities)} disabled={submitting} />
    <Field name="degreeId" as={Form.Select} component={Input} label="Degree" placeholder="Degree" options={masterTableToOptions(masterTable.degrees)} disabled={submitting} />
    <Field name="facultyId" as={Form.Select} component={Input} label="Faculty" placeholder="Faculty" options={masterTableToOptions(masterTable.faculties)} disabled={submitting} />
    <Field name="majorId" as={Form.Select} component={Input} label="Major" placeholder="Major" options={masterTableToOptions(masterTable.majors)} disabled={submitting} />
    <Field name="program" as={Form.Input} component={Input} label="Program" placeholder="Program" disabled={submitting} />
    <Field name="honorFlag" as={Form.Input} component={Input} label="Honor" placeholder="Honor" disabled={submitting} />
    <Field name="gpax" as={Form.Input} component={Input} label="Gpax" placeholder="Gpax" disabled={submitting} />
    <Field name="graduateDate" as={Form.Input} component={Input} type="date" label="Graduation date" placeholder="Graduation date" disabled={submitting} />
  </Form>
);

EditEducationProfileForm.propTypes = {
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state, { id }) => {
  const education = state.profile.educations.find(e => e.id === id);
  return {
    initialValues: {
      universityId: education.universityId,
      degreeId: education.degreeId,
      facultyId: education.facultyId,
      majorId: education.majorId,
      program: education.program,
      honorFlag: education.honorFlag,
      gpax: education.gpax,
      graduateDate: education.graduateDate
    }
  };
};

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'editEducationProfile',
    validate
  })
);

export default enhance(EditEducationProfileForm);
