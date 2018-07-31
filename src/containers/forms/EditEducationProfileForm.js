import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { masterTableToOptions, getFacultiesByUniversityId, getMajorsByFacultyId } from '../../utils/helper';
import { getEducationProfile } from '../../selectors/profile';
import { honorOptions } from '../../utils/options';

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const EditEducationProfileForm = ({ masterTable, universityId, facultyId, handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="universityId"
      as={Form.Select}
      component={Input}
      label="University"
      placeholder="University"
      options={masterTableToOptions(masterTable.universities)}
      disabled={submitting}
      validate={validator.required}
    />
    <Field
      name="degreeId"
      as={Form.Select}
      component={Input}
      label="Degree"
      placeholder="Degree"
      options={masterTableToOptions(masterTable.degrees)}
      disabled={submitting}
      validate={validator.required}
    />
    <Field
      name="facultyId"
      as={Form.Select}
      component={Input}
      label="Faculty"
      placeholder="Faculty"
      options={masterTableToOptions(getFacultiesByUniversityId(masterTable.faculties, universityId))}
      disabled={submitting}
      validate={validator.required}
    />
    <Field
      name="majorId"
      as={Form.Select}
      component={Input}
      label="Major"
      placeholder="Major"
      options={masterTableToOptions(getMajorsByFacultyId(masterTable.majors, facultyId))}
      disabled={submitting}
      validate={validator.required}
    />
    <Field
      name="program"
      as={Form.Input}
      component={Input}
      label="Program"
      placeholder="Program"
      disabled={submitting}
    />
    <Field
      name="honorFlag"
      as={Form.select}
      component={Input}
      label="Honor"
      placeholder="Honor"
      options={honorOptions}
      disabled={submitting}
      validate={validator.required}
    />
    <Field
      name="gpax"
      as={Form.Input}
      component={Input}
      label="Gpax"
      placeholder="Gpax"
      disabled={submitting}
      validate={[validator.gpax, validator.required]}
    />
    <Field
      name="graduationDate"
      as={Form.Input}
      component={Input}
      type="date"
      label="Graduation date"
      placeholder="Graduation date"
      disabled={submitting}
      validate={validator.date}
    />
  </Form>
);

EditEducationProfileForm.defaultProps = {
  universityId: null,
  facultyId: null
};

EditEducationProfileForm.propTypes = {
  masterTable: PropTypes.object.isRequired,
  universityId: PropTypes.string,
  facultyId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const selector = formValueSelector('editEducationProfile');

const mapStateToProps = (state, { id }) => ({
  masterTable: state.masterTable,
  universityId: selector(state, 'universityId'),
  facultyId: selector(state, 'facultyId'),
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
