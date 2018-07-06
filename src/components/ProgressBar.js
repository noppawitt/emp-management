import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'rc-progress';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      increase: 0,
      day: 0,
      hour: 0
    };
    this.increase = this.increase.bind(this);
  }

  componentDidMount() {
    this.state.increase = (this.props.percent / this.props.max);
    this.state.day = Math.floor(this.props.percent / 8);
    this.state.hour = this.props.percent % 8;
    this.increase();
  }

  increase() {
    const percent = this.state.percent + this.state.increase;
    if (percent >= this.props.percent * 100 / this.props.max) {
      this.setState({ percent: this.props.percent * 100 / this.props.max });
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 5);
  }

  render() {
    return (
      <div style={{ position: 'relative', margin: 'auto', width: '80%', fontSize: '150%' }}>
        <div style={{ textAlign: 'center', fontSize: '1.1em', marginBottom: '1em' }}>{this.props.type}</div>
        <div style={{ position: 'absolute', top: '45%', bottom: '0', left: '0', right: '0', fontSize: '0.95em', textAlign: 'center' }}>{this.state.day}Day {this.state.hour}Hour<div style={{ fontSize: '0.85em' }}>remaining</div></div>
        <Circle strokeWidth="6" percent={this.state.percent} />
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  percent: 0
};

ProgressBar.propTypes = {
  percent: PropTypes.number,
  type: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired
};

export default ProgressBar;
