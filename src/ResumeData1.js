import * as React from "react";
import * as ReactDOM from "react-dom";
import { Col, Row, Card } from "react-bootstrap";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import {
  FormInput,
  FormDropDownList,
  FormDatePicker,
  FormTextArea,
  FormNumericTextBox,
} from "./form-componant";

import {
  dropDownList,
  formInput,
  selectCategory,
  selectLocation,
  selectStatus,
  phoneValidator,
  nightsValidator,
} from "./validators";
import App from "./App.css"
import { useNavigate, useRoutes } from "react-router-dom";
const ResumeData1 = ({ users, formRenderProps, setUsers, handleChange }) => {
  const Gendre = ["pune", "bangalor", "hyderabad"];
  const navigate = useNavigate();
  const handalGotoPage = () => {
    navigate("/CreateNewchecklist");
  };
  return (
    <Form 
    
      render={(formRenderProps) => (
        <FormElement
          style={{
            width:"100%"
          }}
        >
          
         
  
          <Row>
            <Col xs={12} md={8}>
              <Row className="align-items-end label  space">
                <Col xs={12} md={3}>
                  <Field
                    key={"location"}
                    id={"location"}
                    name={"location"}
                    label={"Location"}
                    component={FormDropDownList}
                    validator={selectStatus}
                    data={Gendre}
                    as={"select"}
                    defaultValue=""
                    placeHolder={"Type1"}
                  />
                </Col>

                <Col xs={12} md={3}>
                  <Field
                  classname="d-picker"
                    key={"start Date"}
                    id={"start Date"}
                    name={"start Date"}
                    label={"Start Date"}
                    component={FormDatePicker}
                    validator={formInput}
                    defaultValue=""
                  />
                </Col>

                <Col xs={12} md={3}>
                  <Field
                    key={"end Date"}
                    id={"end Date"}
                    name={"end Date"}
                    label={"End Date"}
                    component={FormDatePicker}
                    validator={formInput}
                    defaultValue=""
                  />
                </Col>
                <Col xs={12} md={3} className="text-left">
                  <button
                    type={"submit"}
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary "
                    disabled={!formRenderProps.allowSubmit}
                  >
                    SEARCH
                  </button>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={4} className="d-flex align-items-end justify-content-end">
              <Row className="align-items-end label  space">
                {/* <Col xs={12} md={2}> */}
                  <button
                    title="Add new"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary mx-2 "
                    onClick={handalGotoPage}
                    type={"submit"}
                  >
                    NEW INCIDENT
                  </button>
                {/* </Col>
                <Col xs={12} md={2}> */}
                  <button
                    type={"submit"}
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary mx-2"
                    disabled={!formRenderProps.allowSubmit}
                  >
                    PRINT
                  </button>
                {/* </Col> */}
              </Row>
            </Col>
          </Row>
          
        </FormElement>
      )}
    />
  );
  
};

export default ResumeData1;
