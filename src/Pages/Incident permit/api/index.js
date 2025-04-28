import { apiRequest } from 'Services/API/ApiData';

export const getIncidentPermitData = async (id) => {
  return apiRequest(`/incidentmgmt/incident/${id}`, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitData]:>> ', err);
      throw err;
    });
};

export const deleteIncidentPermit = async (id) => {
  return apiRequest(`/incidentmgmt/incident/delete/${id}`, { method: 'put' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [deleteWorkPermit]:>> ', err);
      throw err;
    });
};

export const createIncidentPermit = async (data,processId) => {
  return await apiRequest(`/incidentmgmt/incident/7/${processId}`, { method: 'post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createWorkPermit]:>> ', err);
      throw err;
    });
};

export const getIncidentPermitList = async (data) => {
  return apiRequest(`/incidentmgmt/incident`, {
    method: 'post',
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitData]:>> ', err);
      throw err;
    });
};
export const getIncidentPermitCloseList = async (data) => {
  return apiRequest(`/incidentmgmt/closedincident`, {
    method: 'post',
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getIncidentPermitCloseList]:>> ', err);
      throw err;
    });
};
export const updateInceidentPermit = async (incidentPermitId, data) => {
  return apiRequest(`/incidentmgmt/incident/${incidentPermitId}`, { method: 'put', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitData]:>> ', err);
      throw err;
    });
};

export const getLocationlist = async (data) => {
  return await apiRequest(`/incidentmgmt/incident/location`, { method: 'Get', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createWorkPermit]:>> ', err);
      throw err;
    });
};

export const getIncidentcategory = async (data) => {
  return await apiRequest(`/incidentmgmt/incident/category`, { method: 'Get', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createWorkPermit]:>> ', err);
      throw err;
    });
};

export const SortIncidentpermit = async (data) => {
  return await apiRequest(`/incidentmgmt/incident/filter`, { method: 'Post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createWorkPermit]:>> ', err);
      throw err;
    });
};
export const getWorkPermitLocations = async (area,{ workPermitId }) => {
  return apiRequest(`/incidentmgmt/incident/locations/${area}`)
    .then((res) => {
      return res.data.responseObject
        .filter((_) => _.incLocation && _.id !== workPermitId)
        .filter((val) => val.incLocation !== 'Pune')
        .map((_) => ({ ..._, ...JSON.parse(_.incLocation), title: _.title }));
    })
    .catch((err) => {
      console.log('err [getWorkPermitLocations]:>> ', err);
      throw err;
    });
};

export const getCommentList = async (incidentpermitID) => {
  return await apiRequest(`/WorkPermit/instance/comment/${incidentpermitID}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCommentList]:>> ', err);
      throw err;
    });
};

export const getAuditList = async (workPermitId) => {
  return await apiRequest(`/incidentmgmt/incident/audittrial/${workPermitId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCommentList]:>> ', err);
      throw err;
    });
};

export const getCheckListForPermitType = async (permitId) => {
  return apiRequest(`/Section/sectionpermit/${permitId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitData]:>> ', err);
      throw err;
    });
};
export const closesectionpermit = async (permitId, workPermitId) => {
  return apiRequest(`/Section/closesectionpermit/${permitId}/${workPermitId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitData]:>> ', err);
      throw err;
    });
};
export const getStatusDetailsType = async ({ permitId }) => {
  return apiRequest(`/Master/statustypes/1`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitData]:>> ', err);
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

export const getSectionList = async (permitId) => {
  return await apiRequest(`/Section/sectionpermit/${permitId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCommentList]:>> ', err);
      throw err;
    });
};

export const getCalculationRisk = async (permitId) => {
  return await apiRequest(`/checklistuser/checklist/619ebbaa-88e7-4de3-9eb5-a67aebce007f`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getCommentList]:>> ', err);
      throw err;
    });
};

export const submitToValidation = async ({ workPermitId, statusId, comment, file }) => {
  let data = {
    workPermitId,
    // userId: userId.toString(),
    statusId: statusId.toString(),
    StatusCondition: comment,
    Signature: file,
  };
  return apiRequest(`/ProcessStep/RequestApproved`, {
    method: 'put',
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [submitToValidation]:>> ', err);
      throw err;
    });
};
export const dynamicButton = async (requestId) => {
  return await apiRequest(`/WorkPermit/currentstatus/${requestId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createWorkPermit]:>> ', err);
      throw err;
    });
};
export const getusersection = async (requestId) => {
  return await apiRequest(`/WorkPermit/checkapproval/${requestId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createWorkPermit]:>> ', err);
      throw err;
    });
};

export const getSignatureValue = async (data) => {
  return await apiRequest(`/workpermit/getSignatureByUserCD`, { method: 'Post', data })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
