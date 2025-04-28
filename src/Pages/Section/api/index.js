import { apiRequest } from 'Services/API/ApiData';

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
export const getCheckListData = async (data) => {
  return apiRequest(`/Checklistuser/checklist/filter`, { method: 'post', data })
    .then((res) => {
      return res;
    })

    .catch((err) => {
      console.log('err [getCheckListData]:>> ', err);
      throw err;
    });
};

export const createSection = async (data, usercode) => {
  return apiRequest(`/Section/section/${usercode} `, { method: 'post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createsection]:>> ', err);
      throw err;
    });
};

export const deleteSection = async (sectionid) => {
  return apiRequest(`/Section/section/delete/${sectionid}`, { method: 'put' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [deletesection]:>> ', err);
      throw err;
    });
};
export const getSection = async (sectionid) => {
  return apiRequest(`/Section/section/${sectionid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getsection]:>> ', err);
      throw err;
    });
};

export const updateSectionList = async (sectionId, data) => {
  return apiRequest(`/Section/section/1`, { method: 'put', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [updatesectionlist]:>> ', err);
      throw err;
    });
};
