import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Grid, Progress, Button, Modal } from 'semantic-ui-react';
import moment from 'moment';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      holidaycolor: 'rgb(221, 225, 230)',
      ButtonRedcolor: '#FF0000',
      textWorkcolor: '#2185CD',
      textHolidaycolor: '#999999',
      iconRedcolor: 'red',
      iconBluecolor: 'blue',
      date: moment(),
      holidays: [
        { date: '2018-06-14', name: 'Compensatory day' }
      ]
    };
    this.anotherMonthCell = this.anotherMonthCell.bind(this);
    this.holidayCell = this.holidayCell.bind(this);
    this.workdayCell = this.workdayCell.bind(this);
    this.drawCell = this.drawCell.bind(this);
    this.addHolidayName = this.addHolidayName.bind(this);
  }

  drawCell(date, hour) {
    if (date.format('M') !== this.state.date.format('M')) {
      return (this.anotherMonthCell(date.format('D')));
    }
    else if (date.format('D') === '14') {
      return (this.holidayCell(date.format('D'), hour));
    }
    else if (date.format('d') === '0' || date.format('d') === '6') {
      return (this.holidayCell(date.format('D'), hour));
    }
    return (this.workdayCell(date.format('D'), hour));
  }

  editButtonWorkday(hour) {
    let color = '';
    let iconcolor = '';
    if (hour < 8) { color = this.state.ButtonRedcolor; iconcolor = this.state.iconRedcolor; }
    else { color = this.state.textWorkcolor; iconcolor = this.state.iconBluecolor; }
    return (
      <Grid.Row textAlign="center">
        <Button animated="fade" style={{ borderStyle: 'solid', borderColor: color, backgroundColor: 'white', borderWidth: '1px' }} >
          <Button.Content visible><font color={color} >{hour} Hour</font></Button.Content>
          <Button.Content hidden > <Icon color={iconcolor} name="pencil alternate" /> </Button.Content>
        </Button>
      </Grid.Row>
    );
  }
  anotherMonthCell(day) {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font color={this.state.textHolidaycolor} size="3" ><b>{day}</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '7.5em' }} />
        </Grid.Column>
      </Table.Cell>
    );
  }
  holidayCell(day, hour) {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{day}</b></font>
          </Grid.Row>
          {this.addHolidayName(day)}
          <Grid.Row textAlign="center">
            <Button animated="fade" style={{ borderStyle: 'solid', borderColor: this.state.textWorkcolor, backgroundColor: 'white', borderWidth: '1px' }} >
              <Button.Content visible><font color={this.state.textWorkcolor}>{hour} Hour</font></Button.Content>
              <Button.Content hidden > <Icon color="blue" name="pencil alternate" /> </Button.Content>
            </Button>
          </Grid.Row>
        </Grid.Column>
      </Table.Cell>
    );
  }
  addHolidayName(day) {
    if (day === '14') {
      return (
        <Grid.Row style={{ height: '5em' }}>
          <font color={this.state.textHolidaycolor}>- {this.state.holidays[0].name}</font>
        </Grid.Row>
      );
    }
    return (<Grid.Row style={{ height: '5em' }} />);
  }
  workdayCell(day, hour) {
    return (
      <Table.Cell >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{day}</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '5em' }} />
          {this.editButtonWorkday(hour)}
        </Grid.Column>
      </Table.Cell>
    );
  }

  render() {
    const progressBar = percentWork => <div> <Progress percent={percentWork} active color="blue" progress /> </div>;

    return (
      <div>
        {progressBar(20)}
        <Table celled structured>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell colSpan="7"><font size="3">{this.state.date.format('MMMM')}</font> {this.state.date.format('YYYY')}</Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              {this.state.days.map(day => <Table.HeaderCell>{day}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* {this.state.monthTimesheet.map((oneday, i) => {
                if ((i % 7) === 0) {
                  return (
                    <Table.Row style={{ height: '10em', width: '10em' }} >
                      {this.drawCell(moment(this.state.monthTimesheet[i].date), this.state.monthTimesheet[i].hour)}
                      {this.drawCell(moment(this.state.monthTimesheet[i + 1].date), this.state.monthTimesheet[i + 1].hour)}
                      {this.drawCell(moment(this.state.monthTimesheet[i + 2].date), this.state.monthTimesheet[i + 2].hour)}
                      {this.drawCell(moment(this.state.monthTimesheet[i + 3].date), this.state.monthTimesheet[i + 3].hour)}
                      {this.drawCell(moment(this.state.monthTimesheet[i + 4].date), this.state.monthTimesheet[i + 4].hour)}
                      {this.drawCell(moment(this.state.monthTimesheet[i + 5].date), this.state.monthTimesheet[i + 5].hour)}
                      {this.drawCell(moment(this.state.monthTimesheet[i + 6].date), this.state.monthTimesheet[i + 6].hour)}
                    </Table.Row>
                    );
                }
                return <div />;
              })
            } */}
            {
              this.props.timesheets.map((timesheet, i) => (
                i % 7 === 0 &&
                <Table.Row style={{ height: '10em', width: '10em' }} >
                  {this.drawCell(moment(this.props.timesheets[i].date), this.props.timesheets[i].totalHours)}
                  {this.drawCell(moment(this.props.timesheets[i + 1].date), this.props.timesheets[i + 1].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 2].date), this.props.timesheets[i + 2].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 3].date), this.props.timesheets[i + 3].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 4].date), this.props.timesheets[i + 4].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 5].date), this.props.timesheets[i + 5].totalhours)}
                  {this.drawCell(moment(this.props.timesheets[i + 6].date), this.props.timesheets[i + 6].totalhours)}
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <Modal trigger={<Button>New Task</Button>} />
      </div>
    );
  }
}

Timesheet.propTypes = {
  timesheets: PropTypes.array.isRequired
};

export default Timesheet;
