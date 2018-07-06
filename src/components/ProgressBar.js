import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'rc-progress';
// import { Button } from 'semantic-ui-react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      increase: 0
    };
    this.increase = this.increase.bind(this);
  }

  componentDidMount() {
    this.state.increase = this.props.percent / 100;
    this.increase();
  }

  increase() {
    const percent = this.state.percent + this.state.increase;
    if (percent >= this.props.percent) {
      this.setState({ percent: this.props.percent });
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
        <div style={{ position: 'absolute', top: '45%', bottom: '0', left: '0', right: '0', fontSize: '0.95em', textAlign: 'center' }}>Day Hour<div style={{ fontSize: '0.85em' }}>remaining</div></div>
        <Circle strokeWidth="6" percent={this.state.percent} />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};

export default ProgressBar;
