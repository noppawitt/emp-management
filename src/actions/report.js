import * as actionTypes from '../constants/actionTypes';

export const downloadReportRequest = (form, resolve, reject) => ({
  type: actionTypes.REPORT_DOWNLOAD_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const downloadReportSuccess = () => ({
  type: actionTypes.REPORT_DOWNLOAD_SUCCESS
});

export const downloadReportFailure = message => ({
  type: actionTypes.REPORT_DOWNLOAD_FAILURE,
  payload: {
    message
  }
});
