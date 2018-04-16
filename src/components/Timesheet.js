import React from 'react';
import withAuth from '../containers/HOCs/withAuth';

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

export default withAuth(Timesheet);
