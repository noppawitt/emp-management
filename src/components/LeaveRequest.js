import React from 'react';
import withAuth from '../containers/HOCs/withAuth';

const LeaveRequest = () => (
  <div>
    Leave Request
  </div>
);

export default withAuth(LeaveRequest);
