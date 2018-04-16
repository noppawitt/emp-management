import { getToken } from './auth';

const callApi = (endpoint, request) => {
  if (request && request.body) {
    request.body = JSON.stringify(request.body);
  }

  const token = getToken();

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

const profile = {
  id: 1,
  firstName: 'Noppawit',
  lastName: 'Thairungroj',
  nickName: 'Pee',
  citizenId: '99999999999',
  mobileNo: '0896614462',
  lineId: 'im.p',
  email: 'noppawit.trr@gmail.com',
  facebook: 'Noppawit Thairungroj',
  pictureSrc: '../images/image.png'
};

api.fetchProfile = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(profile);
  }, 1000);
});

export default api;
