import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchErpDetailRequest,
  // updateErpRequest
} from '../../actions/erpdetail';
// import { Field, reduxForm, reset } from 'redux-form';
// import { Form } from 'semantic-ui-react';
// import * as validator from '../../utils/validator';

const detailInsert = erps => (
  <div>
    {console.log(erps)}
  </div>

);
// detailInsert.propTypes = {
//   // isFetching: PropTypes.bool,
//   // erps: PropTypes.array.isRequired,
//   // onAddClick: PropTypes.func.isRequired,
//   // onCancelClick: PropTypes.func.isRequired,
//   // firstname: PropTypes.string.isRequired
// };
const mapStateToProps = state => ({
  erps: [...state.erp.lists]
});

const mapDispatchToProps = dispatch => ({
  fetchErpDetail: () => dispatch(fetchErpDetailRequest()),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchErpDetail } = this.props;
      fetchErpDetail();
    }
  })
);
export default enhance(detailInsert);

