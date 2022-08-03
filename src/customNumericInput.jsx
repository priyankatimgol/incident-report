import React from "react";

import { NumericTextBox } from "@progress/kendo-react-inputs";

class CustomNumericInput extends React.Component {
  fixedValue = null;

  state = {
    data: this.props.data,
  };

  handleChange = (e) => {
    this.props.onChange({
      dataItem: this.props.dataItem,
      field: this.props.field,
      syntheticEvent: e.syntheticEvent,
      value: e.target.value,
    });
  };

  render() {
    const value = this.props.dataItem[this.props.field] != null ? this.props.dataItem[this.props.field] : "";

    if (this.props.importable === false) {
      return (
        <td colSpan={this.props.colSpan} style={{ textAlign: "right" }}>
          {value === null ? "" : value.toString()}
        </td>
      );
    } else {
      return (
        <td
          id={"dynamicGrid_" + (this.props.title != null ? this.props.title.replace(" ", "") : "") + this.props.dataItem["Id"]}
          colSpan={this.props.colSpan}
          style={this.props.style}
          className="k-grid-edit-cell"
        >
          <NumericTextBox format="#.######" width="100%" value={value} onChange={this.handleChange} required={this.props.isMandatory} />
        </td>
      );
    }
  }
}

export default CustomNumericInput;
