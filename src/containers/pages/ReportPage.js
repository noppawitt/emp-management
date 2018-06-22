import React from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react';

const ButtonExampleConditionals = () => (
  <Button.Group fluid >
    <Button>Timesheet(Normal)</Button>
    <Button.Or />
    <Button >Timesheet(Spacial)</Button>
    <Button.Or />
    <Button >Sumary Timesheet</Button>
  </Button.Group>
);

const ReportPage = () => (
  <div>
    <Segment vertical><h1>Report</h1></Segment>
    <Segment vertical>
      <Grid>
        <Grid.Row>
          {ButtonExampleConditionals()}
        </Grid.Row>
      </Grid>
    </Segment>

  </div>
);

export default ReportPage;
