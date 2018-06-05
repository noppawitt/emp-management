import React from 'react';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello: 'hello' };
  }

  render() {
    return (
      <div>
        Timesheet
        <br />
        { this.state.hello }
      </div>
    );
  }
}

export default Timesheet;
