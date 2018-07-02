import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchTakeExamRequest,
  changeActiveItem
} from '../../actions/takeExam';
import TakeExam from '../../components/TakeExam';
import Loader from '../../components/Loader';
// import { getVisibleExam } from '../../selectors/TakeExam';

const TakeExamPage = ({
  isFetching,
  id,
  activeItem,
  onClickActiveItem,
  position,
  category,
  subCategory,
  examObject }) =>
  (
    isFetching ?
      <Loader /> :
      <TakeExam
        id={id}
        activeItem={activeItem}
        onClickActiveItem={onClickActiveItem}
        position={position}
        categoryList={category}
        subCategoryList={subCategory}
        examObject={examObject}
      />
  );

TakeExamPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  onClickActiveItem: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  subCategory: PropTypes.array.isRequired,
  examObject: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.takeExam.isFetching,
  id: state.examAuth.id,
  activeItem: state.takeExam.activeItem,
  position: state.takeExam.position,
  category: state.takeExam.category,
  subCategory: state.takeExam.subCategory,
  examObject: state.takeExam.examObject,
});

const mapDispatchToProps = dispatch => ({
  // fetchTakeExam: id => dispatch(fetchTakeExamRequest(id)),
  fetchTakeExam: () => dispatch(fetchTakeExamRequest('1234567890191')),
  onClickActiveItem: item => dispatch(changeActiveItem(item)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchTakeExam } = this.props;
      fetchTakeExam();
    }
  })
);

export default enhance(TakeExamPage);
