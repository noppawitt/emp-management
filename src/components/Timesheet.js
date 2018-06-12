import React from 'react';
import { Icon, Table, Label, Grid, Progress, Button, Modal } from 'semantic-ui-react';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
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
    const progressBar = () =>{
      return <div> <Progress percent={60} active color="teal" progress /> <Progress percent={40} active color="blue" progress /> </div>;
    }
    return (
      <div>
        {progressBar()}
        <Table celled structured>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell colSpan="7"><font size="3">{this.state.month[6]}</font> 2018</Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              {this.state.days.map(day => <Table.HeaderCell>{day}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              <Table.Cell style={{ backgroundColor: colorSunSat }} >
                <Grid.Column>
                  <Grid.Row textAlign="right" >
                    <font color="red" size="3">31</font>
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
                    <font color="blue">1</font>
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="red" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">7  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    <font color="blue">1</font>
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
                    <font color="blue">1</font>
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="green" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">วิสาฆบูชา</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    <font color="blue">1</font>
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
                    <font color="blue">1</font>
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
                    <font color="blue">1</font>
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
        <Modal trigger={<Button>New Task</Button>} />
      </div>
    );
  }
}

export default Timesheet;
