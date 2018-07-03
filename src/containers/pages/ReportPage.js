import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import { getYearOptions, getMonthOptions } from '../../utils/options';
import { fetchOwnProjectRequest, downloadReportRequest } from '../../actions/report';
import { projectsToOptions } from '../../selectors/report';

const reportOptions = [
  { key: 'normal', value: 'Timesheet (Normal)', text: 'Timesheet (Normal)' },
  { key: 'normal-person', value: 'Timesheet (Normal) per Person', text: 'Timesheet (Normal) per Person' },
  { key: 'special', value: 'Timesheet (Special)', text: 'Timesheet (Special)' },
  { key: 'special-person', value: 'Timesheet (Special) per Person', text: 'Timesheet (Special) per Person' },
  { key: 'summary-month', value: 'Summary Timesheet (Year)', text: 'Summary Timesheet (Year)' },
  { key: 'summary-year', value: 'Summary Timesheet (Month)', text: 'Summary Timesheet (Month)' },
  { key: 'resource', value: 'Resource Available', text: 'Resource Available' }
];

const templateOptions = [
  { key: 'Playtorium', value: 'Playtorium', text: 'Playtorium' },
  { key: 'MFEC', value: 'MFEC', text: 'MFEC' }
];

const downloadReport = ({ reportType, template, userId, projectId, year, month }) => {
  window.location = `/api/report?reportType=${reportType}&template=${template}&userId=${userId}&projectId=${projectId}&year=${year}&month=${month}`;
};

const ReportPage = ({ reportType, projectOptions, handleSubmit }) => (
  <div>
    <PageHeader text="Report" icon="file powerpoint" />
    <Form onSubmit={handleSubmit(downloadReport)}>
      <Field name="reportType" as={Form.Select} component={Input} label="Report type" placeholder="Report type" options={reportOptions} />
      <Form.Group widths="equal">
        <Field name="year" as={Form.Select} component={Input} label="Year" placeholder="Year" options={getYearOptions()} />
        {reportType !== 'Summary Timesheet (Year)' &&
        <Field name="month" as={Form.Select} component={Input} label="Month" placeholder="Month" options={getMonthOptions()} />}
      </Form.Group>
      {reportType !== 'Summary Timesheet (Year)' &&
      <Field name="projectId" as={Form.Select} component={Input} label="Project" placeholder="Project" options={projectOptions} />}
      {reportType !== 'Summary Timesheet (Year)' &&
      <Field name="template" as={Form.Select} component={Input} label="Template" placeholder="Template" options={templateOptions} />}
      {(reportType === 'Timesheet (Normal) per Person' || reportType === 'Timesheet (Special) per Person') &&
      <Field name="userId" as={Form.Select} component={Input} label="Employee" placeholder="Employee" options={reportOptions} />}
      <Button type="submit">Download</Button>
    </Form>
  </div>
);

ReportPage.propTypes = {
  reportType: PropTypes.string.isRequired,
  projectOptions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const selector = formValueSelector('report');

const mapStateToProps = state => ({
  userId: state.auth.id,
  year: state.report.year,
  month: state.report.month,
  initialValues: {
    userId: state.auth.id,
    reportType: 'Timesheet (Normal)',
    year: state.report.year,
    month: state.report.month,
    template: 'Playtorium'
  },
  reportType: selector(state, 'reportType'),
  projectOptions: projectsToOptions(state)
});

const mapDispatchToProps = dispatch => ({
  fetchOwnProject: (userId, year, month) => dispatch(fetchOwnProjectRequest(userId, year, month))
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
    form: 'report'
  })
);

export default enhance(ReportPage);
