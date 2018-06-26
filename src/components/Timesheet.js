import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Grid, Progress, Button, Modal } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from './PageHeader';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      holidaycolor: 'rgb(221, 225, 230)',
      ButtonRedcolor: '#FF0000',
      textWorkcolor: '#2185CD',
      textAnotherDay: '#999999',
      iconRedcolor: 'red',
      iconBluecolor: 'blue',
      date: moment(),
      lastholiday: { date: '', name: '' },
      // lastleaveday: { date: '', status: '' },
      holidays: [
        { date: '2018-06-14', name: 'Compensatory day' },
        { date: '2018-06-22', name: 'official holiday' },
        { date: '2018-06-29', name: 'National holiday' }
      ],
      // leavedays: [
      //   { date: '2018-06-12', name: 'Compensatory day' },
      //   { date: '2018-06-20', name: 'test day' },
      //   { date: '2018-06-27', name: 'test 2 day' }
      // ]
    };
    this.anotherMonthCell = this.anotherMonthCell.bind(this);
    this.workdayCell = this.workdayCell.bind(this);
    this.drawCell = this.drawCell.bind(this);
    this.addHolidayName = this.addHolidayName.bind(this);
    this.isHoliday = this.isHoliday.bind(this);
    this.buttonOfHoliday = this.buttonOfHoliday.bind(this);
  }

  drawCell(date, hour) {
    if (date.format('M') !== this.state.date.format('M')) {
      return (this.anotherMonthCell(date.format('D')));
    }
    else if (this.isHoliday(date)) {
      return (this.holidayCell(date, hour));
    }
    else if (date.format('d') === '0' || date.format('d') === '6') {
      return (this.holidayCell(date, hour));
    }
    return (this.workdayCell(date, hour));
  }

  isHoliday(date) {
    for (let i = 0; i < this.state.holidays.length; i += 1) {
      if (moment(date).format('YYYY-MM-DD') === this.state.holidays[i].date) {
        this.state.lastholiday = this.state.holidays[i];
        return true;
      }
    }
    return false;
  }
  editButtonWorkday(date, hour) {
    let color = '';
    let iconcolor = '';
    if (hour !== 8) { color = this.state.ButtonRedcolor; iconcolor = this.state.iconRedcolor; }
    if (hour === 0) {
      return (
        <Grid.Row textAlign="center">
          <Button animated="fade" style={{ borderStyle: 'solid', borderColor: color, backgroundColor: 'white', borderWidth: '1px' }} onClick={() => this.props.onAddClick(date.format('YYYY-MM-DD'))} >
            <Button.Content visible><font color={color} >Add new</font></Button.Content>
            <Button.Content hidden > <Icon color={iconcolor} name="pencil alternate" /> </Button.Content>
          </Button>
        </Grid.Row>
      );
    }
    else if (hour === 8) { color = this.state.textWorkcolor; iconcolor = this.state.iconBluecolor; }
    return (
      <Grid.Row textAlign="center">
        <Button animated="fade" style={{ borderStyle: 'solid', borderColor: color, backgroundColor: 'white', borderWidth: '1px' }} onClick={() => this.props.onEditClick(date.format('YYYY-MM-DD'))} >
          <Button.Content visible><font color={color} >{hour} Hours</font></Button.Content>
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
            <font color={this.state.textAnotherDay} size="3" ><b>{day}</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '7.5em' }} />
        </Grid.Column>
      </Table.Cell>
    );
  }
  holidayCell(date, hour) {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor, maxWidth: '10em' }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{date.format('D')}</b></font>
          </Grid.Row>
          {this.addHolidayName(date.format('D'))}
          {this.buttonOfHoliday(date, hour)}
        </Grid.Column>
      </Table.Cell>
    );
  }
  buttonOfHoliday(date, hour) {
    if (hour !== 0) {
      return (
        <Grid.Row textAlign="center">
          <Button animated="fade" style={{ borderStyle: 'solid', borderColor: this.state.textWorkcolor, backgroundColor: 'white', borderWidth: '1px' }} onClick={() => this.props.onEditClick(date.format('YYYY-MM-DD'))} >
            <Button.Content visible><font color={this.state.textWorkcolor}>{hour} Hours</font></Button.Content>
            <Button.Content hidden > <Icon color="blue" name="pencil alternate" /> </Button.Content>
          </Button>
        </Grid.Row>
      );
    }
    return (
      <Grid.Row textAlign="center">
        <Button animated="fade" style={{ backgroundColor: this.state.holidaycolor }} onClick={() => this.props.onAddClick(date.format('YYYY-MM-DD'))} >
          <Button.Content visible><font color={this.state.textAnotherDay}>Add new</font></Button.Content>
          <Button.Content hidden > <Icon color="grey" name="pencil alternate" /> </Button.Content>
        </Button>
      </Grid.Row>
    );
  }
  addHolidayName(day) {
    if (day === moment(this.state.lastholiday.date).format('D')) {
      return (
        <Grid.Row style={{ height: '5em' }}>
          <font color={this.state.textAnotherDay}>- {this.state.lastholiday.name}</font>
        </Grid.Row>
      );
    }
    return (<Grid.Row style={{ height: '5em' }} />);
  }
  workdayCell(date, hour) {
    return (
      <Table.Cell >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{date.format('D')}</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '5em' }} />
          {this.editButtonWorkday(date, hour)}
        </Grid.Column>
      </Table.Cell>
    );
  }

  render() {
    const progressBar = percentWork => <div> <Progress percent={percentWork} active color="blue" progress /> </div>;

    return (
      <div>
        <PageHeader text="Timesheet" icon="calendar alternate" />
        {progressBar(70)}
        <Table celled structured fixed>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell colSpan="7"><font size="3">{this.state.date.format('MMMM')}</font> {this.state.date.format('YYYY')}</Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              {this.state.days.map(day => <Table.HeaderCell>{day}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>
          <Table.Body >
            { this.props.timesheets.map((timesheet, i) => (
                i % 7 === 0 &&
                <Table.Row style={{ height: '10em' }} >
                  {this.drawCell(moment(this.props.timesheets[i].date), this.props.timesheets[i].totalhours)}
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
  timesheets: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};

export default Timesheet;
