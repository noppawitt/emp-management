import React from 'react';
import { Icon, Table, Label, Grid, Segment } from 'semantic-ui-react';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      dayOfMonth: [31,28,31,30,31,30,31,31,30,31,30,31],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    };
  }
  render() {
    const colorSunSat = 'rgb(221, 225, 230)';
    const date = new Date();
    const oneDayCell = () => {
      return <div><Table.Cell style={{ textAlign: 'right' }}>1 <Icon name="checkmark" /> </Table.Cell></div>;
    };
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {this.state.days.map(day => <Table.HeaderCell>{day}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              <Table.Cell style={{ backgroundColor: colorSunSat }} >
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor: colorSunSat }}>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              <Table.Cell style={{ backgroundColor: colorSunSat }} >
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor: colorSunSat }}>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              <Table.Cell style={{ backgroundColor: colorSunSat }} >
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor: colorSunSat }}>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              <Table.Cell style={{ backgroundColor: colorSunSat }} >
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor: colorSunSat }}>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Timesheet;
