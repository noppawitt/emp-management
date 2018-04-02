import React from 'react';
import withAuth from '../containers/HOCs/withAuth';
import api from '../services/api';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello: '' };
  }

  componentDidMount() {
    api.hello()
      .then((response) => {
        this.setState({ hello: response.text });
      });
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
