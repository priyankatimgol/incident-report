import { apiRequest } from 'Services/API/ApiData';

export const getData = async () => {
  return apiRequest(`/section/workflow/sections`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCheckListData]:>> ', err);
      throw err;
    });
};
export const getSectionSequence = async (wfId) => {
  return apiRequest(`/section/workflow/sections/${wfId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getSectionSequence]:>> ', err);
      throw err;
    });
};

export const saveSectionList = async (data) => {
  return apiRequest(`/section/workflow/sections/sequence`, { method: 'put', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getSectionSequence]:>> ', err);
      throw err;
    });
};
export const getSectionSequencefilterdata = async (id) => {
  return apiRequest(`/section/workflow/allsections/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getSectionSequencefilterdata]:>> ', err);
      throw err;
    });
};
