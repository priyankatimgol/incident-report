import axios from 'axios';
//export const BaseURL = `http://216.48.180.83/api`;
//export const BaseURL = `https://perhfomsrv.vepsystem.com/ptw_backend/api`;
//export const BaseURL = `https://csi-mcr-md01.pcnrdmp.Local/ptw_backend/api`;
//export const BaseURL = `https://csi-mcr-md01.dmz.rdmp.Local/ptw_backend/api`;
const BaseUrl = localStorage.getItem('BaseUrl');
export const ApiGetNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseUrl + '/api' + type)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiPut = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseUrl + '/api' + type, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const apiRequest = (url, options = {}) => {
  const _options = {
    method: 'get',
    url: BaseUrl + '/api' + url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    ...options,
  };

  return new Promise((resolve, reject) => {
    axios(_options)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};
