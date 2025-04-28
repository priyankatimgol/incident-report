import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Accordion, AccordionDetails, AccordionSummary, Tab } from '@mui/material';
import { filterBy } from '@progress/kendo-data-query';
import { Form, FormElement } from '@progress/kendo-react-form';
import { CardBody, Splitter } from '@progress/kendo-react-layout';
import CommonButton from 'Components/Buttons/CommonButton';
import Spinner from 'Components/Spinner/Spinner';
import {
  createIncidentPermit,
  dynamicButton,
  getIncidentPermitData,
  getLocationlist,
  getSignatureValue,
  getusersection,
  submitToValidation,
  updateInceidentPermit,
} from 'Pages/Incident permit/api';
import {
  asetvalidInvalid,
  getApplicantdatalist,
  getAssetList,
  getBusinessUnit,
  getInceidentDepartmentValue,
  getInceidentSite,
  getIncidentInvolved,
  getIncidentSavirity,
  getIncidentShift,
  getPotentialSaverity,
  getWorkFlowList,
  getWorkPermitStatusesid,
} from 'Services/API/masterApi';
import moment from 'moment/moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setStatusName } from 'store/Statusname/statusnameSlice';
import Treeform from '../TreeForm';
import ViewChecklistForms from '../ViewForms';
import Investigation from '../ViewForms/Investigation';
import Actionlist from '../ViewForms/action';
import AuditTrialdata from '../ViewForms/auditTrail';
import Datasignature from '../ViewForms/signature';
import WorkflowTracker from '../WorkflowTracker';
import NewIncidentForm from './NewIncidentPermit';
import StepperComponet from './StepperComponet';
import './style.css';
const New_Incident_Permit = () => {
  const param = useParams();
  const [dynaminButton, setDynamicButton] = useState([]);
  const [formDefinitionsData, setFormDefinitionsData] = useState({});
  const [InvestigationFormDefinitionsData, setInvestigationFormDefinitionsData] = useState({});
  const [actionFormDefinitionsData, setActionFormDefinitionsData] = useState({});
  const [showChecklistsForm, setShowChecklistsForm] = useState(false);
  const [sectionlist, setSectionlist] = useState([]);
  const [asset, setAsset] = useState([]);
  const [incidentsevrity, setIncidentSevrity] = useState([]);
  const [potentialsevrity, setPotentialSevrity] = useState([]);
  const [type, setType] = useState([]);
  const [commentCheck, setCommentCheck] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [department, setDepartment] = useState([]);
  const [savedata, setSavedata] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [panes, setPanes] = React.useState([
    {
      size: '20%',
      min: '20%',
      collapsible: true,
    },
    {},
    {
      size: '80%',
      // min: '20px',
      collapsible: false,
    },
  ]);

  const [isSubmittingForValidation, setIsSubmittingForValidation] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [comment, setComment] = useState('');
  const [expandedvalue, setExpandedvalue] = useState(true);
  const [expandedvalue2, setExpandedvalue2] = useState(true);
  const [panalbar, setPanalbar] = useState(false);
  const [isExpand, setIsExpand] = useState(true);
  const [index, setIndex] = useState();
  const [marker, setMarker] = useState(null);
  const [sitevalue, setSitevalue] = useState([]);
  const [shiftvalue, setShiftvalue] = useState([]);
  const [selected, setSelected] = useState(0);
  const [involved, setInvolved] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [selectedInvolved, setSelectedInvolved] = useState([]);
  const [stepperData, setStepperData] = useState([]);
  const [stepperValue, setStepperValue] = useState();
  const [data, setData] = useState([]);
  const [subtype, setSubType] = useState([]);
  const [checklistid, setChecklistid] = useState([]);
  const [area, setArea] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const [locationlist, setLocationlist] = useState([]);
  const [category, setCategory] = useState([]);
  const [businessunit, setBusinessunit] = useState([]);
  const { t, i18n } = useTranslation();
  const [error, setError] = useState({});
  const [incidentpermit, setIncidentpermit] = React.useState({});
  const [incidentpermitapplicant, setIncidentpermitApplicant] = React.useState('');
  const [file, setFile] = useState('');
  const [image, setImage] = useState({});
  const [permitTypes, setPermitTypes] = useState([]);
  const [stepperName, setStepperName] = useState('');
  const [statusdetails, setStatusdetails] = useState([]);
  const [formDefinitions, setFormDefinitions] = useState([]);
  const [formDefination, setFormDefinition] = useState([]);
  const [ValueAuto, setValueAuto] = useState('');
  const [calculate1, setCalculate1] = useState(null);
  const [tabValidation, setTabValidation] = useState(false);
  const [changedData, setChangeData] = useState([]);
  const [asetValue, setAsetValue] = useState('');
  const isNew = param?.id === 'new';
  const incidentpermitID = isNew ? '' : param?.id;
  const workPermitId = isNew ? '' : param?.id;
  const dispatch = useDispatch();
  const formRef = React.useRef({});
  const [statusId, setStatusId] = useState('');
  const [isvalid, setIsvalid] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const userId = localStorage.getItem('user_id') || '1';
  const [tabdisable, setTabDiseble] = useState([]);
  const navigate = useNavigate();
  const validateForm = (id) => {
    let errors = {};
    let formIsValid = true;
    if (!incidentpermit?.title) {
      formIsValid = false;
      errors['title'] = '*Please Enter Title ';
    }
    if (!incidentpermit?.summary) {
      formIsValid = false;
      errors['summary'] = '*Please Enter Summary ';
    }
    if (!incidentpermit?.department) {
      formIsValid = false;
      errors['department'] = '*Please Enter Department ';
    }
    if (!incidentpermit?.businessUnitId) {
      formIsValid = false;
      errors['BuisnessUnit'] = '*Please Select Buisness Unit ';
    }
    if (!incidentpermit?.processId) {
      formIsValid = false;
      errors['ptype'] = '*Please Select Incident Type';
    }

    if (!incidentpermit?.severityid) {
      formIsValid = false;
      errors['saverity'] = '*Please Select Saverity ';
    }
    if (!incidentpermit?.date) {
      formIsValid = false;
      errors['Incident Date'] = '*Please Select Incident Date ';
    }
    if (!incidentpermit?.zone) {
      formIsValid = false;
      errors['zone'] = '*Please Select Location ';
    }
    if (!incidentpermit?.date) {
      formIsValid = false;
      errors['date'] = '*Please Select Date ';
    }
    if (!incidentpermit?.department) {
      formIsValid = false;
      errors['department'] = '*Please Enter Dapartment ';
    }
    if (!incidentpermit?.shiftid) {
      formIsValid = false;
      errors['shift'] = '*Please Select Shift ';
    }
    if (!incidentpermit?.involved) {
      formIsValid = false;
      errors['involved'] = '*Please Select Incident involved';
    }
    if (!incidentpermit?.potentialid) {
      formIsValid = false;
      errors['potential'] = '*Please Select Potential Sevrity';
    }
    if (!incidentpermit?.siteid) {
      formIsValid = false;
      errors['site'] = '*Please Select Site';
    }
    if (id !== 15) {
      if (!commentCheck || !file) {
        formIsValid = false;
        toast.error(t('please_add_comments_and_provide_your_signature_through_signature_section'));
      }
    }

    setError(errors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        incidentpermit['reportBy'] = incidentpermitapplicant;
        incidentpermit['date'] = moment(incidentpermit?.date).format();

        await createIncidentPermit({
          ...incidentpermit,
          incidentlocation: marker ? JSON.stringify(marker) : null,
          statuscondition: comment,
        })
          .then(async (res) => {
            const requestId = res.data.responseObject.requestId;

            if (res.data.responseCode === 402) {
              const message = res.data.responseMessage;
              toast.error(t(message));
            } else if (res.data.responseCode === 425) {
              const message = res.data.responseMessage;
              toast.error(t(message));
            } else {
              const message = res.data.responseMessage;
              toast.success(t(message));
              setSelected(0);
              navigate(`/manage-incident/${requestId}`);
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    } catch (err) {
      console.log('err [IncidentPermit]', err);
      toast.error(err.title || t('ptw_incidentmgmt_create_failed'));
    }
  };

  const handleUpdate = async () => {
    const finalData = [];
    changedData.map((item) => {
      item.formData.changed = undefined;
      return finalData.push({
        [item.checklistId]: {
          checklistId: item.checklistId,
          checklistName: item.checklistName,
          formData: item.formData,
        },
      });
    });

    try {
      incidentpermit['date'] = moment(incidentpermit?.date).format();

      const data = finalData.reduce((a, b) => Object.assign(a, b), {});
      incidentpermit['reportBy'] = incidentpermitapplicant;
      setIsUpdating(true);
      let res = await updateInceidentPermit(param?.id, {
        ...incidentpermit,
        incidentlocation: marker ? JSON.stringify(marker) : null,
        formData: JSON.stringify(formDefination.reduce((a, b) => Object.assign(a, b), {})),
      });
      const responseArray = Object.entries(res.data.responseObject);
      const filteredResponseArray = responseArray.map(([key, value]) => {
        if (key === 'formData') {
          return [key, undefined]; // Set "formData" property value to undefined to effectively remove it
        }
        return [key, value];
      });
      const filteredResponse = Object.fromEntries(filteredResponseArray);
      localStorage.setItem('printData', JSON.stringify(filteredResponse));
    
      if (res.data.responseObject.formData != '') {
        const formData = JSON.parse(res.data.responseObject.formData);
        function findAndDeleteChecklistByName(checklistName) {
          for (const key in formData) {
            if (formData[key].checklistName === checklistName) {
              delete formData[key];
            }
          }
          return formData;
        }
        const checklistNameToDelete = 'Action';
        const remainingObjects = findAndDeleteChecklistByName(checklistNameToDelete);
        console.log('remainingObjects', remainingObjects);
        localStorage.setItem('formdata', JSON.stringify(remainingObjects));
      }
     
      setFormDefinitionsData(JSON.parse(res.data.responseObject.formData));
      setIsUpdating(false);
      let message = res.data.responseMessage;
      toast.success(t(message));
    } catch (err) {
      toast.error(t(err.title || 'Incident updation_failed'));
    }
  };

  const getButton = async () => {
    try {
      const res = await dynamicButton(workPermitId);
      const newdata = res.data.responseObject?.map((val) => ({
        statusDesc: val.statusDesc,
        statusId: val.statusId,
        displayName: val.displayName,
      }));

      setDynamicButton(newdata);
      const datavalue = res.data.responseObject.some((val) => val.statusId === 15);
      setTabDiseble(datavalue);
    } catch (err) {}
  };

  const handleSubmitToValidation = async (e, val) => {
    const statusId = val.statusId;
    try {
      if (validateForm(statusId)) {
        setIsSubmittingForValidation(true);
        setCurrentAction(currentAction);
        await submitToValidation({
          workPermitId,
          statusId,
          comment,
          file,
        })
          .then(async (res) => {
            if (res.data.responseObject?.responseMessage === 'Error') {
              let message = res.data.responseMessage;
              toast.error(t(message));
            } else {
              let message = res.data.responseMessage;
              toast.success(t(message));
              await getData(incidentpermitID);
              setIncidentpermit((preVal) => ({
                ...preVal,
                status: parseInt(res.data.responseObject?.status),
              }));
            }
          })
          .catch((err) => {
            toast.error(err);
          });
        navigate('/');
        setIsSubmittingForValidation(false);
        setCurrentAction(null);
      }
    } catch (err) {
      setIsSubmittingForValidation(false);
      setCurrentAction(null);
      toast.error(err.messages || 'Something went wrong!');
    }
  };

  const getData = async (id) => {
    setIsUpdating(true);
    const res = await getIncidentPermitData(id);
    const responseArray = Object.entries(res.data.responseObject);
    const filteredResponseArray = responseArray.map(([key, value]) => {
      if (key === 'formData') {
        return [key, undefined]; // Set "formData" property value to undefined to effectively remove it
      }
      return [key, value];
    });
    const filteredResponse = Object.fromEntries(filteredResponseArray);
    localStorage.setItem('printData', JSON.stringify(filteredResponse));
  
    if (res.data.responseObject.formData != '') {
      const formData = JSON.parse(res.data.responseObject.formData);
      function findAndDeleteChecklistByName(checklistName) {
        for (const key in formData) {
          if (formData[key].checklistName === checklistName) {
            delete formData[key];
          }
        }
        return formData;
      }
      const checklistNameToDelete = 'Action';
      const remainingObjects = findAndDeleteChecklistByName(checklistNameToDelete);
      console.log('remainingObjects', remainingObjects);
      localStorage.setItem('formdata', JSON.stringify(remainingObjects));
    }
   
    const newform = res.data.responseObject?.formData;
    setValueAuto(res.data.responseObject.reportBy);
    setCalculate1(res.data.responseObject.riskmatrix);
    setStepperName(res.data.responseObject.statusDesc);
    setIsUpdating(false);
    dispatch(setStatusName(res.data.responseObject.statusDesc));
    setStatusId(res.data.responseObject.statusId);
    if (res.data.responseObject.statusId === 22) {
      setStepperValue(4);
    } else {
      setStepperValue(res.data.responseObject.statusId - 15);
    }
    
    if (newform === '') {
      setFormDefinitionsData('');
    } else {
      setFormDefinitionsData(JSON.parse(newform));
    }

    setSectionlist();

    const Typeid = res.data.responseObject.typeid;
    setChecklistid(Typeid);
    setIncidentpermit(res.data.responseObject);
    const newaray = JSON.parse(res.data.responseObject.involved);
    setData(newaray);
    const data = res.data.responseObject.location;
    setMarker(JSON.parse(data));
  };

  const getWorkPermitStatusesData = async (id) => {
    const res = await getWorkPermitStatusesid(id);

    if (stepperName === 'Rejected') {
      const newarray = ['Raise', 'Close'];
      setStepperData(res.data.responseObject.filter((val) => newarray.includes(val.statusDesc)));
    }
    else if(stepperName === 'Cancelled') {
      const newarray = ['Raise', 'Close'];
      setStepperData(res.data.responseObject.filter((val) => newarray.includes(val.statusDesc)));
    } else {
      setStepperData(res.data.responseObject);
    }
  };

  useEffect(() => {
    getWorkPermitStatusesData(incidentpermit.processId);
  }, [stepperName, incidentpermit.processId]);

  useEffect(() => {
    if (param?.id) {
     // getData(param?.id);
      getButton(param?.id);
      // getWorkPermitStatusesData(incidentpermit.processId);
      getdatausersection(param?.id);
    }
  }, [param?.id, incidentpermit.processId]);
  useEffect(() => {
    if (param?.id) {
      getData(param?.id);
    }
  }, [param?.id]);
  const getApplicable = async () => {
    try {
      const res = await getWorkFlowList();
      setPermitTypes(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  const onChangeFilterValue = (event) => {
    if (event.filter.value) {
      setInvolved(filterBy(dataAll.slice(), event.filter));
    } else {
      setInvolved(dataAll);
    }
  };
  const getAsset = async () => {
    try {
      const res = await getAssetList();
      let newData = res.data.responseObject.map((val) => ({
        ...val,
        children: res.data.responseObject,
      }));
      setAsset(newData);
    } catch (err) {}
  };

  const getIncidentSevrity = async () => {
    try {
      const res = await getIncidentSavirity();
      setIncidentSevrity(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const getPotentialSevrity = async () => {
    try {
      const res = await getPotentialSaverity();

      setPotentialSevrity(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const getLocation = async () => {
    try {
      const res = await getLocationlist();
      setLocationlist(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const getBusinessUnitValue = async () => {
    try {
      const res = await getBusinessUnit();
      setBusinessunit(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const getIncidentSite = async () => {
    try {
      const res = await getInceidentSite();
      setSitevalue(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const getIncidentShiftvalue = async () => {
    try {
      const res = await getIncidentShift();
      setShiftvalue(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const getIncidentinvolved = async () => {
    try {
      const res = await getIncidentInvolved();
      setInvolved(res.data.responseObject);
      setDataAll(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const getdatausersection = async (id) => {
    const res = await getusersection(id);
    setIsvalid(res.data.responseObject.isapproval);
  };

  const getAsetvalue = async (data) => {
    try {
      const res = await asetvalidInvalid(data);
      // const res = {
      //   responseCode: 200,
      //   responseMassage: 'ptw_im_user_aset_valid',
      //   responseObject: {
      //     id: '0',
      //     asset: 'Balikpapan',
      //     role: 'WP-CREATOR',
      //     users: 'VEPSYSTEM\\Ashutosh,VEPSYSTEM\\exprionadmin,VEPSYSTEM\\HFOMAdmin,VEPSYSTEM\\alok',
      //   },
      // };

      // const response = {
      //   responseCode: 400,
      //   responseMassage: 'ptw_im_user_aset_invalid',
      //   responseObject: null,
      // };

      if (res.data.responseCode === 200) {
        setAsetValue(res.data.responseObject);
      } else {
        setAsetValue(res.data.responseObject);
        toast.error('You do not have permission on selected asset. Please select valid asset name');
      }
    } catch (err) {}
  };

  const getIncidentDepartment = async () => {
    try {
      const res = await getInceidentDepartmentValue();
      setDepartment(res.data.responseObject);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  useEffect(() => {
    getIncidentDepartment();
    getApplicable();
    getAsset();
    getLocation();
    getIncidentSite();
    getIncidentShiftvalue();
    getIncidentinvolved();
    getIncidentSevrity();
    getPotentialSevrity();
    getBusinessUnitValue();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'involved') {
      const arr = JSON.stringify(e.value);
      setSelectedInvolved([...e.value]);
      setInvolved(dataAll);
      setIncidentpermit({ ...incidentpermit, involved: arr });
    } else if (name === 'summary') {
      setIncidentpermit((preVal) => ({
        ...preVal,
        [name]: e.value,
      }));
    } else if (name === 'processId') {
      setIncidentpermit({
        ...incidentpermit,
        processId: permitTypes.find((_) => _.processType === e.value).processId,
      });
    } else if (name === 'asset') {
      setIncidentpermit({
        ...incidentpermit,
        assetid: asset.find((_) => _.description === e.value).id,
      });
    } else if (name === 'siteid') {
      setIncidentpermit({
        ...incidentpermit,
        siteid: sitevalue.find((_) => _.site === e.value).id,
      });
    } else if (name === 'location') {
      setIncidentpermit({
        ...incidentpermit,
        zone: locationlist.find((_) => _.location === e.value).id,
      });
    } else if (name === 'shiftid') {
      setIncidentpermit({
        ...incidentpermit,
        shiftid: shiftvalue.find((_) => _.shift === e.value).id,
      });
    } else if (name === 'severity') {
      setIncidentpermit({
        ...incidentpermit,
        severityid: incidentsevrity.find((_) => _.severity === e.value).id,
      });
    } else if (name === 'potential') {
      setIncidentpermit({
        ...incidentpermit,
        potentialid: potentialsevrity.find((_) => _.potential === e.value).id,
      });
    } else if (name === 'businessUnitId') {
      setIncidentpermit({
        ...incidentpermit,
        businessUnitId: businessunit.find((_) => _.name === e.value).id,
      });
    } else if (name === 'date') {
      setIncidentpermit({
        ...incidentpermit,
        [e.target.name]: e.target.value,
      });
    } else {
      setIncidentpermit((preVal) => ({
        ...preVal,
        [name]: value,
      }));
    }
  };

  const handalGotoPage = () => {
    navigate('/manage-incident');
  };

  const handleComment = (e) => {
    setCommentCheck(e.value.textContent);
    setComment(e.html);
  };

  const onFormChange = (data, checklistid, checklist) => {
    const array = formDefination;
    const changeVal = changedData;
    const checklistVal = {
      [checklistid]: {
        checklistId: checklistid,
        checklistName: checklist,
        formData: data,
      },
    };
    if (array.some((o) => checklistid in o)) {
      for (let i = 0; i < array.length; i++) {
        if (Object.keys(array[i])[0] == checklistid) {
          changeVal[i] = {
            checklistId: checklistid,
            checklistName: checklist,
            formData: data,
          };
          array[i] = checklistVal;
        }
      }
    } else {
      array.push(checklistVal);
      changeVal.push({
        checklistId: checklistid,
        checklistName: checklist,
        formData: data,
      });
    }
    setFormDefinition(array);
    setChangeData(changeVal);
  };

  const handlePrint = () => {
    const processIdArray = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
    const processId = Number(JSON.parse(localStorage.getItem('printData')).processId) || 1;
    const processValue = processIdArray?.includes(processId);
    const newWindow = window.open(
      processValue === true ? '#/print' : '#/print-checklist',
      '_blank',
      'noopener,noreferrer',
    );
    if (newWindow) newWindow.opener = null;
  };
  const handleFile = (event) => {
    const newdata = event.value;
    setFile(newdata);
    setIncidentpermit({ ...incidentpermit, signature: newdata });
  };

  const ButtonsGroupup = ({ status }) => {
    const buttons = [
      {
        text: t('Create'),
        onHandleClick: handleSubmit,
        hide: showChecklistsForm || !isNew,
      },
      {
        title: 'Print',
        className: 'printicon py-0 px-0',
        imageUrl: '../Assest/print.png',
        onHandleClick: handlePrint,
        hide: isNew,
      },
      {
        className: 'gridicon py-0 px-0',
        imageUrl: '../Assest/Grid_38.png',
        title: 'Grid View',
        onHandleClick: handalGotoPage,
        fillMode: 'outline',
      },
    ];

    return buttons.map((button) => {
      const { cancelAction, show = true, hide = false, imageUrl, ...props } = button;
      if (!show || hide) return null;
      return (
        <>
          <CommonButton imageUrl={imageUrl} {...props} />
          {cancelAction && (
            <CommonButton text={t('cancel')} imageUrl={imageUrl} onHandleClick={cancelAction} />
          )}
        </>
      );
    });
  };

  const ButtonsGroup = ({ status }) => {
    const buttons = [
      {
        className: 'gridicon py-0 px-0',
        imageUrl: '../Assest/Grid_38.png',
        title: 'Grid View',
        onHandleClick: handalGotoPage,
        fillMode: 'outline',
        hide: isNew,
      },
      {
        title: 'Print',
        imageUrl: '../Assest/print.png',
        className: 'printicon py-0 px-0',
        onHandleClick: handlePrint,
        hide: isNew,
      },
    ];

    return buttons.map((button) => {
      const { cancelAction, show = true, hide = false, imageUrl, ...props } = button;
      if (!show || hide) return null;
      return (
        <>
          <CommonButton {...props} imageUrl={imageUrl} />
          {cancelAction && (
            <CommonButton text={t('cancel')} imageUrl={imageUrl} onHandleClick={cancelAction} />
          )}
        </>
      );
    });
  };

  const SaveButton = ({ status }) => {
    const buttons = [
      {
        text: t('save'),
        onHandleClick: handleUpdate,
        hide: showChecklistsForm || isNew || selected == 7 || stepperName === 'Reject',
        show: !isNew,
        disabled: isUpdating,
      },
    ];

    return buttons.map((button) => {
      const {
        cancelAction,
        show = true,
        hide = false,
        icon,
        imageUrl,
        className,
        title,
        ...props
      } = button;
      if (!show || hide) return null;

      return (
        <>
          <CommonButton className={className} imageUrl={imageUrl} title={title} {...props} />
          {cancelAction && (
            <CommonButton
              text={t('cancel')}
              className={className}
              title={title}
              imageUrl={imageUrl}
              onHandleClick={cancelAction}
            />
          )}
        </>
      );
    });
  };

  const getApplicantData = async () => {
    try {
      const res = await getApplicantdatalist();
      setValueAuto(res.data.responseObject[0]?.label);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  useEffect(() => {
    if (isNew) {
      getApplicantData();
    }
  }, [isNew]);

  useEffect(() => {
    if (ValueAuto) {
      setIncidentpermitApplicant(ValueAuto);
    }
  }, [ValueAuto]);

  const handlePageClick = (e, newValue) => {
    setSelected(newValue);
    setSavedata(true);
  };

  const onChange = (event) => {
    setPanes(event.newState);
  };

  const handleSelect = (e, val, index) => {
    changedData?.map((item) => changeTabFun(item.checklistId));
    if (index === undefined) {
      setExpandedvalue(!expandedvalue);
      setExpandedvalue2(false);
      setIndex(null);
    } else if (index === 'null') {
      setIsExpand(val);
      setIndex(undefined);
    } else {
      setExpandedvalue2(val);
      setIndex(index);
    }
    setPanalbar(false);
  };

  const getSignature = async () => {
    const data = {
      // userName: '',
      userName: 'VEPSYSTEM\\HFOMAdmin',
    };
    try {
      const res = await getSignatureValue(data);
      setFile(res.data.responseObject.signature);
    } catch (error) {
      console.log('err [getupdatesignature]', error);
    }
  };
  useEffect(() => {
    getSignature();
  }, []);
  useEffect(() => {
    if (file) {
      setIncidentpermit({ ...incidentpermit, signature: file });
    }
  }, [file]);

  const changeTabFun = async(id) => {
    const found = changedData.find((element) =>
      element.checklistId == id ? element.formData.changed : '',
    );
    if (found) {
      let formdatatemp = formDefination
        ? formDefination.reduce((a, b) => Object.assign(a, b), {})
        : {};
      let formdata = {
        ...formDefinitionsData,
        ...formdatatemp,
      };
      await setFormDefinitionsData(formdata);
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      {isNew ? (
        <Row className="mx-1  p-0 shadow align-items-center row m-1 rounded m-0 mainOuter mt-0">
          <Col xs={12} md={6}>
            <h3 class="m-0">{t('create_new_incident')}</h3>
          </Col>
          <Col xs={12} md={6} className="text-right button-group ">
            <ButtonsGroupup status={incidentpermit?.statusId} />
          </Col>
        </Row>
      ) : (
        <StepperComponet
          stepperData={stepperData}
          stepperValue={stepperValue}
          workPermitData={incidentpermit}
          stepperName={stepperName}
          statusdetails={statusdetails}
        />
      )}

      <Card className="outerclass">
        <CardBody >
          <Row className="justify-content-end button-group ">
            {/* <>
              <SaveButton />
                {dynaminButton.map((val) => (
                  <CommonButton
                    text={val.displayName}
                    onHandleClick={(e) => handleSubmitToValidation(e, val)}
                  />
                ))}
              </> */}
            <ButtonsGroup status={dynaminButton[0]?.displayName} />
            {!isNew && (
              <img
              src={isHovered ? "../Assest/ExpandAll_Mover.png" : "../Assest/ExpandAll.png"}
              alt="Expand/Collapse Icon"
              onClick={handleSelect}
              className={`${expandedvalue ? 'rotateIcon' : 'smoothRotate'}`}
              title={`${expandedvalue ? 'Collapse All' : 'Expand All'}`}
              style={{ cursor: 'pointer', fontSize: '30px' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
              // <MdOutlineKeyboardArrowDown
              //   fontSize={30}
              //   onClick={handleSelect}
              //   className={`${expandedvalue ? 'rotateIcon' : 'smoothRotate'}`}
              //   title={`${expandedvalue ? 'Collapse All' : 'Expand All'}`}
              // />
            )}
          </Row>
          <Row>
            {isNew ? (
              <Splitter className="tree-space" panes={panes} onChange={onChange}>
                <div className="pane-content ">
                  {isNew && (
                    <div className="slider-size p-3 shadow rounded ">
                      <Treeform
                        param={param?.id}
                        setIncidentpermit={setIncidentpermit}
                        incidentpermit={incidentpermit}
                        getAsetvalue={getAsetvalue}
                      />
                    </div>
                  )}
                </div>

                <div className="pane-content">
                  <TabContext value={selected}>
                    <TabList onChange={handlePageClick} className="border-bottom">
                      <Tab label={t('incident_summary')} value={0} className="font-weight-bold" />
                      {!isNew && (
                        <Tab label={t('investigation')} value={1} className="font-weight-bold" />
                      )}
                      {!isNew && <Tab label={t('action')} value={2} className="font-weight-bold" />}

                      {!isNew && (
                        <Tab
                          label={t('incident_location')}
                          value={3}
                          className="font-weight-bold"
                        />
                      )}
                      <Tab label={t('signature')} value={4} className="font-weight-bold" />

                      {!isNew && (
                        <Tab label={t('audit_trail')} value={5} className="font-weight-bold" />
                      )}
                    </TabList>
                    <TabPanel className="scroll-bar shadow rounded" value={0}>
                      <div>
                        <Form
                          onSubmit={handleSubmit}
                          render={(formRenderProps) => (
                            <FormElement className="container-fluid">
                              {(!showChecklistsForm || isNew) && (
                                <>
                                  <Row>
                                    <Col xs={12} md={12} className={`p-3 ${isNew}`} id="mainPanel">
                                      <Accordion
                                        className="accordian"
                                        expanded={index === undefined ? isExpand : expandedvalue}
                                        onChange={(e, value) => {
                                          handleSelect(e, value, 'null');
                                        }}
                                      >
                                        <AccordionSummary
                                          expandIcon={<MdOutlineKeyboardArrowDown fontSize={20} />}
                                        >
                                          <div className="">{t('incident_summary')}</div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <NewIncidentForm
                                            calculate1={calculate1}
                                            setCalculate1={setCalculate1}
                                            stepperName={stepperName}
                                            incidentpermit={incidentpermit}
                                            setIncidentpermit={setIncidentpermit}
                                            data={data}
                                            handleChange={handleChange}
                                            onChangeFilterValue={onChangeFilterValue}
                                            handleFile={handleFile}
                                            asset={asset}
                                            category={category}
                                            incidentsevrity={incidentsevrity}
                                            locationlist={locationlist}
                                            type={type}
                                            area={area}
                                            ValueAuto={ValueAuto}
                                            setValueAuto={setValueAuto}
                                            involved={involved}
                                            sitevalue={sitevalue}
                                            businessunit={businessunit}
                                            shiftvalue={shiftvalue}
                                            error={error}
                                            subtype={subtype}
                                            applicant={applicant}
                                            potentialsevrity={potentialsevrity}
                                            permitTypes={permitTypes}
                                            isEdit={!isNew}
                                            file={file}
                                            image={image}
                                            selectedInvolved={selectedInvolved}
                                            department={department}
                                          />
                                        </AccordionDetails>
                                      </Accordion>
                                    </Col>
                                    <Col xs={12} md={12}>
                                      {(!isNew || showChecklistsForm || 'new') && (
                                        <ViewChecklistForms
                                          hide={'hide'}
                                          permitId={param?.id}
                                          expanded={expandedvalue}
                                          expanded2={expandedvalue2}
                                          onFormChange={onFormChange}
                                          setExpandedvalue={setExpandedvalue2}
                                          incidentpermitID={incidentpermitID}
                                          formDefinitions={formDefinitions}
                                          setFormDefinitions={setFormDefinitions}
                                          handleSelect={handleSelect}
                                          checklistid={checklistid}
                                          indexes={index}
                                          incidentpermit={incidentpermit}
                                          formDefinitionsData={formDefinitionsData}
                                          file={file}
                                          error={error}
                                          setTabValidation={setTabValidation}
                                          workPermitId={workPermitId}
                                        />
                                      )}
                                    </Col>
                                  </Row>
                                </>
                              )}
                            </FormElement>
                          )}
                        />
                      </div>
                    </TabPanel>
                    <TabPanel value={1} className="scroll-bar shadow rounded">
                      <Investigation
                        hide={'hide'}
                        permitId={param?.id}
                        incidentpermitID={incidentpermitID}
                        formDefinitions={formDefinitions}
                        setFormDefinitions={setFormDefinitions}
                        formDefinitionsData={formDefinitionsData}
                        InvestigationFormDefinitionsData={InvestigationFormDefinitionsData}
                        handleFile={handleFile}
                        file={file}
                        error={error}
                      />
                    </TabPanel>
                    <TabPanel value={2} className="scroll-bar shadow rounded">
                      <Actionlist
                        hide={'hide'}
                        permitId={param?.id}
                        incidentpermitID={incidentpermitID}
                        formDefinitions={formDefinitions}
                        setFormDefinitions={setFormDefinitions}
                        formDefinitionsData={formDefinitionsData}
                        actionFormDefinitionsData={actionFormDefinitionsData}
                        handleFile={handleFile}
                        file={file}
                        error={error}
                      />
                    </TabPanel>
                    <TabPanel value={3}>
                      <div className="d-flex justify-content-center my-4">
                        <WorkflowTracker {...{ marker, setMarker, incidentpermitID }} />
                      </div>
                    </TabPanel>
                    <TabPanel value={4} className="scroll-bar shadow rounded">
                      <Datasignature
                        className="rounded"
                        hide={'hide'}
                        permitId={param?.id}
                        incidentpermitID={incidentpermitID}
                        formDefinitions={formDefinitions}
                        setFormDefinitions={setFormDefinitions}
                        formDefinitionsData={formDefinitionsData}
                        handleComment={handleComment}
                        handleFile={handleFile}
                        file={file}
                        comment={comment}
                        error={error}
                        setTabValidation={setTabValidation}
                      />
                    </TabPanel>
                    <TabPanel value={5}>
                      <AuditTrialdata
                        hide={'hide'}
                        permitId={param?.id}
                        incidentpermitID={incidentpermitID}
                        error={error}
                      />
                    </TabPanel>
                  </TabContext>
                </div>
              </Splitter>
            ) : (
              <Col xs={12} md={isNew ? 10 : 12} className="panecontent">
                <TabContext value={selected}>
                  <TabList onChange={handlePageClick} className="border-bottom">
                    <Tab
                      label={t('incident_summary')}
                      disabled={savedata}
                      value={0}
                      className="font-weight-bold"
                    />
                    {!isNew && (
                      <Tab
                        label={t('investigation')}
                        disabled={savedata}
                        value={1}
                        className="font-weight-bold"
                      />
                    )}
                    {!isNew && (
                      <Tab
                        label={t('action')}
                        disabled={savedata}
                        value={2}
                        className="font-weight-bold"
                      />
                    )}

                    {!isNew && incidentpermit.isEnable === true && (
                      <Tab
                        label={t('incident_location')}
                        disabled={savedata}
                        value={3}
                        className="font-weight-bold"
                      />
                    )}
                    <Tab
                      label={t('signature')}
                      value={4}
                      disabled={savedata}
                      className="font-weight-bold"
                    />

                    {!isNew && (
                      <Tab
                        label={t('audit_trail')}
                        disabled={savedata}
                        value={5}
                        className="font-weight-bold"
                      />
                    )}
                  </TabList>
                  <TabPanel className="scroll-bar-edit shadow rounded" value={0}>
                    <div>
                      <Form
                        onSubmit={handleSubmit}
                        render={(formRenderProps) => (
                          <FormElement className="container-fluid">
                            {(!showChecklistsForm || isNew) && (
                              <>
                                <Row>
                                  <Col xs={12} md={12} className={`p-3 ${isNew}`} id="mainPanel">
                                    <Accordion
                                      className="accordian"
                                      expanded={index === undefined ? isExpand : expandedvalue}
                                      onChange={(e, value) => {
                                        handleSelect(e, value, 'null');
                                      }}
                                    >
                                      <AccordionSummary
                                        expandIcon={<MdOutlineKeyboardArrowDown fontSize={20} />}
                                      >
                                        <div className="">{t('incident_summary')}</div>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <NewIncidentForm
                                          hide={'hide'}
                                          calculate1={calculate1}
                                          setCalculate1={setCalculate1}
                                          stepperName={stepperName}
                                          incidentpermit={incidentpermit}
                                          setIncidentpermit={setIncidentpermit}
                                          data={data}
                                          handleChange={handleChange}
                                          handleFile={handleFile}
                                          onChangeFilterValue={onChangeFilterValue}
                                          asset={asset}
                                          category={category}
                                          incidentsevrity={incidentsevrity}
                                          locationlist={locationlist}
                                          type={type}
                                          area={area}
                                          ValueAuto={ValueAuto}
                                          setValueAuto={setValueAuto}
                                          involved={involved}
                                          sitevalue={sitevalue}
                                          businessunit={businessunit}
                                          shiftvalue={shiftvalue}
                                          error={error}
                                          subtype={subtype}
                                          applicant={applicant}
                                          potentialsevrity={potentialsevrity}
                                          permitTypes={permitTypes}
                                          isEdit={!isNew}
                                          file={file}
                                          image={image}
                                          selectedInvolved={selectedInvolved}
                                          department={department}
                                          setSavedata={setSavedata}
                                        />
                                      </AccordionDetails>
                                    </Accordion>
                                  </Col>
                                  <Col xs={12} md={12} className='normaletter'>
                                    {(!isNew || showChecklistsForm || 'new') && (
                                      <ViewChecklistForms
                                        disabled={disabled}
                                        permitId={param?.id}
                                        expanded={expandedvalue}
                                        expanded2={expandedvalue2}
                                        setExpandedvalue={setExpandedvalue2}
                                        incidentpermitID={incidentpermitID}
                                        formDefinitions={formDefinitions}
                                        onFormChange={onFormChange}
                                        changeTabFun={changeTabFun}
                                        setFormDefinitions={setFormDefinitions}
                                        handleSelect={handleSelect}
                                        checklistid={checklistid}
                                        indexes={index}
                                        incidentpermit={incidentpermit}
                                        formDefinitionsData={formDefinitionsData}
                                        error={error}
                                        formRef={formRef}
                                        setTabValidation={setTabValidation}
                                        statusId={statusId}
                                        tabdisable={tabdisable}
                                        workPermitId={workPermitId}
                                        setSavedata={setSavedata}
                                      />
                                    )}
                                  </Col>
                                </Row>
                              </>
                            )}
                          </FormElement>
                        )}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value={1} className="scroll-bar-edit shadow rounded normaletter">
                    <Investigation
                      disabled={disabled}
                      permitId={param?.id}
                      incidentpermitID={incidentpermitID}
                      formDefinitions={formDefinitions}
                      setFormDefinitions={setFormDefinitions}
                      formDefinitionsData={formDefinitionsData}
                      onFormChange={onFormChange}
                      changeTabFun={changeTabFun}
                      InvestigationFormDefinitionsData={InvestigationFormDefinitionsData}
                      handleFile={handleFile}
                      file={file}
                      error={error}
                      setIsUpdating={setIsUpdating}
                      setTabValidation={setTabValidation}
                      formRef={formRef}
                      setSavedata={setSavedata}
                    />
                  </TabPanel>
                  <TabPanel value={2} className="scroll-bar-edit shadow rounded normaletter">
                    <Actionlist
                      disabled={disabled}
                      permitId={param?.id}
                      incidentpermitID={incidentpermitID}
                      formDefinitions={formDefinitions}
                      setFormDefinitions={setFormDefinitions}
                      formDefinitionsData={formDefinitionsData}
                      onFormChange={onFormChange}
                      actionFormDefinitionsData={actionFormDefinitionsData}
                      handleFile={handleFile}
                      changeTabFun={changeTabFun}
                      file={file}
                      error={error}
                      setIsUpdating={setIsUpdating}
                      setTabValidation={setTabValidation}
                      formRef={formRef}
                      setSavedata={setSavedata}
                    />
                  </TabPanel>
                  <TabPanel value={3}>
                    <div className=" my-1">
                      <WorkflowTracker
                        {...{
                          marker,
                          setMarker,
                          incidentpermitID,
                          incidentpermit,
                          setIsUpdating,
                          disabled,
                          setTabValidation,
                          setSelected,
                          setSavedata,
                        }}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value={4} className="scroll-bar-edit shadow rounded">
                    <Datasignature
                      // setDynamicButton={setDynamicButton}
                      dynaminButton={dynaminButton}
                      className="rounded"
                      disabled={disabled}
                      permitId={param?.id}
                      incidentpermitID={incidentpermitID}
                      formDefinitions={formDefinitions}
                      setFormDefinitions={setFormDefinitions}
                      formDefinitionsData={formDefinitionsData}
                      file={file}
                      setIncidentpermit={setIncidentpermit}
                      incidentpermit={incidentpermit}
                      setFile={setFile}
                      handleComment={handleComment}
                      handleFile={handleFile}
                      comment={comment}
                      error={error}
                      setIsUpdating={setIsUpdating}
                      setTabValidation={setTabValidation}
                      setSavedata={setSavedata}
                    />
                  </TabPanel>
                  <TabPanel value={5} className="scroll-bar-edit shadow rounded">
                    <AuditTrialdata
                      hide={'hide'}
                      permitId={param?.id}
                      incidentpermitID={incidentpermitID}
                      error={error}
                      setIsUpdating={setIsUpdating}
                      setTabValidation={setTabValidation}
                      setSavedata={setSavedata}
                    />
                  </TabPanel>
                </TabContext>
              </Col>
            )}
          </Row>
          {isUpdating && !isNew && <Spinner />}
        </CardBody>
      </Card>
    </>
  );
};

export default New_Incident_Permit;
