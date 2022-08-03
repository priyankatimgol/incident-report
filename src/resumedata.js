import * as React from "react";
import { Col, Row, Card } from "react-bootstrap";
import { Field } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { RadioButton, Checkbox, RadioGroup } from '@progress/kendo-react-inputs';
import {
  FormInput,
  FormDropDownList,
  FormDatePicker,
  FormTextArea,
  FormNumericTextBox,
} from "./form-componant";
import { Upload } from '@progress/kendo-react-upload';
import { } from '@progress/kendo-react-intl';
import {
  dropDownList,
  formInput,
  selectCategory,
  selectLocation,
  selectStatus,
  phoneValidator,
  nightsValidator,
} from "./validators";

const jenisPenyakit = ["", "Flu", "Batuk", "Tipes"];
const kategoriPenyakit = ["", "Menular", "Tidak Menular"];
const Gendre = ["", "night", "day", "other"];
const lokasiPerawatan = ["", "Rumah Sakit", "Puskesmas", "Rumah"];

export const ResumeData = ({ users, formRenderProps, setUsers, handleRedio, handleChange }) => {
  const [selectedValue, setSelectedValue] = React.useState('first');

  const data = [
    {
      label: "On Site",
      value: "onSite",
    },
    {
      label: "Incident at Off Site",
      value: "offSite",
    },
    

  ];
  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            <Col xs={6} md={6}>
              <Field
                key={"Location"}
                id={"Location"}
                name={"location"}
                label={"Location"}
                type={"text"}
                component={FormInput}
                data={users?.location}
                validator={formInput}
                defaultValue={""}
                placeHolder={"Filled Text"}
                onChange={handleChange}
              />
            </Col>
            <Col xs={6} md={6}>
              <Field
                key={"Department"}
                id={"Department"}
                name={"department"}
                label={"Department"}
                type={"text"}
                component={FormInput}
                data={users?.Department}
                validator={formInput}
                defaultValue={""}
                placeHolder={"Filled Text"}
                onChange={handleChange}
              />
            </Col>
          </Row>
          
          <Row>
            <Col xs={6} md={6}>
              <Field
                key={"Business Unit"}
                id={"Business Unit"}
                name={"businessUnit"}
                label={"Business Unit"}
                type={"text"}
                component={FormInput}
                data={users?.businessUnit}
                validator={formInput}
                defaultValue={""}
                placeHolder={"Filled Text"}
                onChange={handleChange}
              />
            </Col>
            <Col xs={6} md={6}>
              <Field
                key={"Report By"}
                id={"Report By"}
                name={"reportBy"}
                label={"Report By"}
                type={"text"}
                component={FormInput}
                data={users?.reportBy}
                validator={formInput}
                defaultValue={""}
                placeHolder={"Filled Text"}
                onChange={handleChange}
              />
            </Col>
          </Row>
          
          <Row>
            <Col xs={12} md={12}>
              <Field
                key={"Incident Summary"}
                id={"Incident Summary"}
                name={"summary"}
                label={"Incident Summary"}
                type={"text"}
                component={FormInput}
                data={users?.summary}
                validator={formInput}
                defaultValue={""}
                placeHolder={"Filled Text"}
                onChange={handleChange}
              />

            </Col>
          </Row>
          
          <Row>
            <Col xs={12} md={2}>
              <Field
                key={"Incident Date"}
                id={"Incident Date"}
                name={"incDate"}
                label={"Incident Date"}
                data={users?.incDate}
                component={FormDatePicker}
                validator={formInput}
                onChange={handleChange}
                defaultValue=""
              />
            </Col>

            <Col xs={12} md={2}>
              <Field
                key={"time"}
                id={"time"}
                name={"time"}
                label={"time"}
                type={"text"}
                component={FormInput}
                data={users?.time}
                validator={formInput}
                defaultValue={""}
                placeHolder={"Filled Text"}
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} md={2}>
              <Field
                key={"shift"}
                id={"shift"}
                name={"shift"}
                label={"Shift"}
                component={FormDropDownList}
                validator={selectStatus}
                data={Gendre}
                as={"select"}
                defaultValue=""
                placeHolder={"Type1"}
                onChange={handleChange}
              />
            </Col>

            {/* <Col xs={12} md={3}> */}

            <RadioGroup data={data} name='site' value={users.site} onChange={handleRedio} layout='horizontal' />

            {/* </Col> */}



          </Row>
        
          <Row className="align-items-end">
            <Col xs={12} md={3}>
              <Field
                key={"category"}
                id={"category"}
                name={"category"}
                label={"Incident Category"}
                component={FormDropDownList}

                validator={selectCategory}
                data={kategoriPenyakit}
                as={"select"}
                defaultValue=""
                placeHolder={"Area1"}
                onChange={handleChange}
              />
            </Col>

            <Col xs={12} md={3}>
              Personal Injuries/lllness Details<br></br>
              <Button themeColor={"primary"}>+ ADD PERSON</Button>
            </Col>
            <Col xs={12} md={4}>

              Incident Photo
            </Col>
            <Col xs={12} md={2}>
              {/* <Upload batch={false} multiple={true} defaultFiles={[]} withCredentials={false} saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'} removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'} /> */}
<input type='file' hidden id='brower'/>

<label htmlFor="brower" className="browerBtn" themeColor={"primary"}>BROWSE</label>
            </Col>


          </Row>
         
          <Row className="align-items-end">
            <Col xs={12} md={5}>
              <Field
                key={"potential"}
                id={"potential"}
                name={"potential"}
                label={"Potential Severity"}
                type={"text"}
                data={users?.potential}
                component={FormInput}
                validator={formInput}
                defaultValue={""}
                placeHolder={"Filled Text"}
                onChange={handleChange}
              />
            </Col>

            <Col xs={12} md={2}>
              <Button className="matrix_btn" themeColor={"primary"}>  RISK MATRIX</Button>
            </Col>
            <Col xs={12} md={5}>

              <Button themeColor={"primary"}>  IMAGE UPLOAD</Button>

            </Col>
          </Row>
          <Row>

            <Col xs={12} md={3}>
              <Checkbox label={'Contractor'} />
              <br /></Col>
            <Col xs={12} md={2}>
              <Checkbox defaultChecked={true} label={'Employee'} />
              <br /></Col>
            <Col xs={12} md={2}>
              <Checkbox label={'Visitor'} />
              <br /></Col>
            <Col xs={12} md={2}>
              <Checkbox label={'Third Party'} />
              <br /></Col>
            <Col xs={12} md={3}>
              <Checkbox label={'Other'} />
            </Col>


          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ResumeData;
