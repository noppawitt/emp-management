import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchExamResultRequest } from '../../actions/viewResult';
import ViewResult from '../../components/ViewResult';
import Loader from '../../components/Loader';
// import getVisibleResult from '../../selectors/viewResult';

const ViewResultPage = ({ isFetching, results }) => (
  <div>
    {!isFetching ?
      <Loader /> :
      <ViewResult
        results={results}
        activeItem="String"
        handleClickTabular={() => console.log('EIEI')}
      />
    }
  </div>
);

ViewResultPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.viewResult.isFetching,
  results: state.viewResult.results,
});

const mapDispatchToProps = dispatch => ({
  fetchExamResult: cid => dispatch(fetchExamResultRequest(cid)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchExamResult } = this.props;
      fetchExamResult();
    }
  })
);

export default enhance(ViewResultPage);
