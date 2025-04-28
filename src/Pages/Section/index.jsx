import { orderBy } from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
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
import { deleteSection, getSectionListData } from './api';
const initialDataState = [
  {
    field: 'sectionname',
    field: 'formData',
    field: 'permit',
    dir: 'asc',
  },
];

const initialFilter = {
  logic: 'and',
  filters: [],
};

const SectionGrid = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [getpermittype, setGetpermittype] = useState([]);
  const [applicable, setApplicable] = useState([]);
  const [data, setData] = useState([]);
  const [allid, setAllid] = useState({
    type: '',
    id: '',
  });
  const [dropdownevent, setDropdownevent] = useState({
    type: '',
    id: '',
  });
  const [dropdownvalue, setDropdownvalue] = useState([]);
  const { t } = useTranslation();
  const [sort, setSort] = React.useState(initialDataState);
  const [ID, setID] = React.useState('');
  const processTypeList = useSelector(getProcessTypeList);
  const type = useSelector(getType);

  const [toggleDialog, setToggleDialog] = React.useState(false);
  const [filter, setFilter] = React.useState(initialFilter);
  const dispatch = useDispatch();
  const userRoleValue = userRole?.includes('PTW-Admin');
  const CommandCell = (props) => (
    <MyCommandCell {...props} edit={enterEdit} remove={remove} userRoleValue={userRoleValue} />
  );
  const CheckListCell = ({ dataItem }) => {
    return (
      <td role="gridcell">
        <div className="d-flex flex-wrap">
          {dataItem.formData?.map((val) => (
            <div className="d-flex mx-1 px-2 rounded bg-regular text-white my-1">
              {val.checklist}
            </div>
          ))}
        </div>
      </td>
    );
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

  const sectionPermit = ({ dataItem }) => {
    return (
      <td role="gridcell">
        <div className="d-flex flex-wrap">
          {dataItem.permit?.map((val) => (
            <div className="d-flex mx-1  px-2 rounded bg-regular text-white">{val.permit}</div>
          ))}
        </div>
      </td>
    );
  };
  const getSectionList = async () => {
    const data = {
      inputFilters: [
        {
          searchField: processTypeList === '' ? '' : processTypeList.type,
          searchValue: JSON.stringify(type.id),
        },
      ],
    };

    setLoading(true);
    try {
      const res = await getSectionListData(data);
      setData(res.data?.responseObject);
      setLoading(false);
    } catch (error) {
      console.log('err [getSectionList]', error);
    }
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

  const getPermitList = async () => {
    try {
      const res = await getPermitTypes();
      const newArray = res.data.responseObject.map((val) => ({
        type: val.wfType,
        id: val.wfTypeId,
      }));
      const newarray2 = [...newArray, { type: 'All', id: 0 }];
      setGetpermittype(newarray2);
    } catch (err) {
      toast.error(t(err.title));
    }
  };

  useEffect(() => {
    getSectionList();
    getPermitList();
    getApplicable();
  }, []);
  
  useEffect(() => {
    if (allid[0]?.id) {
      getSectionList();
    }
  }, [allid[0]?.id]);

  useEffect(() => {
    if (getpermittype[0]?.id) {
      getApplicable(getpermittype[0]?.id);
    }
  }, [getpermittype[0]?.id]);

  const handlegotopage = () => {
    navigate('/manage-section/new');
  };

  const remove = (dataItem) => {
    setID(dataItem.sectionid);
    setToggleDialog(!toggleDialog);
  };

  const handleDelete = async () => {
    try {
      await deleteSection(ID);
      setToggleDialog(!toggleDialog);
      getSectionList();
      toast.success(t('section_deleted_successfully'));
    } catch (error) {
      toast.error(error.title || t('section_deletion_failed'));
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handlechange = (event) => {
    dispatch(setProcessTypeList(event.target.value));
    dispatch(setType(''));
    setDropdownevent(event.target.value);
    setApplicable([]);
    const newid = event.value.id;
    getApplicable(newid);
    if (newid === 0) {
      setAllid(newid);
      refreshPage();
    }
  };

  const handleOnchange = (event) => {
    dispatch(setType(event.target.value));
    setDropdownvalue(event.target.value);
  };

  const handleSearch = async () => {
    await getSectionList();
  };

  const enterEdit = (dataItem) => {
    navigate(`/manage-section/${dataItem.sectionid}`);
  };

  return (
    <>
      <div className="dynamicgrid dynamicGrid_ manageSection">
        <Row className="mx-1 my-3 p-2 shadow align-items-center">
          <Col md={6}>
            <h3 className="m-0">{t('manage_section')}</h3>
          </Col>
          <Col md={6} className="text-right">
            <CommonButton text={t('new_section')} onHandleClick={handlegotopage} mx={2} />
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
                    // defaultValue={dropdownevent}
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
              data={orderBy(data, sort)}
              filter={filter}
              sortable={true}
              sort={sort}
              onSortChange={(e) => {
                setSort(e.sort);
              }}
            >
              <Column field="sectionname" title={t('section_name')} />
              <Column field="formData" title={t('form_definition')} cell={CheckListCell} />
              <Column field="permit" title={t('process_type')} width="200px" cell={sectionPermit} />
              <Column
                field="Discontinued"
                title={t('action')}
                width="100px"
                filterable={false}
                cell={CommandCell}
              />
            </Grid>
            {loading && <Spinner />}
          </CardBody>
        </Card>

        {toggleDialog && (
          <Dialog
            toggleDialog={toggleDialog}
            setToggleDialog={setToggleDialog}
            handleDelete={handleDelete}
            text={'Are you sure you want to delete ?'}
          />
        )}
      </div>
    </>
  );
};
export default SectionGrid;
