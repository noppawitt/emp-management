import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchExamResultRequest, changeActiveItemRequest } from '../../actions/viewResult';
import ViewResult from '../../components/ViewResult';
import Loader from '../../components/Loader';

const eprList = [
  { key: 0, category: 'Logic', subCategory: 'Fundamental', type: 'choices', requiredNumber: 5, points: '29/30' },
  { key: 1, category: 'Logic', subCategory: 'Supplementary', type: 'choices', requiredNumber: 10, points: '29/30' },
  { key: 2, category: 'Security', subCategory: 'Fundamental', type: 'choices', requiredNumber: 5, points: '29/30' },
  { key: 3, category: 'Security', subCategory: 'Supplementary', type: 'choices', requiredNumber: 5, points: '29/30' },
];

const ViewResultPage = ({ isFetching, results, activeItem, changeActiveItem }) => (
  <div>
    {!isFetching ?
      <Loader /> :
      <ViewResult
        results={results}
        activeItem={activeItem}
        changeActiveItem={changeActiveItem}
        eprList={eprList}
      />
    }
  </div>
);

ViewResultPage.propTypes = {
  activeItem: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
  changeActiveItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activeItem: state.viewResult.activeItem,
  isFetching: state.viewResult.isFetching,
  results: state.viewResult.results,
});

const mapDispatchToProps = dispatch => ({
  fetchExamResult: cid => dispatch(fetchExamResultRequest(cid)),
  changeActiveItem: item => dispatch(changeActiveItemRequest(item)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // const { fetchExamResult } = this.props;
      // fetchExamResult();
    }
  })
);

export default enhance(ViewResultPage);
