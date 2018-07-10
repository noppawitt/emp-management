const callApi = (endpoint, request) => {
  if (request && request.body) {
    request.body = request.body instanceof FormData ? request.body : JSON.stringify(request.body);
  }

  const token = localStorage.getItem('token');

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

// Leave

api.createLeave = body => (
  callApi('/api/leave-request', {
    method: 'POST',
    body
  })
);

api.fetchLeave = () => (
  callApi('/api/leave-request')
);

api.updateLeave = body => (
  callApi('/api/leave-request', {
    method: 'PUT',
    body
  })
);

// Timesheet

api.fetchTimesheet = id => (
  callApi(`/api/timesheets/?id=${id}`)
);

// Recruitment

api.fetchAllRecruitment = () => (
  callApi(`/api/recruitments`)
);

api.checkPasswordStatus = id => (
  callApi(`/api/recruitments/checkPasswordStatus/?id=${id}`)
);

api.activatePassword = (id, lifetimes) => (
  callApi(`/api/recruitments/activatePassword/?id=${id}&lifetimes=${lifetimes}`)
);

api.uploadRandomExIdList = (randomExIdList, id) => (
  callApi(`/api/recruitments/uploadRandomExIdList/`, {
    method: 'POST',
    body: {
      randomExIdList,
      id,
    }
  })
);

// Exam

api.uploadImageExam = body => (
  callApi('/api/exam/upload-image-exam', {
    headers: {
      Authorization: ('Bearer ').concat(localStorage.getItem('token'))
    },
    method: 'POST',
    body
  })
);

api.addExam = body => (
  callApi('/api/exam', {
    method: 'POST',
    body
  })
);

api.fetchExam = () => (
  callApi('/api/exam')
);

api.deleteExam = body => (
  callApi('/api/exam', {
    method: 'DELETE',
    body
  })
);

api.editExam = body => (
  callApi('/api/exam', {
    method: 'PUT',
    body
  })
);

// view exam result

api.fetchExamResult = id => (
  callApi(`/api/viewresult/?id=${id}`)
);

// Exam Auth

api.signup = form => (
  callApi(`/examauth/signup`, {
    method: 'POST',
    body: form
  })
);

api.examLogin = form => (
  callApi(`/examauth/login`, {
    method: 'POST',
    body: form
  })
);

// Take Exam

// the ez one
api.fetchAllExam = () => (
  callApi(`/api/takeExam/fetchAllExam`)
);

// the real-one here
api.fetchEPRList = id => (
  callApi(`/api/takeExam/fetchEPRList/?id=${id}`)
);

api.fetchExamId = () => (
  callApi(`/api/takeExam/fetchExamId`)
);

api.fetchRandomExIdList = id => (
  callApi(`/api/takeExam/fetchRandomExIdList/?id=${id}`)
);

api.fetchExamSpecifyId = idList => (
  callApi(`/api/takeExam/fetchExamSpecifyId/`, {
    method: 'POST',
    body: {
      idList,
    },
  })
);

api.checkProgress = id => (
  callApi(`/api/takeExam/checkProgress/?id=${id}`)
);

api.uploadAnswer = (id, answerList) => (
  callApi(`/api/takeExam/uploadAnswer/`, {
    method: 'POST',
    body: {
      id,
      answerList,
    }
  })
);

api.updateStartTimeTakeExam = body => (
  callApi('/api/takeExam/updateStartTime/', {
    method: 'PUT',
    body
  })
);

export default api;
