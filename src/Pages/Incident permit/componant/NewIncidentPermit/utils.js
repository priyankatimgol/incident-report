import moment from 'moment';

// const FirstArr = (item) => {
//   const newArray2 = Object.values(JSON.parse(localStorage.getItem('formdata'))).filter((val) =>
//     val.checklistName.includes(item),
//   );
//   return newArray2;
// };

const handleIncidentInvolved = (value) => {
  console.log("value value",value)
  if (Array.isArray(value)) {
    const filter = (obj) => {
      return value.some((val) => val === obj);
    };

    return {
      emp: filter('Employee'),
      out: filter('Third Party'),
      cont: filter('Contractor'),
      visitor: filter('Visitor'),
      other: filter('Others'),
    };
  } else {
    return {};
  }
};
const handleGaseInfo = (value) => {
  let indexes = [0, 6, 12, 18, 24];
  if (value) {
    let shareGasInfo = value.map((i) => {
      return {
        date: (i.dateTime && moment(i.dateTime).format('YYYY-MM-DD')) || '',
        date1: (i.dateTime1 && moment(i.dateTime1).format('YYYY-MM-DD')) || '',
        date34: (i.dateTime34 && moment(i.dateTime34).format('YYYY-MM-DD')) || '',
        time: (i.dateTime && moment(i.dateTime).format('HH : MM')) || '',
        name12: i.name,
        hash: i.hash,
        name: i.name,
        originalName: i.originalName,
        size: i.size,
        personalName:i.textField,
        personalName_1:i.name1,
        personalAge:i.age,
        personalAge_1:i.ageYears,
        storage: i.storage,
        type: i.type,
        url: i.url,
      };
    });
    let arrBreakDown = indexes.map((e, i) => {
      return { data: shareGasInfo.slice(e, indexes[i + 1]) };
    });
    return arrBreakDown;
  }
  return [];
};

