import * as actionTypes from '../constants/actionTypes';

export const downloadReportRequest = ({ reportType, template, userId, projectId, year, month }) => ({
  type: actionTypes.REPORT_DOWNLOAD_REQUEST,
  payload: {
    reportType,
    template,
    userId,
    projectId,
    year,
    month
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

export const fetchOwnProjectRequest = (userId, year, month) => ({
  type: actionTypes.OWN_PROJECT_FETCH_REQUEST,
  payload: {
    userId,
    year,
    month,
  }
});

export const fetchOwnProjectSuccess = projects => ({
  type: actionTypes.OWN_PROJECT_FETCH_SUCCESS,
  payload: {
    projects
  }
});

export const fetchOwnProjectFailure = message => ({
  type: actionTypes.OWN_PROJECT_FETCH_FAILURE,
  payload: {
    message
  }
});
