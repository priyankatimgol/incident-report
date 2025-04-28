import { apiRequest } from 'Services/API/ApiData';

export const getCheckListData = async ({ page, limit, data }) => {
  return apiRequest(`/CheckListUser/checklists/1/${page}/${limit}`, {
    method: 'post',
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCheckListData]:>> ', err);
      throw err;
    });
};

export const deleteCheckList = async (id) => {
  return apiRequest(`/CheckListUser/checklist/delete/${id}`, { method: 'put' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [deleteCheckList]:>> ', err);
      throw err;
    });
};

export const createCheckList = async (data) => {
  return apiRequest(`/CheckListUser/checklist/1`, { method: 'post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createCheckList]:>> ', err);
      throw err;
    });
};

export const getCheckList = async (id) => {
  return apiRequest(`/CheckListUser/checklist/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCheckList]:>> ', err);
      throw err;
    });
};

export const updateCheckList = async (id, data) => {
  return apiRequest(`/CheckListUser/checklist/${id}`, { method: 'put', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [updateCheckList]:>> ', err);
      throw err;
    });
};

export const getCheckListSortingList = async (data) => {
  return apiRequest(`/CheckListUser/checklist/filter`, { method: 'Post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCheckListSortingList]:>> ', err);
      throw err;
    });
};

export const getSectionListData = async (data) => {
  return apiRequest(`/Section/sections`, { method: 'post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCheckListData]:>> ', err);
      throw err;
    });
};
