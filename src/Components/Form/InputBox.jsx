import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Label, Hint, Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import "./FormBuilder.css";

const inputValidator = (value) => (!value ? "Please enter a text." : "");

const FormInput = (fieldRenderProps) => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    type,
    optional,
    max,
    value,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hindId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  return (
    <FieldWrapper>
      <Label
        editorId={id}
        editorValid={valid}
        editorDisabled={disabled}
        optional={optional}
      >
        {label}
      </Label>
      <div className={"k-form-field-wrap"}>
        <Input
          valid={valid}
          type={type}
          id={id}
          disabled={disabled}
          maxlength={max}
          ariaDescribedBy={`${hindId} ${errorId}`}
          {...others}
        />
        <Hint
          direction={"end"}
          style={{
            position: "absolute",
          }}
        >
          {value.length} / {max}
        </Hint>
        {showHint && <Hint id={hindId}>{hint}</Hint>}
        {showValidationMessage && (
          <Error id={errorId}>{validationMessage}</Error>
        )}
      </div>
    </FieldWrapper>
  );
};

const CheckListInput = () => {
  const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));

  return (
    <Form
      initialValues={{
        username: "",
      }}
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement
          style={{
            width: 250,
            position: "absolute",
          }}
        >
          <fieldset className={"k-form-fieldset"}>
            <Field
              id={"username"}
              name={"username"}
              label={" CHECKLIST NAME:"}
              value={formRenderProps.valueGetter("username")}
              component={FormInput}
              validator={inputValidator}
            />
          </fieldset>
        </FormElement>
      )}
    />
  );
};
export default CheckListInput;
