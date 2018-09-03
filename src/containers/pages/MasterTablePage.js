import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchMasterTableRequest,
  deleteAssetTypeRequest,
  deleteAssetRequest,
  deleteCertificateRequest,
  deleteContractRequest,
  deleteDegreeRequest,
  deleteDepartmentRequest,
  deleteFacultyRequest,
  deleteLevelRequest,
  deleteMajorRequest,
  deletePositionRequest,
  deleteUniversityRequest
} from '../../actions/masterTable';
import Loader from '../../components/Loader';
import MasterTable from '../../components/MasterTable';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

const MasterTablePage = ({ isFetching,
  masterTable,
  onAddAssetTypeClick,
  onDeleteAssetTypeClick,
  onAddAssetClick,
  onDeleteAssetClick,
  onAddCertificateClick,
  onDeleteCertificateClick,
  onAddContractClick,
  onDeleteContractClick,
  onAddDegreeClick,
  onDeleteDegreeClick,
  onAddDepartmentClick,
  onDeleteDepartmentClick,
  onAddFacultyClick,
  onDeleteFacultyClick,
  onAddLevelClick,
  onDeleteLevelClick,
  onAddMajorClick,
  onDeleteMajorClick,
  onAddPositionClick,
  onDeletePositionClick,
  onAddUniversityClick,
  onDeleteUniversityClick }) => (
    <div>
      {isFetching ? <Loader /> : <MasterTable
        masterTable={masterTable}
        onAddAssetTypeClick={onAddAssetTypeClick}
        onDeleteAssetTypeClick={onDeleteAssetTypeClick}
        onAddAssetClick={onAddAssetClick}
        onDeleteAssetClick={onDeleteAssetClick}
        onAddCertificateClick={onAddCertificateClick}
        onDeleteCertificateClick={onDeleteCertificateClick}
        onAddContractClick={onAddContractClick}
        onDeleteContractClick={onDeleteContractClick}
        onAddDegreeClick={onAddDegreeClick}
        onDeleteDegreeClick={onDeleteDegreeClick}
        onAddDepartmentClick={onAddDepartmentClick}
        onDeleteDepartmentClick={onDeleteDepartmentClick}
        onAddFacultyClick={onAddFacultyClick}
        onDeleteFacultyClick={onDeleteFacultyClick}
        onAddLevelClick={onAddLevelClick}
        onDeleteLevelClick={onDeleteLevelClick}
        onAddMajorClick={onAddMajorClick}
        onDeleteMajorClick={onDeleteMajorClick}
        onAddPositionClick={onAddPositionClick}
        onDeletePositionClick={onDeletePositionClick}
        onAddUniversityClick={onAddUniversityClick}
        onDeleteUniversityClick={onDeleteUniversityClick}
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
  onDeleteAssetTypeClick: PropTypes.func.isRequired,
  onAddAssetClick: PropTypes.func.isRequired,
  onDeleteAssetClick: PropTypes.func.isRequired,
  onAddCertificateClick: PropTypes.func.isRequired,
  onDeleteCertificateClick: PropTypes.func.isRequired,
  onAddContractClick: PropTypes.func.isRequired,
  onDeleteContractClick: PropTypes.func.isRequired,
  onAddDegreeClick: PropTypes.func.isRequired,
  onDeleteDegreeClick: PropTypes.func.isRequired,
  onAddDepartmentClick: PropTypes.func.isRequired,
  onDeleteDepartmentClick: PropTypes.func.isRequired,
  onAddFacultyClick: PropTypes.func.isRequired,
  onDeleteFacultyClick: PropTypes.func.isRequired,
  onAddLevelClick: PropTypes.func.isRequired,
  onDeleteLevelClick: PropTypes.func.isRequired,
  onAddMajorClick: PropTypes.func.isRequired,
  onDeleteMajorClick: PropTypes.func.isRequired,
  onAddPositionClick: PropTypes.func.isRequired,
  onDeletePositionClick: PropTypes.func.isRequired,
  onAddUniversityClick: PropTypes.func.isRequired,
  onDeleteUniversityClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.masterTable.isFetching,
  masterTable: state.masterTable
});

const mapDispatchToProps = dispatch => ({
  fetchMasterTable: () => dispatch(fetchMasterTableRequest()),
  onAddAssetTypeClick: () => dispatch(openModal(modalNames.ADD_ASSET_TYPE, { })),
  onDeleteAssetTypeClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this asset type?',
    onConfirm: () => dispatch(deleteAssetTypeRequest(id))
  })),
  onAddAssetClick: () => dispatch(openModal(modalNames.ADD_ASSET, { })),
  onDeleteAssetClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this asset?',
    onConfirm: () => dispatch(deleteAssetRequest(id))
  })),
  onAddCertificateClick: () => dispatch(openModal(modalNames.ADD_CERTIFICATE, { })),
  onDeleteCertificateClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this certificate?',
    onConfirm: () => dispatch(deleteCertificateRequest(id))
  })),
  onAddContractClick: () => dispatch(openModal(modalNames.ADD_CONTRACT, { })),
  onDeleteContractClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this contract?',
    onConfirm: () => dispatch(deleteContractRequest(id))
  })),
  onAddDegreeClick: () => dispatch(openModal(modalNames.ADD_DEGREE, { })),
  onDeleteDegreeClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this degree?',
    onConfirm: () => dispatch(deleteDegreeRequest(id))
  })),
  onAddDepartmentClick: () => dispatch(openModal(modalNames.ADD_DEPARTMENT, { })),
  onDeleteDepartmentClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this department?',
    onConfirm: () => dispatch(deleteDepartmentRequest(id))
  })),
  onAddFacultyClick: () => dispatch(openModal(modalNames.ADD_FACULTY, { })),
  onDeleteFacultyClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this faculty?',
    onConfirm: () => dispatch(deleteFacultyRequest(id))
  })),
  onAddLevelClick: () => dispatch(openModal(modalNames.ADD_LEVEL, { })),
  onDeleteLevelClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this level?',
    onConfirm: () => dispatch(deleteLevelRequest(id))
  })),
  onAddMajorClick: () => dispatch(openModal(modalNames.ADD_MAJOR, { })),
  onDeleteMajorClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this major?',
    onConfirm: () => dispatch(deleteMajorRequest(id))
  })),
  onAddPositionClick: () => dispatch(openModal(modalNames.ADD_POSITION, { })),
  onDeletePositionClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this position?',
    onConfirm: () => dispatch(deletePositionRequest(id))
  })),
  onAddUniversityClick: () => dispatch(openModal(modalNames.ADD_UNIVERSITY, { })),
  onDeleteUniversityClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this university?',
    onConfirm: () => dispatch(deleteUniversityRequest(id))
  }))
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
