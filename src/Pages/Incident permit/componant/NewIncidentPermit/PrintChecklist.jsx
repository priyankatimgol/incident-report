import { useEffect, useState } from 'react';
import { Form } from 'react-formio/lib/components';
import { useTranslation } from 'react-i18next';
import { ReactLiquid } from 'react-liquid';
import { getCheckListForPermitType } from '../../api';
import { template } from './Templates/DefaultTemplate';
import './style.css';
import { DataRequired } from './utils';
const PrintChecklist = (props) => {
  const { setFormDefinitions, disabled, hide, changeTabFun, setIsUpdating } = props;

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [sectionlist, setSectionlist] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [formDefinitionsData, setFormDefinitionsData] = useState({});
  const [data, setData] = useState({});
  const [step, setStep] = useState(
    Number(JSON.parse(localStorage.getItem('printData')).processId) || 1,
  );

  useEffect(() => {
    setData(DataRequired(step));
  }, [step]);

  useEffect(() => {
    if (step) {
      let formData = localStorage.getItem('formdata');
      setFormDefinitionsData(JSON.parse(formData));
    }
  }, [step]);

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

  const processId = Number(JSON.parse(localStorage.getItem('printData')).processId) || 1;

  const getChecklistIdsForPermitType = async (processId) => {
    try {
      setLoadingData(true);
      const res = await getCheckListForPermitType(processId);
      setSectionlist(res.data.responseObject);
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
      if (hide === 'hide') {
        setSectionlist(res.data.responseObject);
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
      setLoadingData(false);
      setIsUpdating(false);
    } catch (err) {
      setLoadingData(false);
      console.log('Error [getChecklistIdsForPermitType]', err);
    }
  };

  useEffect(() => {
    if (processId) {
      getChecklistIdsForPermitType(processId);
    }
  }, [processId]);


  return (
    <>
      <div className="container mt-5 mb-5 ">
        <div>
          <ReactLiquid template={template} data={data} html />
        </div>

        {sectionlist.map((form, id) => {
          return (
            !loadingData &&
            form?.formData?.map((form, index) => {
              return (
                <div className="container-fluid datepicker-print">
                  <div
                    style={{
                      border: '1px solid #000',
                      borderTop: 'none',
                    }}
                  >
                    <div
                      className="pdfPrint px-4 py-2"
                      style={{ fontSize: '18px', fontWeight: 'bold' }}
                    >
                      {t(form.checklist)}
                    </div>
                    <div className="px-4 py-2">
                      <Form
                        disabled={disabled}
                        form={form?.formData && JSON.parse(form.formData)}
                        submission={formDefinitionsData[form.checklistid]?.formData || {}}
                        options={{
                          language: i18n.language,
                          i18n,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          );
        })}
      </div>
    </>
  );
};
export default PrintChecklist;