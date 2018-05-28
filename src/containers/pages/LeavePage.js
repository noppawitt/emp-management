import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchLeaveRequest } from '../../actions/leave';
import Leave from '../../components/Leave';

const LeavePage = ({ leaves }) => (
  <Leave leaves={leaves} />
);

LeavePage.propTypes = {
  leaves: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  leaves: state.leave.lists
});

const mapDispatchToProps = dispatch => ({
  fetchLeave: () => dispatch(fetchLeaveRequest())
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchLeave } = this.props;
      fetchLeave();
    }
  })
);

export default enhance(LeavePage);
