import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Card, CardBody } from '@progress/kendo-react-layout';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../Components/Buttons/CommonButton';

import { orderBy } from '@progress/kendo-data-query';
import { deleteProcessData, getProcessTypes } from 'Services/API/masterApi';
import { useTranslation } from 'react-i18next';
import Dialog from '../../Components/Dialog';
import MyCommandCell from '../../Components/MyCommandCell/index.jsx';
import Spinner from '../../Components/Spinner/Spinner';

const intialstate = [
  {
    logic: 'and',
    filters: [],
  },
];
const initialSort = [
  {
    field: 'wfdescription',
    field: 'workflowtype',
    dir: 'asc',
  },
];

const ManageProcessType = () => {
  const navigate = useNavigate();
  const [processdata, setProcessData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sort, setSort] = React.useState(initialSort);
  const { t } = useTranslation();
  const [ID, setID] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(null);
  const [isEnable, setIsEnable] = useState(false);
  const [toggleDialog, setToggleDialog] = React.useState(false);

  const getProcessData = async () => {
    setLoading(true);
    try {
      const res = await getProcessTypes();
      setLoading(false);
      let newArr = res.data?.responseObject.map((val) => ({
        wptype: val.wfType,
        processType: val.processType,
        processId: val.processId,
        validDays: val.validDays,
        enableProcess: val.isActive === true ? 'Yes' : 'No',
      }));
      setPerPage(res.data.responseObject.countData);

      setProcessData(newArr);
    } catch (error) {
      console.log('error [getProcessData]', error);
    }
  };

  useEffect(() => {
    getProcessData();
  }, []);

  const remove = (value) => {
    setID(value.processId);
    setIsEnable(value.enableProcess === 'Yes' ? true : false);
    setToggleDialog(!toggleDialog);
  };

  const handleDelete = async () => {
    try {
      await deleteProcessData(ID).then(async (res) => {
        getProcessData();
        const message = res.data.responseMessage;
        toast.success(t(message));
        setToggleDialog(!toggleDialog);
      });
    } catch (error) {
      toast.error(t(error.title || 'Plot Location Deletion Failed'));
      console.log('error [handleDelete]', error);
    }
  };

  const enterEdit = (dataItem) => {
    navigate(`/manage-process/${dataItem.processId}`);
  };

  const onCreateplotlocation = () => {
    navigate('/manage-process/new');
  };

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const CommandCell = (props) => <MyCommandCell {...props} edit={enterEdit} remove={remove} />;

  return (
    <div className="dynamicgrid dynamicGrid_ manageWorkFlow">
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('manage_process')}</h3>
        </Col>
        <Col md={6} className="text-right">
          <CommonButton text={t('add_process')} onHandleClick={onCreateplotlocation} mx={2} />
        </Col>
      </Row>
      <Card className="border-0 shadow">
        <CardBody>
          <Grid
            className="gridHeight"
            data={orderBy(processdata, sort)}
            sortable={true}
            sort={sort}
            onSortChange={(e) => {
              setSort(e.sort);
            }}
          >
            <Column field="wptype" title={t('type')} />

            <Column field="processType" title={t('process')} />
            <Column field="validDays" title={t('maximum_validity_days')} />

            <Column
              field="enableProcess"
              title="Enable"
              cell={(props) => (
                <td role="gridcell">
                  <div className="d-flex flex-wrap">
                    <div className="d-flex mx-1  px-2 rounded bg-regular text-white">
                      <a className="k-link" onClick={() => remove(props.dataItem)}>
                        {props.dataItem.enableProcess}
                      </a>
                    </div>
                  </div>
                </td>
              )}
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
        </CardBody>
      </Card>

      {toggleDialog && (
        <Dialog
          toggleDialog={toggleDialog}
          setToggleDialog={setToggleDialog}
          handleDelete={handleDelete}
          text={
            isEnable == true
              ? 'Are you sure you want to Disable It?'
              : 'Are you sure you want to Enable It?'
          }
        />
      )}
    </div>
  );
};

export default ManageProcessType;
