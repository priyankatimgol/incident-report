import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { filterBy, orderBy, process } from '@progress/kendo-data-query';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Card } from '@progress/kendo-react-layout';
import CommonButton from 'Components/Buttons/CommonButton';
import Dialog from 'Components/Dialog';
import { FormDatePicker, FormInput } from 'Components/Form/Form';
import { ColumnMenuCheckboxFilter } from 'Components/columnMenu/index.jsx';
import {
  getIncidentPermitCloseList,
  getIncidentPermitList
} from 'Pages/Incident permit/api';
import {
  getAreaFilterData,
  getAssetFilterData,
  getClosedNumberFilterData,
  getClosedTitleFilterData,
  getNumberFilterData,
  getPermitsFilterData,
  getReportedbyFilterData,
  getRolesFilterData,
  getSeverityFilterData,
  getStatusFilterData,
  getTitleFilterData,
  getUserRole,
  getUserTooltipData,
  notificationData,
  notificationDataCount,
  notificationRead
} from 'Services/API/masterApi';
import { useCustomRef } from 'Services/services';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaBell } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getstatusname } from 'store/Statusname/statusnameSlice.js';
import MyCommandCell from '../../Components/MyCommandCell/index.jsx';
import Pagination from '../../Components/Pagination/Pagination';
import Spinner from '../../Components/Spinner/Spinner';
import { deleteIncidentPermit } from './api';
import './style.css';
const initialSort = [
  {
    dir: '',
    field: ' ',
  },
];
const locales = [
  {
    language: 'en-US',
    locale: 'en',
  },
  {
    language: 'es-ES',
    locale: 'es',
  },
];

