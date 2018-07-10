import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import moment from 'moment';

const paddingZero = (number) => {
  let stringNum = number.toString();
  let needZeroNum = 0;
  if (number >= 0) {
    needZeroNum = 2 - stringNum.length;
  }
  else {
    needZeroNum = 3 - stringNum.length;
  }

  for (let i = 0; i < needZeroNum; i += 1) {
    stringNum = (number >= 0)
      ? ('0').concat(stringNum)
      : stringNum.slice(0, 1).concat('0').concat(stringNum.slice(1));
  }
  return stringNum;
};

class TakeExamTimer extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: 'xx:xx:xx' };

    this.endTime = this.props.startTime.clone().add({ hours: 2, seconds: 1 });
    this.countDown = this.countDown.bind(this);
    setInterval(this.countDown, 500);
  }

  countDown() {
    const current = moment();
    const timeLeftSecond = paddingZero(this.endTime.diff(current, 'seconds') % 60);
    const timeLeftMinute = paddingZero(this.endTime.diff(current, 'minutes') % 60);
    const timeLeftHour = paddingZero(this.endTime.diff(current, 'hours') % 60);
    const showTime = timeLeftHour
      .concat(':').concat(timeLeftMinute)
      .concat(':').concat(timeLeftSecond);
    this.setState({ timer: showTime });
  }

  render() {
    return (
      <Grid.Column width={6} style={{ textAlign: 'right' }} >
        <Header as="h1">{this.state.timer}&nbsp;&nbsp;&nbsp;</Header>
      </Grid.Column>
    );
  }
}

export default TakeExamTimer;
