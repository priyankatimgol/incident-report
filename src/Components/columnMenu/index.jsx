import { GridColumnMenuCheckboxFilter, GridColumnMenuFilter } from '@progress/kendo-react-grid';
export const ColumnMenu = (props) => {
  return (
    <div>
      <GridColumnMenuFilter {...props} expanded={true} />
    </div>
  );
};
export const ColumnMenuCheckboxFilter = (props, users) => {
  // const { data } = props;

  return (
    <div>
      <GridColumnMenuCheckboxFilter {...props} data={users} expanded={true} />
    </div>
  );
};
