import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Spinner from 'Components/Spinner/Spinner';
import { memo, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-formio/lib/components';
import { useTranslation } from 'react-i18next';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getstatusname } from 'store/Statusname/statusnameSlice';
import { closesectionpermit, getCheckList, getCommentList, getSectionList } from '../../api';
//import './style.css';
const ViewChecklist = (props) => {
  const {
    incidentpermitID,
    setFormDefinitions,
    onFormSubmit,
    incidentpermit,
    formDefinitionsData,
    onCommentChange,
    comment,
    onFormChange,
    handleFile,
    disabled,
    hide,
    indexes,
    expanded,
    expanded2,
    handleSelect,
    changeTabFun,
    formRef,
    setTabValidation,
    error,
    workPermitId,
    tabdisable,
    setSavedata,
    isNew,
    statusId,
  } = props;
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [sectionlist, setSectionlist] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [dynaminButton, setDynamicButton] = useState([]);
  const closedpermit = useSelector(getstatusname);

  const getUniqueChecklist = (data) => {
    const formDataList = [];
    for (let i = 0; i < data.length; i++) {
      const { formData } = data[i];
      formDataList.push(...formData);
    }
    const uniqueKey = 'checklistid';
    const mapObject = new Map(formDataList.map((item) => [item[uniqueKey], item]));
    return [...mapObject.values()];
  };

  const getChecklistIdsForPermitType = async (checklistid) => {
    setTabValidation(false);
    try {
      setLoadingData(true);
      const res = await getSectionList(checklistid);
      const datavalue = res.data.responseObject;
      let newData = await datavalue.map((val) => ({
        ...val,
        formData: val.formData.map((item) => {
          let jsonData = JSON.parse(item.formData);
          let newFormData = {
            diaplay: 'form',
            components: jsonData.components.map((val) => ({
              ...val,
              disabled: true,
            })),
          };
          return {
            ...item,
            formData: JSON.stringify(newFormData),
          };
        }),
      }));

      if (statusId === undefined) {
        setSectionlist(datavalue);
      } else if (statusId < 17) {
        setSectionlist(datavalue);
      } else if (statusId > 17) {
        setSectionlist(newData);
      } else {
        setSectionlist(newData);
      }
      // if(tabdisable===undefined && isNew===undefined ){
      //   setSectionlist(datavalue)
      //  }
      //  else if (tabdisable === true   ) {
      //    setSectionlist(datavalue);
      //  } else if (tabdisable === false) {
      //    setSectionlist(newData);
      //  } else {
      //    setSectionlist(newData);
      //  }
      const formData = getUniqueChecklist(res.data.responseObject);
      const checklistsData = [];
      for (let i = 0; i < formData.length; i++) {
        const { checklistid, checklist } = formData[i];

        checklistsData.push({
          name: checklist,
          id: checklistid,
          formData: res,
        });
        changeTabFun(checklistid);
      }
      setFormDefinitions(checklistsData);
      setSavedata(false);
      setLoadingData(false);
    } catch (err) {
      setLoadingData(false);
      setSavedata(false);
      console.log('Error [getChecklistIdsForPermitType]', err);
    }
  };

  const closesectionpermitsection = async (processId, workPermitId) => {
    setTabValidation(false);
    try {
      setLoadingData(true);
      const res = await closesectionpermit(processId, workPermitId);
      const datavalue = res.data.responseObject;
      let newData = await datavalue.map((val) => ({
        ...val,
        formData: val.formData.map((item) => {
          let jsonData = JSON.parse(item.formData);
          let newFormData = {
            diaplay: 'form',
            components: jsonData.components.map((val) => ({
              ...val,
              disabled: true,
            })),
          };
          return {
            ...item,
            formData: JSON.stringify(newFormData),
          };
        }),
      }));
      if (tabdisable === undefined && isNew === undefined) {
        setSectionlist(datavalue);
      } else if (tabdisable === true) {
        setSectionlist(datavalue);
      } else if (tabdisable === false) {
        setSectionlist(newData);
      } else {
        setSectionlist(newData);
      }

      const formData = getUniqueChecklist(res.data.responseObject);
      const checklistsData = [];
      for (let i = 0; i < formData.length; i++) {
        const { checklistid, checklist } = formData[i];

        checklistsData.push({
          name: checklist,
          id: checklistid,
          formData: res,
        });
        changeTabFun(checklistid);
      }
      setFormDefinitions(checklistsData);
      setSavedata(false);
      setLoadingData(false);
    } catch (err) {
      setLoadingData(false);
      setSavedata(false);
      console.log('Error [getChecklistIdsForPermitType]', err);
    }
  };
  useEffect(() => {
    if (closedpermit !== 'Close' || closedpermit !== 'Rejected') {
      if (incidentpermit.processId) {
        getChecklistIdsForPermitType(incidentpermit.processId);
        // getChecklistIdsForPermitType(permitId, userRoleAsset);
      }
    }
  }, [incidentpermit.processId, closedpermit]);
  useEffect(() => {
    if (closedpermit === 'Close' || closedpermit === 'Rejected') {
      if (incidentpermit.processId) {
        closesectionpermitsection(incidentpermit.processId, workPermitId);
      }
    }
  }, [incidentpermit.processId, workPermitId]);
  // useEffect(() => {
  //   if (closedpermit === 'Close' || closedpermit === 'Rejected') {
  //     if (incidentpermit.processId) {
  //       closesectionpermitsection(incidentpermit.processId, workPermitId);
  //     }
  //   } else {
  //     if (incidentpermit.processId) {
  //       getChecklistIdsForPermitType(incidentpermit.processId);
  //     }
  //   }
  // }, [incidentpermit.processId, workPermitId, closedpermit]);
  // useEffect(() => {
  //   if (closedpermit != 'Close' || closedpermit != 'Rejected' ) {
  //     if (incidentpermit.processId) {
  //       getChecklistIdsForPermitType(incidentpermit.processId);
  //     }
  //   }
  //   else{
  //     if (incidentpermit.processId) {
  //       closesectionpermitsection(incidentpermit.processId, workPermitId);
  //     }
  //   }
  // }, [incidentpermit.processId, workPermitId, closedpermit]);

  useEffect(() => {
    getList();
    getCheckListData();
  }, []);

  const getCheckListData = async (permitId) => {
    try {
      const res = await getCheckList(permitId);
      return JSON.parse(res.data.responseObject.formData);
    } catch (error) {
      console.log('error [getData]', error);
    }
  };
  const getList = async () => {
    try {
      const res = await getCommentList(incidentpermitID);
      setCommentList(
        res.data?.responseObject?.map((val) => ({
          createdate: val.createDate,
          name: val.userName,
          statuscondition: val.statusCondition,
          signature: val.signature,
          roledesc: val.roleDesc,
          statusname: val.statusName,
        })),
      );
    } catch (error) {
      console.log('err [getCheckList]', error);
    }
  };

  return (
    <>
      {formDefinitionsData !== {} && (
        <div>
          <Row>
            {incidentpermit.typeid && (
              <Col xs={12} md={12} className="col">
                <span>
                  <label>Note:Please Fill Below Required Data</label>
                  <span className="astrix_sysmbol">*</span>
                </span>
              </Col>
            )}
          </Row>
        </div>
      )}
      <Row className="mb-4">
        <Col md={12} className="mx-auto">
          {sectionlist.map((form, id) => {
            return (
              !loadingData &&
              form?.formData?.map((form, index) => {
                return (
                  <div>
                    <Accordion
                      className="accordian"
                      expanded={indexes === form?.checklistid ? expanded2 : expanded}
                      onChange={(e, value) => {
                        handleSelect(e, value, form?.checklistid);
                      }}
                    >
                      <AccordionSummary expandIcon={<MdOutlineKeyboardArrowDown fontSize={20} />}>
                        <div className="">{t(form.checklist)}</div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="px-4 py-2">
                          <Form
                            ref={(node) => {
                              formRef.current[form.checklist] = node;
                            }}
                            disabled={disabled}
                            form={form?.formData && JSON.parse(form.formData)}
                            onChange={(data) =>
                              onFormChange(data, form.checklistid, form.checklist)
                            }
                            submission={formDefinitionsData[form.checklistid]?.formData || {}}
                            options={{
                              language: i18n.language,
                              i18n,
                            }}
                          />
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                );
              })
            );
          })}
          {loadingData && <Spinner />}
        </Col>
      </Row>
    </>
  );
};
export default memo(ViewChecklist);
