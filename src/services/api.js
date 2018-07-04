const token = localStorage.getItem('token');

const callApi = (endpoint, request) => {
  if (request && request.body) {
    request.body = request.body instanceof FormData ? request.body : JSON.stringify(request.body);
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const requestWithHeaders = {
    ...{ headers },
    ...request
  };

  return fetch(endpoint, requestWithHeaders)
    .then(response => response.json().then(body => ({ response, body })))
    .then(({ response, body }) => {
      if (!response.ok) {
        return Promise.reject(body);
      }
      return Promise.resolve(body);
    });
};

const download = (endpoint, request) => {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const requestWithHeaders = {
    ...{ headers },
    ...request
  };

  return fetch(endpoint, requestWithHeaders)
    .then(response => response.blob().then(blob => ({ response, blob })))
    .then(({ response, blob }) => {
      if (!response.ok) {
        return Promise.reject();
      }
      return Promise.resolve(blob);
    });
};

const api = {};

// Auth

api.login = form => (
  callApi('/auth/login', {
    method: 'POST',
    body: form
  })
);

api.signup = form => (
  callApi('/auth/signup', {
    method: 'POST',
    body: form
  })
);

api.hello = () => (
  callApi('/api/hello')
);

// Master table

api.fetchDepartments = () => (
  callApi('/api/departments')
);

api.fetchPositions = () => (
  callApi('/api/positions')
);

api.fetchLevels = () => (
  callApi('/api/levels')
);

api.fetchContracts = () => (
  callApi('/api/contracts')
);

api.fetchUniversities = () => (
  callApi('/api/universities')
);

api.fetchDegrees = () => (
  callApi('/api/degrees')
);

api.fetchFaculties = () => (
  callApi('/api/faculties')
);

api.fetchMajors = () => (
  callApi('/api/majors')
);

api.fetchCertificates = () => (
  callApi('/api/certificates')
);

api.fetchAssets = () => (
  callApi('/api/assets')
);

api.fetchAssetTypes = () => (
  callApi('/api/asset-types')
);

api.fetchAcessTypes = () => (
  callApi('/api/access-control')
);

// Profile

api.fetchGeneralProfile = id => (
  callApi(`/api/employee-info?id=${id}`)
);

api.fetchWorkProfile = id => (
  callApi(`/api/employee-work?id=${id}`)
);

api.fetchEducationProfile = id => (
  callApi(`/api/educates?id=${id}`)
);

api.fetchCertificateProfile = id => (
  callApi(`/api/has-certificates?id=${id}`)
);

api.fetchAssetProfile = id => (
  callApi(`/api/has-assets?id=${id}`)
);

api.updateGeneralProfile = body => (
  callApi('/api/employee-info', {
    method: 'PUT',
    body
  })
);

api.updateWorkProfile = body => (
  callApi('/api/employee-work', {
    method: 'PUT',
    body
  })
);

api.updateEducationProfile = body => (
  callApi('/api/educates', {
    method: 'PUT',
    body
  })
);

api.updateCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'PUT',
    body
  })
);

api.updateAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'PUT',
    body
  })
);

api.createEducationProfile = body => (
  callApi('/api/educates', {
    method: 'POST',
    body
  })
);

api.createCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'POST',
    body
  })
);

api.createAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'POST',
    body
  })
);

api.updateProfilePicture = body => (
  callApi('/api/employee-info/upload-profile-img', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body
  })
);

api.deleteEducationProfile = body => (
  callApi('/api/educates', {
    method: 'DELETE',
    body
  })
);

api.deleteCertificateProfile = body => (
  callApi('/api/has-certificates', {
    method: 'DELETE',
    body
  })
);

api.deleteAssetProfile = body => (
  callApi('/api/has-assets', {
    method: 'DELETE',
    body
  })
);

// Employee

api.createEmployee = body => (
  callApi('/api/users', {
    method: 'POST',
    body
  })
);

api.fetchEmployee = () => (
  callApi('/api/users')
);

// Project

api.fetchProject = () => (
  callApi('/api/projects')
);

api.createProject = body => (
  callApi('/api/projects', {
    method: 'POST',
    body
  })
);

// Project detail

api.fetchProjectDetail = id => (
  callApi(`/api/projects/${id}`)
);

api.updateProjectDetail = body => (
  callApi('/api/projects', {
    method: 'PUT',
    body
  })
);

api.createMember = body => (
  callApi(`/api/has-projects`, {
    method: 'POST',
    body
  })
);

api.deleteMember = body => (
  callApi(`/api/has-projects`, {
    method: 'DELETE',
    body
  })
);

// Leave

api.createLeave = body => (
  callApi('/api/leave-request', {
    method: 'POST',
    body
  })
);

api.fetchLeave = (userId, year, month) => (
  callApi(`/api/leave-request?userId=${userId}&year=${year}&month=${month}`)
);

api.updateLeave = body => (
  callApi('/api/leave-request', {
    method: 'PUT',
    body
  })
);

// Timesheet

api.createTimesheet = body => (
  callApi('/api/timesheets', {
    method: 'POST',
    body
  })
);

api.fetchTimesheet = (userId, year, month) => (
  callApi(`/api/timesheets/?userId=${userId}&year=${year}&month=${month}`)
);

api.updateTimesheet = body => (
  callApi('/api/timesheets', {
    method: 'PUT',
    body
  })
);

api.deleteTimesheet = body => (
  callApi('/api/timesheets', {
    method: 'DELETE',
    body
  })
);

api.fetchHolidays = (year, month) => (
  callApi(`/api/holidays?year=${year}&month=${month}`)
);

// Report

api.fetchOwnProject = (userId, year, month) => (
  callApi(`/api/projects?userId=${userId}&year=${year}&month=${month}`)
);

api.downloadReport = (reportType, template, userId, projectId, year, month) => (
  download(`/api/report?reportType=${reportType}&template=${template}&userId=${userId}&projectId=${projectId}&year=${year}&month=${month}`)
);

export default api;
