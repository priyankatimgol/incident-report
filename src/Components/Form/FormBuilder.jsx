import { Button } from '@progress/kendo-react-buttons';
import { Row } from 'react-bootstrap';
import { FormBuilder } from 'react-formio';
import { useTranslation } from 'react-i18next';

import CheckListInput from './InputBox';
function CreateFormBuilder() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div>
        <label className="label-btn">CREATE NEW CHECKLIST</label>
      </div>
      <div>
        <CheckListInput />
      </div>
      <div className="form-builder">
        <FormBuilder
          form={{ display: 'form' }}
          onChange={(schema) => console.log(JSON.stringify(schema))}
          i18n={i18n}
          language={i18n.language('id-ID')}
        />
      </div>
      <div className="formDiv">
        <Row className="mx-1 justify-content-center">
          <Button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary mx-1">
            SUBMIT
          </Button>

          <Button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary mx-1">
            CANCEL
          </Button>
          <br></br>
        </Row>
      </div>
    </div>
  );
}
export default CreateFormBuilder;
