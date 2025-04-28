import CommonButton from 'Components/Buttons/CommonButton';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-formio';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { getCheckList } from '../api';
import './style.css';
const ViewChecklist = () => {
  const [formData, setFormData] = useState(null);
  const [formName, setFormName] = useState([]);

  const navigate = useNavigate();
  const param = useParams();
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const checkListId = param.id;

  const onSubmitData = async (data) => {
    const payload = data;
    payload.data.container = {
      ...data.data.container,
    };
  };

  const getCheckListData = async () => {
    try {
      const res = await getCheckList(checkListId);
      setFormName(res.data.responseObject.type);
      let formData = JSON.parse(res.data.responseObject.formData);
      let newFormData = {
        diaplay: 'form',
        components: formData.components.map((val) => ({
          ...val,
          disabled: true,
        })),
      };
      setFormData(newFormData);
    } catch (error) {
      console.log('error [getData]', error);
    }
  };

  useEffect(() => {
    if (checkListId) {
      getCheckListData();
    }
  }, [checkListId]);
  const handlePage = () => {
    navigate('/manage-checklist');
  };

  return (
    <>
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={12}>
          <h5 className="m-0">{formName}</h5>
        </Col>
      </Row>
      <Row className="mx-1 my-3 p-2 shadow  ">
        <Col md={11} className="mx-auto">
          <Form
            form={formData}
            pristine
            onSubmit={onSubmitData}
            options={{
              language: i18n.language,
              i18n,
            }}
          />{' '}
        </Col>
        <Col className="cancel_btn">
          <CommonButton fillMode="outline" text={t('cancel')} mx={2} onHandleClick={handlePage} />
        </Col>
      </Row>
    </>
  );
};

export default ViewChecklist;
