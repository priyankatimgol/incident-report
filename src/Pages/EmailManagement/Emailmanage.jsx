import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Form, FormElement } from '@progress/kendo-react-form';
import { Checkbox, NumericTextBox } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { CardBody } from '@progress/kendo-react-layout';
import CommonButton from 'Components/Buttons/CommonButton';
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  getPermitType,
  getstatusprocess,
  getWorkFlowList,
  saveEmaildata,
} from 'Services/API/masterApi';

const dataValue = [
  {
    type: 'Days',
    id: '1',
  },
  {
    type: 'Hours',
    id: '2',
  },
];

const Emailmanage = () => {
  const [applicable, setApplicable] = useState([]);
  const { t } = useTranslation();
  const [formvalue, setformvalue] = useState(false);

  const [value, setValue] = useState([]);
  const [clonecopy, setCloneCopy] = useState([]);
  const [permitID, setPermitID] = useState([]);
  const [error, setError] = useState({});
  const [getstatustypevalues, setGetStatusTypeValues] = useState([]);
  const [getpermittype, setGetpermittype] = useState([]);
  const [dropdownevent, setDropdownevent] = useState({
    type: '',
    id: '',
  });

  const [allid, setAllid] = useState({
    type: '',
    id: '',
  });

  const getStatusProcess = async (processid) => {
    try {
      const res = await getstatusprocess(processid);

      const clone = JSON.parse(JSON.stringify(res.data.responseObject));
      setCloneCopy(clone);
      const processData = res.data.responseObject.map((val) => ({
        statusID: val.statusId,
        statusDesk: val.statusDesc,
        roledata: val.roleData,
      }));

      setGetStatusTypeValues(processData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnchange = (event) => {
    getStatusProcess(event.value.id);
    setPermitID(event.value.id);
    setformvalue(true);
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
      const res = await getPermitType();
      const newArray = res.data.responseObject.map((val) => ({
        type: val.wfType,
        id: val.wfTypeId,
      }));
      setGetpermittype(newArray);
    } catch (err) {
      console.log('err', err);
      toast.error(t(err.title || 'workflow_creation_failed'));
    }
  };

  const saveEmaildatavalue = async () => {
    let x = clonecopy?.flatMap((categories) => categories.roleData);
    const data = {
      wfType: dropdownevent.id,
      permitId: permitID,
      scheduleList: x.map((val) => ({
        role: val.role,
        currentStep: '',
        status: val.status,
        frequency: val.frequency,
        scheduleTime: val.scheduleTime,
        emailFlag: val.emailFlag,
      })),
    };

    try {
      const res = await saveEmaildata(data);
      const messages = res.data.responseMessage;
      toast.success(t(messages));

      const processData = res.data.responseObject.map((val) => ({
        statusID: val.statusId,
        statusDesk: val.statusDesc,
        roledata: val.roleData,
      }));
      setGetStatusTypeValues(processData);
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    getApplicable();
    getPermitList();
  }, []);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;
    if (dropdownevent.id === '') {
      formIsValid = false;
      errors['id'] = t('please_select_permit_type');
    }
    if (permitID.length === 0) {
      formIsValid = false;
      errors['permitID'] = t('please_select_process_type');
    }
    setError(errors);
    return formIsValid;
  };
  const handleSubmit = (e) => {
    if (validateForm()) {
      saveEmaildatavalue();
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handlechange = (event) => {
    setDropdownevent(event.target.value);
    const newid = event.value.id;
    getApplicable(newid);
    if (newid === 0) {
      setAllid(newid);
      refreshPage();
    }
  };
  console.log('handleSubmit', dropdownevent);
  console.log('handleSubmit123', permitID);
  const handleNumberChange = (e, val, item) => {
    const clonedata = clonecopy.map((dataitem) => {
      return dataitem.statusId === item.statusID
        ? {
            ...dataitem,
            roleData: dataitem.roleData.map((roleitem) => {
              if (roleitem.role === val.role) {
                return {
                  ...roleitem,
                  scheduleTime: e.value,
                };
              } else {
                return roleitem;
              }
            }),
          }
        : dataitem;
    });
    setCloneCopy(clonedata);
    setValue(clonedata);
  };

  const handleDropdown = (e, val, item) => {
    const clonedata = clonecopy.map((dataitem) => {
      return dataitem.statusId === item.statusID
        ? {
            ...dataitem,
            roleData: dataitem.roleData.map((roleitem) => {
              if (roleitem.role === val.role) {
                return {
                  ...roleitem,
                  frequency: e.value.type,
                };
              } else {
                return roleitem;
              }
            }),
          }
        : dataitem;
    });
    setCloneCopy(clonedata);
    setValue(clonedata);
  };

  const handleEmailCheckbox = (e, val, item) => {
    const clonedata = clonecopy.map((dataitem) => {
      return dataitem.statusId === item.statusID
        ? {
            ...dataitem,
            roleData: dataitem.roleData.map((roleitem) => {
              if (roleitem.role === val.role) {
                return {
                  ...roleitem,
                  emailFlag: e.value,
                };
              } else {
                return roleitem;
              }
            }),
          }
        : dataitem;
    });
    setCloneCopy(clonedata);
    setValue(clonedata);
  };

  let z = clonecopy?.flatMap((categories) => categories.roleData);
  const data = z.map((val) => ({ isUpdate: val.isUpdate }));
  let datavalue = value?.flatMap((categories) => categories.roleData);
  const onchangevalue = datavalue.map((val) => ({
    scheduleTime: val.scheduleTime,
    frequency: val.frequency,
    emailFlag: val.emailFlag,
  }));
  return (
    <>
      <Row className=" p-2 shadow align-items-center">
        <Col xs={12} md={5}>
          <Label>{t('type')}</Label>
          <DropDownList
            data={getpermittype}
            textField="type"
            dataItemKey="id"
            onChange={handlechange}
            value={dropdownevent}
          />
          <span
            style={{
              color: 'red',

              top: '5px',
              fontSize: '10px',
            }}
          >
            {error['id']}
          </span>
        </Col>
        <Col xs={12} md={5}>
          <Label>{t('process_type')}</Label>
          <DropDownList
            textField="type"
            dataItemKey="id"
            data={applicable}
            onChange={handleOnchange}
          />
          <span
            style={{
              color: 'red',

              top: '5px',
              fontSize: '10px',
            }}
          >
            {error['permitID']}
          </span>
        </Col>
        <Col xs={12} md={2} className=" d-flex justify-content-end mt-3">
          {data[0]?.isUpdate === true ? (
            <CommonButton mx={2} z={1} text={t('Update')} onHandleClick={handleSubmit} />
          ) : (
            <CommonButton mx={2} z={1} text={t('Submit')} onHandleClick={handleSubmit} />
          )}
        </Col>
      </Row>
      {formvalue && (
        <Card className="border-0 shadow mt-2 emailSrollbar">
          <CardBody>
            <>
              <Form
                onSubmit={handleSubmit}
                render={(formRenderProps) => (
                  <FormElement
                    style={{
                      width: '100%',
                    }}
                  >
                    <fieldset className={'k-form-fieldset nt-5 '}>
                      {getstatustypevalues?.map((item, key) => {
                        return (
                          <>
                            {item.roledata != '' && (
                              <>
                                <Row className="mt-3">
                                  <Col xs={12} md={6}>
                                    <Label style={{ color: 'lightcoral' }}>{item.statusDesk}</Label>
                                  </Col>
                                </Row>
                                <Row className="mt-2">
                                  <Col xs={12} md={2}>
                                    <span>
                                      <label>{'Action To be Performed by'}</label>
                                      <span className="astrix_sysmbol"></span>
                                    </span>
                                  </Col>
                                  <Col xs={12} md={2}>
                                    <Label>Time</Label>
                                  </Col>
                                  <Col xs={12} md={2}>
                                    <Label>Days/Hours</Label>
                                  </Col>
                                </Row>
                              </>
                            )}
                            {item.roledata.map((val, index) => {
                              return (
                                <>
                                  <Row className="mt-1">
                                    <Col xs={12} md={2}>
                                      <Label style={{ color: '#1274ac' }}>
                                        {index + 1}.{val.role}
                                      </Label>
                                    </Col>
                                    <Col xs={12} md={2}>
                                      <NumericTextBox
                                        min={0}
                                        onChange={(e) => handleNumberChange(e, val, item)}
                                        value={onchangevalue.scheduleTime}
                                        defaultValue={val.scheduleTime}
                                      />
                                    </Col>
                                    <Col xs={12} md={2}>
                                      <DropDownList
                                        textField="type"
                                        dataItemKey="id"
                                        data={dataValue}
                                        value={onchangevalue.frequency}
                                        defaultItem={dataValue.find(
                                          (ele) => ele.type === val.frequency,
                                        )}
                                        onChange={(e) => handleDropdown(e, val, item)}
                                      />
                                    </Col>
                                    <Col xs={12} md={2}>
                                      <Checkbox
                                        label={'Email Trigger'}
                                        cheaked={onchangevalue.emailFlag}
                                        onChange={(e) => handleEmailCheckbox(e, val, item)}
                                        defaultChecked={val.emailFlag}
                                      />
                                    </Col>
                                  </Row>
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                    </fieldset>
                  </FormElement>
                )}
              />
              <div></div>
            </>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Emailmanage;
