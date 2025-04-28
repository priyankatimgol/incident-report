import { getIncidentPermitData } from 'Pages/Incident permit/api';
import React, { useEffect } from 'react';
import { ReactLiquid } from 'react-liquid';
import { useParams } from 'react-router-dom';
import { EnviornmentalDamage } from './Templates/EnviornmentalDamage';
import { HighPotential } from './Templates/HighPotential';
import { MVCdisaternatural } from './Templates/MVCdiasternatural';
import { MotorCycleVehiclecrash } from './Templates/MotorCycleVehiclecrash';
import { Nearmiss } from './Templates/Nearmiss';
import { Occupationalillness } from './Templates/Occupationalillness';
import { Occupationalinjury } from './Templates/Occupationalinjury';
import { Others } from './Templates/Others';
import { PropertyDamage } from './Templates/PropertyDamage';
import { Securityincident } from './Templates/Securityincident';
import './style.css';
import { DataRequired } from './utils';
const Print = () => {
  const { id } = useParams();
  const isNew = id === 'new' ? true : false;
  const incidentId = isNew ? '' : id;
  const [loading, setLoader] = React.useState(true);
  const [data, setData] = React.useState({});
 
  const [formdata, setformdata] = React.useState({});
  const [printData, setprintData] = React.useState({});
   // const [step, setStep] = React.useState(
  //   //Number(JSON.parse(localStorage.getItem('printData')).processId) || 1,
  //   Number(printData.processId) || 1,
  // );
  const [step, setStep] = React.useState(1);

  // useEffect(() => {
  //   if(printData && printData?.processId){
  //     const processId = Number(printData?.processId);
  //     setStep(isNaN(processId) ? 1 : processId);
  //   }
  // }, [printData]);


  // useEffect(() => {
  //   getPrintData(incidentId)
  // }, [ incidentId]);

  // const getPrintData = async (id) => {
  //   try {
  //     const res = await getIncidentPermitData(id);
  //     const responseArray = Object.entries(res.data.responseObject);
  //     const filteredResponseArray = responseArray.map(([key, value]) => {
  //       if (key === 'formData') {
  //         return [key, undefined]; // Set "formData" property value to undefined to effectively remove it
  //       }
  //       return [key, value];
  //     });
  //     const filteredResponse = Object.fromEntries(filteredResponseArray);
  //     //localStorage.setItem('printData', JSON.stringify(filteredResponse));
  //     setprintData(filteredResponse);
  //     if (res.data.responseObject.formData != '') {
  //       const formData = JSON.parse(res.data.responseObject.formData);
  //       function findAndDeleteChecklistByName(checklistName) {
  //         for (const key in formData) {
  //           if (formData[key].checklistName === checklistName) {
  //             delete formData[key];
  //           }
  //         }
  //         return formData;
  //       }
  //       const checklistNameToDelete = 'Action';
  //       const remainingObjects = findAndDeleteChecklistByName(checklistNameToDelete);
  //       //localStorage.setItem('formdata', JSON.stringify(remainingObjects));
  //       setformdata(remainingObjects)
  //   } 
  // }catch (err) {}
  // };
  // useEffect(() => {
  //   let formData = localStorage.getItem('formdata');
  //   if (formData) {
  //     setData(DataRequired(step));
  //     setLoader(false);
  //   }
  // }, [step]);

  useEffect(() => {
    const fetchPrintData = async () => {
      try {
        const res = await getIncidentPermitData(incidentId);
        const responseObject = res.data.responseObject;
        const filteredResponseObject = { ...responseObject, formData: undefined };
        setprintData(filteredResponseObject);

        if (responseObject.formData) {
          const parsedFormData = JSON.parse(responseObject.formData);
          const remainingObjects = Object.keys(parsedFormData).reduce((acc, key) => {
            if (parsedFormData[key].checklistName !== 'Action') {
              acc[key] = parsedFormData[key];
            }
            return acc;
          }, {});
          setformdata(remainingObjects);
        }
      } catch (err) {
        console.error('Error fetching print data:', err);
      }
    };

    fetchPrintData();
  }, [incidentId]);
  useEffect(() => {
    if (printData?.processId) {
      const parsedProcessId = Number(printData?.processId);
      const newStep = isNaN(parsedProcessId) ? 1 : parsedProcessId;
      setStep(newStep);
    }
  }, [printData]);
  useEffect(() => {
    if (formdata && printData && step ) {
      setData(DataRequired(step,printData,formdata));
      setLoader(false);
    } 
  }, [step,printData,formdata]);

  const getScreen = () => {
    switch (step) {
      case 20:
        //HighPotential
        return HighPotential;
      case 21:
        //Occupationalinjury
        return Occupationalinjury;
      case 22:
        //Occupationalillness**
        return Occupationalillness;
      case 23:
        //Nearmiss**
        return Nearmiss;
      case 24:
        //EnviornmentalDamage//////
        return EnviornmentalDamage;
      case 25:
        //PropertyDamage
        return PropertyDamage;
      case 26:
        //Securityincident
        return Securityincident;
      case 27:
        //MotorCycleVehiclecrash//////
        return MotorCycleVehiclecrash;
      case 28:
        //MVCdiasternatural
        return MVCdisaternatural;
      case 29:
        //others
        return Others;
      default:
        return null;
    }
  };
 
  return (
    <div>
      <ReactLiquid template={getScreen()} data={data} html />
    </div>
  );
};

export default Print;
