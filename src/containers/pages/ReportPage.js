import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { getYearOptions, getMonthOptions } from '../../utils/options';
import { fetchOwnProjectRequest, downloadReportRequest, fetchProjectMemberRequest } from '../../actions/report';
import { projectsToOptions, projectDetailToMemberOptions } from '../../selectors/report';

const reportOptions = [
  { key: 'normal', value: 'Timesheet (Normal)', text: 'Timesheet (Normal)' },
  { key: 'normal-person', value: 'Timesheet (Normal) per Person', text: 'Timesheet (Normal) per Person' },
  { key: 'special', value: 'Timesheet (Special)', text: 'Timesheet (Special)' },
  { key: 'special-person', value: 'Timesheet (Special) per Person', text: 'Timesheet (Special) per Person' },
  { key: 'summary-month', value: 'Summary Timesheet (Year)', text: 'Summary Timesheet (Year)' },
  { key: 'summary-year', value: 'Summary Timesheet (Month)', text: 'Summary Timesheet (Month)' },
  { key: 'summary-leave', value: 'Summary Leave', text: 'Summary Leave' },
  { key: 'resource', value: 'Resource Available', text: 'Resource Available' }
];

const templateOptions = [
  { key: 'Playtorium', value: 'Playtorium', text: 'Playtorium' },
  { key: 'MFEC', value: 'MFEC', text: 'MFEC' }
];

const ReportPage = ({ fetchOwnProject, userId, year, month, reportType, projectOptions, memberOptions, handleSubmit, downloadReport, fetchProjectMember }) => (
  <div>
    <PageHeader text="Report" icon="file powerpoint" />
    <Form onSubmit={handleSubmit(downloadReport)}>
      <Field name="reportType" as={Form.Select} component={Input} label="Report type" placeholder="Report type" options={reportOptions} />
      <Form.Group widths="equal">
        <Field name="year" as={Form.Select} component={Input} label="Year" placeholder="Year" onChange={(e, newValue) => fetchOwnProject(userId, newValue, month)} options={getYearOptions()} />
        {(reportType !== 'Summary Timesheet (Year)' && reportType !== 'Summary Leave') &&
        <Field name="month" as={Form.Select} component={Input} label="Month" placeholder="Month" onChange={(e, newValue) => fetchOwnProject(userId, year, newValue)} options={getMonthOptions()} />}
      </Form.Group>
      {(reportType !== 'Summary Timesheet (Year)' && reportType !== 'Summary Leave') &&
      <Field name="projectId" as={Form.Select} component={Input} label="Project" placeholder="Project" onChange={(e, newValue) => fetchProjectMember(newValue)} options={projectOptions} />}
      {(reportType !== 'Summary Timesheet (Year)' && reportType !== 'Summary Leave') &&
      <Field name="template" as={Form.Select} component={Input} label="Template" placeholder="Template" options={templateOptions} />}
      {(reportType === 'Timesheet (Normal) per Person' || reportType === 'Timesheet (Special) per Person') &&
      <Field name="userId" as={Form.Select} component={Input} label="Employee" placeholder="Employee" options={memberOptions} />}
      <Button type="submit">Download</Button>
    </Form>
  </div>
);

ReportPage.propTypes = {
  fetchOwnProject: PropTypes.func.isRequired,
  fetchProjectMember: PropTypes.func.isRequired,
  reportType: PropTypes.string.isRequired,
  projectOptions: PropTypes.array.isRequired,
  memberOptions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  downloadReport: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired
};

const selector = formValueSelector('report');

const mapStateToProps = state => ({
  userId: state.auth.id,
  initialValues: {
    userId: state.auth.id,
    reportType: 'Timesheet (Normal)',
    year: state.report.year,
    month: state.report.month,
    template: 'Playtorium'
  },
  year: state.report.year,
  month: state.report.month,
  reportType: selector(state, 'reportType'),
  projectOptions: projectsToOptions(state),
  memberOptions: projectDetailToMemberOptions(state)
});

const mapDispatchToProps = dispatch => ({
  fetchOwnProject: (userId, year, month) => dispatch(fetchOwnProjectRequest(userId, year, month)),
  downloadReport: values => dispatch(downloadReportRequest(values)),
  fetchProjectMember: projectId => dispatch(fetchProjectMemberRequest(projectId))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchOwnProject, userId, year, month } = this.props;
      fetchOwnProject(userId, year, month);
    }
  }),
  reduxForm({
    form: 'report',
  })
);

export default enhance(ReportPage);
