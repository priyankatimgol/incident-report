import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
import CommonButton from 'Components/Buttons/CommonButton';
import { getPurgingData, updatePurgingData } from 'Services/API/masterApi';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const ManageProcessType = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const isNew = param.id === 'new';
  const paramId = isNew ? '' : param?.id;
  const { t } = useTranslation();
  const handleUpdate = async () => {
    const data = {
      settingId: 1,
      Archivaldays: month,
      purging_year: year,
    };
    try {
      await updatePurgingData(data);
      toast.success(t('purging_and_archival_data_updated_suceesfully'));
      navigate('/manage-purging-data');
    } catch (error) {
      toast.error(error.title || t('purging_and_archival_data_updation_failed'));
      console.log('error [handleUpdate]', error);
    }
  };

  const getData = async () => {
    try {
      const res = await getPurgingData();
      setMonth(res.data.responseObject[0].archivaldays);
      setYear(res.data.responseObject[0].purging_year);
    } catch (error) {
      console.log('error [getData]', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handlePage = () => {
    navigate('/manage-purging-data');
  };
  const handlechange = (event) => {
    setMonth(event.value);
  };
  const handlechangeyear = (event) => {
    setYear(event.value);
  };

  return (
    <>
      <Card className="border-0 shadow">
        <CardBody>
          <Row>
            <Col xs={12} md={4}>
              <Label>{t('archival_data')}</Label>
              <NumericTextBox min={180} onChange={handlechange} value={month} />
            </Col>
            <Col xs={12} md={4}>
              <Label>{t('purging_data')}</Label>
              <NumericTextBox min={3} max={100} value={year} onChange={handlechangeyear} />
            </Col>
          </Row>

          <div className="my-3 d-flex justify-content-end">
            {!isNew ? (
              <CommonButton mx={2} z={1} text={t('Update')} onHandleClick={handleUpdate} />
            ) : (
              <CommonButton mx={2} z={1} text={t('Submit')} />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default ManageProcessType;
