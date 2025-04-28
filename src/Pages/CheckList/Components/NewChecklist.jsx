import { FieldWrapper } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
import CommonButton from 'Components/Buttons/CommonButton';
import { getUserRole } from 'Services/API/masterApi';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormBuilder } from 'react-formio';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCheckList, getCheckList, updateCheckList } from '../api';
import './style.css';
const NewChecklist = () => {
  const [display, setDisplay] = useState('form');
  const [value, setValue] = useState('');
  const [schema, setSchema] = useState({
    display: 'form',
    components: [],
  });
  const [userRole, setUserRole] = useState([]);
  const [userRolevalue, setUserRoleValue] = useState('');
  const param = useParams();
  const isNew = param.id === 'new';
  const checkListId = isNew ? '' : param.id;
  const [error, setError] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (!value) {
      formIsValid = false;
      errors['value'] = t('please_enter_form_name');
    }
    setError(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    try {
      if (validateForm()) {
        let data = {
          type: value,
          formData: JSON.stringify(schema),
          Role: userRolevalue,
        };
        await createCheckList(data);
        toast.success(t('checklist_created_successfully'));
        navigate('/manage-checklist');
      }
    } catch (error) {
      toast.error(error.title || t('checklist_creation_failed'));
      console.log('error [handleSubmit]', error);
    }
  };

  const handleUpdate = async () => {
    let data = {
      type: value,
      formData: JSON.stringify(schema),
      Role: userRolevalue,
    };

    try {
      if (validateForm()) {
        await updateCheckList(checkListId, data);
        toast.success(t('checklist_updated_successfully'));
        navigate('/manage-checklist');
      }
    } catch (error) {
      toast.error(error.title || t('checklist_updation_failed'));
      console.log('error [handleUpdate]', error);
    }
  };

  const getData = async (id) => {
    try {
      const res = await getCheckList(id);
      console.log('event', res.data.responseObject);
      setSchema(JSON.parse(res.data.responseObject.formData));
      setValue(res.data.responseObject.type);
      setUserRoleValue(res.data.responseObject.role);
    } catch (error) {
      console.log('error [getData]', error);
    }
  };
  const getUserRoleData = async () => {
    try {
      await getUserRole()
        .then((res) => {
          setUserRole(res.data?.responseObject);
          console.log('res', res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };
  const handlechange = (event) => {
    setUserRoleValue(event.value);
  };

  useEffect(() => {
    getUserRoleData();
  }, []);
  useEffect(() => {
    if (checkListId) {
      getData(checkListId);
    }
  }, [checkListId]);

  useEffect(() => {
    if (schema && schema.display !== display) {
      setSchema({ ...schema, display });
    }
  }, [schema, display]);

  const handlePage = () => {
    navigate('/manage-checklist');
  };

  return (
    <>
      {/* <div className="my-2 shadow position-sticky top-0 z-9999 bg-white p-2"> */}
      <Card className="border-0 shadow my-2 shadow position-sticky top-0 z-9999 bg-white">
        <CardBody>
          <Row>
            <Col xs={12} md={12}>
              <FieldWrapper>
                <Label className="font_size14">{t('create_form')}</Label>
                <div className={'k-form-field-wrap'}>
                  <Input name="type" onChange={(e) => setValue(e.target.value)} value={value} />
                </div>
              </FieldWrapper>{' '}
              <span
                style={{
                  color: 'red',

                  top: '5px',
                  fontSize: '10px',
                }}
              >
                {error['value']}
              </span>
            </Col>
            {/* <Col xs={12} md={6}>
              <Label>{t('user_role')}</Label>
              <DropDownList
                data={userRole}
                onChange={handlechange}
                value={userRolevalue}
                // textField="type"
                // dataItemKey="id"
                // defaultValue={dropdownevent}
              />
              <span
                style={{
                  color: 'red',

                  top: '5px',
                  fontSize: '10px',
                }}
              >
                {error['type']}
              </span>
            </Col> */}
          </Row>
        </CardBody>
      </Card>
      {/* </div> */}

      <div className="position-relative editManageFormDefinition">
        <FormBuilder form={schema} onChange={setSchema} />
      </div>
      <div className="position-sticky bottom-0 z-9999 pr-2 pt-2 text-right">
        {!isNew ? (
          <CommonButton text={t('Update')} onHandleClick={handleUpdate} />
        ) : (
          <CommonButton text={t('Submit')} onHandleClick={handleSubmit} />
        )}
        <CommonButton fillMode="outline" text={t('cancel')} mx={2} onHandleClick={handlePage} />
      </div>
    </>
  );
};

export default NewChecklist;
