import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Card, CardBody } from '@progress/kendo-react-layout';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../Components/Buttons/CommonButton';

import { orderBy } from '@progress/kendo-data-query';
import { useTranslation } from 'react-i18next';
import { deletePlotLocation, getPlotLocationlist, getUserRole } from 'Services/API/masterApi';
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

const ManageWorkflows = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sort, setSort] = React.useState(initialSort);
  const { t } = useTranslation();
  const [ID, setID] = React.useState('');
  const [page, setPage] = React.useState(1);

  const [toggleDialog, setToggleDialog] = React.useState(false);
  const [userRole, setUserRole] = React.useState([]);
  const getplotlocationData = async () => {
    setLoading(true);
    try {
      const res = await getPlotLocationlist();
      setLoading(false);

      let newArr = res.data?.responseObject.map((val) => ({
        id: val.id,
        area_name: val.area_name,
        enableLocation: val.enableLocation,
        typeName: val.typeName,
      }));

      setData(newArr);
    } catch (error) {
      console.log('error [getplotlocationData]', error);
    }
  };

  useEffect(() => {
    getplotlocationData();
  }, []);

  const remove = (dataItem) => {
    setID(dataItem.id);
    setToggleDialog(!toggleDialog);
  };

  const handleDelete = async () => {
    try {
      await deletePlotLocation(ID)
        .then(async (res) => {
          if (res.data.responseCode === 200) {
            const plotdeletemessage = res.data.responseMessage;

            toast.success(t('plotdeletemessage'));
            getplotlocationData();
            setToggleDialog(!toggleDialog);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      toast.error(t(error.title || 'Plot Location Deletion Failed'));
      console.log('error [handleDelete]', error);
    }
  };

  const enterEdit = (dataItem) => {
    navigate(`/manage-plot-location/${dataItem.id}`);
  };

  const onCreateplotlocation = () => {
    navigate('/manage-plot-location/new');
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

  return (
    <div className="dynamicgrid dynamicGrid_ manageWorkFlow">
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('manage_plot_location')}</h3>
        </Col>
        <Col md={6} className="text-right">
          <CommonButton text={t('new_plot_location')} onHandleClick={onCreateplotlocation} mx={2} />
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
            <Column field="typeName" title={t('type')} />

            <Column field="area_name" title={t('area_location')} />
            <Column field="enableLocation" title={t('enable')} />
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
