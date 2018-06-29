import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchTakeExamRequest,
  changeActiveItemRequest
} from '../../actions/takeExam';
import TakeExam from '../../components/TakeExam';
import Loader from '../../components/Loader';
// import { getVisibleExam } from '../../selectors/TakeExam';

const TakeExamPage = ({
  isFetching,
  cid,
  activeItem,
  changeActiveMenuItem,
  eprList }) =>
  (
    !isFetching ?
      <Loader /> :
      <TakeExam
        cid={cid}
        activeItem={activeItem}
        changeActiveMenuItem={changeActiveMenuItem}
        eprList={eprList}
      />
  );

TakeExamPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  cid: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  changeActiveMenuItem: PropTypes.func.isRequired,
  eprList: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.takeExam.isFetching,
  cid: state.takeExam.cid,
  activeItem: state.takeExam.activeItem,
  eprList: state.takeExam.erpList,
});

const mapDispatchToProps = dispatch => ({
  fetchTakeExam: () => dispatch(fetchTakeExamRequest()),
  // map sfunction from dispatch here
  changeActiveMenuItem: item => dispatch(changeActiveItemRequest(item)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // edit this, maybe?
      const { fetchTakeExam } = this.props;
      fetchTakeExam();
    }
  })
);

export default enhance(TakeExamPage);
