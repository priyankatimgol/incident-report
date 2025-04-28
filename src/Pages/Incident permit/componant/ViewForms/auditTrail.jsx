import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCheckListForPermitType, getCommentList } from '../../api';
const AuditTraildata = (props) => {
  const {
    setFormDefinitions,
    incidentpermitID,
    setIsUpdating,
    setTabValidation,
    setSavedata,
  } = props;
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [value, setValue] = useState();
  const [color, setColor] = useState('#000');
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [showUpload, setShowUpload] = useState(false);
  const [imageURL, setImageURL] = useState();
  const [sectionlist, setSectionlist] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [signature, setSignature] = useState('');
  const [name, setName] = useState([]);
  const getUniqueChecklist = (data) => {
    const formDataList = [];

    for (let i = 0; i < data.length; i++) {
      const { formData } = data[i];
      formDataList.push(...formData);
    }

    const uniqueKey = 'checklistid';
    const mapObject = new Map(formDataList.map((item) => [item[uniqueKey], item]));
    return [...mapObject.values()];
  };

  const getChecklistIdsForPermitType = async (permitId) => {
    try {
      setLoadingData(true);
      const res = await getCheckListForPermitType({ permitId });
      setSectionlist(res.data.responseObject);
      const formData = getUniqueChecklist(res.data.responseObject);
      const checklistsData = [];
      for (let i = 0; i < formData.length; i++) {
        const { checklistid, checklist } = formData[i];
        // const res = await getCheckListData(checklistid);

        checklistsData.push({
          name: checklist,
          id: checklistid,
          formData: res,
        });
      }

      setFormDefinitions(checklistsData);
      setLoadingData(false);
    } catch (err) {
      setLoadingData(false);
      console.log('Error [getChecklistIdsForPermitType]', err);
    }
  };



  useEffect(() => {
    getList();
    setTabValidation(null)
  }, [incidentpermitID]);

  const getCheckListData = async (checkListId) => {
    try {
      // const res = await getCheckList(checkListId);
      // return JSON.parse(res.data.responseObject.formData);
    } catch (error) {
      console.log('error [getData]', error);
    }
  };
  const getList = async () => {
    try {
      const res = await getCommentList(incidentpermitID);

      setCommentList(
        res.data?.responseObject?.map((val) => ({
          createdate: moment(val.createDate).format('DD-MM-YYYY HH:mm:ss'),
          name: val.userName,
          statuscondition: val.statusCondition,
          signature: val.signature,
          roledesc: val.roleDesc,
          statusname: val.statusName,
        })),
      );
      setSavedata(false);
    } catch (error) {
      setSavedata(false);
      console.log('err [getCheckList]', error);
    }
  };
 


  const grid = (
    <Grid
    
      data={commentList}
    
    >
   
      <Column
        field="name"
        title={t('username')}
        editor="validfrom"
      
        filter="date"
      />
        
        <Column
        field="roledesc"
        title={t('userrole')}
        editor="validfrom"
        filter="date"
      />
       <Column
        field="statusname"
        title={t('status')}
        editor="validfrom"
        filter="date"
      />
      
      <Column field="createdate" title={t('date/time')} className="status"/>
    </Grid>
  );

  return (
    <>
      <cart>{grid}</cart>
    </>
  );
};
export default AuditTraildata;
