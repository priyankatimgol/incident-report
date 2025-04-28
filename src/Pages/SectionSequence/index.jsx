import { orderBy } from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
import CommonButton from 'Components/Buttons/CommonButton';
import { getPermitTypes, getWorkFlowList } from 'Services/API/masterApi';
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
import Dialog from '../../Components/Dialog';
import MyCommandCell from '../../Components/MyCommandCell/index.jsx';
import Spinner from '../../Components/Spinner/Spinner';
import { getData, getSectionSequencefilterdata } from './api';
const initialDataState = [
  {
    field: '',
    dir: '',
  },
];

const CheckList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [toggleDialog, setToggleDialog] = useState(false);
  const [applicable, setApplicable] = useState([]);
  const [data, setData] = useState([]);
  const [sort, setSort] = React.useState(initialDataState);
  const CommandCell = (props) => <MyCommandCell {...props} edit={enterEdit} state="sequence" />;
  const { t, i18n } = useTranslation();
  const [getpermittype, setGetpermittype] = useState([]);
  const [dropdownevent, setDropdownevent] = useState({
    type: '',
    id: '',
  });
  const [allid, setAllid] = useState({
    type: '',
    id: '',
  });
  const [dropdownvalue, setDropdownvalue] = useState([]);
  const processTypeList = useSelector(getProcessTypeList);
  const type = useSelector(getType);
  const SectionCell = ({ dataItem }) => {
    return (
      <td role="gridcell">
        <div className="d-flex flex-wrap">
          {dataItem.secList?.map((val) => (
            <div className="d-flex mx-1 px-2 rounded bg-regular text-white my-1">
              {val.sectionname}
            </div>
          ))}
        </div>
      </td>
    );
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const getSctionWorkflow = async () => {
    setLoading(true);
    try {
      const res = await getData();
      setData(res.data?.responseObject.tables);
      setLoading(false);
    } catch (error) {
      console.log('err [getCheckList]', error);
    }
  };

  useEffect(() => {
    if (!type.id) {
      getSectionList(type.id);
    }
  }, [type.id]);

  const enterEdit = (dataItem) => {
    navigate(`/manage-section-sequence/${dataItem.wfId}`);
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
  const getSectionList = async (id) => {
    setLoading(true);
    try {
      const res = await getSectionSequencefilterdata(id);
      setData(res.data?.responseObject.tables);
      setLoading(false);
    } catch (error) {
      console.log('err [getSectionList]', error);
    }
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

  useEffect(() => {
    if (allid[0]?.id) {
      getSectionList();
    }
  }, [allid[0]?.id]);
  useEffect(() => {
    getSectionList(type.id);
    getPermitList();
    getApplicable();
  }, []);
  const handleOnchange = (event) => {
    dispatch(setType(event.target.value));
    setDropdownvalue(event.target.value);
  };
  const handleSearch = async () => {
    await getSectionList(type.id);
  };
  return (
    <div className="dynamicgrid dynamicGrid_ manageSectionSequence">
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('manage_section_sequence')}</h3>
        </Col>
      </Row>
      <Card className="border-0 shadow">
        <CardBody>
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
          <br></br>
          <Grid
            className="gridHeight"
            data={orderBy(data, sort)}
            sortable={true}
            sort={sort}
            onSortChange={(e) => {
              setSort(e.sort);
            }}
          >
            <Column field="wfName" title={t('process_type')} width="400px" />

            <Column field="sectionname" title={t('section')} cell={SectionCell} />
            <Column
              field="Discontinued"
              title={t('action')}
              filterable={false}
              width="100px"
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
          text={'are you sure you want to delete ?'}
        />
      )}
    </div>
  );
};

export default CheckList;
