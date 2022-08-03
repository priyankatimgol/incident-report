import * as React from "react";
export const MyCommandCell = (props) => {
  const { dataItem } = props;
  console.log("dataItem :>> ", dataItem);
  // const inEdit = dataItem[props.editField];
  // console.log("inEdit :>> ", inEdit);
  const isNewItem = dataItem.id === undefined;
  return dataItem?.inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() =>
          isNewItem ? props.add(dataItem) : props.update(dataItem)
        }
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() =>
          isNewItem ? props.discard(dataItem) : props.cancel(dataItem)
        }
      >
        {isNewItem ? "Discard" : "Cancel"}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
      >
        <i class="fa fa-edit" ></i>
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() =>
          "Confirm deleting: " + dataItem.id && props.remove(dataItem)
        }
      >
        <i class="fa fa-remove" ></i>
      </button>
    </td>
  );
};
