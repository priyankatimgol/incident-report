
import { Button } from "@progress/kendo-react-buttons";
import React from "react";
import { axios, Post } from "react-axios";

import ReactDOM from "react-dom";
import { FormBuilder, Form } from "react-formio";
import createnewchecklist from "./createnewchecklist.css";
import { Col, Row, Card } from "react-bootstrap";
const CreateNewchecklist = () => {
 

  
  const submitData = (data) => {
    console.log("Data is", data);


    
    // axios
    //   .post(
    //     "https://localhost:5001/api/IncidentMgmt/incidentcreate",
    //     incidentmgmt
    //   )

    //   .then((response) => {
    //     console.log("responce", response);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  return (
    <div className="container-fluid ">
      <FormBuilder
        form={{ display: "form" }}
        onChange={(schema) => console.log(schema)}
      />
      <div className="formDiv">
      <Form  onSubmit={console.log} />
        <Row>
          <Col>
                <Button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary sub-btn" >SUBMIT</Button>
          </Col>
          <Col>
                <Button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary " >CANCEL</Button><br></br>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default CreateNewchecklist;
