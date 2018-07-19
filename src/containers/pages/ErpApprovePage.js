import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchErpApproveRequest,
  approveErpRequest,
  commentChange,
  deleteComment,
  changePagination
} from '../../actions/erpapprove';
import {
  generateExcel
} from '../../actions/erp';
import { openModal, closeModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Loader from '../../components/Loader';
import ErpApprove from '../../components/ErpApprove';

const ErpPage = ({ isFetching, erpApprove, onApproveClick, onRejectClick, commentHandleChange, nowComment, clearComment, genExcel, onClose, activePage, handlePaginationChange }) => (
  <div>
    {console.log(activePage)}
    {isFetching ? <Loader /> : <ErpApprove
      erpApprove={erpApprove}
      onApproveClick={onApproveClick}
      onRejectClick={onRejectClick}
      commentHandleChange={commentHandleChange}
      nowComment={nowComment}
      clearComment={clearComment}
      genExcel={genExcel}
      onClose={onClose}
      activePage={activePage}
      handlePaginationChange={handlePaginationChange}
    />}
  </div>
);

ErpPage.defaultProps = {
  isFetching: true,
};

ErpPage.propTypes = {
  isFetching: PropTypes.bool,
  erpApprove: PropTypes.array.isRequired,
  onApproveClick: PropTypes.func.isRequired,
  onRejectClick: PropTypes.func.isRequired,
  commentHandleChange: PropTypes.func.isRequired,
  nowComment: PropTypes.string.isRequired,
  clearComment: PropTypes.func.isRequired,
  genExcel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.erpapprove.isFetching,
  erpApprove: [...state.erpapprove.lists],
  activePage: state.erpapprove.activePage,
  nowComment: state.erpapprove.comment,
});

const mapDispatchToProps = dispatch => ({
  fetchErpApprove: () => dispatch(fetchErpApproveRequest()),
  onApproveClick: (approveId, value) => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Approve confirmation',
    description: 'Are you sure to approve this request ?',
    onConfirm: () => dispatch(approveErpRequest(approveId, value))
  })),
  onRejectClick: approveId => dispatch(openModal(modalNames.ERPAPPROVE_REJECT, { id: approveId })),
  handlePaginationChange: (e, { activePage }) => dispatch(changePagination(activePage)),
  commentHandleChange: value => dispatch(commentChange(value)),
  clearComment: () => dispatch(deleteComment()),
  genExcel: id => dispatch(generateExcel(id)),
  onClose: () => dispatch(closeModal()),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchErpApprove } = this.props;
      fetchErpApprove();
    }
  })
);

export default enhance(ErpPage);
