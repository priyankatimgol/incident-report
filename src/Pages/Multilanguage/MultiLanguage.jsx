import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormDropDownList } from 'Components/Form/Form';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getLanguage, updateLanguage } from 'Services/API/masterApi';
function Multilanguage() {
  const [languageData, setLanguageData] = useState('');
  const [languageChange, setLanguageChange] = useState('');
  const initialLanguage = localStorage.getItem('language') || languageChange;

  const locales = [
    {
      language: 'en-US',
      locale: 'en',
    },
    {
      language: 'id-ID',
      locale: 'id',
    },
  ];
  const { t, i18n } = useTranslation();
  const getLanguageData = async () => {
    try {
      const res = await getLanguage();
      setLanguageData(res.data.responseObject);
    } catch (err) {
      console.log('error [getLanguageData]', err);
    }
  };

  useEffect(() => {
    getLanguageData();
  }, []);

  const updateLanguageData = async (value) => {
    try {
      const res = await updateLanguage(value);
      setLanguageData(res.data.responseObject);
    } catch (err) {
      console.log('error [updateLanguageData]', err);
    }
  };
  useEffect(() => {
    i18n.changeLanguage(initialLanguage);
  }, [i18n, initialLanguage]);

  const handleChange = (e) => {
    localStorage.setItem('language', e.target.value);
    setLanguageChange(e.target.value);
    updateLanguageData(e.target.value);
    i18n.changeLanguage(e.target.value);
    window.location.reload();
  };
  return (
    <div>
      <Form
        render={(formRenderProps) => (
          <FormElement style={{ margin: '5px' }}>
            <Row>
              <Col xs={12} md={12}>
                <Field
                  key={'locale'}
                  id={'locale'}
                  name={'locale'}
                  label={t('locale')}
                  component={FormDropDownList}
                  onChange={handleChange}
                  defaultValue={languageData}
                  assets={initialLanguage}
                  data={locales.map((val) => val.language)}
                />
              </Col>
            </Row>
          </FormElement>
        )}
      />
    </div>
  );
}

export default Multilanguage;