const editField = 'inEdit';
const intialstate = {
  logic: 'and',
  filters: [],
};
const Incident_Permit = () => {
  const [sort, setSort] = React.useState(initialSort);
  let gridPDFExport;
  const [notification, setNotification] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const { t, i18n } = useTranslation();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [ID, setID] = React.useState('');
  const [toggleDialog, setToggleDialog] = React.useState(false);
  const navigate = useNavigate();
  const [perPage, setPerPage] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState(intialstate);
  const [incidentPermit, setIncidentPermit] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [limit, setLimit] = React.useState(10);
  const [notificationcount, setNotificationCount] = React.useState([]);
  const [userRole, setUserRole] = React.useState([]);
  const [tooltipUserData, setTooltipUserData] = React.useState([]);
  const processTypeList = useSelector(getstatusname);
  const [filterAllVariable, setFilterAllVariable] = React.useState([]);
  const [incidentsevrity, setIncidentSevrity] = React.useState([]);
  const [reportedby, setReportedBy] = React.useState([]);
  const [number, setNumber] = React.useState([]);
  const [titleData, setTitleData] = React.useState([]);
  const [selected, setSelected] = React.useState(
    processTypeList === 'Close' || processTypeList === 'Rejected' ? '1' : '0',
  );
  const [permitTypes, setPermitTypes] = React.useState([]);
  const [datafilter, setDatafilter] = React.useState(false);
  const [permitstatus, setPermitStatus] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [userrolegriddata, setUserRoleGridData] = React.useState([]);
  const [asset, setAsset] = React.useState([]);
  const createDataState = (dataState) => {
    return {
      result: process(incidentPermit.slice(0), dataState),
      dataState: dataState,
    };
  };
  let initialStatefilter = createDataState({
    take: limit,
    skip: 0,
  });
  const [allFilterResponseData, setallFilterResponseData] = React.useState([])
  const [filterValue, setFilterValue] = React.useState(false);
  const [result, setResult] = React.useState(initialStatefilter.result);
  const [dataState, setDataState] = React.useState(initialStatefilter.dataState);
  const [filterdata, setFilterData] = React.useState([]);
  React.useEffect(() => {
    setResult(initialStatefilter.result);
    setDataState(initialStatefilter.dataState);
  }, [incidentPermit]);

  
  
  useEffect(() => {
    const newArray = dataState.filter?.filters[0]?.filters?.map((val) => ({
      field: val.field,
      value: val.value,
    }));

    if (newArray) {
      setFilterData((prevData) => ({
        ...prevData,
        filedData: Array.isArray(prevData.filedData)
          ? [...prevData.filedData, ...newArray]
          : newArray,
      }));
    }
  }, [dataState.filter]);
  useEffect(() => {
    if (selected === '0') {
      getData(sort, selected, title);
    } else {
      getCloseData(sort, selected, title);
    }
    
  }, [filterAllVariable]);
  const getData = async (sort, status, inputFilters) => {
    let fromDate = startDate === null ? null : startDate;
    let toDate = endDate === null ? null : endDate;

    const data = {
      pageno: page,
      limit: limit,
      startdate: fromDate,
      enddate: toDate,
      sortingField: sort[0].field,

      sortingOrder: sort[0].dir,

      status: status === '0' ? 'active' : 'completed',

      inputFilters: [
        {
          searchValue: inputFilters,
        },
      ],
      permitstatusFilter:filterAllVariable.permitstatusFilter||[],
      numberFilter: filterAllVariable.numberFilter || [],
      titleFilter:filterAllVariable.titleFilter || [],
      permitTypeFilter:filterAllVariable.permitTypeFilter||[],
      userRoleFilter:filterAllVariable.userRoleFilter||[],
      assetFilter:filterAllVariable.assetFilter||[],
      areaFilter:filterAllVariable.areaFilter||[],
     
      severityFilter: filterAllVariable.severityFilter || [],  
      reportedByFilter: filterAllVariable.reportedByFilter || [],
    };
    setLoading(true);
    const res = await getIncidentPermitList(data);
    setIncidentPermit(res.data.responseObject.incidentData);
    const incidentData = res.data.responseObject?.incidentData;
    setPerPage(res.data.responseObject?.countData);
    const ApiData = {
      areaFilter: Array.from(new Set(incidentData.map((val) => val.location))).map((area) => ({ area })),
      assetFilter: Array.from(new Set(incidentData.map((val) => val.asset))).map((asset) => ({ asset })),
      numberFilter: Array.from(new Set(incidentData.map((val) => val.number))).map((number) => ({ number })),
      permitTypeFilter: Array.from(new Set(incidentData.map((val) => val.type))).map((permitType) => ({ permitType })),
      permitstatusFilter: Array.from(new Set(incidentData.map((val) => val.incidentStatus ))).map((permitstatus) => ({ permitstatus })),
      titleFilter: Array.from(new Set(incidentData.map((val) => val.title))).map((title) => ({ title })),
      userRoleFilter: Array.from(new Set(incidentData.map((val) => val.currentStepApprovalRoleId))).map((userRole) => ({ userRole })),
      severityFilter: Array.from(new Set(incidentData.map((val) => val.severity))).map((severity) => ({ severity })),
      reportedByFilter: Array.from(new Set(incidentData.map((val) => val.reportBy))).map((reportedBy) => ({ reportedBy })),
    };
    setallFilterResponseData(ApiData);
    setLoading(false);
  };
 
  
  
  const dataStateChange = (event) => {

    if(event.dataState.filter===undefined)
    {
      setFilterAllVariable([])
      setFilterValue(false)
    }else{
      setFilterValue(true)
    let updatedState = createDataState(event.dataState);
    setDatafilter(false);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
    const array = updatedState.dataState.filter?.filters[0].filters;
    const updatedStateArray = array
      .map((val) => {
        console.log("val,val",val)
        if (val.field === 'type') {
          return { permit: val.value };
        } else if (val.field === 'incidentStatus') {
          return { permitstatus: val.value };
        } else if (val.field === 'asset') {
          return { asset: val.value };
        } else if (val.field === 'location') {
          return { area: val.value };
        } else if (val.field === 'currentStepApprovalRoleId') {
          return { userRole: val.value };
        } 
        else if (val.field === 'title') {
          return { title: val.value };
        } 
        else if (val.field === 'number') {
          return { number: val.value };
        } 
        else if (val.field === 'severity') {
          return { severity: val.value };
        } 
        else if (val.field === 'reportBy') {
          return { reportBy: val.value };
        } 
       
        return null; // or return any default value if needed
      })
      .filter(Boolean);
  
    setFilterAllVariable((prevState) => {
      const updatedFilters = {
        permitTypeFilter: prevState.permitTypeFilter || [],
        permitstatusFilter: prevState.permitstatusFilter || [],
        assetFilter: prevState.assetFilter || [],
        areaFilter: prevState.areaFilter || [],
        userRoleFilter: prevState.userRoleFilter || [],
        numberFilter: prevState.numberFilter || [],
        titleFilter: prevState.titleFilter || [],
        severityFilter: prevState.severityFilter || [],  
        reportedByFilter: prevState.reportedByFilter || [],
      };
  
      updatedFilters.permitTypeFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.permit)
          .map((filter) => ({ permitType: filter.permit }))
      );
      updatedFilters.permitstatusFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.permitstatus)
          .map((filter) => ({ permitstatus: filter.permitstatus }))
      );
      updatedFilters.assetFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.asset)
          .map((filter) => ({ asset: filter.asset }))
      );
      updatedFilters.areaFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.area)
          .map((filter) => ({ area: filter.area }))
      );
      updatedFilters.userRoleFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.userRole)
          .map((filter) => ({ userRole: filter.userRole }))
      );
      updatedFilters.severityFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.severity)
          .map((filter) => ({ severity: filter.severity }))
      );
      updatedFilters.reportedByFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.reportBy)
          .map((filter) => ({ reportedBy: filter.reportBy }))
      );
      updatedFilters.numberFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.number)
          .map((filter) => ({ number: filter.number }))
      );
      updatedFilters.titleFilter.push(
        ...updatedStateArray
          .filter((filter) => filter.title)
          .map((filter) => ({ title: filter.title }))
      );
      return updatedFilters;
    });
  }
  
    // Call the getData function with the updated filters
  };
  const getCloseData = async (sort, status, inputFilters) => {
    let fromDate = startDate === null ? null : startDate;
    let toDate = endDate === null ? null : endDate;
    const data = {
      pageno: page,
      limit: limit,
      startdate: fromDate,
      enddate: toDate,
      sortingField: sort[0].field,

      sortingOrder: sort[0].dir,

      status: status === '0' ? 'active' : 'completed',

      inputFilters: [
        {
          searchValue: inputFilters,
        },
      ],
      permitstatusFilter:filterAllVariable.permitstatusFilter||[],
      numberFilter: filterAllVariable.numberFilter || [],
      titleFilter:filterAllVariable.titleFilter || [],
      permitTypeFilter:filterAllVariable.permitTypeFilter||[],
      userRoleFilter:filterAllVariable.userRoleFilter||[],
      assetFilter:filterAllVariable.assetFilter||[],
      areaFilter:filterAllVariable.areaFilter||[],
      severityFilter: filterAllVariable.severityFilter || [],  
      reportedByFilter: filterAllVariable.reportedByFilter || [],
    };
    setLoading(true);
    const res = await getIncidentPermitCloseList(data);
    setIncidentPermit(res.data.responseObject.incidentData);
    const incidentData = res.data.responseObject?.incidentData;
    const ApiData = {
      areaFilter: Array.from(new Set(incidentData.map((val) => val.location))).map((area) => ({ area })),
      assetFilter: Array.from(new Set(incidentData.map((val) => val.asset))).map((asset) => ({ asset })),
      numberFilter: Array.from(new Set(incidentData.map((val) => val.number))).map((number) => ({ number })),
      permitTypeFilter: Array.from(new Set(incidentData.map((val) => val.type))).map((permitType) => ({ permitType })),
      permitstatusFilter: Array.from(new Set(incidentData.map((val) => val.incidentStatus ))).map((permitstatus) => ({ permitstatus })),
      titleFilter: Array.from(new Set(incidentData.map((val) => val.title))).map((title) => ({ title })),
      userRoleFilter: Array.from(new Set(incidentData.map((val) => val.currentStepApprovalRoleId))).map((userRole) => ({ userRole })),
      severityFilter: Array.from(new Set(incidentData.map((val) => val.severity))).map((severity) => ({ severity })),
      reportedByFilter: Array.from(new Set(incidentData.map((val) => val.reportBy))).map((reportedBy) => ({ reportedBy })),
    };
    setallFilterResponseData(ApiData);
    setPerPage(res.data.responseObject?.countData);
    setLoading(false);
  };
  const getApplicable = async () => {
    try {
      const data={
        workFlowType:'incident',
        permitTypeFilter:filterValue?allFilterResponseData.permitTypeFilter:[]
      }
      const res = await getPermitsFilterData(data);
      const newData=res.data.responseObject.map((val)=>({
        type:val.permitType
      }))
      setPermitTypes(newData);
      
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  const getTitleData = async () => {
    try {
      const data={
        workFlowType:'incident',
        titleFilter:filterValue?allFilterResponseData.titleFilter:[]

      }
      const res = await getTitleFilterData(data);
      const newdata= (res.data.responseObject.map((val)=>({
        title: val.title
       })));
     setTitleData(newdata);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  const getNumberData = async () => {
    try {
      const ApiData={
        workFlowType:"incident",
        numberFilter:filterValue?allFilterResponseData.numberFilter:[]
      }
      const res = await getNumberFilterData(ApiData);
     
      const newdata= (res.data.responseObject.map((val)=>({
        number: val.number
       })));
      setNumber(newdata);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  const getReportedbyData = async () => {
    try {
      const data={
        workFlowType:'incident',
        reportedByFilter:filterValue?allFilterResponseData.reportedByFilter:[]
      }
      const res = await getReportedbyFilterData(data);
    const newdata= (res.data.responseObject.map((val)=>({
      reportBy: val.reportedBy
     })));
    
     setReportedBy(newdata)
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  const getStatusData = async () => {
    const ApiData={
      workFlowType:'incident',
      permitstatusFilter:filterValue?allFilterResponseData.permitstatusFilter:[]
    }
    const res = await getStatusFilterData(ApiData);
    
   const newdata= (res.data.responseObject.map((val)=>({
    incidentStatus: val.permitstatus
   })));
  
    setPermitStatus(newdata)
  };
  const getAsset = async () => {
    try {
      const ApiData={
        workFlowType:'incident',
        assetFilter:filterValue?allFilterResponseData.assetFilter:[]
      }
      const res = await getAssetFilterData(ApiData);
      const newData=res.data.responseObject.map((val)=>({
        asset:val.asset
      }))
   setAsset(newData);
    } catch (err) {}
  };
  const getIncidentSevrity = async () => {
    try {
      const ApiData={
        workFlowType:'incident',
        severityFilter:filterValue?allFilterResponseData.severityFilter:[]  
      }
      const res = await getSeverityFilterData(ApiData);
      const newdata= (res.data.responseObject.map((val)=>({
        severity: val.severity
       })));
       setIncidentSevrity(newdata)
    
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  const getClosedTitleData = async () => {
    try {
      const data={
        workFlowType:'incident',
        titleFilter:filterValue?allFilterResponseData.titleFilter:[]

      }
      const res = await getClosedTitleFilterData(data);
      const newdata= (res.data.responseObject.map((val)=>({
        title: val.title
       })));
     setTitleData(newdata);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  const getClosedNumberData = async () => {
    try {
      const ApiData={
        workFlowType:"incident",
        numberFilter:filterValue?allFilterResponseData.numberFilter:[]
      }
      const res = await getClosedNumberFilterData(ApiData);
      const newdata= (res.data.responseObject.map((val)=>({
        number: val.number
       })));
      setNumber(newdata);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  useEffect(() => {
    if (selected === '0') {
    getIncidentSevrity()
    getAsset()
    getReportedbyData()
    getNumberData()
    getTitleData()
    getStatusData()
    getApplicable()
    getRolesData()
    getLocation();
    }else{
      getIncidentSevrity()
      getAsset()
      getReportedbyData()
      getClosedTitleData()
      getClosedNumberData()
      getStatusData()
      getApplicable()
      getRolesData()
      getLocation();
    }
  }, [allFilterResponseData]);
  const getNotificationData = async () => {
    try {
      const res = await notificationData();
      setNotification(res.data.responseObject);
    } catch (err) {
      console.log(err);
    }
  };
  const getNotificationDataCount = async () => {
    try {
      const res = await notificationDataCount();
      setNotificationCount(res.data.responseObject);
    } catch (err) {
      console.log(err);
    }
  };

  const getLocation = async () => {
    try {
      const ApiData={
        workFlowType:'incident',
        areaFilter:filterValue?allFilterResponseData.areaFilter:[]
      }
      const res = await getAreaFilterData(ApiData);
     
      
      const newData=res.data.responseObject.map((val)=>({
        location:val.area
      }))
     setLocation(newData);
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };
  const getRolesData = async () => {
    try {
      const ApiData={
        workFlowType:'incident',
        userRoleFilter:filterValue?allFilterResponseData.userRoleFilter:[]
      }
     const res= await getRolesFilterData(ApiData)
     const newData=res.data.responseObject.map((val)=>({
      currentStepApprovalRoleId:val.userRole
    }))
     setUserRoleGridData(newData)
        
    } catch (err) {}
  };
  const handleSearch = async () => {
    setDatafilter(true);
    if (selected === '0') {
      getData(sort, selected, title);
    } else {
      getCloseData(sort, selected, title);
    }
  };
 

  useEffect(() => {
    if (selected === '0') {
      getData(sort, selected, title);
    } else {
      getCloseData(sort, selected, title);
    }

    getLocation();
  }, [page, limit, sort, selected]);

  const view = (dataItem) => {
    navigate(`/manage-incident/view-permit/${dataItem.id}`);
  };

  const enterEdit = (dataItem) => {
    navigate(`/manage-incident/${dataItem.id}`);
  };

  const remove = (dataItem) => {
    setID(dataItem.id);
    setToggleDialog(!toggleDialog);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteIncidentPermit(ID);
      const massage = t(res.data.responseMessage);
      toast.success(t(massage));
      getData(sort, selected, title);
      setToggleDialog(!toggleDialog);
    } catch (err) {
      console.log('err [IncidentPermit]', err);
      toast.error(err.title || t('ptw_incidentmgmt_create_failed'));
    }
  };

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const itemChange = (event) => {
    const newData = data.map((item) =>
      item.ProductID === event.dataItem.ProductID
        ? { ...item, [event.field || '']: event.value }
        : item,
    );
    setData(newData);
  };

  const handlesortpage = (e) => {
    if (e.sort.length === 0) {
      setSort(initialSort);
    } else {
      setSort(e.sort);
    }
  };

  const handalGotoPage = () => {
    navigate('/manage-incident/new');
  };
  
  const getUserRoleData = async () => {
    try {
      await getUserRole()
        .then((res) => {
          setUserRole(res.data?.responseObject);
      
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };

  useEffect(() => {
    getUserRoleData();
  }, []);
  const userRoleValue = userRole?.includes('IM-Admin');

  const CommandCell = (props) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      editField={editField}
      view={view}
      selected={selected}
      userRoleValue={userRoleValue}
    />
  );

  const onStartChange = (e) => {
    setStartDate(moment(e.value).format('YYYY-MM-DD'));
  };
  const onEndChange = (e) => {
    setEndDate(moment(e.value).format('YYYY-MM-DD'));
  };

  const DateCell = ({ dataItem }) => {
    return <td>{moment(dataItem.date).format('DD-MM-YYYY')}</td>;
  };

  const handleOnChange = (e, newValue) => {
    setSelected(newValue);
  };
  const readNotification = async (requestId) => {
    try {
      const res = await notificationRead(requestId);
    } catch (err) {
      console.log(err);
    }
  };

  const onRecordClick = (requestId) => {
    navigate(`/manage-incident/${requestId}`);
    readNotification(requestId);
  };

  const getUserData = async (value) => {
    try {
      const res = await getUserTooltipData(value.asset, value.currentStepApprovalRoleId);
      setTooltipUserData(res.data.responseObject);
    } catch (err) {
      console.log(err);
    }
  };

  const ProductNameCell = (props) => {
    return (
      <td title={tooltipUserData} onMouseEnter={() => getUserData(props.dataItem)}>
        {props.dataItem.currentStepApprovalRoleId}
      </td>
    );
  };

  const grid = (
    <Grid
      className="gridHeight"
      {...dataState}
      onDataStateChange={dataStateChange}
      onItemChange={itemChange}
      editField={editField}
      sortable={true}
      data={datafilter ? orderBy(filterBy(incidentPermit, filter), sort) : result}
      // data={result}
      // data={orderBy(filterBy(incidentPermit, filter), sort)}
      filter={filter}
      resizable={true}
      onSortChange={handlesortpage}
      //onFilterChange={(e) => setFilter(e.filter)}
      sort={sort}
    >
      <Column
        field="number"
        title={t('incident_number')}
        resizable={true}
        columnMenu={(props) => ColumnMenuCheckboxFilter(props,number)}

      />

      {selected === '0' ? (
        <Column
          field="title"
          title={t('incident_title')}
          resizable={true}
          columnMenu={(props) => ColumnMenuCheckboxFilter(props,titleData)}
          cell={(props) => (
            <td className="btn-color">
              <Link to={`/manage-incident/${props.dataItem.id}`}>{props.dataItem.title}</Link>
            </td>
          )}
        />
      ) : (
        <Column
          field="title"
          title={t('incident_title')}
          columnMenu={(props) => ColumnMenuCheckboxFilter(props,titleData)}
          resizable={true}
        />
      )}

      <Column
        field="date"
        title={t('incident_date')}
        editor="date"
        format="{0:g}"
        cell={DateCell}
        filter="date"
        sortable={true}
        filterable={true}
        resizable={true}
      />
      <Column
        field="type"
        title={t('incident_type')}
        editor="boolean"
        resizable={true}
        columnMenu={(props) => ColumnMenuCheckboxFilter(props,permitTypes)}
      />
      <Column
        field="severity"
        title={t('incident_severity')}
        editor="boolean"
        resizable={true}
        columnMenu={(props) => ColumnMenuCheckboxFilter(props, incidentsevrity)}
      />
      <Column
        field="incidentStatus"
        title={t('incident_status')}
        columnMenu={(props) => ColumnMenuCheckboxFilter(props, permitstatus)}
        resizable={true}
      />
      <Column
        field="reportBy"
        title={t('incident_report_by')}
        editor="boolean"
        resizable={true}
        columnMenu={(props) => ColumnMenuCheckboxFilter(props,reportedby)}
      />
      <Column
        field="currentStepApprovalRoleId"
        title={t('next_user_role')}
        columnMenu={selected === '0'?(props) => ColumnMenuCheckboxFilter(props, userrolegriddata):''}
       // columnMenu={(props) => ColumnMenuCheckboxFilter(props, userrolegriddata)}
        cell={ProductNameCell}
      />
      <Column
        field="asset"
        title={t('asset')}
        editor="boolean"
        resizable={true}
        columnMenu={(props) => ColumnMenuCheckboxFilter(props, asset)}
      />
      <Column
        field="location"
        title={t('location')}
        columnMenu={(props) => ColumnMenuCheckboxFilter(props, location)}
      />
      <Column
        field="Action"
        title={t('action')}
        cell={CommandCell}
        filterable={false}
        sortable={false}
        locked={true}
        width="100px"
      />
    </Grid>
  );
  const onBellIconClick = () => {
    setShow(!show);
    getNotificationData();
  };
  const onchangetitle = (e) => {
    setTitle(e.value);
    if (e.value === '') {
      if (selected === '0') {
        getData(sort, selected, '');
      } else {
        getCloseData(sort, selected, '');
      }
    }
  };
  useEffect(() => {
    getNotificationDataCount();
  }, []);

  const ref = useCustomRef(() => {
    setShow(false);
  });
  return (
    <>
      <div className="dynamicgrid dynamicGrid_">
        <Row className="mx-1 my-3 pb-2 shadow align-items-end mainOuter">
          <Col xs={12} md={8}>
            <Form
              render={(formRenderProps) => (
                <FormElement>
                  <Row className="align-items-end label  space ">
                    <Col xs={12} md={3}>
                      <Field
                        key={'start Date'}
                        id={'start Date'}
                        name={'start Date'}
                        label={t('start_date')}
                        component={FormDatePicker}
                        placeholder={t('Day-Month-Year')}
                        onChange={onStartChange}
                        defaultValue=""
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <Field
                        key={'end Date'}
                        id={'end Date'}
                        name={'end Date'}
                        label={t('end_date')}
                        component={FormDatePicker}
                        onChange={onEndChange}
                        defaultValue=""
                        placeholder={t('Day-Month-Year')}
                      />
                    </Col>

                    <Col xs={12} md={4}>
                      <Field
                        key={'Tittle'}
                        id={'Tittle'}
                        name={'title'}
                        label={t('search_text')}
                        type={'search'}
                        component={FormInput}
                        //validator={formInput}
                        onChange={onchangetitle}
                        defaultValue=""
                        data={title}
                      />
                    </Col>
                    <Col xs={12} md={1} className="pb-2">
                      <CommonButton text={t('search')} onHandleClick={handleSearch} />
                    </Col>
                  </Row>
                </FormElement>
              )}
            />
          </Col>
          <Col xs={12} md={3} className="text-right pb-2">
            <CommonButton text={t('new_incident')} onHandleClick={handalGotoPage} mx={2} />
          </Col>
          <Col xs={12} md={1} className="mb-2">
            <div ref={ref} className="relative" style={{ width: '40px' }}>
              <FaBell
                fontSize={40}
                color="#1274ac"
                className="hand-pointer"
                onClick={onBellIconClick}
              />
              {notificationcount <= 0 ? (
                ''
              ) : (
                <div
                  className=""
                  style={{
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    width: '20px',
                    height: '20px',
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  {notificationcount}
                </div>
              )}

              {show && (
                <div className="notification-container">
                  <div className="m-0 py-1 px-2">
                    <div
                      className="border-bottom-dark d-flex align-items-center justify-content-between"
                      style={{ paddingLeft: '0px' }}
                    >
                      <h4 className="my-0 text-capitalize font-weight-bold justify-content-left">
                        notification
                      </h4>
                      <MdClear
                        className="justify-content-right "
                        fontSize={25}
                        onClick={onBellIconClick}
                      />
                    </div>
                  </div>
                  <div className="scroll_container">
                    {notification &&
                      notification.map((val) => (
                        <div>
                          <p
                            className="border-bottom-dark hand-pointer"
                            onClick={() => onRecordClick(val.requestId)}
                          >
                            {val.message}
                            <br />
                            <p className="notification-details">
                              {' '}
                              {moment(val.createDate).format('DD-MM-YYYY HH:mm:ss')}
                            </p>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <Card className="border-0 shadow mainOuter">
        <TabContext value={selected}>
          <TabList onChange={handleOnChange} className="border-bottom">
            <Tab label={t('active')} value="0" className="font-weight-bold" />
            <Tab label={t('close')} value="1" className="font-weight-bold" />
          </TabList>
          <TabPanel value="0">
            {grid}
            {/* <Tooltip  openDelay={100} position="right" anchorElement="target">
        
         </Tooltip> */}

            {loading && <Spinner />}
            <Pagination
              onChange={handlePageClick}
              perPage={perPage}
              page={page}
              totalPage={Math.ceil(perPage / limit)}
              setLimit={setLimit}
              limit={limit}
            />
          </TabPanel>
          <TabPanel value="1">
            {grid}
            {loading && <Spinner />}

            <Pagination
              onChange={handlePageClick}
              perPage={perPage}
              totalPage={Math.ceil(perPage / limit)}
              setLimit={setLimit}
              limit={limit}
              page={page}
            />
          </TabPanel>
        </TabContext>
        {/* <Pagination onChange={handlePageClick} totalPage={Math.ceil(perPage / limit)} /> */}
      </Card>
      {toggleDialog && (
        <Dialog
          toggleDialog={toggleDialog}
          setToggleDialog={setToggleDialog}
          handleDelete={handleDelete}
          text={'are you sure you want to delete ?'}
        />
      )}
    </>
  );
};

export default Incident_Permit;
