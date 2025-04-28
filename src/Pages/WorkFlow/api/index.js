import { apiRequest } from 'Services/API/ApiData';

export const getWorkFlowsList = async (page, limit) => {
  return apiRequest(`/WorkFlow/GetWorkFlowList/0/1/20`, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkFlowsList]:>> ', err);
      throw err;
    });
};

export const deleteWorkFlow = async (id) => {
  return apiRequest(`/WorkFlow/DeleteWF/${id}`, { method: 'post' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [deleteWorkFlow]:>> ', err);
      throw err;
    });
};

export const createWorkFlow = async (data) => {
  return apiRequest(`/WorkFlow/CreateWF`, { method: 'post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createWorkFlow]:>> ', err);
      throw err;
    });
};

export const getWorkFlow = async (id) => {
  return apiRequest(`/WorkFlow/GetWorkFlowList/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkFlow]:>> ', err);
      throw err;
    });
};

export const updateWorkFlow = async (id, data) => {
  return apiRequest(`/WorkFlow/EditWF/${id}`, { method: 'post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [updateWorkFlow]:>> ', err);
      throw err;
    });
};
