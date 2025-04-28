import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Card, CardBody } from '@progress/kendo-react-layout';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../Components/Buttons/CommonButton';

import { orderBy } from '@progress/kendo-data-query';
import { useTranslation } from 'react-i18next';
import { getUserRole } from 'Services/API/masterApi';
import Dialog from '../../Components/Dialog';
import MyCommandCell from '../../Components/MyCommandCell/index.jsx';
import Spinner from '../../Components/Spinner/Spinner';
import { deleteWorkFlow, getWorkFlowsList } from './api';
import './style.css';
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

const ManageWorkflows = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sort, setSort] = React.useState(initialSort);
  const [userRole, setUserRole] = React.useState([]);
  const { t } = useTranslation();
  const [ID, setID] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [toggleDialog, setToggleDialog] = React.useState(false);
  const getWorkFlowList = async () => {
    setLoading(true);
    try {
      const res = await getWorkFlowsList();
      setLoading(false);
      const workflowdata = res.data?.responseObject.map((val) => {
        return { ...val, wpType: val.pid.map((val) => val.wpType) };
      });
      setData(workflowdata);
    } catch (error) {
      console.log('error [getWorkFlowList]', error);
    }
  };

  useEffect(() => {
    getWorkFlowList();
  }, []);

  const remove = (dataItem) => {
    setID(dataItem.wfid);
    setToggleDialog(!toggleDialog);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteWorkFlow(ID);
      const massage = res.data.responseMessage;
      toast.success(t(massage));
      getWorkFlowList();
      setToggleDialog(!toggleDialog);
    } catch (error) {
      toast.error(t(error.title || 'workflow_deletion_failed'));
      console.log('error [handleDelete]', error);
    }
  };

  const enterEdit = (dataItem) => {
    navigate(`/manage-workflow/${dataItem.wfid}`, {
      state: dataItem.wfid,
    });
  };

  const onCreateNewWorkflow = () => {
    navigate('/manage-workflow/new');
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
    <MyCommandCell {...props} edit={enterEdit} remove={remove} userRoleValue={userRoleValue} />
  );
  const CheckListCell = ({ dataItem }) => {
    let parseData = dataItem?.wpType;
    return (
      <td className="textWrap" role="gridcell">
        <div className="d-flex flex-wrap">
          {parseData?.map((val) => (
            <div className="d-flex mx-1 mt-2 px-2 rounded bg-regular text-white">{val}</div>
          ))}
        </div>
      </td>
    );
  };
  return (
    <div className="dynamicgrid dynamicGrid_ manageWorkFlow">
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('manage_workflow')}</h3>
        </Col>
        <Col md={6} className="text-right">
          <CommonButton text={t('new_workflow')} onHandleClick={onCreateNewWorkflow} mx={2} />
        </Col>
      </Row>
      <Card className="border-0 shadow">
        <CardBody>
          <Grid
            className="gridHeight"
            data={orderBy(data, sort)}
            sortable={true}
            sort={sort}
            onSortChange={(e) => {
              setSort(e.sort);
            }}
          >
            <Column field="wfdescription" title={t('workflow_name')} />

            <Column
              field="wpType"
              title={t('process_type')}
              cell={CheckListCell}
              filterable={true}
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
          text={'Are you sure you want to delete ?'}
        />
      )}
    </div>
  );
};

export default ManageWorkflows;