export const DataRequired = (step,printData,formdata) => {
  const FirstArr = (item) => {
    const newArray2 = Object.values(formdata).filter((val) =>
      val.checklistName.includes(item),
    );
    return newArray2;
  };
  //const RespData = JSON.parse(localStorage.getItem('printData'));
  const RespData =printData;
 const department= localStorage.getItem("department");
 const location=localStorage.getItem("location");
 
  const extraDetails = {
    updateDate: moment(RespData?.updateDate).format('YYYY-MM-DD') || '',
    validFrom: {
      date: moment(RespData?.updateDate).format('YYYY-MM-DD') || '',
      time: moment(RespData?.updateDate).format('HH : MM') || '',
    },
    validTo: {
      date: moment(RespData?.validTo).format('YYYY-MM-DD') || '',
      time: moment(RespData?.validTo).format('HH : MM'),
    },
    workOrder: RespData?.workOrder || '',
    zone: location || '',
    department: department || '',
    summary: RespData?.summary || '',
    reportedBy: RespData?.reportBy || '',
    typeid: RespData?.processId || '',
    incidentinvolved: handleIncidentInvolved(RespData?.involved) || '',
    createDate: moment(RespData?.createDate).format('YYYY-MM-DD') || '',
    title: RespData?.title || '',
    area: RespData?.area || '',
    date: moment(RespData?.date).format('YYYY-MM-DD') || '',
    Time: moment(RespData?.date).format('hh:mm:ss A') || '',
    system: RespData?.system || '',
    number: RespData?.number || '',
  };

  switch (step) {
    case 20:
      //HighPotential//done
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        CorporateLife:
          (FirstArr('Corporate')[0] &&
            FirstArr('Corporate')[0].formData &&
            FirstArr('Corporate')[0].formData.data &&
            FirstArr('Corporate')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 21:
      //Occupationalinjury//done
      return {
        ActivityType:
          (FirstArr('Type Activity')[0] &&
            FirstArr('Type Activity')[0].formData &&
            FirstArr('Type Activity')[0].formData.data &&
            FirstArr('Type Activity')[0].formData.data.container) ||
          {},
        InitialCategory:
          (FirstArr('Initial')[0] &&
            FirstArr('Initial')[0].formData &&
            FirstArr('Initial')[0].formData.data &&
            FirstArr('Initial')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        CorporateLife:
          (FirstArr('Corporate')[0] &&
            FirstArr('Corporate')[0].formData &&
            FirstArr('Corporate')[0].formData.data &&
            FirstArr('Corporate')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid1 &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid1)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 22:
      //Occupational Illness//
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        InitialCategory:
          (FirstArr('Initial')[0] &&
            FirstArr('Initial')[0].formData &&
            FirstArr('Initial')[0].formData.data &&
            FirstArr('Initial')[0].formData.data.container) ||
          {},
        CorporateLife:
          (FirstArr('Corporate')[0] &&
            FirstArr('Corporate')[0].formData &&
            FirstArr('Corporate')[0].formData.data &&
            FirstArr('Corporate')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid1 &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid1)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 23:
      //Nearmiss//done
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        InitialCategoryOccupationalIllness:
          (FirstArr('Initial Category Occupational Illness')[0] &&
            FirstArr('Initial Category Occupational Illness')[0].formData &&
            FirstArr('Initial Category Occupational Illness')[0].formData.data &&
            FirstArr('Initial Category Occupational Illness')[0].formData.data.container) ||
          {},
        InitialCategoryOccupationalInjury:
          (FirstArr('Initial Category Occupational Injury')[0] &&
            FirstArr('Initial Category Occupational Injury')[0].formData &&
            FirstArr('Initial Category Occupational Injury')[0].formData.data &&
            FirstArr('Initial Category Occupational Injury')[0].formData.data.container) ||
          {},
        InitialEnvironmentalDamage:
          (FirstArr('Initial Environmental')[0] &&
            FirstArr('Initial Environmental')[0].formData &&
            FirstArr('Initial Environmental')[0].formData.data &&
            FirstArr('Initial Environmental')[0].formData.data.container) ||
          {},
        InitialMotorVehicle:
          (FirstArr('Initial Motor Vehicle')[0] &&
            FirstArr('Initial Motor Vehicle')[0].formData &&
            FirstArr('Initial Motor Vehicle')[0].formData.data &&
            FirstArr('Initial Motor Vehicle')[0].formData.data.container) ||
          {},
        InitialPropertyDamage:
          (FirstArr('Initial Property Damage')[0] &&
            FirstArr('Initial Property Damage')[0].formData &&
            FirstArr('Initial Property Damage')[0].formData.data &&
            FirstArr('Initial Property Damage')[0].formData.data.container) ||
          {},
        InitialCategorySecurity:
          (FirstArr('Initials Category Security Incidents')[0] &&
            FirstArr('Initials Category Security Incidents')[0].formData &&
            FirstArr('Initials Category Security Incidents')[0].formData.data &&
            FirstArr('Initials Category Security Incidents')[0].formData.data.container) ||
          {},
        CorporateLifeSavingRules:
          (FirstArr('Corporate Life Saving Rules')[0] &&
            FirstArr('Corporate Life Saving Rules')[0].formData &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid1 &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid1)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 24:
      //Environmental Damage//done
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        InitialEnvironmentalDamage:
          (FirstArr('Initial Environmental')[0] &&
            FirstArr('Initial Environmental')[0].formData &&
            FirstArr('Initial Environmental')[0].formData.data &&
            FirstArr('Initial Environmental')[0].formData.data.container) ||
          {},
        CorporateLifeSavingRules:
          (FirstArr('Corporate Life Saving Rules')[0] &&
            FirstArr('Corporate Life Saving Rules')[0].formData &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 25:
      //PropertyDamage//done
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        InitialPropertyDamage:
          (FirstArr('Initial Property Damage')[0] &&
            FirstArr('Initial Property Damage')[0].formData &&
            FirstArr('Initial Property Damage')[0].formData.data &&
            FirstArr('Initial Property Damage')[0].formData.data.container) ||
          {},
        CorporateLifeSavingRules:
          (FirstArr('Corporate Life Saving Rules')[0] &&
            FirstArr('Corporate Life Saving Rules')[0].formData &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 26:
      //Security Incident//////
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        InitialCategorySecurity:
          (FirstArr('Initial Category Security Incidents')[0] &&
            FirstArr('Initial Category Security Incidents')[0].formData &&
            FirstArr('Initial Category Security Incidents')[0].formData.data &&
            FirstArr('Initial Category Security Incidents')[0].formData.data.container) ||
          {},
        CorporateLifeSavingRules:
          (FirstArr('Corporate Life Saving Rules')[0] &&
            FirstArr('Corporate Life Saving Rules')[0].formData &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 27:
      //Motorcycle Vehicle Crash//
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        InitialMotorVehicle:
          (FirstArr('Initial Motor Vehicle')[0] &&
            FirstArr('Initial Motor Vehicle')[0].formData &&
            FirstArr('Initial Motor Vehicle')[0].formData.data &&
            FirstArr('Initial Motor Vehicle')[0].formData.data.container) ||
          {},
        CorporateLifeSavingRules:
          (FirstArr('Corporate Life Saving Rules')[0] &&
            FirstArr('Corporate Life Saving Rules')[0].formData &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 28:
      //MVC Disaster Natural//
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        InitialMotorVehicle:
          (FirstArr('Initial Motor Vehicle')[0] &&
            FirstArr('Initial Motor Vehicle')[0].formData &&
            FirstArr('Initial Motor Vehicle')[0].formData.data &&
            FirstArr('Initial Motor Vehicle')[0].formData.data.container) ||
          {},
        CorporateLifeSavingRules:
          (FirstArr('Corporate Life Saving Rules')[0] &&
            FirstArr('Corporate Life Saving Rules')[0].formData &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    case 29:
      //Others//
      return {
        ActivityType:
          (FirstArr('Activity')[0] &&
            FirstArr('Activity')[0].formData &&
            FirstArr('Activity')[0].formData.data &&
            FirstArr('Activity')[0].formData.data.container) ||
          {},
        Activity1Category:
          (FirstArr('Activity When Incident Occur')[0] &&
            FirstArr('Activity When Incident Occur')[0].formData &&
            FirstArr('Activity When Incident Occur')[0].formData.data &&
            FirstArr('Activity When Incident Occur')[0].formData.data.container) ||
          {},
        InitialCategoryOccupationalIllness:
          (FirstArr('Initial Category Occupational Illness')[0] &&
            FirstArr('Initial Category Occupational Illness')[0].formData &&
            FirstArr('Initial Category Occupational Illness')[0].formData.data &&
            FirstArr('Initial Category Occupational Illness')[0].formData.data.container) ||
          {},
        InitialCategoryOccupationalInjury:
          (FirstArr('Initial Category Occupational Injury')[0] &&
            FirstArr('Initial Category Occupational Injury')[0].formData &&
            FirstArr('Initial Category Occupational Injury')[0].formData.data &&
            FirstArr('Initial Category Occupational Injury')[0].formData.data.container) ||
          {},
        InitialEnvironmentalDamage:
          (FirstArr('Initial Environmental')[0] &&
            FirstArr('Initial Environmental')[0].formData &&
            FirstArr('Initial Environmental')[0].formData.data &&
            FirstArr('Initial Environmental')[0].formData.data.container) ||
          {},
        InitialMotorVehicle:
          (FirstArr('Initial Motor Vehicle')[0] &&
            FirstArr('Initial Motor Vehicle')[0].formData &&
            FirstArr('Initial Motor Vehicle')[0].formData.data &&
            FirstArr('Initial Motor Vehicle')[0].formData.data.container) ||
          {},
        InitialPropertyDamage:
          (FirstArr('Initial Property Damage')[0] &&
            FirstArr('Initial Property Damage')[0].formData &&
            FirstArr('Initial Property Damage')[0].formData.data &&
            FirstArr('Initial Property Damage')[0].formData.data.container) ||
          {},
        InitialCategorySecurity:
          (FirstArr('Initial Category Security Incidents')[0] &&
            FirstArr('Initial Category Security Incidents')[0].formData &&
            FirstArr('Initial Category Security Incidents')[0].formData.data &&
            FirstArr('Initial Category Security Incidents')[0].formData.data.container) ||
          {},
        CorporateLifeSavingRules:
          (FirstArr('Corporate Life Saving Rules')[0] &&
            FirstArr('Corporate Life Saving Rules')[0].formData &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data &&
            FirstArr('Corporate Life Saving Rules')[0].formData.data.container) ||
          {},
        Investigation:
          (FirstArr('Investigation')[0] &&
            FirstArr('Investigation')[0].formData &&
            FirstArr('Investigation')[0].formData.data &&
            FirstArr('Investigation')[0].formData.data.container &&
            FirstArr('Investigation')[0].formData.data.container.container1) ||
          {},
          PersonalDetails:
          (FirstArr('Personal')[0] &&
            FirstArr('Personal')[0].formData &&
            FirstArr('Personal')[0].formData.data &&
            FirstArr('Personal')[0].formData.data.container.dataGrid1 &&
            handleGaseInfo(FirstArr('Personal')[0].formData.data.container.dataGrid1)) ||
          {},
        PictureImage:
          (FirstArr('Pictures')[0] &&
            FirstArr('Pictures')[0].formData &&
            FirstArr('Pictures')[0].formData.data &&
            FirstArr('Pictures')[0].formData.data.container1.file &&
            handleGaseInfo(FirstArr('Pictures')[0].formData.data.container1.file)) ||
          {},
        extraDetails: extraDetails,
      };
    default:
      return { extraDetails: extraDetails };
  }
};
