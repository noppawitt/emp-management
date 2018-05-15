import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { masterTableToOptions } from '../../utils/helper';
import { getEducationProfile } from '../../selectors/profile';

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
    <Field name="graduationDate" as={Form.Input} component={Input} type="date" label="Graduation date" placeholder="Graduation date" disabled={submitting} />
  </Form>
);

EditEducationProfileForm.propTypes = {
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state, { id }) => ({
  initialValues: {
    id: getEducationProfile(state, id).id,
    universityId: getEducationProfile(state, id).universityId,
    degreeId: getEducationProfile(state, id).degreeId,
    facultyId: getEducationProfile(state, id).facultyId,
    majorId: getEducationProfile(state, id).majorId,
    program: getEducationProfile(state, id).program,
    honorFlag: getEducationProfile(state, id).honorFlag,
    gpax: getEducationProfile(state, id).gpax,
    graduationDate: getEducationProfile(state, id).graduationDate
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'editEducationProfile',
    validate
  })
);

export default enhance(EditEducationProfileForm);
