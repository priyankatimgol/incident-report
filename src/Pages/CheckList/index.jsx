import { filterBy, orderBy } from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
import Pagination from 'Components/Pagination/Pagination';
import { getPermitTypes, getUserRole, getWorkFlowList } from 'Services/API/masterApi';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getProcessTypeList,
  getType,
  setProcessTypeList,
  setType,
} from 'store/Checklist/checklistSlice';
import CommonButton from '../../Components/Buttons/CommonButton';
import Dialog from '../../Components/Dialog';
import MyCommandCell from '../../Components/MyCommandCell/index.jsx';
import Spinner from '../../Components/Spinner/Spinner';
import { deleteCheckList, getCheckListData } from './api';

const initialDataState = [
  {
    field: '',
    dir: '',
  },
];

const initialFilter = {
  logic: '',
  filters: '',
};

const CheckList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [getpermittype, setGetpermittype] = useState([]);
  const [limit, setLimit] = React.useState(10);
  const [ID, setID] = useState('');
  const [applicable, setApplicable] = useState([]);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [perPage, setPerPage] = React.useState(null);
  const [dropdownevent, setDropdownevent] = useState({
    type: '',
    id: '',
  });
  const [dropdownvalue, setDropdownvalue] = useState([]);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [sort, setSort] = React.useState(initialDataState);
  const [userRole, setUserRole] = React.useState([]);

  const { t, i18n } = useTranslation();
  const [filter, setFilter] = React.useState(initialFilter);
  const processTypeList = useSelector(getProcessTypeList);
  const type = useSelector(getType);
  const handleDelete = async () => {
    try {
      await deleteCheckList(ID);
      setToggleDialog(!toggleDialog);
      getCheckList();
      setTimeout(toast.success(t('checklist_deleted_successfully')), 2000);
    } catch (error) {
      toast.error(error.title || t('checklist_deletion_failed'));
      console.log('error [handleDelete]', error);
    }
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

  const userRoleValue = userRole?.includes('PTW-Admin');
  const CommandCell = (props) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      view={viewForm}
      userRoleValue={userRoleValue}
    />
  );
  const createNewChecklist = () => {
    navigate('/manage-checklist/new');
  };

  const remove = (dataItem) => {
    console.log('dataItem.id', dataItem.id);
    setID(dataItem.id);
    setToggleDialog(!toggleDialog);
  };

  const enterEdit = (dataItem) => {
    navigate(`/manage-checklist/${dataItem.id}`);
  };
  const viewForm = (dataItem) => {
    navigate(`/view-checklist/${dataItem.id}`);
  };

  const getApplicable = async (newid) => {
    try {
      const res = await getWorkFlowList(newid);

      let newArr = res.data?.responseObject.map((val) => ({
        id: val.processId,
        type: val.processType,
      }));
      setApplicable(newArr);
    } catch (error) {
      console.log('error [getApplicable]', error);
    }
  };
  const getCheckList = async () => {
    const data = {
      sortingField: sort[0].field,
      sortingOrder: sort[0].dir,
      inputFilters: [
        {
          searchField: 'type',
          searchValue: filter?.filters[0]?.value ? filter?.filters[0]?.value : '',
        },

        {
          searchField: 'ptype',
          searchValue: JSON.stringify(type.id),
        },
      ],
    };

    setLoading(true);
    try {
      const res = await getCheckListData({ page, limit, data });
      setData(res.data?.responseObject.checkListData);
      setPerPage(res.data.responseObject?.countData);
      setLoading(false);
    } catch (error) {
      console.log('err [getCheckList]', error);
    }
  };

  const getPermitList = async () => {
    try {
      const res = await getPermitTypes();
      const newArray = res.data.responseObject.map((val) => ({
        type: val.wfType,
        id: val.wfTypeId,
      }));
      setGetpermittype(newArray);
    } catch (err) {
      console.log('err', err);
      toast.error(t(err.title || 'workflow_creation_failed'));
    }
  };

  useEffect(() => {
    getPermitList();
  }, []);

  useEffect(() => {
    if (getpermittype[0]?.id) {
      getApplicable(getpermittype[0]?.id);
    }
  }, [getpermittype[0]?.id]);

  React.useEffect(() => {
    getCheckList();
  }, [page, limit, sort, filter?.filters[0]?.value]);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const handlesortpage = (event) => {
    if (event.sort.length === 0) {
      setSort(initialDataState);
    } else {
      setSort(event.sort);
    }
  };

  const handlefilterpage = (event) => {
    if (event.filter === null) {
      setFilter(initialFilter);
    } else {
      setFilter(event.filter);
    }
  };

  const chcklistpermit = ({ dataItem }) => {
    return (
      <td role="gridcell">
        <div className="d-flex flex-wrap">
          {dataItem.processType?.map((val) => (
            <div className="d-flex mx-1  px-2 rounded bg-regular text-white my-1">
              {val.processType}
            </div>
          ))}
        </div>
      </td>
    );
  };

  const handlechange = (event) => {
    dispatch(setProcessTypeList(event.target.value));
    dispatch(setType(''));
    setDropdownevent(event.target.value);
    const newid = event.value.id;
    getApplicable(newid);
  };

  const handleOnchange = (event) => {
    dispatch(setType(event.target.value));
    setDropdownvalue(event.target.value);
  };

  const handleSearch = async () => {
    await getCheckList();
  };

  return (
    <div className="dynamicgrid dynamicGrid_ manageFormDefinition">
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('manage_form_definition')}</h3>
        </Col>
        <Col md={6} className="text-right">
          <CommonButton text={t('new_form_definition')} onHandleClick={createNewChecklist} mx={2} />
        </Col>
      </Row>
      <Card className="border-0 shadow">
        <CardBody>
          <div className="align-items-end label  space">
            <Row className="align-items-end ">
              <Col xs={12} md={5}>
                <Label>{t('type')}</Label>
                <DropDownList
                  data={getpermittype}
                  textField="type"
                  dataItemKey="id"
                  onChange={handlechange}
                  defaultValue={processTypeList}
                />
              </Col>
              <Col xs={12} md={5}>
                <Label>{t('process_type')}</Label>
                <DropDownList
                  textField="type"
                  dataItemKey="id"
                  data={dropdownevent === 'WorkPermit' ? applicable : applicable}
                  onChange={handleOnchange}
                  //defaultValue={type}
                  value={type}
                />
              </Col>
              <Col xs={12} md={2}>
                <CommonButton text={t('search')} onHandleClick={handleSearch} mx={2} />
              </Col>
            </Row>
          </div>
          <br></br>
          <Grid
            className="gridHeight"
            filter={filter}
            sortable={true}
            filterable={true}
            data={orderBy(filterBy(data, filter), sort)}
            sort={sort}
            onSortChange={handlesortpage}
            onFilterChange={handlefilterpage}
          >
            <Column field="type" title={t('form_structure_title')} />
            <Column
              field=""
              width="500px"
              title={t('process_type')}
              filterable={false}
              cell={chcklistpermit}
            />
            <Column
              field="Discontinued"
              title={t('action')}
              width="100px"
              filterable={false}
              cell={CommandCell}
            />
          </Grid>
          {loading && <Spinner />}

          <Pagination
            onChange={handlePageClick}
            perPage={perPage}
            page={page}
            totalPage={Math.ceil(perPage / limit)}
            setLimit={setLimit}
            limit={limit}
          />
        </CardBody>
      </Card>
      {toggleDialog && (
        <Dialog
          toggleDialog={toggleDialog}
          setToggleDialog={setToggleDialog}
          handleDelete={handleDelete}
          text={'are you sure you want to delete ?'}
        />
      )}
    </div>
  );
};

export default CheckList;
