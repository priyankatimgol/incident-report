import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../../Components/Buttons/CommonButton';
import {
  CreateProcess,
  getPermitType,
  getProcessData,
  updateProcessData,
} from '../../../Services/API/masterApi';
const NewProcessType = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [getpermittype, setGetpermittype] = useState([]);

  const [dropdownValue, setdropdownValue] = useState([]);
  const [processValue, setProcessValue] = useState('');
  const [validity, setValidity] = useState('');
  const [wptype, setWptype] = useState('');
  const [error, setError] = useState({});
  const isNew = param.id === 'new';
  const paramId = isNew ? '' : param?.id;
  const { t } = useTranslation();

  const inputRef = useRef(null);

  const getPermitList = async () => {
    try {
      const res = await getPermitType();
      const newArray = res.data.responseObject.map((val) => ({
        type: val.wfType,
        id: val.wfTypeId,
      }));
      setGetpermittype(newArray);
    } catch (err) {
      console.log('err', err);
    }
  };
  useEffect(() => {
    getPermitList();
  }, []);

  const handlePage = () => {
    navigate('/manage-process');
  };
  var numberRegex = new RegExp(/^[0-9]+$/);
  var format = new RegExp(/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g);
  const valid = () => {
    let errors = {};
    let formIsValid = true;

    if (processValue.length >= 50) {
      formIsValid = false;
      errors['processValue'] = t('process_name_must_be_50_character');
    }
    if (format.test(processValue)) {
      formIsValid = false;
      errors['processValue'] = t('special_characters_are_not_allowed');
    }
    if (numberRegex.test(processValue)) {
      formIsValid = false;
      errors['processValue'] = t('numbers_are_not_allowed');
    }

    setError(errors);
    return formIsValid;
  };
  const handleChange = (event) => {
    if (valid()) {
      setProcessValue(event.target.value);
    } else {
      setProcessValue(event.target.value);
    }
  };

  const handleSelect = (event) => {
    setWptype(event.target.value.id);
  };
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (isNew) {
      if (!wptype) {
        formIsValid = false;
        errors['wptype'] = t('please_select_permit_type');
      }
    }
    if (!isNew) {
      if (dropdownValue.id === '') {
        formIsValid = false;
        errors['id'] = t('please_select_permit_type');
      }
    }

    if (processValue === '') {
      formIsValid = false;
      errors['processValue'] = t('please_insert_process_type');
    }
    setError(errors);
    return formIsValid;
  };

  const handleSubmit = async () => {
    const data = {
      processType: processValue,
      wfTypeId: wptype,
      validDays: validity,
    };
    try {
      if (validateForm()) {
        await CreateProcess(data).then(async (res) => {
          if (res.data.responseCode === 402) {
            let message = res.data.responseMessage;
            toast.error(t(message));
          } else {
            let message = res.data.responseMessage;
            toast.success(t(message));
            navigate('/manage-process');
          }
        });
      }
    } catch (err) {
      toast.error(t(err.title || 'workflow_creation_failed'));
    }
  };

  const handleUpdate = async () => {
    const data = {
      processId: param?.id,
      processType: processValue,
      validDays: validity,
      wfTypeId: wptype === '' ? dropdownValue.id : wptype,
    };

    try {
      if (validateForm()) {
        await updateProcessData(data).then(async (res) => {
          if (res.data.responseCode === 402) {
            let message = res.data.responseMessage;
            toast.error(t(message));
          } else {
            let message = res.data.responseMessage;
            toast.success(t(message));
            navigate('/manage-process');
          }
        });
      }
    } catch (err) {
      toast.error(t(err.title || 'workflow_creation_failed'));
    }
  };

  const getData = async (processid) => {
    try {
      const res = await getProcessData(processid);
      setdropdownValue({
        type: res.data.responseObject.wfType,
        id: res.data.responseObject.wfTypeId,
      });
      setValidity(res.data.responseObject.validDays);
      setProcessValue(res.data.responseObject.processType);
    } catch (error) {
      console.log('error', error);
    }
  };
  const changevalidity = (event) => {
    setValidity(event.value);
  };

  useEffect(() => {
    getData(param?.id);
  }, [param?.id]);
  return (
    <>
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('create_process')}</h3>
        </Col>
      </Row>

      <Card className="border-0 shadow">
        <CardBody>
          <Row>
            <Col xs={12} md={4}>
              <Label>{t('type')}</Label>
              <DropDownList
                data={getpermittype}
                onChange={handleSelect}
                textField="type"
                dataItemKey="id"
                defaultValue={dropdownValue}
              />
              {isNew ? (
                <span
                  style={{
                    color: 'red',

                    top: '5px',
                    fontSize: '10px',
                  }}
                >
                  {error['wptype']}
                </span>
              ) : (
                <span
                  style={{
                    color: 'red',

                    top: '5px',
                    fontSize: '10px',
                  }}
                >
                  {error['id']}
                </span>
              )}
            </Col>
            <Col xs={12} md={4}>
              <Label>{t('process_name')}</Label>
              <Input value={processValue} onChange={handleChange} />
              <span
                style={{
                  color: 'red',

                  top: '5px',
                  fontSize: '10px',
                }}
              >
                {error['processValue']}
              </span>
            </Col>
            <Col xs={12} md={2}>
              <Label>{t('maximum_validity_days')}</Label>
              <NumericTextBox min={1} value={validity} onChange={changevalidity} />
            </Col>
          </Row>

          <div className="my-3 d-flex justify-content-end">
            {!isNew ? (
              <CommonButton mx={2} z={1} text={t('Update')} onHandleClick={handleUpdate} />
            ) : (
              <CommonButton mx={2} z={1} text={t('Submit')} onHandleClick={handleSubmit} />
            )}
            <CommonButton
              fillMode="outline"
              text={t('cancel')}
              mx={2}
              z={1}
              onHandleClick={handlePage}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default NewProcessType;
