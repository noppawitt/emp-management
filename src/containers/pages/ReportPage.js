import React from 'react';
import { Segment, Grid, Button } from 'semantic-ui-react';
import PageHeader from '../../components/PageHeader';

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
    <PageHeader text="Report" icon="file powerpoint" />
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
