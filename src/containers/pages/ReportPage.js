// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'redux';
// import { Grid, Button, Form } from 'semantic-ui-react';
// import PageHeader from '../../components/PageHeader';

<<<<<<< HEAD
const option = [
  { key: 'normal', value: 'normal', text: 'Timesheet(normal)' },
  { key: 'spacial', value: 'spacial', text: 'Timesheet(spacial)' },
  { key: 'summary', value: 'summary', text: 'SummaryTimesheet' }
];
const months = [
  { key: 1, value: '01', text: 'January' },
  { key: 2, value: '02', text: 'February' },
  { key: 3, value: '03', text: 'March' },
  { key: 4, value: '04', text: 'April' },
  { key: 5, value: '05', text: 'May' },
  { key: 6, value: '06', text: 'June' },
  { key: 7, value: '07', text: 'July' },
  { key: 8, value: '08', text: 'August' },
  { key: 9, value: '09', text: 'September' },
  { key: 10, value: '10', text: 'October' },
  { key: 11, value: '11', text: 'November' },
  { key: 12, value: '12', text: 'December' }
];
const years = [
  { key: 2018, value: 2018, text: '2018' },
  { key: 2019, value: 2019, text: '2019' },
  { key: 2020, value: 2020, text: '2020' }
];
const employees = [
  { key: 10000, value: 10000, text: 'Thanapon Siriompark (Mark)' },
  { key: 10001, value: 10001, text: 'Jack Denial (J)' },
  { key: 10002, value: 10002, text: 'Pee Isgod (PP)' }
];
const project = [
  { key: 'ps180001', value: 'ps180001', text: 'Project1' },
  { key: 'ps180002', value: 'ps180002', text: 'project2' },
  { key: 'ps180003', value: 'ps180003', text: 'project3' }
];
const employeeSelector = () => (
  // <Grid.Row>
  <Grid.Column width={3}>
    <Form >
      <Form.Group width="equal">
        <Form.Dropdown size="large" label="Employee" placeholder="Employees" selection options={employees} />
      </Form.Group>
    </Form>
  </Grid.Column>
  // </Grid.Row>
);
const reportTypeSelector = () => (
  // <Grid.Row>
  <Grid.Column width={3}>
    <Form >
      <Form.Group width="equal" >
        <Form.Dropdown size="large" label="Type" placeholder="Select Type" selection options={option} />
      </Form.Group>
    </Form>
  </Grid.Column>
  // </Grid.Row>
);
const yearSelector = () => (
  // <Grid.Row>
  <Grid.Column width={3}>
    <Form >
      <Form.Group width="equal">
        <Form.Dropdown size="large" label="Year" placeholder="Select Year" selection options={years} />
      </Form.Group>
    </Form>
  </Grid.Column>
  // </Grid.Row>
);
const monthSelector = () => (
  // <Grid.Row>
  <Grid.Column width={3}>
    <Form >
      <Form.Group width="equal">
        <Form.Dropdown size="large" label="Month" placeholder="Select Month" selection options={months} />
      </Form.Group>
    </Form>
  </Grid.Column>
  // </Grid.Row>
);
const projectSelector = () => (
  // <Grid.Row>
  <Grid.Column width={3} >
    <Form width="equal" >
      <Form.Group width="equal">
        <Form.Dropdown size="large" label="Project" placeholder="Select Project" selection options={project} />
      </Form.Group>
    </Form>
  </Grid.Column>
  // </Grid.Row>
);
const ReportPage = () => (
  <div>
    <PageHeader text="Report" icon="file powerpoint" />
    <Grid>
      <Grid.Row>
        {reportTypeSelector()}
      </Grid.Row>
      <Grid.Row>
        {yearSelector()}
        {monthSelector()}
      </Grid.Row>
      <Grid.Row>
        {projectSelector()}
        {employeeSelector()}
      </Grid.Row>
      <Grid.Row>
        <Button color="blue" style={{ marginLeft: '15px' }}>Download</Button>
      </Grid.Row>
    </Grid>
  </div>
);
=======
// const option = [
//   { key: 'normal', value: 'normal', text: 'Timesheet(normal)' },
//   { key: 'spacial', value: 'spacial', text: 'Timesheet(spacial)' },
//   { key: 'summary', value: 'summary', text: 'SummaryTimesheet' }
// ];
// const months = [
//   { key: 1, value: '01', text: 'January' },
//   { key: 2, value: '02', text: 'February' },
//   { key: 3, value: '03', text: 'March' },
//   { key: 4, value: '04', text: 'April' },
//   { key: 5, value: '05', text: 'May' },
//   { key: 6, value: '06', text: 'June' },
//   { key: 7, value: '07', text: 'July' },
//   { key: 8, value: '08', text: 'August' },
//   { key: 9, value: '09', text: 'September' },
//   { key: 10, value: '10', text: 'October' },
//   { key: 11, value: '11', text: 'November' },
//   { key: 12, value: '12', text: 'December' }
// ];
// const years = [
//   { key: 2018, value: 2018, text: '2018' },
//   { key: 2019, value: 2019, text: '2019' },
//   { key: 2020, value: 2020, text: '2020' }
// ];
// const employees = [
//   { key: 10000, value: 10000, text: 'Thanapon Siriompark (Mark)' },
//   { key: 10001, value: 10001, text: 'Jack Denial (J)' },
//   { key: 10002, value: 10002, text: 'Pee Isgod (PP)' }
// ];
// const project = [
//   { key: 'ps180001', value: 'ps180001', text: 'Project1' },
//   { key: 'ps180002', value: 'ps180002', text: 'project2' },
//   { key: 'ps180003', value: 'ps180003', text: 'project3' }
// ];
// const employeeSelector = () => (
//   // <Grid.Row>
//   <Grid.Column width={3}>
//     <Form >
//       <Form.Group width="equal">
//         <Form.Dropdown size="large" label="Employee" placeholder="Employees" selection options={employees} />
//       </Form.Group>
//     </Form>
//   </Grid.Column>
//   // </Grid.Row>
// );
// const reportTypeSelector = () => (
//   // <Grid.Row>
//   <Grid.Column width={3}>
//     <Form >
//       <Form.Group width="equal" >
//         <Form.Dropdown size="large" label="Type" placeholder="Select Type" selection options={option} />
//       </Form.Group>
//     </Form>
//   </Grid.Column>
//   // </Grid.Row>
// );
// const yearSelector = () => (
//   // <Grid.Row>
//   <Grid.Column width={3}>
//     <Form >
//       <Form.Group width="equal">
//         <Form.Dropdown size="large" label="Year" placeholder="Select Year" selection options={years} />
//       </Form.Group>
//     </Form>
//   </Grid.Column>
//   // </Grid.Row>
// );
// const monthSelector = () => (
//   // <Grid.Row>
//   <Grid.Column width={3}>
//     <Form >
//       <Form.Group width="equal">
//         <Form.Dropdown size="large" label="Month" placeholder="Select Month" selection options={months} />
//       </Form.Group>
//     </Form>
//   </Grid.Column>
//   // </Grid.Row>
// );
// const projectSelector = () => (
//   // <Grid.Row>
//   <Grid.Column width={3} >
//     <Form width="equal" >
//       <Form.Group width="equal">
//         <Form.Dropdown size="large" label="Project" placeholder="Select Project" selection options={project} />
//       </Form.Group>
//     </Form>
//   </Grid.Column>
//   // </Grid.Row>
// );
// const ReportPage = () => (
//   <div>
//     <PageHeader text="Report" icon="file powerpoint" />
//     <Grid>
//       <Grid.Row>
//         {reportTypeSelector()}
//       </Grid.Row>
//       <Grid.Row>
//         {yearSelector()}
//         {monthSelector()}
//       </Grid.Row>
//       <Grid.Row>
//         {projectSelector()}
//         {employeeSelector()}
//       </Grid.Row>
//       <Grid.Row>
//         <Button color="blue" style={{ marginLeft: '15px' }}>Download</Button>
//       </Grid.Row>
//     </Grid>
//   </div>
// );
>>>>>>> b626ed0fdaabc2498586cd89204000d1b5d019a1

// // ReportPage.propTypes = {

// // };

// // const mapStateToProps = state => ({
// //   userId: state.auth.id
// // });

// // const mapDispatchToProps = dispatch => ({

// // });

// export default connect(null, mapDispatchToProps)(ReportPage);
