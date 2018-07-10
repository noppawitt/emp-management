import React, { Component } from 'react';
import moment from 'moment';
import '../styles/TakeExamTimerStyle.css';

const paddingZero = (number) => {
  let stringNum = number.toString();
  const needZeroNum = 2 - stringNum.length;

  for (let i = 0; i < needZeroNum; i += 1) {
    stringNum = ('0').concat(stringNum);
  }
  return stringNum;
};

class TakeExamTimer extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: 'xx:xx:xx', timerStatus: 'normal' };

    this.endTime = this.props.startTime.clone().add({ hours: 2, seconds: 1 });
    this.countDown = this.countDown.bind(this);
    setInterval(this.countDown, 500);
  }

  countDown() {
    const current = moment();
    const timeLeftSecond = paddingZero(Math.abs(this.endTime.diff(current, 'seconds') % 60));
    const timeLeftMinute = paddingZero(Math.abs(this.endTime.diff(current, 'minutes') % 60));
    const timeLeftHour = paddingZero(Math.abs(this.endTime.diff(current, 'hours') % 60));
    let showTime = timeLeftHour
      .concat(':').concat(timeLeftMinute)
      .concat(':').concat(timeLeftSecond);
    let status = 'normal';
    if (this.endTime.diff(current) < 0) {
      showTime = ('-').concat(showTime);
      status = 'late';
    }
    else if (this.endTime.diff(current, 'seconds') <= 600) {
      status = 'warning';
    }
    this.setState({ timer: showTime, timerStatus: status });
  }

  render() {
    return (
      <h1 className={this.state.timerStatus}>{this.state.timer}</h1>
    );
  }
}

export default TakeExamTimer;
