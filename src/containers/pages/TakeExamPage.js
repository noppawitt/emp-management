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
  eprList,
  onClickTestButton,
  examObject }) =>
  (
    isFetching ?
      <Loader /> :
      <TakeExam
        id={id}
        activeItem={activeItem}
        onClickActiveItem={onClickActiveItem}
        eprList={eprList}
        onClickTestButton={onClickTestButton}
        examObject={examObject}
      />
  );

TakeExamPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  onClickActiveItem: PropTypes.func.isRequired,
  eprList: PropTypes.array.isRequired,
  onClickTestButton: PropTypes.func.isRequired,
  examObject: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.takeExam.isFetching,
  id: state.examAuth.id,
  activeItem: state.takeExam.activeItem,
  eprList: state.takeExam.erpList,
  examObject: state.takeExam.examObject,
});

const mapDispatchToProps = dispatch => ({
  // fetchTakeExam: id => dispatch(fetchTakeExamRequest(id)),
  onClickActiveItem: item => dispatch(changeActiveItem(item)),
  onClickTestButton: () => dispatch(fetchTakeExamRequest('1234567890151')),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // const { fetchTakeExam } = this.props;
      // fetchTakeExam();
      const { onClickTestButton } = this.props;
      onClickTestButton();
    }
  })
);

export default enhance(TakeExamPage);
