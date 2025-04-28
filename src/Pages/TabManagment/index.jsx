import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Card, CardBody } from '@progress/kendo-react-layout';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../Components/Buttons/CommonButton';

import { orderBy } from '@progress/kendo-data-query';
import Pagination from 'Components/Pagination/Pagination';
import { useTranslation } from 'react-i18next';
import { deleteTabData, getTabs } from 'Services/API/masterApi';
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

const ManageTabs = () => {
  const navigate = useNavigate();
  const [processdata, setProcessData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sort, setSort] = React.useState(initialSort);
  const [isEnable, setIsEnable] = useState(false);
  const { t } = useTranslation();
  const [ID, setID] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(null);
  const [limit, setLimit] = React.useState(10);
  const [toggleDialog, setToggleDialog] = React.useState(false);

  const getProcessData = async () => {
    setLoading(true);
    try {
      const res = await getTabs();
      setLoading(false);
      let newArr = res.data?.responseObject.map((val) => ({
        wptype: val.wfType,
        processType: val.processType,
        tabId: val.tabId,
        tabName: val.tabName,
        enableTab: val.isActive === true ? 'Yes' : 'No',
      }));

      setProcessData(newArr);
    } catch (error) {
      console.log('error [getProcessData]', error);
    }
  };

  useEffect(() => {
    getProcessData();
  }, []);

  const remove = (value) => {
    setID(value.tabId);
    setIsEnable(value.enableTab === 'Yes' ? true : false);
    setToggleDialog(!toggleDialog);
  };

  const handleDelete = async () => {
    try {
      await deleteTabData(ID).then(async (res) => {
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
    navigate(`/manage-Tab/${dataItem.tabId}`);
  };

  const onCreateplotlocation = () => {
    navigate('/manage-Tab/new');
  };

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const CommandCell = (props) => <MyCommandCell {...props} edit={enterEdit} remove={remove} />;

  return (
    <div className="dynamicgrid dynamicGrid_ manageWorkFlow">
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('manage_tabs')}</h3>
        </Col>
        <Col md={6} className="text-right">
          <CommonButton text={t('add_tab')} onHandleClick={onCreateplotlocation} mx={2} />
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

            <Column field="tabName" title={t('tab_name')} />
            <Column
              field="enableTab"
              title="Enable"
              cell={(props) => (
                <td role="gridcell">
                  <div className="d-flex flex-wrap">
                    <div className="d-flex mx-1  px-2 rounded bg-regular text-white">
                      <a className="k-link" onClick={() => remove(props.dataItem)}>
                        {props.dataItem.enableTab}
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

export default ManageTabs;
