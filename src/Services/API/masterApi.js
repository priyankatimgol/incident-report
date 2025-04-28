import { apiRequest } from 'Services/API/ApiData';

export const getWorkFlowList = async (newid) => {
  return apiRequest(`/Master/workflowtypes/${newid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkFlowList]:>> ', err);
      throw err;
    });
};
export const getWorkFlowListApplicable = async () => {
  return apiRequest(`/Master/workflowtypes/2`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkFlowListApplicable]:>> ', err);
      throw err;
    });
};
export const getAssetList = async () => {
  return apiRequest(`/Master/assets`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getApplicableList]:>> ', err);
      throw err;
    });
};

export const getTypeList = async () => {
  return apiRequest(`/Master/type`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getApplicableList]:>> ', err);
      throw err;
    });
};
export const getSubtypeList = async () => {
  return apiRequest(`/Master/subtypes`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getApplicableList]:>> ', err);
      throw err;
    });
};
// export const getAreaList = async () => {
//   return apiRequest(`/Master/areas`)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.log('err [getApplicableList]:>> ', err);
//       throw err;
//     });
// };
export const getAreaList = async (newid) => {
  return apiRequest(`/Master/getPlotLocationAreas/${newid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getApplicableList]:>> ', err);
      throw err;
    });
};
export const getApplicantsList = async () => {
  return apiRequest(`/Master/applicants`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getApplicableList]:>> ', err);
      throw err;
    });
};

export const getWorkPermitStatuses = async () => {
  return apiRequest(`/Master/statuslimit/2`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};
export const getWorkPermitStatusesid = async (id) => {
  return apiRequest(`/Master/statuslimit/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatusesid]:>> ', err);
      throw err;
    });
};

export const getInceidentSite = async () => {
  return apiRequest(`/Master/incidentsite`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const getIncidentShift = async () => {
  return apiRequest(`/Master/incidentshift`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const getIncidentInvolved = async () => {
  return apiRequest(`/Master/incidentinvolved`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const getIncidentSavirity = async () => {
  return apiRequest(`/Master/incidentseverity`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const getPotentialSaverity = async () => {
  return apiRequest(`/Master/potentialseverity`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const getBusinessUnit = async () => {
  return apiRequest(`/Master/businessunit/incident`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const users = async () => {
  return apiRequest(`/Master/allusers`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [users]:>> ', err);
      throw err;
    });
};

export const getreportedby = async (e) => {
  return apiRequest(`/Master/userdetails?search=${e}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [users]:>> ', err);
      throw err;
    });
};
export const notificationData = async (e) => {
  return apiRequest(`/Master/notifications/Incident`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [users]:>> ', err);
      throw err;
    });
};
export const notificationDataCount = async (e) => {
  return apiRequest(`/Master/notificationcounts/Incident`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [notificationDataCount]:>> ', err);
      throw err;
    });
};

export const getWorkpermitArea = async (id) => {
  return apiRequest(`/Master/getPlotLocationImages/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [WorkPermitareaNotFound]:>> ', err);
      console.log('err [getPlotLocationlist]:>> ', err);
      throw err;
    });
};
export const notificationRead = async (requestid) => {
  return apiRequest(`/Master/notificationdisable/${requestid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [notificationRead]:>> ', err);
      throw err;
    });
};

export const getsSerchList = async (e) => {
  return apiRequest(`/Master/searchnodes?DisplayName=${e}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getsSerchList]:>> ', err);
      throw err;
    });
};
export const asetvalidInvalid = async (data) => {
  return apiRequest(`/Master/userasset/${data}/WP-CREATOR`, {
    method: 'get',
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [asseterror]:>> ', err);
      throw err;
    });
};
export const getApplicantdatalist = async (e) => {
  return apiRequest(`/Master/userdetails`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [users]:>> ', err);
      throw err;
    });
};
export const getUserRole = async (e) => {
  return apiRequest(`/Master/uroles`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [users]:>> ', err);
      throw err;
    });
};

export const getUserTooltipData = async (assetId, userRole) => {
  return apiRequest(`/master/usernames/${assetId}/${userRole}`, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getUserTooltipData failed]:>> ', err);
      throw err;
    });
};
export const updateLanguage = async (value) => {
  return apiRequest(`/Master/languageupdate/${value}`, { method: 'put' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [updateLanguage]:>> ', err);
      throw err;
    });
};
export const getLanguage = async (e) => {
  return apiRequest(`/Master/language`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getLanguage]:>> ', err);
      throw err;
    });
};

export const getInceidentDepartmentValue = async () => {
  return apiRequest(`/Master/incidentdepartment`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const getPermitTypes = async () => {
  return apiRequest(`/master/permittypes`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const getPermitType = async () => {
  return apiRequest(`/Master/permittypes/workflow`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkPermitStatuses]:>> ', err);
      throw err;
    });
};

export const getworkorderdata = async () => {
  return apiRequest(`/Master/workorders`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getworkorderdata]:>> ', err);
      throw err;
    });
};

export const getzonedata = async () => {
  return apiRequest(`/master/wpzone`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getzonedata]:>> ', err);
      throw err;
    });
};
export const getsystemdata = async () => {
  return apiRequest(`/master/wpsystem`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getsystemdata]:>> ', err);
      throw err;
    });
};
export const getdisciplinedata = async () => {
  return apiRequest(`/master/wpdiscipline`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getsystemdata]:>> ', err);
      throw err;
    });
};

export const getstatusprocess = async (processid) => {
  return apiRequest(`/Master/statusprocess/${processid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [notificationDataCount]:>> ', err);
      throw err;
    });
};

