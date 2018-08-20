import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchMasterTableRequest
} from '../../actions/masterTable';
import Loader from '../../components/Loader';
import MasterTable from '../../components/MasterTable';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

const MasterTablePage = ({ isFetching,
  masterTable,
  onAddAssetTypeClick,
  onAddCertificateClick,
  onAddContractClick,
  onAddDegreeClick,
  onAddDepartmentClick }) => (
    <div>
      {isFetching ? <Loader /> : <MasterTable
        masterTable={masterTable}
        onAddAssetTypeClick={onAddAssetTypeClick}
        onAddCertificateClick={onAddCertificateClick}
        onAddContractClick={onAddContractClick}
        onAddDegreeClick={onAddDegreeClick}
        onAddDepartmentClick={onAddDepartmentClick}
      />}
    </div>
);

MasterTablePage.defaultProps = {
  isFetching: true
};

MasterTablePage.propTypes = {
  isFetching: PropTypes.bool,
  masterTable: PropTypes.object.isRequired,
  onAddAssetTypeClick: PropTypes.func.isRequired,
  onAddCertificateClick: PropTypes.func.isRequired,
  onAddContractClick: PropTypes.func.isRequired,
  onAddDegreeClick: PropTypes.func.isRequired,
  onAddDepartmentClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.masterTable.isFetching,
  masterTable: state.masterTable
});

const mapDispatchToProps = dispatch => ({
  fetchMasterTable: () => dispatch(fetchMasterTableRequest()),
  onAddAssetTypeClick: () => dispatch(openModal(modalNames.ADD_ASSET_TYPE, { })),
  onAddCertificateClick: () => dispatch(openModal(modalNames.ADD_CERTIFICATE, { })),
  onAddContractClick: () => dispatch(openModal(modalNames.ADD_CONTRACT, { })),
  onAddDegreeClick: () => dispatch(openModal(modalNames.ADD_DEGREE, { })),
  onAddDepartmentClick: () => dispatch(openModal(modalNames.ADD_DEPARTMENT, { }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchMasterTable } = this.props;
      fetchMasterTable();
    }
  })
);

export default enhance(MasterTablePage);
