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
  onAddAssetClick,
  onAddCertificateClick,
  onAddContractClick,
  onAddDegreeClick,
  onAddDepartmentClick,
  onAddFacultyClick,
  onAddLevelClick,
  onAddMajorClick,
  onAddPositionClick,
  onAddUniversityClick }) => (
    <div>
      {isFetching ? <Loader /> : <MasterTable
        masterTable={masterTable}
        onAddAssetTypeClick={onAddAssetTypeClick}
        onAddAssetClick={onAddAssetClick}
        onAddCertificateClick={onAddCertificateClick}
        onAddContractClick={onAddContractClick}
        onAddDegreeClick={onAddDegreeClick}
        onAddDepartmentClick={onAddDepartmentClick}
        onAddFacultyClick={onAddFacultyClick}
        onAddLevelClick={onAddLevelClick}
        onAddMajorClick={onAddMajorClick}
        onAddPositionClick={onAddPositionClick}
        onAddUniversityClick={onAddUniversityClick}
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
  onAddAssetClick: PropTypes.func.isRequired,
  onAddCertificateClick: PropTypes.func.isRequired,
  onAddContractClick: PropTypes.func.isRequired,
  onAddDegreeClick: PropTypes.func.isRequired,
  onAddDepartmentClick: PropTypes.func.isRequired,
  onAddFacultyClick: PropTypes.func.isRequired,
  onAddLevelClick: PropTypes.func.isRequired,
  onAddMajorClick: PropTypes.func.isRequired,
  onAddPositionClick: PropTypes.func.isRequired,
  onAddUniversityClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.masterTable.isFetching,
  masterTable: state.masterTable
});

const mapDispatchToProps = dispatch => ({
  fetchMasterTable: () => dispatch(fetchMasterTableRequest()),
  onAddAssetTypeClick: () => dispatch(openModal(modalNames.ADD_ASSET_TYPE, { })),
  onAddAssetClick: () => dispatch(openModal(modalNames.ADD_ASSET, { })),
  onAddCertificateClick: () => dispatch(openModal(modalNames.ADD_CERTIFICATE, { })),
  onAddContractClick: () => dispatch(openModal(modalNames.ADD_CONTRACT, { })),
  onAddDegreeClick: () => dispatch(openModal(modalNames.ADD_DEGREE, { })),
  onAddDepartmentClick: () => dispatch(openModal(modalNames.ADD_DEPARTMENT, { })),
  onAddFacultyClick: () => dispatch(openModal(modalNames.ADD_FACULTY, { })),
  onAddLevelClick: () => dispatch(openModal(modalNames.ADD_LEVEL, { })),
  onAddMajorClick: () => dispatch(openModal(modalNames.ADD_MAJOR, { })),
  onAddPositionClick: () => dispatch(openModal(modalNames.ADD_POSITION, { })),
  onAddUniversityClick: () => dispatch(openModal(modalNames.ADD_UNIVERSITY, { }))
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
