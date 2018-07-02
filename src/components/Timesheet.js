import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Grid, Progress, Button, Select } from 'semantic-ui-react';
import moment from 'moment';
import PageHeader from './PageHeader';
import history from '../history';

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
      progressColor: 'blue',
      percent: 0,
      lastholiday: { date: '', name: '' },
      lastleaveday: { date: '', status: '' },
      months: [
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
      ],
      years: [
<<<<<<< HEAD
        { key: 2018, value: 2018, text: '2018' },
        { key: 2019, value: 2019, text: '2019' },
        { key: 2020, value: 2020, text: '2020' }
=======
        { key: 2018, value: '2018', text: '2018' },
        { key: 2019, value: '2019', text: '2019' },
        { key: 2020, value: '2020', text: '2020' },
        { key: 2021, value: '2021', text: '2021' },
        { key: 2022, value: '2022', text: '2022' },
        { key: 2023, value: '2023', text: '2023' },
        { key: 2024, value: '2024', text: '2024' },
        { key: 2025, value: '2025', text: '2025' },
        { key: 2026, value: '2026', text: '2026' },
        { key: 2027, value: '2027', text: '2027' }
>>>>>>> 2f7cd7704a7f072e782840d475c44b5a29b621d1
      ]
    };
    this.anotherMonthCell = this.anotherMonthCell.bind(this);
    this.workdayCell = this.workdayCell.bind(this);
    this.drawCell = this.drawCell.bind(this);
    this.addHolidayName = this.addHolidayName.bind(this);
    this.buttonOfHoliday = this.buttonOfHoliday.bind(this);
    this.leavedayCell = this.leavedayCell.bind(this);
    this.calprogressbar = this.calprogressbar.bind(this);
  }
  componentDidMount() {
    this.calprogressbar();
  }
  // componentWillReceiveProps(nextProps) {
  //   if (JSON.stringify(this.props.timesheets) !== JSON.stringify(nextProps.timesheets)) {
  //     this.calprogressbar();
  //     this.forceUpdate();
  //   }
  // }
  // this.setState(prevState => ({
  //   countWorkDayofmonth: prevState.countWorkDayofmonth + 1
  // }));
  // this.state.countWorkDayofmonth += 1;
  calprogressbar() {
    let progressColor = 'red';
    let countWorkDay = 0;
    let countFilledTimesheet = 0;
    for (let i = 0; i < this.props.timesheets.length; i += 1) {
      const x = this.props.timesheets[i];
      if (moment(x.date).format('MM') !== this.props.month) {
        continue;
      }
      else if (this.isLeaveday(moment(x.date))) {
        if (this.state.lastleaveday.totalhours < 8) {
          countWorkDay += 1;
        }
        if (x.totalhours > 0) {
          countFilledTimesheet += 1;
        }
      }
      else if (this.isHoliday(moment(x.date))) {
        continue;
      }
      else if (moment(x.date).format('d') === '0' || moment(x.date).format('d') === '6') {
        continue;
      }
      else {
        countWorkDay += 1;
        if (x.totalhours > 0) {
          countFilledTimesheet += 1;
        }
      }
    }
    const percent = (countFilledTimesheet / countWorkDay) * 100;
    if (percent <= 30) progressColor = 'red';
    else if (percent <= 60) progressColor = 'yellow';
    else progressColor = 'blue';
    this.setState({ percent, progressColor });
  }
  drawCell(date, hour, id) {
    if (date.format('MM') !== this.props.month) {
      return (this.anotherMonthCell(date.format('D')));
    }
    else if (this.isLeaveday(date)) {
      return (this.leavedayCell(date, hour, id));
    }
    else if (this.isHoliday(date)) {
      return (this.holidayCell(date, hour, id));
    }
    else if (date.format('d') === '0' || date.format('d') === '6') {
      return (this.holidayCell(date, hour, id));
    }
    return (this.workdayCell(date, hour, id));
  }
  isLeaveday(date) {
    return this.props.leaves.some(((leaveDay) => {
      if (leaveDay.leaveDate === date.format('YYYY-MM-DD')) {
        this.state.lastleaveday = leaveDay;
        return (true);
      }
      return (false);
    }));
  }
  addStatusLeaveday(date, hour, id) {
    if (this.state.lastleaveday.totalhours < 8) {
      return (
        <div>
          <Grid.Row style={{ height: '5em' }}>
            <font color={this.state.textAnotherDay}>- {this.state.lastleaveday.status}</font>
            <br />
            <font color={this.state.textAnotherDay}>{this.state.lastleaveday.startTime}-{this.state.lastleaveday.endTime}</font>
          </Grid.Row>
          {this.editButtonWorkday(date, hour, id)}
        </div>
      );
    }
    return (
      <div>
        <Grid.Row style={{ height: '5em' }}>
          <font color={this.state.textAnotherDay}>- {this.state.lastleaveday.status}</font>
        </Grid.Row>
        {this.buttonOfHoliday(date, hour, id)}
      </div>
    );
  }
  leavedayCell(date, hour, id) {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor, maxWidth: '10em' }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{date.format('D')}</b></font>
          </Grid.Row>
          {this.addStatusLeaveday(date, hour, id)}
        </Grid.Column>
      </Table.Cell>
    );
  }
  workdayCell(date, hour, id) {
    return (
      <Table.Cell >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{date.format('D')}</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '5em' }} />
          {this.editButtonWorkday(date, hour, id)}
        </Grid.Column>
      </Table.Cell>
    );
  }
  editButtonWorkday(date, hour, id) {
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
    else if (hour >= 8) { color = this.state.textWorkcolor; iconcolor = this.state.iconBluecolor; }
    return (
      <Grid.Row textAlign="center">
        <Button animated="fade" style={{ borderStyle: 'solid', borderColor: color, backgroundColor: 'white', borderWidth: '1px' }} onClick={() => this.props.onEditClick(id)} >
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
  isHoliday(date) {
    for (let i = 0; i < this.props.holidays.length; i += 1) {
      if (moment(date).format('YYYY-MM-DD') === this.props.holidays[i].date) {
        this.state.lastholiday = this.props.holidays[i];
        return true;
      }
    }
    return false;
  }
  holidayCell(date, hour, id) {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor, maxWidth: '10em' }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>{date.format('D')}</b></font>
          </Grid.Row>
          {this.addHolidayName(date.format('D'))}
          {this.buttonOfHoliday(date, hour, id)}
        </Grid.Column>
      </Table.Cell>
    );
  }
  buttonOfHoliday(date, hour, id) {
    if (hour !== 0) {
      return (
        <Grid.Row textAlign="center">
          <Button animated="fade" style={{ borderStyle: 'solid', borderColor: this.state.textWorkcolor, backgroundColor: 'white', borderWidth: '1px' }} onClick={() => this.props.onEditClick(id)} >
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
          <font color={this.state.textAnotherDay}>- {this.state.lastholiday.dateName}</font>
        </Grid.Row>
      );
    }
    return (<Grid.Row style={{ height: '5em' }} />);
  }
  render() {
    return (
      <div>
        <PageHeader text="Timesheet" icon="calendar alternate" />
        <Progress percent={this.state.percent} active color={this.state.progressColor} progress />
        <Grid stackable doubling relaxed >
          <Grid.Row>
            <Grid.Column computer={8} >
              <Select placeholder="Year" defaultValue={parseInt(this.props.year, 10)} options={this.state.years} onChange={(e, { value }) => this.props.fetchTimesheet(this.props.userId, value, this.props.month)} />
              <Select style={{ marginLeft: '10px' }} placeholder="Month" defaultValue={this.props.month} options={this.state.months} onChange={(e, { value }) => this.props.fetchTimesheet(this.props.userId, this.props.year, value)} />
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button floated="right" onClick={() => history.push('/timesheet/new')} color="blue" >
                New Task
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table celled stackable fixed>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell colSpan="7"><font size="3">{moment.months()[this.props.month - 1]}</font> {this.props.year}</Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              {this.state.days.map(day => <Table.HeaderCell key={day}>{day}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>
          <Table.Body >
            {this.props.timesheets.map((timesheet, i) => (
              i % 7 === 0 &&
              <Table.Row key={timesheet.id} style={{ height: '10em' }} >
                {this.drawCell(moment(this.props.timesheets[i].date), this.props.timesheets[i].totalhours, this.props.timesheets[i].id)}
                {this.drawCell(moment(this.props.timesheets[i + 1].date), this.props.timesheets[i + 1].totalhours, this.props.timesheets[i + 1].id)}
                {this.drawCell(moment(this.props.timesheets[i + 2].date), this.props.timesheets[i + 2].totalhours, this.props.timesheets[i + 2].id)}
                {this.drawCell(moment(this.props.timesheets[i + 3].date), this.props.timesheets[i + 3].totalhours, this.props.timesheets[i + 3].id)}
                {this.drawCell(moment(this.props.timesheets[i + 4].date), this.props.timesheets[i + 4].totalhours, this.props.timesheets[i + 4].id)}
                {this.drawCell(moment(this.props.timesheets[i + 5].date), this.props.timesheets[i + 5].totalhours, this.props.timesheets[i + 5].id)}
                {this.drawCell(moment(this.props.timesheets[i + 6].date), this.props.timesheets[i + 6].totalhours, this.props.timesheets[i + 6].id)}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

Timesheet.propTypes = {
  timesheets: PropTypes.array.isRequired,
  leaves: PropTypes.array.isRequired,
  holidays: PropTypes.array.isRequired,
  fetchTimesheet: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired
};

export default Timesheet;
