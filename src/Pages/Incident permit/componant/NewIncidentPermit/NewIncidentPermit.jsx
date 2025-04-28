import { Dialog as KendoDialog } from '@progress/kendo-react-dialogs';
import { AutoComplete, DropDownList } from '@progress/kendo-react-dropdowns';
import { Field } from '@progress/kendo-react-form';
import CommonButton from 'Components/Buttons/CommonButton';
import {
  FormDateTimePicker,
  FormDropDownList,
  FormInput,
  FormMultiSelect,
  FormTextArea,
} from 'Components/Form/Form';
import { getCalculationRisk } from 'Pages/Incident permit/api';
// import { useState } from 'react';
import { memo, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-formio/lib/components';
import { useTranslation } from 'react-i18next';
import { getreportedby } from 'Services/API/masterApi';
const NewIncidentForm = ({
  calculate1,
  setCalculate1,
  setValueAuto,
  ValueAuto,
  setIncidentpermit,
  incidentpermit,
  data,
  selectedInvolved,
  handleChange,
  hide,
  involved,
  sitevalue,
  shiftvalue,
  potentialsevrity,
  incidentsevrity,
  businessunit,
  error,
  permitTypes,
  onChangeFilterValue,
  locationlist,
  category,
  isEdit,
  department,
  departmenttext,
  statusId,
  departmenametext,
  handleadddepartment,
  setSavedata,
}) => {
  const { t, i18n } = useTranslation();
  const [calculate, setCalculate] = useState(false);
  const [visibleWindow, setVisibleWindow] = useState(false);
  const [riskCalcultionList, setRiskCalcultionList] = useState([]);
  const [autoid, setAutoid] = useState(null);
  const [dropDownvalue, setdropDownvalue] = useState();
  localStorage.setItem("location", incidentpermit?.location)
  const getCalcultionRiskList = async () => {
    try {
      const res = await getCalculationRisk();
      setRiskCalcultionList(res.data?.responseObject);
      setRiskCalcultionList(res.data?.responseObject);
    } catch (error) {
      console.log('err [getCheckList]', error);
    }
  };
  useEffect(() => {
    setSavedata(false);
  }, [setSavedata]);
  useEffect(() => {
    getCalcultionRiskList();
  }, []);

  if (isEdit && !Object.keys(incidentpermit).length) return null;
  const toggleWindow = () => {
    setVisibleWindow(!visibleWindow);
  };

  const calculateRisk = (e) => {
    setCalculate(!calculate);
  };

  const getRiskMatrix = (item) => {
    const myObj = item.data;
    const myObjvalue = item.component.customClass;
    const getFirstTruthyItem = (obj) => Object.keys(obj).filter((i) => obj[i] === true && obj);
    setCalculate1(getFirstTruthyItem(myObj));
    const newdata = getFirstTruthyItem(myObj);
    setIncidentpermit({ ...incidentpermit, riskmatrix: newdata[0] });
    setCalculate(!calculate);
  };

  const getdropdownData = async (e) => {
    try {
      const res = await getreportedby(e);
      setdropDownvalue(
        res.data.responseObject.map((val) => ({ id: val.value, description: val.value })),
      );
    } catch (err) {
      console.log('error [getApplicable]', err);
    }
  };

  const handleAutoComletechange = (event) => {
    setValueAuto(event.value);
    getdropdownData(event.value);
    const newdata = dropDownvalue
      .filter((item) => item.description === event.value)
      .map((el) => el.id)[0];
    setAutoid(newdata);
    setIncidentpermit({ ...incidentpermit, reportBy: newdata });
  };
  localStorage.setItem('department', incidentpermit?.department !== undefined
  ? department?.find((_) => _.id === JSON.parse(incidentpermit?.department))
      ?.department
  : '',businessunit.find((_) => _.id === incidentpermit?.businessUnitId)?.name);
  
  return (
    <div className={`card p-2`}>
      <Row className="row justify-content-end  mt-2">
        <Col xs={12} md={4} className="required">
          <span>
            <label>{t('incident_number')}</label>
            <span className="astrix_sysmbol"></span>
          </span>
          <Field
            key={'Number'}
            id={'Number'}
            name={'number'}
            //label={t('incident_number')}
            type={'text'}
            component={FormInput}
            data={incidentpermit?.number}
            onChange={handleChange}
            // validator={formInput}
            disabled={true}
            defaultValue={incidentpermit?.number}
            placeHolder={t('auto_generated')}
            className="gridclass"
          />
          <span className="valid">{error['number']}</span>
        </Col>
        <Col xs={6} md={4} className="required">
          <span>
            <label>{t('incident_title')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            key={' title'}
            id={' title'}
            name={'title'}
            //label={t('incident_title')}
            type={'text'}
            component={FormInput}
            data={incidentpermit?.title}
            // validator={formInput}
            onChange={handleChange}
            defaultValue={incidentpermit?.title}
            placeHolder={t('enter_title')}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['title']}</span>
        </Col>
        <Col xs={12} md={4} className="required">
          <span>
            <label>{t('incident_date')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            key={'date'}
            id={'date'}
            name={'date'}
            data={incidentpermit?.date}
            component={FormDateTimePicker}
            validDate={incidentpermit?.date}
            value={incidentpermit?.date}
            onChange={handleChange}
            defaultValue={incidentpermit?.date ? new Date(incidentpermit?.date) : ''}
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
            placeholder={t('Day-Month-Year Hour:Minute:Second AM')}
          />
          <span className="valid">{error['date']}</span>
        </Col>
        
      </Row>
      <Row className="row justify-content-end  mt-2">
      {isEdit && (
          <Col xs={12} md={4} className="relative">
            <span>
              <label>{t('asset')}</label>
              <span className="astrix_sysmbol">*</span>
            </span>
            <Field
              key={'asset'}
              id={'asset'}
              name={'asset'}
              type={'text'}
              component={FormInput}
              data={incidentpermit.assetid}
              assets={incidentpermit.assetid}
              onChange={handleChange}
              defaultValue={incidentpermit.assetid}
              placeHolder={'Type1'}
              className="gridclass"
              disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : isEdit}
            />
          </Col>
        )}
        <Col xs={12} md={isEdit ? 4 : 6}>
          <span>
            <label>{t('incident_type')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            tabindex={4}
            key={'processId'}
            id={'processId'}
            name={'processId'}
            component={FormDropDownList}
            onChange={handleChange}
            data={permitTypes.map((val) => val.processType)}
            assets={permitTypes.find((_) => _.processId === incidentpermit?.processId)?.processType}
            as={'select'}
            placeHolder={t('enter_permit')}
            defaultValue={
              permitTypes.find((_) => _.processId === incidentpermit?.processId)?.processType
            }
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : isEdit}
          />
          <span className="valid">{error['ptype']}</span>
        </Col>
      
         <Col xs={12} md={isEdit ? 4 : 6} className="required">
          <span>
            <label>{t('shift')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            key={'shiftid'}
            id={'shiftid'}
            name={'shiftid'}
            component={FormDropDownList}
            data={shiftvalue.map((val) => val.shift)}
            assets={incidentpermit?.shift}
            onChange={handleChange}
            as={'select'}
            defaultValue={shiftvalue.find((_) => _.id === incidentpermit?.shiftid)?.shift}
            placeHolder={'sub Type1'}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['shift']}</span>
        </Col>
       
        <Col xs={12} md={4} className="required">
         
        </Col>
       
      </Row>
      <Row className="row justify-content-end mt-2">
        
      <Col xs={12} md={4} className="required">
          <span>
            <label>{t('incident_site')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <DropDownList
           data={sitevalue}
            textField="site"
            dataItemKey="id"
            name={'siteid'}
            value={{
             site: sitevalue.find((_) => _.id === incidentpermit?.siteid)?.site
            }}
            onChange={handleChange}
            placeHolder={'Area1'}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          
          <span className="valid">{error['site']}</span>
        </Col>

        <Col xs={12} md={4} className="required">
          <span>
          <label>{t('site_location')}</label>
            {/* <label>{t('buisness_unit')}</label> */}
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            key={'businessUnitId'}
            id={'businessUnitId'}
            name={'businessUnitId'}
            component={FormDropDownList}
            data={businessunit.map((val) => val.name)}
            onChange={handleChange}
            assets={incidentpermit?.location}
            as={'select'}
            defaultValue={businessunit.find((_) => _.id === incidentpermit?.businessUnitId)?.name}
            placeHolder={'Area1'}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['BuisnessUnit']}</span>
        </Col>
        <Col xs={12} md={4} className="required">
          <span>
            <label>{t('area_location ')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
        
          <DropDownList
            data={
              incidentpermit?.siteid !== 2
              ?locationlist:
              locationlist.filter((item) => item.location === 'General Area')
               
            }
            textField="location"
            dataItemKey="id"
            name={'location'}
            
            value={
              incidentpermit?.siteid === 2
                ? locationlist.find((item) => item.location === 'General Area')
                //:{ location: incidentpermit?.location }
                :{location:locationlist.find((_) => _.id === incidentpermit?.location)?.location}
            }
            onChange={handleChange}
            placeHolder={'Area1'}
            className="gridclass"
           // disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ||incidentpermit?.siteid === 2? true : false}
          />
       
          <span className="valid">{error['zone']}</span>
        </Col>
      </Row>
      
      <Row className="row justify-content-end mt-2">
        
        <Col xs={12} md={4} className="required">
          <span>
            <label>{t('incident_involved')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            key={'involved'}
            id={'involved'}
            name={'involved'}
            // label={t('incident_involved')}
            component={FormMultiSelect}
            onChange={handleChange}
            data={involved.map((val) => val.description)}
            assets={selectedInvolved}
            as={'select'}
            value={selectedInvolved}
            filterable={true}
            onFilterChange={onChangeFilterValue}
            defaultValue={isEdit ? data : selectedInvolved}
            placeHolder={'sub Type1'}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['involved']}</span>
        </Col>
        <Col xs={12} md={4} className="required">
          <span>
            <label>{t('incident_severity')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            key={'severity'}
            id={'severity'}
            name={'severity'}
            component={FormDropDownList}
            data={incidentsevrity.map((val) => val.severity)}
            onChange={handleChange}
            assets={incidentpermit?.severity}
            as={'select'}
            defaultValue={
              incidentsevrity.find((_) => _.id === incidentpermit?.severityid)?.severity
            }
            placeHolder={'Area1'}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['saverity']}</span>
        </Col>
        <Col xs={12} md={4} className="required">
          <span>
            <label>{t('potential_severity')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            tabindex={15}
            key={'potential'}
            id={'potential'}
            name={'potential'}
            component={FormDropDownList}
            data={potentialsevrity.map((val) => val.potential)}
            onChange={handleChange}
            assets={incidentpermit?.potential}
            as={'select'}
            defaultValue={
              potentialsevrity.find((_) => _.id === incidentpermit?.potentialid)?.potential
            }
            placeHolder={'Area1'}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['potential']}</span>
        </Col>
       
       
       
       
       

      </Row>
      <Row className="row justify-content-end mt-2">
        
       
       
        <Col xs={12} md={8} className="required">
          <span>
            <label>{t('incident summary')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
            key={'summary'}
            id={'summary'}
            name={'summary'}
            // label={t('incident_summary')}
            type={'text'}
            rows={2}
            component={FormTextArea}
            //validator={formInput}
            data={incidentpermit?.summary}
            onChange={handleChange}
            defaultValue={incidentpermit?.summary}
            placeHolder={t('enter_summary')}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['summary']}</span>
        </Col>
       
        <Col xs={12} md={2}>
          <span>
            <label>{t('risk_assesment')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <Field
          style={{ width: '158px' }}
            key={'risk assessment'}
            id={'risk assessment'}
            name={'risk assessment'}
            type={'text'}
            component={FormInput}
            data={calculate1}
            onChange={handleChange}
            placeHolder={' '}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['riskmatrix']}</span>
        </Col>
        <Col xs={12} md={2} className=" mt-3 my-10 pt-3">
          <CommonButton
            text={t('risk_matrix')}
            onHandleClick={calculateRisk}
            disabled={isEdit && statusId >= 17 ? true : false}
          />
        </Col>
      

      </Row>
      <Row className="row justify-content-end mt-2">
        {department.find((_) => _.id == incidentpermit?.department)?.department == 'Other' ? (
          <>
        <Col xs={12} md={4} className="required">
          <span>
            <label>{t('reported_by')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <AutoComplete
            data={dropDownvalue}
            value={ValueAuto}
            textField="description"
            onChange={handleAutoComletechange}
            placeholder={t('reported_by')}
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['reportBy']}</span>
        </Col>
        <Col xs={12} md={4} className="required">
          <span>
            <label>{t('department')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <DropDownList
            data={department}
            textField="department"
            dataItemKey="id"
            name={'department'}
            value={{
              department: department.find((_) => _.id == incidentpermit?.department)?.department,
            }}
            onChange={handleChange}
            placeHolder={t('enter_department')}
            className="gridclass"
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          
         
          <span className="valid">{error['department']}</span>
        </Col>
            <Col xs={12} md={3} className="relative">
              <span>
                <label>{t('Add Department')}</label>
                <span className="astrix_sysmbol">*</span>
              </span>
              <Field
                tabindex={2}
                key={'departmenametext'}
                id={'departmenametext'}
                name={'departmenametext'}
                type={'text'}
                component={FormInput}
                data={departmenametext}
                onChange={handleChange}
                defaultValue={departmenametext}
                placeHolder={t('enter_title')}
                className="gridclass"
                disabled={hide === 'hide' ? true : isEdit}
              />
              <span className="valid">{error['departmenametext']}</span>
            </Col>
            <Col xs={12} md={1} className=" mt-3 my-10 pt-3">
              <CommonButton text={t('ADD')} onHandleClick={handleadddepartment} />
            </Col>
          </>
        ) : (
        <>
          <Col xs={12} md={6} className="required">
          <span>
            <label>{t('reported_by')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <AutoComplete
            data={dropDownvalue}
            value={ValueAuto}
            textField="description"
            onChange={handleAutoComletechange}
            placeholder={t('reported_by')}
            disabled={hide === 'hide' || (isEdit && statusId >= 17) ? true : false}
          />
          <span className="valid">{error['reportBy']}</span>
        </Col>
        <Col xs={12} md={6} className="required">
          <span>
            <label>{t('department')}</label>
            <span className="astrix_sysmbol">*</span>
          </span>
          <DropDownList
            data={department}
            textField="department"
            dataItemKey="id"
            name={'department'}
            value={{
              department: department.find((_) => _.id == incidentpermit?.department)?.department,
            }}
            onChange={handleChange}
            placeHolder={t('enter_department')}
            className="gridclass"
            disabled={hide === 'hide' ? true : isEdit}
          />
          
         
          <span className="valid">{error['department']}</span>
        </Col>
        </>
        )}
      </Row>
      <Row className="row"></Row>
      {calculate ? (
        <KendoDialog title={'Risk Score Calculation '} onClose={() => setCalculate(!calculate)}>
          <Form
            onCustomEvent={(customEvent) => getRiskMatrix(customEvent)}
            form={riskCalcultionList?.formData && JSON.parse(riskCalcultionList.formData)}
            options={{
              language: i18n.language,
              i18n,
            }}
          />
          <div className="calculate-btn">
            <CommonButton
              text={'Cancel'}
              fillMode="outline"
              showColor={true}
              className={'toogle-btn'}
              onHandleClick={() => setCalculate(!calculate)}
            />
          </div>
        </KendoDialog>
      ) : null}
    </div>
  );
};

export default memo(NewIncidentForm);
