// import { getCheckList } from 'Pages/CheckList/api';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-formio/lib/components';
import { useTranslation } from 'react-i18next';
import { getCommentList, getSectionList } from '../../api';
// import './style.css';
const Investigation = (props) => {
  const {
    workPermitId,
    setFormDefinitions,
    formDefinitionsData,
    disabled,
    onFormChange,
    changeTabFun,
    setIsUpdating,
    hide,
    setTabValidation,
    formRef,
    setSavedata,
    statusId,
  } = props;

  const [selected, setSelected] = useState(0);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [sectionlist, setSectionlist] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [commentList, setCommentList] = useState([]);
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

  const getSectionListform = async () => {
    setTabValidation(true);
    const permitId = 73;
    try {
      setLoadingData(true);
      setIsUpdating(true);
      const res = await getSectionList(permitId);
      let newData = res.data.responseObject.map((val) => ({
        ...val,
        formData: val.formData.map((item) => {
          let jsonData = JSON.parse(item.formData);
          let newFormData = {
            diaplay: 'form',
            components: jsonData.components.map((val) => ({
              ...val,
              disabled: true,
            })),
          };
          return {
            ...item,
            formData: JSON.stringify(newFormData),
          };
        }),
      }));

      // if (hide === 'hide') {
      //   setSectionlist(res.data.responseObject);
      // } else {
      //   setSectionlist(newData);
      // }
      if (statusId < 17) {
        setSectionlist(res.data.responseObject);
      } else if (statusId > 17) {
        setSectionlist(newData);
      } else {
        setSectionlist(newData);
      }
      const formData = getUniqueChecklist(res.data.responseObject);
      const checklistsData = [];
      for (let i = 0; i < formData.length; i++) {
        const { checklistid, checklist } = formData[i];
        checklistsData.push({
          name: checklist,
          id: checklistid,
          formData: res,
        });
        changeTabFun(checklistid);
      }
     
      setFormDefinitions(checklistsData);
      setIsUpdating(false);
      setLoadingData(false);
      setSavedata(false);
    } catch (err) {
      setLoadingData(false);
      setIsUpdating(false);
      setSavedata(false);
      console.log('Error [getChecklistIdsForPermitType]', err);
    }
  };

  useEffect(() => {
    getSectionListform();
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await getCommentList(workPermitId);

      setCommentList(
        res.data?.responseObject?.map((val) => ({
          createdate: val.createDate,
          name: val.userName,
          statuscondition: val.statusCondition,
          signature: val.signature,
          roledesc: val.roleDesc,
          statusname: val.statusName,
        })),
      );
    } catch (error) {
      console.log('err [getCheckList]', error);
    }
  };
  return (
    <>
      <Row className="my-2 ">
        <Col md={12} className="mx-auto px-3 pb-3 ">
          {sectionlist.map((form, id) => {
            return (
              <>
                {!loadingData &&
                  form?.formData?.map((form, index) => {
                    return (
                      <Form
                        ref={(node) => {
                          formRef.current[form.checklist] = node;
                        }}
                        disabled={disabled}
                        form={form?.formData && JSON.parse(form.formData)}
                        onChange={(data) =>
                          onFormChange(data, form.checklistid, form.checklist, 'risk')
                        }
                        submission={formDefinitionsData[form.checklistid]?.formData || {}}
                        options={{
                          language: i18n.language,
                          i18n,
                        }}
                      />
                    );
                  })}
              </>
            );
          })}
          {/* {loadingData && <Spinner />} */}
        </Col>
      </Row>
    </>
  );
};
export default Investigation;
