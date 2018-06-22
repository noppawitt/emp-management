import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { fetchExamRequest } from '../../actions/takeExam';

import TakeExam from '../../components/TakeExam';
// import Loader from '../../components/Loader';

// import { getVisibleExam } frim '../../selectors/TakeExam';

const TakeExamPage = () => (
  <TakeExam />
);

TakeExamPage.propTypes = {
  // validate type here
};

const mapStateToProps = () => ({
  // map variable from state here
});

const mapDispatchToProps = dispatch => ({
  fetchExam: () => dispatch(fetchExamRequest()),
  // map sfunction from dispatch here
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // edit this, maybe?
      const { fetchExam } = this.props;
      fetchExam();
    }
  })
);

export default enhance(TakeExamPage);
