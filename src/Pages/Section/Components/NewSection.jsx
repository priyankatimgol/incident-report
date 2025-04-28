import { filterBy } from '@progress/kendo-data-query';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { FieldWrapper } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonButton from '../../../Components/Buttons/CommonButton';
import { getPermitTypes, getWorkFlowList } from '../../../Services/API/masterApi';
import { createSection, getCheckListData, getSection, updateSectionList } from '../api';

const NewSection = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [value, setValue] = useState([]);
  const [dropdownevent, setDropdownevent] = useState({
    type: '',
    id: '',
  });
  const [getpermittype, setGetpermittype] = useState([]);
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  const [dataListAll, setDataListAll] = useState([]);
  const [processtypeid, setProcessTypeId] = useState({
    type: '',
    id: '',
  });
  const [applicable, setApplicable] = useState([]);
  const [dataItem, setDataItem] = useState('');
  const [user, setUsers] = useState('');
  const editorId = 'firstName';
  const [error, setError] = useState({});
  const isNew = param.id === 'new';
  const sectionId = isNew ? '' : param.id;
  const { t } = useTranslation();

  const handleChange = (event) => {
    setValue([...event.value]);
    setData(dataAll);
  };

  const onChangeFilterValue = (event) => {
    if (event.filter.value) {
      setData(filterBy(dataAll.slice(), event.filter));
    } else {
      setData(dataAll);
    }
  };
  const onChangeFilter = (event) => {
    if (event.filter.value) {
      setApplicable(filterBy(dataListAll.slice(), event.filter));
    } else {
      setApplicable(dataListAll);
    }
  };
  const handleChangePermit = (event) => {
    setUsers([...event.value]);
    setApplicable(dataListAll);
  };

  const getCheckList = async () => {
    let data = {
      searchType: 'ByAll',
      userid: '1',
    };

    try {
      const res = await getCheckListData(data);
      setData(res.data?.responseObject.tables);
      setDataAll(res.data?.responseObject.tables);
    } catch (error) {
      console.log('err [getCheckList]', error);
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
      setDataListAll(newArr);
    } catch (error) {
      console.log('error [getApplicable]', error);
    }
  };

  const getPermitList = async () => {
    try {
      const res = await getPermitTypes();
      const newArray = res.data.responseObject.map((val) => ({
        type: val.wfType,
        id: val.wfTypeId,
      }));
      setGetpermittype(newArray);
    } catch (err) {
      toast.error(t(err.title || 'workflow_creation_failed'));
    }
  };

  useEffect(() => {
    getCheckList();
    getPermitList();
  }, []);

  useEffect(() => {
    if (getpermittype[0]?.id) {
      getApplicable(getpermittype[0]?.id);
    }
  }, [getpermittype[0]?.id]);

  const handleUpdate = async () => {
    let data = {
      sectionid: sectionId,
      sectionname: dataItem,
      formData: value.map((val, i) => ({ checklistid: val.id, seqno: i + 1 })),
      permit: user.map((val) => ({ permittypeid: val.id })),
    };

    try {
      if (validateForm()) {
        await updateSectionList(sectionId, data);
        toast.success(t('section_updated_successfully'));
        navigate('/manage-section');
      }
    } catch (error) {
      toast.error(error.title || t('section_updation_failed'));
      console.log('error [handleUpdate]', error);
    }
  };
  var numberRegex = new RegExp(/^[0-9]+$/);
  var format = new RegExp(/[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g);
  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (dataItem === '') {
      formIsValid = false;
      errors['dataItem'] = t('please_enter_section_name');
    }
    if (user.length === 0) {
      formIsValid = false;
      errors['user'] = t('please_select_process_type');
    }
    if (value.length === 0) {
      formIsValid = false;
      errors['value'] = t('please_select_check_list');
    }
    if (dropdownevent.type === '' || dropdownevent.type === undefined) {
      formIsValid = false;
      errors['type'] = t('please_select_permit_type');
    }

    setError(errors);
    return formIsValid;
  };
  const valid = () => {
    let errors = {};
    let formIsValid = true;

    if (dataItem.length >= 50) {
      formIsValid = false;
      errors['dataItem'] = t('section_name_must_be_50_character');
    }
    if (format.test(dataItem)) {
      formIsValid = false;
      errors['dataItem'] = t('special_characters_are_not_allowed');
    }
    if (numberRegex.test(dataItem)) {
      formIsValid = false;
      errors['dataItem'] = t('numbers_are_not_allowed');
    }

    setError(errors);
    return formIsValid;
  };
  const userId = localStorage.getItem('user_id') || '1';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validateForm()) {
        let data = {
          sectionname: dataItem,
          FormData: value.map((val, i) => ({ ...val, checklistid: val.id, seqno: i + 1 })),
          Permit: user.map((val) => ({ ...val, permittypeid: val.id })),
        };

        await createSection(data, userId);
        toast.success(t('section_created_successfully'));
        navigate('/manage-section');
      }
    } catch (error) {
      toast.error(error.title || t('section_creation_failed'));
      console.log('error [handleSubmit]', error);
    }
  };
  const getData = async (SectionId) => {
    try {
      const res = await getSection(SectionId);

      setDataItem(res.data.responseObject?.sectionname);
      const newdata = res.data.responseObject.permit.map((val) => ({
        id: val.permittypeid,
        type: val.permit,
      }));
      setUsers(newdata);

      setValue(
        res.data.responseObject.formData?.map((val) => ({
          id: val.checklistid,
          type: val.checklist,
        })),
      );

      const sectionname = res.data.responseObject.permit.map((val) => ({
        type: val.typeName,
        id: val.typeId,
      }));

      setProcessTypeId(sectionname);
      setDropdownevent({
        id: res.data.responseObject?.permit[0]?.typeId,
        type: res.data.responseObject?.permit[0]?.typeName,
      });
    } catch (error) {
      console.log('error [getData]', error);
    }
  };

  useEffect(() => {
    if (sectionId) {
      getData(sectionId);
    }
  }, []);

  const handlePage = () => {
    navigate('/manage-section');
  };
  const onchangename = (e) => {
    if (valid()) {
      setDataItem(e.value);
    } else {
      setDataItem(e.value);
    }
  };
  const handlechange = (event) => {
    setDropdownevent(event.target.value);
    setProcessTypeId(event.target.value);
    setUsers('');
    const newid = event.value.id;
    getApplicable(newid);
  };

  return (
    <>
      <Row className="mx-1 my-3 p-2 shadow align-items-center">
        <Col md={6}>
          <h3 className="m-0">{t('create_new_section')}</h3>
        </Col>
      </Row>

      <Card className="border-0 shadow">
        <CardBody>
          <Row>
            <Col xs={12} md={4}>
              <FieldWrapper className="gridclass">
                <Label>{t('section_name_create')}</Label>

                <Input id={editorId} value={dataItem} onChange={onchangename} />

                <span
                  style={{
                    color: 'red',

                    top: '5px',
                    fontSize: '10px',
                  }}
                >
                  {error['dataItem']}
                </span>
              </FieldWrapper>
            </Col>
            <Col xs={12} md={4}>
              <Label>{t('type')}</Label>
              <DropDownList
                data={getpermittype}
                onChange={handlechange}
                value={processtypeid[0]}
                textField="type"
                dataItemKey="id"
                defaultValue={dropdownevent}
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
            </Col>
            <Col xs={12} md={4}>
              <Label>
                {dropdownevent?.type !== undefined
                  ? `${dropdownevent?.type} Type`
                  : t('workPermit_type')}
              </Label>

              <MultiSelect
                data={dropdownevent === 'WorkPermit' ? applicable : applicable}
                value={user}
                onFilterChange={onChangeFilter}
                name={user}
                onChange={handleChangePermit}
                textField="type"
                filterable={true}
                dataItemKey="id"
              />
              <span
                style={{
                  color: 'red',

                  top: '5px',
                  fontSize: '10px',
                }}
              >
                {error['user']}
              </span>
            </Col>
          </Row>
          <Row className="my-1">
            <Col xs={12} md={12}>
              <FieldWrapper className="gridclass">
                <Label>{t('form_definition')}</Label>
                <MultiSelect
                  data={data}
                  onChange={handleChange}
                  onFilterChange={onChangeFilterValue}
                  value={value}
                  filterable={true}
                  name={value}
                  allowCustom={true}
                  textField="type"
                  dataItemKey="id"
                />
                <span
                  style={{
                    color: 'red',

                    top: '5px',
                    fontSize: '10px',
                  }}
                >
                  {error['value']}
                </span>
              </FieldWrapper>
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
export default NewSection;