export const getRoleProcess = async (processid) => {
  return apiRequest(`/Master/statusprocess/${processid}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getRoleProcess]:>> ', err);
      throw err;
    });
};

export const saveEmaildata = async (data) => {
  return apiRequest(`/Master/schedule`, { method: 'post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [saveEmaildata]:>> ', err);
      throw err;
    });
};

export const getPlotLocationlist = async (page, limit) => {
  return apiRequest(`/Master/getallplotlocations`, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getPlotLocationlist]:>> ', err);
      throw err;
    });
};

export const getPlotLocationData = async (id) => {
  return apiRequest(`/Master/getplotlocationbyid/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getPlotLocationData]:>> ', err);
      throw err;
    });
};
export const createPlotLocation = async (data) => {
  return apiRequest(`/Master/plotlocation`, { method: 'post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createsection]:>> ', err);
      throw err;
    });
};
export const deletePlotLocation = async (id) => {
  return apiRequest(`/Master/deletePlotLocation/${id}`, { method: 'put' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [createsection]:>> ', err);
      throw err;
    });
};

export const updatePlotLocation = async (data, id) => {
  return apiRequest(`/Master/plotlocation/${id}`, {
    method: 'put',
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [updatesectionlist]:>> ', err);
      throw err;
    });
};

export const CreateProcess = async (data) => {
  return apiRequest(`/Master/processtype`, { method: 'Post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Creation Failed]:>> ', err);
      throw err;
    });
};

export const getProcessTypes = async () => {
  return apiRequest(`/Master/processtypes `, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data get Failed]:>> ', err);
      throw err;
    });
};

export const getProcessData = async (processid) => {
  return apiRequest(`/Master/processtype/${processid} `, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const updateProcessData = async (data) => {
  return apiRequest(`/Master/processtype `, { method: 'Put', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const deleteProcessData = async (processid) => {
  return apiRequest(`/Master/processtype/${processid}`, { method: 'Put' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data deletion failed]:>> ', err);
      throw err;
    });
};

export const CreateTabs = async (data) => {
  return apiRequest(`/Master/tab `, { method: 'Post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Creation Failed]:>> ', err);
      throw err;
    });
};

export const getTabs = async () => {
  return apiRequest(`/Master/tabs `, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data get Failed]:>> ', err);
      throw err;
    });
};

export const getTabsData = async (tabId) => {
  return apiRequest(`/Master/tab/${tabId} `, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const updateTabData = async (data) => {
  return apiRequest(`/Master/tab `, { method: 'Put', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const deleteTabData = async (tabId) => {
  return apiRequest(`/Master/tab/${tabId}`, { method: 'Put' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data deletion failed]:>> ', err);
      throw err;
    });
};

export const getPuringList = async () => {
  return apiRequest(`/Master/ArchivalTblSettings/0 `, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data get Failed]:>> ', err);
      throw err;
    });
};
export const getPurgingData = async () => {
  return apiRequest(`/Master/ArchivalTblSettings/1`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getPurgingData]:>> ', err);
      throw err;
    });
};
export const updatePurgingData = async (data) => {
  return apiRequest(`/Master/ArchivalTblSettings`, {
    method: 'put',
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [updatePurgingData]:>> ', err);
      throw err;
    });
};
export const getProcesvalidity = async (processid) => {
  return apiRequest(`/Master/processtype/${processid} `, { method: 'Get' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};
export const getAllNumberTitle = async () => {
  return apiRequest(`/Master/processregistrations/Incident`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [getWorkFlowListApplicable]:>> ', err);
      throw err;
    });
};




export const getTitleFilterData = async (data) => {
  return apiRequest(`/Master/titles`, { method: 'Post',data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const getNumberFilterData = async (data) => {
  return apiRequest(`/Master/numbers
  `, { method: 'Post',data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const getAssetFilterData = async (data) => {
  return apiRequest(`/Master/assetsFilter`, { method: 'Post',data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const getRolesFilterData = async (data) => {
  return apiRequest(`/Master/rolesFilter`, { method: 'Post',data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const getStatusFilterData = async (data) => {
  return apiRequest(`/Master/StatusFilter`, { method: 'Post',data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const getPermitsFilterData = async (data) => {
  return apiRequest(`/Master/permits`, { method: 'Post',data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};

export const getAreaFilterData = async (data) => {
  return apiRequest(`/Master/areasFilter`, { method: 'Post' ,data})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};
export const getSeverityFilterData = async (data) => {
  return apiRequest(`/Master/severities`, { method: 'Post' ,data})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};
export const getReportedbyFilterData = async (data) => {
  return apiRequest(`/Master/reportsby`, { method: 'Post' ,data})
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};
export const getClosedNumberFilterData = async (data) => {
  return apiRequest(`/Master/closednumbers
  `, { method: 'Post',data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};
export const getClosedTitleFilterData = async (data) => {
  return apiRequest(`/Master/closedtitles`, { method: 'Post',data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};
export const getdepartmentvalues = async (data) => {
  return apiRequest(`/Master/department`, { method: 'Post', data })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('err [Data getById Failed]:>> ', err);
      throw err;
    });
};
